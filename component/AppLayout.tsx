import React, {ReactElement} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Avatar, Box, LinearProgress, Tooltip} from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import Head from "next/head";

interface Props {
    children: ReactElement
    title: String
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const AppLayout: React.FC<Props> = ({children, title}) => {
    const classes = useStyles();

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className={classes.root}>
                <div style={{borderBottom: "1px solid rgba(82, 82, 82, 0.25)"}}>
                    <AppBar position="static" color="inherit" elevation={0}>
                        <Toolbar>
                            <Tooltip title="Main menu">
                                <IconButton edge="start" className={classes.menuButton} color="inherit"
                                            aria-label="menu">
                                    <MenuIcon/>
                                </IconButton>
                            </Tooltip>
                            <Typography variant="h6" className={classes.title}>
                                {title}
                            </Typography>
                            <IconButton  size="small">
                                <Avatar
                                    src="https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </div>


            </div>
            {children}
        </>
    );
}

export default AppLayout