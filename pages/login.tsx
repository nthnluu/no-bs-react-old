import React, {useState} from "react";
import {Box, Button, Container, LinearProgress, Link, Paper, TextField, Typography} from "@material-ui/core";
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
}));

const Login = () => {

    const classes = useStyles()
    const router = useRouter()
    const [loading, toggleLoading] = useState(false)

    function signIn(event) {
        event.preventDefault()
        toggleLoading(true)
        setTimeout(() => fb.auth().signInWithEmailAndPassword(event.target.email.value, event.target.password.value)
            .then(() => router.push('/'))
            .catch(function (error) {
                // TO DO: Handle sign in errors
                console.log(error.message)
                toggleLoading(false)
            }), 1500)

    }

    const pageContent = <Container component="main" maxWidth="xs">
        <Paper variant="outlined" className={classes.container}>
            <LinearProgress hidden={!loading} />
            <Box p={4} textAlign="center" width={1}>
                <Typography variant="h5" component="h1" className={classes.bold}>
                    Welcome back
                </Typography>
                <Typography component="h1">
                    Log in with your Brown EP account
                </Typography>
                <form className={classes.form} onSubmit={signIn}>
                    <TextField required className={classes.input} fullWidth id="email" label="Email"
                               variant="outlined" type="email" autoComplete="email"/>
                    <TextField required className={classes.input} fullWidth id="password" label="Password"
                               variant="outlined" type="password" autoComplete="current-password"/>
                    <Box mt={6} display="flex" alignItems="center" justifyContent="space-between">
                        <Link variant="body1" className={classes.bold}>Forgot password?</Link>
                        <Button disabled={loading} variant="contained" type="submit" color="primary" size="large">
                            Log in
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

export default Login