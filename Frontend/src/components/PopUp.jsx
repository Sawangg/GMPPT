import React from 'react';
import {Button, Snackbar, IconButton, makeStyles} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

//open : dire l'état du pop up (ouvert ou fermé)
//handleclose : actiona  faire lors de la fermeture (fonction)
//actionName : nom de l'action (par exemple undo), si vide, pas d'action
//si actionName, action = action a réaliser (fonction)
//pos : position, si vide, à guauche par default
//message : message a afficher dans la pop up
export default function PopUp({open, handleClose, actionName, severity, pos, action, message, disabled}) {
    const useStyles = makeStyles((theme) => ({
        snackbar: {
            zIndex : 10
        }
    }));
    const classes = useStyles();

    return (
    <div>
      <Snackbar
        className={classes.snackbar}
        anchorOrigin={{vertical: 'bottom', horizontal: pos !== undefined ? pos : "left"}}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose} 
      >
        <Alert onClose={handleClose} severity={severity} 
          action={(actionName !== null) 
              ? <Button disabled={disabled === null ? false : disabled} color="primary" onClick={() => action()}>{actionName}</Button> 
              : <IconButton color="inherit" size="small" onClick={() => handleClose()}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}