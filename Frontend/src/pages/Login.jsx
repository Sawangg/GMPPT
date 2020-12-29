import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';

import PopUp from '../components/PopUp';
import Particules from '../components/ParticulesBackLogin';
import useConstructor from '../components/use/useContructor';
import InputPassword from '../components/InputPassword';

import { useDispatch } from "react-redux";
import { userDetails, changeUserName, changePassword, loginUser, selectError, setError } from "../slice/UserSlice";
import { useSelector } from "react-redux";
import { selectUserName } from "../slice/UserSlice";

import '../styles/Login.css';

export default function Login(){

    const dispatch = useDispatch();
    const user = useSelector(selectUserName);
    const error = useSelector(selectError);

    const [openPopUp, setOpenPopUp] = useState(false);

    useConstructor(() => {
        dispatch(userDetails())
    });

    useEffect(() => {
        if (error) setOpenPopUp(true)
    }, [error])

    const connexionRedirection = () => {
        if (user.isLogin){
            return user.isProf ? <Redirect push to='/prof/home'/> : <Redirect push to='/etu/home'/>
        } 
        return null;
    }

    const onChangeUserName = (e) => {
        dispatch(setError(false));
        dispatch(changeUserName(e.target.value));
    }

    const onChangePassword = (e) => {
        dispatch(setError(false));
        dispatch(changePassword(e.target.value));
    }

    return (
        (user.isLogin === undefined) ? null : 
            <div id="divLogin">
                <Particules/>
                <div id="backgroundLogin">
                        <div className="fieldLogin">
                            <AccountCircleOutlinedIcon className="iconLogin"/>
                            <TextField autoFocus size="small" label="Login" variant="outlined" required error={error}
                                value={user.name} 
                                onChange={e => onChangeUserName(e)}
                                onKeyPress={(e)=>{if (e.code === "Enter")  dispatch(loginUser({name : user.name, password : user.password}))}}
                            />
                        </div>
                        <div className="fieldLogin">
                            <VpnKeyOutlinedIcon className="iconLogin"/>
                            <InputPassword label={"Mot de passe"} error={error} 
                                onKeyPress={e => {if (e.code === "Enter")  dispatch(loginUser({name : user.name, password : user.password}))}}  
                                value={user.password} 
                                onChange={e => onChangePassword(e)}
                            />
                        </div>
                    <Button type="submit" id="buttonConnexion" variant="outlined" onClick={() =>  dispatch(loginUser({name : user.name, password : user.password}))}>Connexion</Button>
                    <PopUp severity="error" message="Identification invalide" open={openPopUp} handleClose={e => setOpenPopUp(false)}/>
                </div>
                {connexionRedirection()}
            </div>
    );
}