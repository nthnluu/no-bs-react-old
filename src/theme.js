import {createMuiTheme} from '@material-ui/core/styles';
import {red} from '@material-ui/core/colors';

// Create a theme instance.
const theme = (darkMode = false) => createMuiTheme({
    shape: {
        borderRadius: 8,
    },
    props: {
        MuiButton: {
            disableElevation: true,
        }
    },
    typography: {
        button: {
            textTransform: 'none',
            fontWeight: 600
        },
        fontFamily: [
            'Rubik',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
        type: darkMode ? 'dark' : 'light',
        text: {
            primary: darkMode ? '#fff' : 'rgba(0,0,0,0.75)'
        },
        primary: {
            main: darkMode ? '#3f97bc': '#259bea',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        }
    },
})

export default theme;
