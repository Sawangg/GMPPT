import React, {useState} from 'react'
import {TextField, Button, makeStyles} from '@material-ui/core';

import DropFile from '../../components/DropFile'

import {addArchiAPI} from '../../utils/api'

import '../../styles/ImportModele3D.css'

export default function Accueil(props) {

    const useStyles = makeStyles((theme) => ({
        divImportModele: {
            width : "70%",
            margin : "auto"
        },
        divDropModele: {
            display: "flex"
        },
        divNumSujet: {
            display : "flex",
            justifyContent : "center",
            marginTop : "3%"
        },
        button: {
            marginLeft : 20,
            backgroundColor: theme.palette.primary.main,
            color: "white",
                "&:disabled": {
                    backgroundColor: theme.palette.secondary.main
                },
                "&:hover": {
                    backgroundColor: theme.palette.primary.dark
                }
        }
    }));
    const classes = useStyles();

    const [sujet, setSujet] = useState("")
    const [image1, setImage1] = useState("")
    const [image2, setImage2] = useState("")

    const onChange = (e) =>{
        const reg = '^[0-9]+$|^$';
        if (e.target.value.match(reg)) setSujet(e.target.value);
    }

    const envoie = () =>{
        const data = new FormData();
        data.append('image1', image1);
        data.append('image2', image2);

        addArchiAPI({sujet : sujet, images : data})
        .then(() => console.log("ok"))
        .catch(() => console.log("nop"));
    }

    return (
        <div className={classes.divImportModele}>
            <div className={classes.divDropModele}>
                <DropFile typeFile='image/*' compressImage={false} changeFile={e => setImage1(e)}  message="Importer la PREMIERE image du modèle 3D"/>
                <DropFile typeFile='image/*' compressImage={true} changeFile={e => setImage2(e)}  message="Importer la SECONDE image du modèle 3D"/>
            </div>
            <div className={classes.divNumSujet}>
                <TextField autoFocus size="small" label="Numéro du sujet" variant="outlined" required value={sujet} onChange={e => onChange(e)}/>
                <Button className={classes.button} disabled={image1 === "" || image2 === "" || sujet === ""} variant="outlined" onClick={e => envoie()}>Envoyer</Button>
            </div>
        </div>
    );
}