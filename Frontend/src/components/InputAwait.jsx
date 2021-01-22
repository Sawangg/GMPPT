import React, {useRef, useState} from 'react';
import { TextField } from '@material-ui/core';
import _ from "lodash";

export default function DebounceInput({label, typeNumber, onChange, delay, value, style, rows}) {
  
    const [userdata, setUserdata] = useState(value);

    const sendData = (data) => onChange(data);

    const delayeddata = useRef(_.debounce(e => sendData(e), delay)).current;

    const onChangeIn = e => {
      setUserdata(e.target.value);
      delayeddata(e.target.value);
    };

    return (
      <TextField 
          style={style}
          multiline 
          rows={rows}
          variant="outlined" 
          size="small" 
          label={label} 
          onChange={(e) =>{
            if (typeNumber === undefined || typeNumber === false){
              onChangeIn(e);
            } else {
              if (!isNaN(e.target.value) || e.target.value === '-') onChangeIn(e);
            }
          }} 
          value={userdata}
        />
    );

  }