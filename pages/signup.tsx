import React, {useState} from "react";
import {Box, Button, Container, LinearProgress, Paper, TextField, Link, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import fb from "../src/firebase-config";
import {useRouter} from "next/router";
import AuthSwitcher from "../component/AuthSwitcher";

const useStyles = makeStyles((theme) => ({
    bold: {
        fontWeight: 600
    },
    container: {
        // @ts-ignore
        marginTop: theme.spacing(14),
        overflow: 'hidden'
    },
    form: {
        width: '100%',
        // @ts-ignore
        marginTop: theme.spacing(2)
    },
    input: {
        // @ts-ignore
        marginTop: theme.spacing(2)
    },
    pageContent: {
        // @ts-ignore
        maxWidth: theme.spacing(64)
    }
}));

const SignUp = () => {
    const classes = useStyles()
    const router = useRouter()
    const [loading, toggleLoading] = useState(false)

    function signUp(event) {
        event.preventDefault()
        toggleLoading(true)
        const authRef = fb.auth()
        const name = event.target.name.value

        authRef.createUserWithEmailAndPassword(event.target.email.value, event.target.password.value)
            .then(
                (user) => {
                    // here you can use either the returned user object or       firebase.auth().currentUser. I will use the returned user object
                    if (user) {
                        authRef.currentUser.updateProfile({
                            displayName: name,
                            photoURL: "https://firebasestorage.googleapis.com/v0/b/momentum-32de9.appspot.com/o/placeholder_avatar.jpeg?alt=media&token=f4baea47-9edb-4924-b557-99524f0fef3d"
                        })
                            .then(() => router.push('/'))
                    }
                })
            .catch(function (error) {
                // TO DO: Handle sign in errors
                console.log(error.message)
                toggleLoading(false)
            });
    }

    const pageContent = <Container component="main" className={classes.pageContent}>
        <Paper variant="outlined" className={classes.container}>
            <LinearProgress hidden={!loading}/>
            <Box p={4} textAlign="center" width={1}>
                <Typography variant="h5" component="h1" className={classes.bold}>
                    Create your Momentum account
                </Typography>
                <form className={classes.form} onSubmit={signUp}>
                    <TextField required className={classes.input} fullWidth id="name" label="Full Name"
                               variant="outlined" type="name" autoComplete="name"/>
                    <TextField required className={classes.input} fullWidth id="email" label="Email"
                               variant="outlined" type="email" autoComplete="email"/>
                    <TextField required className={classes.input} fullWidth id="password" label="Password"
                               variant="outlined" type="password" autoComplete="new-password"/>
                    <Box mt={6} display="flex" alignItems="center" justifyContent="space-between">
                        <Link variant="body1" onClick={() => router.push('login')} className={classes.bold}>Log
                            in</Link>
                        <Button disabled={loading} variant="contained" type="submit" color="primary" size="large">
                            Sign up
                        </Button>
                    </Box>
                </form>
            </Box>
        </Paper>
    </Container>

    return <AuthSwitcher authenticatedView={null}
                         anonView={pageContent}
                         loadingView={null}
                         authHref={'/'}/>

}

export default SignUp