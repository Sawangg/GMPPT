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

export default function InputPwd(props){

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
                <InputLabel error={props.error} htmlFor="outlined-adornment-password" required>{props.label}</InputLabel>
                <OutlinedInput
                   required
                   label={props.label + "*"}
                   error={props.error}
                    id="outlined-adornment-password"
                    type={showMdp ? "text" : "password"}
                    value={props.values}
                    onChange={e => props.onChange(e)}
                    onKeyPress={e => props.onKeyPress !== undefined ? props.onKeyPress(e) : null}
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
