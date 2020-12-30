import React from 'react';

import {Dialog, ListItemText, ListItem, List, Divider, AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

export default function ConsulterEtudiant(props) {

    return(
        <Dialog fullScreen open={props.open} >
            <AppBar className="appBar">
                <Toolbar>
                    <IconButton onClick={props.handleClose} edge="start" color="inherit" aria-label="close">
                    <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" >
                    Etudiant : 
                    </Typography>
                </Toolbar>
            </AppBar>
            <List>
                <ListItem button>
                    <ListItemText primary="Essai du 10/02/2020" secondary="Questions justes : 2/3" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText primary="Essai du 08/02/2020" secondary="Questions justes : 0/3" />
                </ListItem>
            </List>
        </Dialog>
    )

}