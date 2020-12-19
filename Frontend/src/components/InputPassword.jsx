import React, {useState} from 'react'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {IconButton, TextField} from '@material-ui/core'

export default function InputPwd(props){

    const [showMdp, setShowMdp] = useState(false)
    
    const changeShowMdp = () => setShowMdp(!showMdp)

    return (
        <div>
            <TextField 
                error={props.error} 
                label={props.label}
                size="small" 
                required 
                variant="outlined" 
                type={showMdp ? "text" : "password"}
                value={props.value}
                onChange={e => props.onChange(e)}
            />
            <IconButton onClick={e => changeShowMdp()}>{showMdp ? <Visibility /> : <VisibilityOff />}</IconButton>
        </div>
    )

}
