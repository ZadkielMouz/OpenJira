import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#1E1E1E'
        },
        secondary: {
            main: '#19857b'
        },
        error: {
            main: red.A400
        }
    },

    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundColor: '#2D2D30'
                    // backgroundColor: '#007ACC'
                }
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2D2D30'
                }
            }
        }
    }
});
