import React from 'react';
import {Button, Snackbar, IconButton} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

export default function PopUp(props) {
    
  return (
    <div>
      <Snackbar
        style={{zIndex : 10}}
        anchorOrigin={{vertical: 'bottom', horizontal: props.pos}}
        open={props.open}
        autoHideDuration={6000}
        onClose={props.handleClose} 
      >
        <Alert onClose={props.handleClose} severity={props.severity} 
          action={(props.actionName !== null) 
              ? <Button color="primary" onClick={() => props.action()}>{props.actionName}</Button> 
              : <IconButton color="inherit" size="small" onClick={() => props.handleClose()}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}