import { createMuiTheme } from '@material-ui/core/styles';
var myTheme = createMuiTheme({
    "root": {
        flexGrow: 1,
    },
    "palette": {
        "common": {
            "black": "#000",
            "white": "#fff"
        },
        "background": {
            "paper": "#fff",
            "default": "#fafafa"
        },
        "primary": {
            "light": "rgba(74, 199, 118, 1)",
            "main": "rgba(29, 185, 84, 1)",
            "dark": "rgba(17, 111, 50, 1)",
            "contrastText": "#fff"
        },
        "secondary": {
            "light": "rgba(71, 67, 67, 1)",
            "main": "rgba(25, 20, 20, 1)",
            "dark": "rgba(17, 14, 14, 1)",
            "contrastText": "#fff"
        },
        "error": {
            "light": "#e57373",
            "main": "#f44336",
            "dark": "#d32f2f",
            "contrastText": "#fff"
        },
        "text": {
            "primary": "rgba(0, 0, 0, 0.87)",
            "secondary": "rgba(0, 0, 0, 0.54)",
            "disabled": "rgba(0, 0, 0, 0.38)",
            "hint": "rgba(0, 0, 0, 0.38)"
        }
    }
})

export default myTheme