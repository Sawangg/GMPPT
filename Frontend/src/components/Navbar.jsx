import React, { useState } from "react";
import {ListItemIcon, ListItemText, Divider, ListItem, List, SwipeableDrawer, IconButton} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import FunctionsIcon from '@material-ui/icons/Functions';import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';

import { useDispatch } from "react-redux";
import { logoutUser } from "../slice/UserSlice";
import { useSelector } from "react-redux";
import { selectUserName } from "../slice/UserSlice"

import "../styles/Navbar.css";

export default function SwipeableTemporaryDrawer() {

  const user = useSelector(selectUserName);

  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);

  const listeProf = [
    {
      icon : <HomeOutlinedIcon/>,
      nom : "Accueil",
      route : "/prof/home",
      divider : false
    },
    {
      icon : <AccountCircleOutlinedIcon/>,
      nom : "Profil",
      route : "/profil",
      divider : true
    },
    {
      icon : <AssignmentOutlinedIcon/>,
      nom : "Gestion des sujets",
      route : "/prof/gestion-sujets",
      divider : false
    },
    {
      icon : <AllInclusiveIcon/>,
      nom : "Création variables aléatoires",
      route : "/prof/variable-aleatoires",
      divider : false
    },
    {
      icon : <PostAddIcon/>,
      nom : "Création des énoncés",
      route : "/prof/enonces",
      divider : false
    },
    {
      icon : <FunctionsIcon/>,
      nom : "Enregistrement des formules",
      route : "/prof/formules",
      divider : false
    },
    {
      icon : <SystemUpdateAltIcon/>,
      nom : "Import des modèles 3D",
      route : "/prof/modeles3D",
      divider : true
    },
    {
      icon : <SchoolOutlinedIcon/>,
      nom : "Gestion de la correction",
      route : "/prof/gestion-correction",
      divider : true
    },
  ]

  const listeEtudiant = [
    {
      icon : <HomeOutlinedIcon/>,
      nom : "Accueil",
      route : "/etu/home",
      divider : false
    },
    {
      icon : <AccountCircleOutlinedIcon/>,
      nom : "Profil",
      route : "/profil",
      divider : true
    },
    {
      icon : <SchoolOutlinedIcon/>,
      nom : "Répondre aux Questions",
      route : "/etu/repondre-questions",
      divider : true
    }
  ]

  const liste = user.isProf ? listeProf : listeEtudiant;

  const navigation = () => (
    <SwipeableDrawer onOpen={() => setMenu(true)} open={menu} onClose={() => setMenu(false)}>
      <nav id="divNavBar">
        <List>
        {liste.map((item) => (
          <div key={item.nom}>
            <ListItem button component={Link} to={item.route}>
              <ListItemIcon>
                  {item.icon}
              </ListItemIcon>
              <ListItemText>{item.nom}</ListItemText>
            </ListItem>
            {item.divider ? <Divider className="divider"/> : null}
          </div>
        ))}
          <ListItem id="deconnexionNav" button onClick={e => dispatch(logoutUser())}>
            <ListItemIcon>
              <ExitToAppIcon style={{color : "white"}} />
            </ListItemIcon>
            <ListItemText style={{color : "white"}}>Déconnexion</ListItemText>
          </ListItem>
        </List>
      </nav>
    </SwipeableDrawer>
  );

  return (
    <div style={{ marginBottom: 100 }}>
      <IconButton id="burger" onClick={(e) => setMenu(true)}>
        <MenuRoundedIcon fontSize="large" />
      </IconButton>
      {navigation()}
      {user.isLogin ? null : <Redirect to='/'/>}
    </div>
  );
}
