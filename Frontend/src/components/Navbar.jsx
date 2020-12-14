import React, { useState } from "react";
import {ListItemIcon, ListItemText, Divider, ListItem, List, SwipeableDrawer, IconButton} from "@material-ui/core";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { logout } from '../utils/api';

import "../styles/Navbar.css";

export default function SwipeableTemporaryDrawer() {
  const [menu, setMenu] = useState(false);

  const list = () => (
    <nav id="divNavBar">
      <List>
          <ListItem button component={Link} to="/prof/home">
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Accueil</ListItemText>
          </ListItem>
          <ListItem button component={Link} to="/prof/profil">
            <ListItemIcon>
              <AccountCircleOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Profil</ListItemText>
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem button component={Link} to="/prof/creation-sujets">
            <ListItemIcon>
              <NoteAddOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Création des sujets</ListItemText>
          </ListItem>

          <ListItem button component={Link} to="/prof/gestion-sujets">
            <ListItemIcon>
              <AssignmentOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Gestion des sujets</ListItemText>
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem button component={Link} to="/prof/gestion-correction">
            <ListItemIcon>
              <SchoolOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Gestion de la correction</ListItemText>
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem style={{backgroundColor : "rgb(197, 17, 80, 0.9)", borderRadius : 3, color : "white"}} button 
          component={Link} to='/'
          onClick={e => logout()}
            >
            <ListItemIcon>
              <ExitToAppIcon style={{color : "white"}} />
            </ListItemIcon>
            <ListItemText>Déconnexion</ListItemText>
          </ListItem>
      </List>
    </nav>
  );

  return (
    <div style={{ marginBottom: 100 }}>
      <IconButton id="burger" onClick={(e) => setMenu(true)}>
        <MenuRoundedIcon fontSize="large" />
      </IconButton>
      <SwipeableDrawer onOpen={(e) => setMenu(true)} open={menu} onClose={(e) => setMenu(false)}>
        {list()}
      </SwipeableDrawer>
    </div>
  );
}
