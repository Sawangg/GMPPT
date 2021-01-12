import React, {useState} from 'react'

import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, TextField, Button } from '@material-ui/core'


export default function Message(props){

    const handleClose = () =>{
        props.setOpen(false)
    }

    return(
        <Dialog
            open={props.open}
            maxWidth="md"
            fullWidth={true}
            onClose={handleClose}
            rows={4}
            >
            <DialogTitle>
                <Typography variant="h6">Message adressé à </Typography>
            </DialogTitle>
            <DialogContent>
                <TextField autoFocus multiline rows={4} className="messageField"
                variant="outlined" placeholder="Saisissez votre message" />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Annuler
                </Button>
                <Button>
                    Envoyer
                </Button>
            </DialogActions>
        </Dialog>
    )
}