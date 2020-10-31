import React, {ReactElement} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {LinearProgress, Tooltip} from "@material-ui/core";
import Head from "next/head";
import AuthSwitcher from "../AuthSwitcher";
import AccountMenu from "./AccountMenu";

interface Props {
    children: ReactElement
    title: string
    loading?: boolean
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

const AppLayout: React.FC<Props> = ({children, title, loading}) => {
    const classes = useStyles();
    const pageContent = <>
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
                        <AccountMenu/>
                    </Toolbar>
                    <LinearProgress hidden={!loading}/>
                </AppBar>
            </div>


        </div>
        {children}
    </>

    return <AuthSwitcher authenticatedView={pageContent}
                         anonView={null}
                         loadingView={null}
                         anonHref={'/login'}/>
}

export default AppLayout