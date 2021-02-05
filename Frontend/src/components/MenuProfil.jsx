import React, {useState} from 'react';
import {Avatar, IconButton, Menu, MenuItem, ListItemIcon, Typography, makeStyles, Tooltip} from '@material-ui/core';
import { Redirect, Link } from "react-router-dom";
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';

import useConstructor from './use/useContructor';
import SelectionModele from './SelectionModele'

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUserName, getUserImage, logoutUser } from "../slice/UserSlice"
import { selectModeleActuel, selectActualise, getModele } from '../slice/ModeleSlice';
import { getAllPromo, selectEnregistrePromo } from '../slice/PromoSlice';

export default function MenuProfil() {
    const useStyles = makeStyles((theme) => ({
        divMenuProfil: {
            position : "absolute",
            right : 30,
            top : 17.5,
            display : "flex",
            zIndex : 10
        },
        avatar: {
            backgroundColor : theme.palette.error.main
        }
    }));
    const classes = useStyles();

  //permet de placer le menu de profil correctement sur la page
  const [openLocation, setOpenLocation] = useState(null);
  //gerer ouverture/fermeture du modele
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUserName);
  const actualiseModele = useSelector(selectActualise);
  const modele = useSelector(selectModeleActuel);
  const isEnregistrePromo = useSelector(selectEnregistrePromo);
  
  useConstructor(() => {
        //gerer le stockage local
        let myStorage = window.localStorage;
        //si le nom de l'utilisateur est vide et que l'image est vide et que le stockage local de l'image est vide 
        if (user.name !== "" && user.image === undefined && myStorage.getItem(user.name) === null) dispatch(getUserImage(user.name));

        //recupere les modeles
        if (!actualiseModele && user.isProf) dispatch(getModele())

        //recupère les promo
        if (!isEnregistrePromo) dispatch(getAllPromo());
    });

  return (
    <div className={classes.divMenuProfil}>
        <Tooltip disableHoverListener={modele === undefined ? true : false} title={modele === undefined || !user.isProf ? "" : modele.nom}>
        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={e => setOpenLocation(e.currentTarget)}>
                {user.image === undefined
                    ?<Avatar className={classes.avatar}>{user.name.substring(0, 1).toUpperCase()}</Avatar>
                    :<Avatar src={user.image}/>
                }
            </IconButton>
        </Tooltip>
        <Menu
            transformOrigin={{ vertical: "bottom", horizontal: "center" }}
            disableScrollLock={true}
            id="simple-menu"
            anchorEl={openLocation}
            keepMounted
            open={Boolean(openLocation)}
            onClose={() => setOpenLocation(null)}
        >
            <MenuItem component={Link} to='/profil' onClick={() => setOpenLocation(null)}>
            <ListItemIcon>
                <AccountBoxOutlinedIcon />
            </ListItemIcon>
            <Typography variant="inherit">Profil</Typography>
            </MenuItem>
            {user.isProf 
            ?<MenuItem onClick={e => setOpen(true)}>
            <ListItemIcon>
                <AppsOutlinedIcon/>
            </ListItemIcon>
            <Typography variant="inherit">Modèle</Typography>
            </MenuItem> 
            : null}
            <MenuItem onClick={e => dispatch(logoutUser())}>
            <ListItemIcon>
                <ExitToAppOutlinedIcon />
            </ListItemIcon>
            <Typography variant="inherit">Déconnexion</Typography>
            </MenuItem>
        </Menu>
        {user.isProf ? <SelectionModele tard={true} setClose={() => setOpen(false)} open={open}/> : null}
        {user.isLogin ? null : <Redirect to='/'/>}
    </div>
  );
}