import React, {useState} from 'react';
import {Avatar, IconButton, Menu, MenuItem, ListItemIcon,Typography } from '@material-ui/core';
import { Redirect, Link } from "react-router-dom";
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';

import useConstructor from './use/useContructor';
import SelectionModele from './SelectionModele'

import { useDispatch } from "react-redux";
import { logoutUser } from "../slice/UserSlice";
import { useSelector } from "react-redux";
import { selectUserName, getUserImage } from "../slice/UserSlice"

export default function MenuProfil() {

  const [openLocation, setOpenLocation] = useState(null);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(selectUserName);
  
  useConstructor(() => {
        let myStorage = window.localStorage;
        if (user.name !== "" && user.image === undefined && myStorage.getItem('image') === null) dispatch(getUserImage(user.name))
    });

  return (
    <div style={{position : "absolute", right : 30, top : 17.5, display : "flex", zIndex : 10}}>
        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={e => setOpenLocation(e.currentTarget)}>
            {user.image === undefined
                ?<Avatar style={{backgroundColor : "#c51150"}}>{user.name.substring(0, 1).toUpperCase()}</Avatar>
                :<Avatar src={user.image}/>
            }
        </IconButton>
        <Menu
            transformOrigin={{ vertical: "bottom", horizontal: "center" }}
            disableScrollLock={true}
            id="simple-menu"
            anchorEl={openLocation}
            keepMounted
            open={Boolean(openLocation)}
            onClose={e => setOpenLocation(null)}
        >
            <MenuItem component={Link} to='/profil' onClick={e => setOpenLocation(null)}>
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
        <SelectionModele tard={true} setClose={() => setOpen(false)} open={open}/>
        {user.isLogin ? null : <Redirect to='/'/>}
    </div>
  );
}