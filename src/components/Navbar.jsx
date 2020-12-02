import React, {useState} from 'react';
import {ListItemIcon, ListItemText, Divider, ListItem, List, Button, SwipeableDrawer, IconButton} from '@material-ui/core';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

export default function SwipeableTemporaryDrawer() {

    const [menu, setMenu] = useState(false);
  
    const list = () => (
      <div style={{padding : "5px 10px"}}>
        <List>
            <ListItem button>
                <ListItemIcon>
                    <PersonOutlineOutlinedIcon/>
                </ListItemIcon>
                <ListItemText primary="Profil" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <HomeOutlinedIcon/>
                </ListItemIcon>
                <ListItemText primary="Accueil" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button>
                <ListItemIcon>
                        <NoteAddOutlinedIcon/>
                    </ListItemIcon>
                <ListItemText primary="Création des sujets" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentOutlinedIcon/>
                </ListItemIcon>
                <ListItemText primary="Gestion des sujets" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button>
                <ListItemIcon>
                    <SchoolOutlinedIcon/>
                </ListItemIcon>
                <ListItemText primary="Gestion des corrections" />
                </ListItem>
        </List>
      </div>
    );
  
    return (
        <div style={{marginBottom : 100}}>
            <IconButton style={{position : "fixed", left : 20, top : 20}} onClick={e => setMenu(true)}><MenuRoundedIcon fontSize="large"/></IconButton>
            <SwipeableDrawer open={menu} onClose={e =>setMenu(false)}>
                {list()}
            </SwipeableDrawer>
        </div>
    );
}