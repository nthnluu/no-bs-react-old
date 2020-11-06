import React, {ReactElement, useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Divider, Drawer, LinearProgress, List, ListItem, ListItemText, Tooltip} from "@material-ui/core";
import Head from "next/head";
import AuthSwitcher from "../AuthSwitcher";
import AccountMenu from "./AccountMenu";
import {AuthContext} from "../../src/AuthContext";

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
    sidebarItem: {
        width: theme.spacing(40),
        borderRadius: '0px 100px 100px 0px',
        marginRight: theme.spacing(1)
    },
    loadingBar: {
        height: '0.1rem'
    }
}));

const AppLayout: React.FC<Props> = ({children, title, loading}) => {
    const classes = useStyles();
    const [drawer, toggleDrawer] = useState(false)

    const pageContent = <>
        <Head>
            <title>{title}</title>
        </Head>
        <Drawer anchor="left" open={drawer} onClose={() => toggleDrawer(false)}>
            <List>
                <ListItem selected button
                         className={classes.sidebarItem}
                >
                    <ListItemText>
                        My Projects
                    </ListItemText>
                </ListItem>
            </List>
        </Drawer>
        <div className={classes.root}>
            <div style={{borderBottom: "1px solid rgba(82, 82, 82, 0.25)"}}>
                <AppBar position="static" color="inherit" elevation={0}>
                    <Toolbar>
                        <Tooltip title="Main menu">
                            <IconButton edge="start" className={classes.menuButton} color="inherit"
                                        onClick={() => toggleDrawer(true)}
                                        aria-label="menu">
                                <MenuIcon/>
                            </IconButton>
                        </Tooltip>
                        <Typography variant="h6" className={classes.title}>
                            {title}
                        </Typography>
                        <AccountMenu/>
                    </Toolbar>
                    <LinearProgress className={classes.loadingBar} hidden={!loading}/>
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