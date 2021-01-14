import React, {useState} from 'react'
import {TextField, Button, makeStyles, Typography} from '@material-ui/core';

import DropFile from '../../components/DropFile'

import {addModele3DAPI, addArchiAPI} from '../../utils/api'

import '../../styles/ImportModele3D.css'

export default function Architecture() {

    const useStyles = makeStyles((theme) => ({
        divImportModele: {
            boxShadow : "0px 8px 20px -5px rgba(0,0,0,0.69)",
            width : "80%",
            margin : "auto",
            padding : "1% 2% 2% 2%"
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

    const [sujet, setSujet] = useState("");
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [excel, setExcel] = useState("");

    const onChange = (e) =>{
        if (!isNaN(e.target.value)) setSujet(e.target.value);
    }

    const envoieModele3D = () =>{
        const data = new FormData();
        data.append('image1', image1);
        data.append('image2', image2);

        addModele3DAPI({sujet : sujet, images : data})
        .then(() => console.log("ok"))
        .catch(() => console.log("nop"));
    }

    const envoieArchi = () => {
        const data = new FormData();
        data.append('excel', excel);

        addArchiAPI(data)
        .then(() => console.log("ok"))
        .catch(() => console.log("nop"));
    }

    return (
        <div className={classes.archi}>
            <Typography variant="h1">Architecture</Typography>
            <div className={classes.divImportModele}>
                <div className={classes.divDropModele} id="divDropModele">
                    <DropFile typeFile='image/*' compressImage={false} changeFile={e => setImage1(e)}  message="Importer la PREMIERE image du modèle 3D"/>
                    <DropFile typeFile='image/*' compressImage={true} changeFile={e => setImage2(e)}  message="Importer la SECONDE image du modèle 3D"/>
                </div>
                <div className={classes.divNumSujet}>
                    <TextField autoFocus size="small" label="Numéro du sujet" variant="outlined" required value={sujet} onChange={e => onChange(e)}/>
                    <Button className={classes.button} disabled={image1 === "" || image2 === "" || sujet === ""} variant="outlined" onClick={() => envoieModele3D()}>Enregistrer</Button>
                </div>
            </div>
            <div>
                <DropFile typeFile='.xlsx' compressImage={false} changeFile={e => setExcel(e)}  message="Charger la liste des architectures"/>
                <Button disabled={excel === ""} variant="outlined" style={{display : "block", margin : "20px auto"}} onClick={() => envoieArchi()}>Enregistrer</Button>
            </div>
        </div>
    );
}