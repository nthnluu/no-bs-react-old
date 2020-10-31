import IconButton from "@material-ui/core/IconButton";
import {
    Avatar,
    Button, Divider,
    List,
    ListItem,
    Paper,
    Switch,
    Typography
} from "@material-ui/core";
import Popper from "@material-ui/core/Popper";
import React, {useContext, useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import fb from "../../src/firebase-config";
import {useRouter} from "next/router";
import {DarkModeContext} from "../../src/DarkModeContext";


const useStyles = makeStyles((theme) => ({
    largeAvatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: theme.spacing(2)
    },
    menuBody: {
        minWidth: 300,
        padding: theme.spacing(3),
        marginTop: theme.spacing(2),
        textAlign: 'center',
    },
    displayName: {
        fontWeight: 600,
        fontSize: 18
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    spacer: {
        marginTop: theme.spacing(2)
    },
    signOut: {
        marginTop: theme.spacing(4)
    },

}));

const AccountMenu = () => {
    const classes = useStyles();
    const avatarRef = useRef(null)
    const [accountMenu, toggleAccountMenu] = useState(false)
    const router = useRouter()
    const {darkMode, setDarkMode} = useContext(DarkModeContext)

    function signOut() {
        fb.auth().signOut()
            .then(() => router.push('/login'))
    }

    return <ClickAwayListener onClickAway={() => toggleAccountMenu(false)}>

        <div>
            <IconButton size="small" onClick={() => toggleAccountMenu(!accountMenu)}>
                <Avatar ref={avatarRef}
                        src="/placeholder_avatar.jpeg"/>
            </IconButton>
            <Popper id="popper" open={accountMenu} anchorEl={avatarRef.current}>
                <Paper elevation={6} className={classes.menuBody}>
                    <Avatar className={classes.largeAvatar}
                            src="/placeholder_avatar.jpeg"/>
                    <Typography className={classes.displayName}>Nathan Luu</Typography>
                    <Typography variant="body2">nathan_luu@brown.edu</Typography>
                    <Divider className={classes.spacer}/>
                    <List>
                        <ListItem className={classes.listItem}>
                            <Typography>Dark mode</Typography>
                            <Switch
                                color="primary"
                                checked={darkMode}
                                onClick={() => setDarkMode(!darkMode)}
                                name="darkModeToggle"
                                inputProps={{'aria-label': 'Dark mode'}}
                            />
                        </ListItem>
                    </List>
                    <Divider/>
                    <Button onClick={signOut} className={classes.signOut} variant="outlined" color="default">
                        Sign out
                    </Button>
                </Paper>
            </Popper>
        </div>
    </ClickAwayListener>
}

export default AccountMenu