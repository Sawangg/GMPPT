import React, { useState } from "react";
import {
  ListItemIcon,
  ListItemText,
  Divider,
  ListItem,
  List,
  SwipeableDrawer,
  IconButton,
  makeStyles
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import FunctionsIcon from '@material-ui/icons/Functions';
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import SchoolIcon from '@material-ui/icons/School';

import { useDispatch } from "react-redux";
import { logoutUser } from "../slice/UserSlice";
import { useSelector } from "react-redux";
import { selectUserName } from "../slice/UserSlice"

export default function NavBar() {

  const useStyles = makeStyles((theme) => ({
    divNavigation: {
      padding : "5px 10px",
      zIndex: 99
    },
    divider: {
      margin : "3% 0"
    },
    deconnexionNav: {
      backgroundColor : theme.palette.error.main,
      "&:hover": {
        backgroundColor : theme.palette.error.dark,
      },
      borderRadius : "3px",
    },
    deconnexionText: {
      color: "white"
    },
    deconnexionIcon: {
      color: "white"
    },
    divNavBar: {
      marginBottom: 100
    },
    burger: {
      position : "fixed",
      left : "20px",
      top : "20px",
      zIndex: 10
    }
  }));
  const classes = useStyles();

  const user = useSelector(selectUserName);

  const dispatch = useDispatch();

  //gerer ouverture/fermeture du burger
  const [menu, setMenu] = useState(false);

  //gerer la liste des pages affichées pour le prof
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
      icon : <SchoolIcon/>,
      nom : "Promotion",
      route : "/prof/promo",
      divider : false
    },
    {
      icon : <AllInclusiveIcon/>,
      nom : "Création variables aléatoires",
      route : "/prof/variable-aleatoires",
      divider : false
    },
    {
      icon : <FunctionsIcon/>,
      nom : "Enregistrement des formules",
      route : "/prof/formules",
      divider : false
    },
    {
      icon : <PostAddIcon/>,
      nom : "Création des énoncés",
      route : "/prof/enonces",
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

  //gerer la liste des pages affichées pour les étudiants
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

  //selectionne la bonne liste de pages
  const liste = user.isProf ? listeProf : listeEtudiant;

  const navigation = () => (
    <SwipeableDrawer onOpen={() => setMenu(true)} open={menu} onClose={() => setMenu(false)}>
      <nav className={classes.divNavigation}>
        <List>
        {liste.map((item) => (
          <div key={item.nom}>
            <ListItem button component={Link} to={item.route}>
              <ListItemIcon>
                  {item.icon}
              </ListItemIcon>
              <ListItemText>{item.nom}</ListItemText>
            </ListItem>
            {item.divider ? <Divider className={classes.divider}/> : null}
          </div>
        ))}
          <ListItem className={classes.deconnexionNav} button onClick={e => dispatch(logoutUser())}>
            <ListItemIcon>
              <ExitToAppIcon className={classes.deconnexionIcon}/>
            </ListItemIcon>
            <ListItemText className={classes.deconnexionText}>Déconnexion</ListItemText>
          </ListItem>
        </List>
      </nav>
    </SwipeableDrawer>
  );

  return (
    <div className={classes.divNavBar}>
      <IconButton className={classes.burger} onClick={(e) => setMenu(true)}>
        <MenuRoundedIcon fontSize="large" />
      </IconButton>
      {navigation()}
      {user.isLogin ? null : <Redirect to='/'/>}
    </div>
  );
}
