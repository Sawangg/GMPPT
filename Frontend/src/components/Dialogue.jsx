import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle, Button} from '@material-ui/core';

export default function Dialogue(props){

    return (
    <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>{props.titre}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">Annuler</Button>
          <Button onClick={e => {props.ok(); props.handleClose()}} color="primary" autoFocus>OK</Button>
        </DialogActions>
    </Dialog>
    )

}