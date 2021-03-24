import React, { useState } from 'react';
import { TextField, Button, makeStyles, Typography } from '@material-ui/core';

import DropFile from '../../components/DropFile';

import { addModele3DAPI, addArchiAPI, getVariablesArchiAPI } from '../../utils/api';
import PopUp from '../../components/PopUp';

export default function Architecture() {

    const useStyles = makeStyles((theme) => ({
        root: {
            paddingBottom: "2%",
        },
        hr: {
            width: "80%",
            marginBottom: "2%"
        },
        divImportModele: {
            boxShadow: "0px 8px 20px -5px rgba(0,0,0,0.69)",
            width: "80%",
            margin: "auto",
            padding: "2%"
        },
        divDropModele: {
            display: "flex",
            justifyContent: "space-around",
            [theme.breakpoints.down('sm')]: {
                flexWrap: "wrap"
            }
        },
        divNumSujet: {
            display: "flex",
            justifyContent: "center",
            marginTop: "3%"
        },
        saveButton1: {
            display: "block",
            margin: "20px auto"
        },
        saveButton2: {
            marginLeft: 20
        },
        button: {
            marginLeft: 20,
        },
        buttonVariable: {
            display: "block",
            margin: "0 auto 2%",
        }
    }));

    const classes = useStyles();

    const [sujet, setSujet] = useState("");
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [excel, setExcel] = useState("");
    const [openPopUpYesArchi, setopenPopUpYesArchi] = useState(false);
    const [openPopUpNoArchi, setopenPopUpNoArchi] = useState(false);
    const [openPopUpYesImages, setopenPopUpYesImages] = useState(false);
    const [openPopUpNoImages, setopenPopUpNoImages] = useState(false);

    const onChange = (e) => {
        if (!isNaN(e.target.value)) setSujet(e.target.value);
    }

    const envoieModele3D = () => {
        const data = new FormData();
        data.append('image1', image1);
        data.append('image2', image2);
        addModele3DAPI({ sujet: sujet, images: data }).then(() => {
            setopenPopUpYesImages(true);
        }).catch(err => {
            setopenPopUpNoImages(true)
        });
    }

    const envoieArchi = () => {
        const data = new FormData();
        data.append('excel', excel);
        addArchiAPI(data).then(() => {
            setopenPopUpYesArchi(true);
        }).catch(() => {
            setopenPopUpNoArchi(true);
        })
    }

    const getVariables = () => {
        getVariablesArchiAPI().then(data => {
            console.log(data)
        }).catch(err => {
            console.log(err)
        });
    }

    return (
        <div className={classes.root}>
            <Typography variant="h1">Architecture</Typography>
            <hr className={classes.hr} />
            <Button className={classes.buttonVariable} variant="contained" color="primary" onClick={() => getVariables()}>Récupere la liste des variables d'architecture</Button>
            <div>
                <DropFile typeFile='.xlsx' compressImage={false} changeFile={e => setExcel(e)} message="Charger la liste des architectures" />
                <Button className={classes.saveButton1} disabled={excel === ""} variant="contained" color="primary" onClick={() => envoieArchi()}>Enregistrer</Button>
            </div>
            <div className={classes.divImportModele}>
                <div className={classes.divDropModele}>
                    <DropFile typeFile='image/*' compressImage={false} changeFile={e => setImage1(e)} message="Importer la PREMIERE image du modèle 3D" />
                    <DropFile typeFile='image/*' compressImage={true} changeFile={e => setImage2(e)} message="Importer la SECONDE image du modèle 3D" />
                </div>
                <div className={classes.divNumSujet}>
                    <TextField autoFocus size="small" label="Numéro du sujet" variant="outlined" required value={sujet} onChange={e => onChange(e)} />
                    <Button className={classes.saveButton2} disabled={image1 === "" || image2 === "" || sujet === ""} variant="contained" color="primary" onClick={() => envoieModele3D()}>Enregistrer</Button>
                </div>
            </div>
            <PopUp severity="success" message="Architecture ajoutée" open={openPopUpYesArchi} handleClose={() => setopenPopUpYesArchi(false)} />
            <PopUp severity="error" message="L'ajout de l'architecture a échoué" open={openPopUpNoArchi} handleClose={() => setopenPopUpNoArchi(false)} />
            <PopUp severity="success" message="Images ajoutées" open={openPopUpYesImages} handleClose={() => setopenPopUpYesImages(false)} />
            <PopUp severity="error" message="L'ajout des images a échoué" open={openPopUpNoImages} handleClose={() => setopenPopUpNoImages(false)} />
        </div>
    );
}