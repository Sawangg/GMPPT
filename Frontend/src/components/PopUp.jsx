import React from 'react';
import {Button, Snackbar, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default function SimpleSnackbar(props) {

  return (
    <div>
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        open={props.open}
        autoHideDuration={6000}
        TransitionComponent={"SlideTransition"}
        onClose={props.handleClose}
        message="Vous venez de supprimer une formule"
        action={
          <>
            <Button color="secondary" size="small" onClick={e => props.undo()}>UNDO</Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={e => props.handleClose()}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </div>
  );
}