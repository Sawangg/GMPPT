import React, {useState} from 'react'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {IconButton, makeStyles, TextField} from '@material-ui/core'

export default function InputPwd(props){

    const useStyles = makeStyles((theme) => ({
        divInputPassword: {
            margin : "auto"
        },

    }));
    const classes = useStyles();

    const [showMdp, setShowMdp] = useState(false)
    
    const changeShowMdp = () => setShowMdp(!showMdp)

    return (
        <div className={classes.divInputPassword}>
            <TextField 
                error={props.error} 
                label={props.label}
                size="small" 
                required 
                variant="outlined" 
                type={showMdp ? "text" : "password"}
                value={props.value}
                onChange={e => props.onChange(e)}
                onKeyPress={e => props.onKeyPress !== undefined ? props.onKeyPress(e) : null}
            />
            <IconButton onClick={e => changeShowMdp()}>{showMdp ? <Visibility /> : <VisibilityOff />}</IconButton>
        </div>
    )

}
