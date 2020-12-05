import React, { useState } from "react";
import {ListItemIcon, ListItemText, Divider, ListItem, List, SwipeableDrawer, IconButton} from "@material-ui/core";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import { Link } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import "../styles/Navbar.css";

export default function SwipeableTemporaryDrawer() {
  const [menu, setMenu] = useState(false);

  const list = () => (
    <nav id="divNavBar">
      <List>

        <Link className="lienNavBar" to="/">
          <ListItem button>
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Accueil</ListItemText>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link className="lienNavBar" to="/creation-sujets">
          <ListItem button>
            <ListItemIcon>
              <NoteAddOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Création des sujets</ListItemText>
          </ListItem>
        </Link>

        <Link className="lienNavBar" to="/gestion-sujets">
          <ListItem button>
            <ListItemIcon>
              <AssignmentOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Gestion des sujets</ListItemText>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link className="lienNavBar" to="/gestion-correction">
          <ListItem button>
            <ListItemIcon>
              <SchoolOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Gestion de la correction</ListItemText>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link className="lienNavBar" to="/login">
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText>Déconnexion</ListItemText>
          </ListItem>
        </Link>
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
