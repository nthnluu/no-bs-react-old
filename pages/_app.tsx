import React, {useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from "../src/theme";
import {AuthContext} from "../src/AuthContext";
import fb from "../src/firebase-config";
import {DarkModeContext} from "../src/DarkModeContext";
import {useMediaQuery} from "@material-ui/core";
import WithGraphQL from "../src/with-graphql";


function MyApp(props) {
    const {Component, pageProps} = props;
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [darkMode, setDarkMode] = useState(prefersDarkMode)

    useEffect(() => setDarkMode(prefersDarkMode), [prefersDarkMode])

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    const defaultTheme = useMemo(() => theme(darkMode), [darkMode])

    const [authState, setAuthState] = useState({
        status: "loading",
        user: undefined,
        token: undefined
    });

    const UserQuery = `
  query Me($uid: String!) {
  user_by_pk(id: $uid) {
    id
    name
    profile_picture
    email
    __typename
  }
}
`;

    function fetchProfile(token, user) {
        fetch(process.env.NEXT_PUBLIC_API_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                query: UserQuery,
                variables: {
                    uid: user.uid
                }
            })
        })
            .then((res) => res.json())
            .then(json => setAuthState({status: "in", user: json.data.user_by_pk, token}))
            .catch(() => setAuthState({status: "out", user: undefined, token: undefined}))
    }

    useEffect(() => {
        return fb.auth().onAuthStateChanged(async user => {
            if (user) {
                const token = await user.getIdToken();
                const idTokenResult = await user.getIdTokenResult();
                const hasuraClaim =
                    idTokenResult.claims["https://hasura.io/jwt/claims"];

                if (hasuraClaim) {
                    fetchProfile(token, user)
                } else {
                    // Check if refresh is required.
                    const metadataRef = fb
                        .database()
                        .ref("metadata/" + user.uid + "/refreshTime");

                    metadataRef.on("value", async (data) => {
                        if (!data.exists) return
                        // Force refresh to pick up the latest custom claims changes.
                        const token = await user.getIdToken(true);
                        fetchProfile(token, user)
                    });
                }
            } else {
                setAuthState({status: "out", user: undefined, token: undefined});
            }
        });
    }, []);

    const signOut = async () => {
        try {
            setAuthState({status: "loading", user: undefined, token: undefined});
            await fb.auth().signOut();
            setAuthState({status: "out", user: undefined, token: undefined});
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <AuthContext.Provider value={{authState, signOut}}>
            <DarkModeContext.Provider value={{darkMode, setDarkMode}}>
                <WithGraphQL user={authState}>
                    <React.Fragment>
                        <Head>
                            <title>My page</title>
                            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
                        </Head>
                        <ThemeProvider theme={defaultTheme}>
                            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                            <CssBaseline/>
                            <Component {...pageProps} />
                        </ThemeProvider>
                    </React.Fragment>
                </WithGraphQL>
            </DarkModeContext.Provider>
        </AuthContext.Provider>
    );
}

export default MyApp

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
