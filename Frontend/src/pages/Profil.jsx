import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import InputPassword from '../components/InputPassword';
import PopUp from '../components/PopUp';

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUserName, changePassword } from "../slice/UserSlice";
import { changePwd } from '../utils/api.js';


export default function Profile(){

    const user = useSelector(selectUserName);
    const dispatch = useDispatch();

    const [error, setError] = useState(false);
    const [openPopUp, setOpenPopUp] = useState(false);
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();

    const changePasswordAPI = () => {
        if(oldPassword === user.password) {
            changePwd(user.name, newPassword)
            .then(() => {
                setError(false);
                dispatch(changePassword(newPassword));
                setOpenPopUp(true);
            }).catch(() => {
                setError(true);
            });
        } else {
            setError(true);
        }
    }

    const updateOldPwd = (e) => {
        setError(false);
        setOldPassword(e.target.value)
    }
    
    const updateNewPwd = (e) => {
        setError(false);
        setNewPassword(e.target.value)
    }
    
    return (
        <>
            <Card className="center" style={{width : "35%"}}>
                <CardActions className="center">
                    <CardMedia
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                    />
                <CardContent>
                    <Typography align="center" gutterBottom variant="h5" component="h2">{user.name}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">Status : {user.isProf ? "professeur" : "étudiant"}</Typography>
                </CardContent>
                </CardActions>
                <CardActions>
                    <InputPassword label={"Mot de passe actuel"} error={error} onChange={e => updateOldPwd(e)}/>
                </CardActions>
                <CardActions>
                    <InputPassword label={"Nouveau mot de passe"} error={error} onChange={e => updateNewPwd(e)}/>
                </CardActions>
                <CardActions>
                    <Button size="small" color="primary" onClick={e => changePasswordAPI()}>Changer de mot de passe</Button>
                </CardActions>
            </Card>
            <PopUp severity="success" message="Changement de mot de passe réussi" open={openPopUp} handleClose={e => setOpenPopUp(false)}/>
        </>
    );

}