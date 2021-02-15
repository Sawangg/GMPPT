import React from 'react'

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    TextField,
    Button,
    makeStyles
} from '@material-ui/core'

export default function Message(props){
  
  const useStyles = makeStyles((theme) => ({
        messageField: {
            width: "100%"
        }
    }));
    const classes = useStyles();

    //s'occupe du changement du message
    const handleChangeMessage = (event) =>{
        props.handleChangeMessage(event.target.value)
    }

    //ferme le dialog
    const handleClose = () =>{
        props.setOpen(false)
    }

    //envoie le message
    const handleSend = () =>{
        props.handleSend()
        handleClose()
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
                <Typography variant="h6">Message adressé à {props.destinataire}</Typography>
            </DialogTitle>
            <DialogContent>
                <TextField className={classes.messageField} autoFocus multiline rows={4}
                variant="outlined" placeholder="Saisissez votre message"
                onChange={e => handleChangeMessage(e)} value={props.message} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Annuler
                </Button>
                <Button onClick={handleSend}>
                    Envoyer
                </Button>
            </DialogActions>
        </Dialog>
    )
}