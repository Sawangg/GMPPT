import React, { useEffect, useState } from 'react';
import { TextField, Button, makeStyles, FormControl } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';

import PopUp from '../components/PopUp';
import Particules from '../components/ParticulesBackLogin';
import useConstructor from '../components/use/useContructor';
import InputPassword from '../components/InputPassword';

import { useDispatch, useSelector } from "react-redux";
import { userDetails, loginUser, selectError, setError, selectIsProf, selectIsLogin } from "../slice/UserSlice";

export default function Login() {

    const useStyles = makeStyles((theme) => ({
        divLogin: {
            display: "flex",
            flexDirection: "column",
            height: "120px",
            margin: "30px auto"
        },
        backgroundLogin: {
            display: "block",
            margin: "10% auto 0 auto",
            border: "solid  2px",
            borderColor: theme.palette.primary.main,
            borderRadius: "2%",
            padding: "2% 3%",
            backgroundColor: "rgba(255,255,255,0.6)",
            zIndex: 2
        },
        buttonConnexion: {
            display: "block",
            margin: "20px auto 10px auto",
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
                backgroundColor: theme.palette.primary.dark,
            },
            border: "none",
            color: "white"
        },
        fieldLogin: {
            display: "flex",
            marginTop: "20px",
        },
        textField: {
            width: 225,
        },
        iconLogin: {
            marginRight: "29px",
            marginTop: "8px"
        },
        iconPwd: {
            marginRight: "25px",
            marginTop: "10px"
        }
    }));

    const classes = useStyles();

    const dispatch = useDispatch();
    const error = useSelector(selectError);
    const isProf = useSelector(selectIsProf);
    const isLogin = useSelector(selectIsLogin);

    const [openPopUp, setOpenPopUp] = useState(false);
    const [loginConnect, setLoginConnect] = useState({ user: "", pwd: "" });

    useConstructor(() => {
        dispatch(userDetails())
    });

    useEffect(() => {
        if (error) setOpenPopUp(true)
    }, [error]);

    const connexionRedirection = () => {
        return isLogin ? (isProf ? <Redirect push to='/prof/home' /> : <Redirect push to='/etu/home' />) : null;
    }

    const onChangeUserName = (e) => {
        dispatch(setError(false));
        setLoginConnect({ user: e.target.value, pwd: loginConnect.pwd });
    }

    const onChangePassword = (e) => {
        dispatch(setError(false));
        setLoginConnect({ user: loginConnect.user, pwd: e.target.value });
    }

    const connectClick = () => {
        dispatch(loginUser({ name: loginConnect.user, password: loginConnect.pwd }));
    }

    return (
        (isLogin === undefined)
            ? null
            : <div className={classes.divLogin}>
                <Particules />
                <div className={classes.backgroundLogin}>
                    <div className={classes.fieldLogin}>
                        <AccountCircleOutlinedIcon className={classes.iconLogin} />
                        <FormControl size="small" variant="outlined">
                            <TextField id="outlined-login" className={classes.textField} autoFocus size="small" variant="outlined" required error={error}
                                value={loginConnect.user}
                                label="Login"
                                onChange={e => onChangeUserName(e)}
                                onKeyPress={(e) => { if (e.code === "Enter") connectClick() }}
                            />
                        </FormControl>
                    </div>
                    <div className={classes.fieldLogin}>
                        <VpnKeyOutlinedIcon className={classes.iconPwd} />
                        <InputPassword label={"Mot de passe"} error={error}
                            onKeyPress={e => { if (e.code === "Enter") connectClick() }}
                            value={loginConnect.pwd}
                            onChange={e => onChangePassword(e)}
                        />
                    </div>
                    <Button type="submit" className={classes.buttonConnexion} variant="outlined" onClick={() => connectClick()}>Connexion</Button>
                    <PopUp severity="error" message="Identification invalide" open={openPopUp} handleClose={() => setOpenPopUp(false)} />
                </div>
                {connexionRedirection()}
            </div>
    );
}