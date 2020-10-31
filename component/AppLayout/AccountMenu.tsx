import IconButton from "@material-ui/core/IconButton";
import {Avatar, Button, Paper, Typography} from "@material-ui/core";
import Popper from "@material-ui/core/Popper";
import React, {useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import fb from "../../src/firebase-config";
import {useRouter} from "next/router";

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
    signOut: {
        marginTop: theme.spacing(4)
    }
}));

const AccountMenu = () => {
    const classes = useStyles();
    const avatarRef = useRef(null)
    const [accountMenu, toggleAccountMenu] = useState(false)
    const router = useRouter()

    function signOut() {
        fb.auth().signOut()
            .then(() => router.push('/login'))
    }

    return <ClickAwayListener onClickAway={() => toggleAccountMenu(false)}>
        <div>
            <IconButton size="small" onClick={() => toggleAccountMenu(!accountMenu)}>
                <Avatar ref={avatarRef}
                        src="https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"/>
            </IconButton>
            <Popper id="popper" open={accountMenu} anchorEl={avatarRef.current}>
                <Paper elevation={6} className={classes.menuBody}>
                    <Avatar className={classes.largeAvatar}
                            src="https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"/>
                    <Typography className={classes.displayName}>Nathan Luu</Typography>
                    <Typography variant="body2">nathan_luu@brown.edu</Typography>

                    <Button onClick={signOut} className={classes.signOut} variant="outlined" color="default">
                        Sign out
                    </Button>
                </Paper>
            </Popper>
        </div>
    </ClickAwayListener>
}

export default AccountMenu