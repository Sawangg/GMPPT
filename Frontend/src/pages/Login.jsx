import React, {useState} from 'react'
import { TextField, Button } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';

import PopUp from '../components/PopUp'
import Particules from '../components/ParticulesBackLogin'
import useConstructor from '../components/useContructor'
import InputPassword from '../components/InputPassword'

import { login, getUserDetails } from '../utils/api.js';

import { useDispatch } from "react-redux";
import { logoutUser, loginUser, changeUserName, changePassword } from "../slice/UserSlice";
import { useSelector } from "react-redux";
import { selectUserName } from "../slice/UserSlice"

import '../styles/Login.css'

export default function Login(){

    const dispatch = useDispatch();
    const user = useSelector(selectUserName);

    const [error, setError] = useState(false);
    const [openPopUp, setOpenPopUp] = useState(false);

    useConstructor(() => {
        getUserDetails()
        .then((data) => dispatch(loginUser(data.data.isProf)))
        .catch(() => dispatch(logoutUser()));
      });

    const connexion = () => {
        login(user.name, user.password)
        .then(() => 
            getUserDetails()
            .then((data) => dispatch(loginUser(data.data.isProf))
            .catch(() => {
                dispatch(logoutUser());
                setOpenPopUp(true);
                setError(true);
            })
            )
        )
        .catch(() => {
            dispatch(logoutUser());
            setError(true);
            setOpenPopUp(true);
        })
    } 

    const connexionRedirection = () =>{
        if (user.isLogin){
            return user.isProf ? <Redirect push to='/prof/home'/> : <Redirect push to='/etu/home'/>
        }
        else {
            return null;
        }
    }

    const onChangeUserName = (e) =>{
        setError(false)
        dispatch(changeUserName(e.target.value))
    }

    const onChangePassword = (e) =>{
        setError(false)
        dispatch(changePassword(e.target.value))
    }

    const displayLogin = () =>{
        return (
            <div id="divLogin">
                <Particules/>
                <div id="backgroundLogin">
                        <div className="fieldLogin">
                            <AccountCircleOutlinedIcon className="iconLogin"/>
                            <TextField error={error} autoFocus size="small" label="Login" variant="outlined" required 
                                value={user.name} 
                                onChange={e => onChangeUserName(e)}
                            />
                        </div>
                        <div className="fieldLogin">
                            <VpnKeyOutlinedIcon className="iconLogin"/>
                            <InputPassword error={error} value={user.password} onChange={e => onChangePassword(e)}/>
                        </div>
                    <Button id="buttonConnexion" variant="outlined" onClick={e => connexion()}>Connexion</Button>
                    <PopUp severity="error" message="Identification invalide" open={openPopUp} handleClose={e => setOpenPopUp(false)}/>
                </div>
            </div>
        )
    }

    return (
        (user.isLogin === undefined) ? null : 
            <>
                {displayLogin()}
                {connexionRedirection()}
            </>
    )
}