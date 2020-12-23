import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';

import InputPassword from '../components/InputPassword';
import PopUp from '../components/PopUp';
import DropFile from '../components/DropFile'

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUserName, changePassword, setUserImage, getUserImage } from "../slice/UserSlice";

import { setPwdUser } from '../utils/api.js';

export default function Profile() {

    const user = useSelector(selectUserName);
    const dispatch = useDispatch();

    const [openPopUp, setOpenPopUp] = useState(false);
    const [password, setPassword] = useState({oldPassword : "", newPassword  :"", error : false});
    const [image, setImage] = useState("")

    const changePasswordAPI = () => {
        if(password.oldPassword === user.password) {
            setPwdUser(user.name, password.newPassword)
            .then(() => {
                dispatch(changePassword(password.newPassword));
                setOpenPopUp(true);
            }).catch(() => {
                setPassword({oldPassword : password.oldPassword, newPassword : password.newPassword, error : true})
            });
        } else {
            setPassword({oldPassword : password.oldPassword, newPassword : password.newPassword, error : true})
        }
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
                <CardActions style={{display : "flex", flexDirection :"column"}}>
                    <DropFile changeModele={e => setImage(e)}  message="Importer une image de profil (moins de 1Mo)"/>
                    <Button onClick={() => {
                        dispatch(setUserImage({name : user.name, image : image}));
                        dispatch(getUserImage(user.name));
                    }}>Enregistrer l'image</Button>
                </CardActions>
                <CardActions>
                    <InputPassword label={"Mot de passe actuel"} error={password.error} 
                        onChange={e =>  setPassword({oldPassword : e.target.value, newPassword : password.newPassword, error : false})}
                    />
                    <InputPassword label={"Nouveau mot de passe"} error={password.error} 
                        onChange={e => setPassword({oldPassword : password.oldPassword, newPassword : e.target.value, error : false})}
                    />
                </CardActions>
                <CardActions>
                    <Button size="small" color="primary" onClick={e => changePasswordAPI()}>Changer de mot de passe</Button>
                </CardActions>
            </Card>
            <PopUp severity="success" message="Changement de mot de passe réussi" open={openPopUp} handleClose={e => setOpenPopUp(false)}/>
        </>
    );
}