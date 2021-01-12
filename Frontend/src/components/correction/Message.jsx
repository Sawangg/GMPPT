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
                <TextField className={classes.messageField} autoFocus multiline rows={4}
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