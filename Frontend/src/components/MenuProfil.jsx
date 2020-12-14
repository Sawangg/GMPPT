import React, {useState} from 'react';
import {Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Redirect, Link } from "react-router-dom";

import { logout } from '../utils/api';

export default function MenuProfil(props) {

  const [openLocation, setOpenLocation] = useState(null);
  const [deco, setDeco] = useState(false);

  const deconnexion = () =>{
      logout()
      .then(() => setDeco(true))
      .catch(() => setDeco(false));
  }

  return (
    <div style={{position : "absolute", right : 30, top : 17.5, display : "flex"}}>
        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={e => setOpenLocation(e.currentTarget)}>
            <Avatar style={{backgroundColor : "#c51150"}}>{props.info.pseudo.substring(0, 1).toUpperCase()}</Avatar>
        </IconButton>
        <Menu
            id="simple-menu"
            anchorEl={openLocation}
            keepMounted
            open={Boolean(openLocation)}
            onClose={e => setOpenLocation(null)}
        >
            <Link className="linkNone" to='/prof/profil'><MenuItem onClick={e => setOpenLocation(null)}>Profil</MenuItem></Link>
            <MenuItem onClick={e => deconnexion()}>Déconnexion</MenuItem>
        </Menu>
        {deco ? <Redirect to='/'/> : null}
    </div>
  );
}