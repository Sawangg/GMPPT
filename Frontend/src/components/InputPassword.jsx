import React, {useState} from 'react'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    makeStyles,
    OutlinedInput
} from '@material-ui/core'
import clsx from "clsx";

//label, nom du input 
//error si erreur
//value : valeur du input
//onChange quand changement
//onKeyPress quand touche préssée
export default function InputPwd({label, error, value, onChange, onKeyPress}){

    const useStyles = makeStyles((theme) => ({
        divInputPassword: {
            margin : "auto",
            width: "max-content"
        },
        margin: {
            margin: theme.spacing(0.5),
        },
        textField: {
            width: 225
        }
    }));
    const classes = useStyles();

    const [showMdp, setShowMdp] = useState(false)
    
    const changeShowMdp = () => setShowMdp(!showMdp)

    return (
        <div className={classes.divInputPassword}>
            <FormControl size="small" variant="outlined" className={clsx(classes.margin, classes.textField)}>
                <InputLabel error={error} htmlFor="outlined-adornment-password" required>{label}</InputLabel>
                <OutlinedInput
                   required
                   label={label + "*"}
                   error={error}
                    id="outlined-adornment-password"
                    type={showMdp ? "text" : "password"}
                    value={value}
                    onChange={e => onChange(e)}
                    onKeyPress={e => onKeyPress !== undefined ? onKeyPress(e) : null}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => changeShowMdp()}
                                size="small"
                            >
                                {showMdp ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </div>
    )

}
