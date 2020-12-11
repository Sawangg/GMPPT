import React from 'react';
import {Button, Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

export default function PopUp(props) {

  return (
    <div>
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        open={props.open}
        autoHideDuration={6000}
        onClose={props.handleClose}
      >
        <MuiAlert onClose={props.handleClose} severity={props.severity} action={
          props.undo ? <Button color="primary" onClick={e => props.undo()}>RETOUR</Button> : null}>
          {props.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}