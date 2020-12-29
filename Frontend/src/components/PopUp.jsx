import React from 'react';
import {Button, Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

export default function PopUp(props) {
  
  return (
    <div>
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: props.pos}}
        open={props.open}
        autoHideDuration={6000}
        onClose={props.handleClose} 
      >
        <MuiAlert onClose={props.handleClose} severity={props.severity} action={
          (props.action !== null) ? <Button color="primary" onClick={() => props.action()}>{props.actionName}</Button> : null}>
          {props.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}