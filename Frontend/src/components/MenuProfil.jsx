import React, {useState} from 'react';
import {Avatar, IconButton, Menu, MenuItem, ListItemIcon,Typography } from '@material-ui/core';
import { Redirect, Link } from "react-router-dom";
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

import { logout } from '../utils/api';

import { useDispatch } from "react-redux";
import { logoutUser } from "../slice/UserSlice";
import { useSelector } from "react-redux";
import { selectUserName } from "../slice/UserSlice"

export default function MenuProfil() {

  const [openLocation, setOpenLocation] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector(selectUserName);

  const deconnexion = () =>{
      logout()
      .then(() => dispatch(logoutUser()))
      .catch(() => dispatch(logoutUser()));
  }

  return (
    <div style={{position : "absolute", right : 30, top : 17.5, display : "flex"}}>
        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={e => setOpenLocation(e.currentTarget)}>
            <Avatar style={{backgroundColor : "#c51150"}}>{user.name.substring(0, 1).toUpperCase()}</Avatar>
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
            <MenuItem onClick={e => deconnexion()}>
            <ListItemIcon>
                <ExitToAppOutlinedIcon />
            </ListItemIcon>
            <Typography variant="inherit">Déconnexion</Typography>
            </MenuItem>
        </Menu>
        {user.isLogin ? null : <Redirect to='/'/>}
    </div>
  );
}