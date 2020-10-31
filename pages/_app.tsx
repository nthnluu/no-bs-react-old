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


export default function MyApp(props) {
    const {Component, pageProps} = props;
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [darkMode, setDarkMode] = useState(prefersDarkMode)
    const [authState, setAuthState] = useState<"LOADING" | "AUTHENTICATED" | "ANONYMOUS">("LOADING")

    useEffect(() => setDarkMode(prefersDarkMode), [prefersDarkMode])

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    const defaultTheme = useMemo(() => theme(darkMode), [darkMode])

    useEffect(() => {
        fb.auth().onAuthStateChanged(function (user) {
            if (user) {
                setAuthState("AUTHENTICATED")
            } else {
                setAuthState("ANONYMOUS")
            }
        })
    }, [])


    return (
        <AuthContext.Provider value={{authState}}>
            <DarkModeContext.Provider value={{darkMode, setDarkMode}}>
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
            </DarkModeContext.Provider>
        </AuthContext.Provider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
