import AppLayout from "../component/AppLayout";
import React from "react";
import {Box, Button, Container, LinearProgress, Link, Paper, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

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

    const classes = useStyles();

    return <Container component="main" maxWidth="xs">
        <Paper variant="outlined" className={classes.container}>
            <LinearProgress hidden/>
            <Box p={4} textAlign="center" width={1}>
                <Typography variant="h5" component="h1" className={classes.bold}>
                   Welcome back
                </Typography>
                <Typography component="h1">
                    Log in with your Brown EP account
                </Typography>
                <form className={classes.form}>
                    <TextField className={classes.input} fullWidth id="outlined-basic" label="Email"
                               variant="outlined"/>
                    <TextField className={classes.input} fullWidth id="outlined-basic" label="Password"
                               variant="outlined"/>
                    <Box mt={6} display="flex" alignItems="center" justifyContent="space-between">
                        <Link variant="body1" className={classes.bold}>Forgot password?</Link>
                        <Button variant="contained" color="primary" size="large">
                            Log in
                        </Button>
                    </Box>
                </form>
            </Box>
        </Paper>
    </Container>
}

export default Login