import React, {useState} from 'react'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    makeStyles,
    OutlinedInput,
    TextField
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
            width: "max-content",
            maxWidth: "200px"
        }
    }));
    const classes = useStyles();

    const [showMdp, setShowMdp] = useState(false)
    
    const changeShowMdp = () => setShowMdp(!showMdp)

    return (
        <div className={classes.divInputPassword}>
            <FormControl size="small" variant="outlined" className={clsx(classes.margin, classes.textField)}>
                <InputLabel style={{fontSize: "1em"}} htmlFor="outlined-adornment-password">{props.label}*</InputLabel>
                <OutlinedInput className={classes.input}
                   label={props.label}
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
