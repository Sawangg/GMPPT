import React, {useState} from 'react'
import { TextField, Button, Select, MenuItem, Input, InputLabel, FormControl, makeStyles } from '@material-ui/core';
import DropFile from '../../components/DropFile';
import useConstructor from '../../components/use/useContructor'
import { getAllPromoAPI, addPromoAPI, etudiantNewAPI, attributionSujetAPI } from '../../utils/api'
import { selectModele } from "../../slice/ModeleSlice";
import { useSelector } from "react-redux";

import '../../styles/ImportModele3D.css'

export default function Accueil() {

    const useStyles = makeStyles((theme) => ({
        divNomPromo: {
            display : "flex",
            justifyContent : "center",
            marginTop : "3%"
        },
        button: {
            height : 36,
            backgroundColor: theme.palette.primary.main,
            color: "white",
            "&:disabled": {
                backgroundColor: theme.palette.secondary.main
            },
            "&:hover": {
                backgroundColor: theme.palette.primary.dark
            }
        },
        divPromo: {
            marginTop : 50
        },
        divPromoModele: {
            marginTop : 50,
            display : "flex",
            justifyContent : "space-around",
            width : "60%",
            margin : "auto"
        },
        typo: {
            textAlign: "center"
        },
        form: {
            display: "flex",
            justifyContent: "center",
            marginBottom: 20
        },
        formControl: {
            display : "block",
            margin : "30px auto",
            width : "100%"
        },
        divSelectPromo: {
            display : "block",
            margin : "auto",
            width : "10%"
        },
        labelSelectPromo: {
            position : "relative"
        },
        selectPromo: {
            width : 200,
            marginTop : "0 !important"
        },
        selectModele: {
            width : 200
        }
    }));
    const classes = useStyles();

    const [promo, setPromo] = useState("");
    const [excel, setExcel] = useState("");
    const [select, setSelect] = useState("");
    const [tabPromo, setTabPromo] = useState([])

    const [selectPromo, setSelectPromo] = useState("");
    const [selectionModele, setSelectionModele] = useState("");

    const modele = useSelector(selectModele);

    useConstructor(() => {
        getAllPromoAPI().then(e => {
            setTabPromo(e.data);
            setSelect(e.data[0].id_promo)
        }).catch(() => console.log("erreur"))
    });

    const envoiePromo = () => {
        addPromoAPI(promo).then(() => {
            setPromo("")
            getAllPromoAPI().then(e => {
                setTabPromo(e.data);
                setSelect(e.data[0].id_promo)
            }).catch(() => console.log("erreur"))
        }).catch(() => console.log("nop"));
    }

    const envoieExcel = () => {
        const data = new FormData();
        data.append('fileUploaded', excel);
        etudiantNewAPI(select, data).then(fichier => console.log(fichier)).catch((err) => console.log(err));
    };

    const envoieAttribution = () => {
        attributionSujetAPI(selectPromo, selectionModele);
    };

    const changePromo = (e) => {
        setPromo(e.target.value);
    };

    const handleChange = (event) => {
        setSelect(event.target.value);
    };

    const handleChange2 = (event) => {
        setSelectPromo(event.target.value);
    };

    const handleChangeModele = (event) => {
        setSelectionModele(event.target.value);
    };

    return (
        <div>
            <div className={classes.divPromo}>
                <h1 className={classes.typo}>Selectionner une promotion pour ajouter une liste d'étudiants</h1>
                <form className={classes.form}>
                    <FormControl className={classes.formControl}>
                        <div className={classes.divSelectPromo}>
                            <InputLabel className={classes.labelSelectPromo}>Promotion selectionnée</InputLabel>
                            <Select className={classes.selectPromo} value={select} onChange={handleChange} input={<Input/>}>
                                <MenuItem style={{color : "#075b72"}} value={"ajoutPromo"}>Ajouter promotion</MenuItem>
                                {tabPromo.map((element, index) => (
                                    <MenuItem key={index} value={element.id_promo}>{element.nom_promo}</MenuItem>
                                ))}
                            </Select>
                        </div>
                        {select !== "ajoutPromo" ? null 
                            :<div className={classes.divNomPromo}>
                                <TextField autoFocus size="small" label="Nom de la promo" variant="outlined" required value={promo} onChange={e => changePromo(e)}/>
                                <Button className={classes.button} disabled={promo==="" ? true : false} variant="outlined" onClick={() => envoiePromo()}>Créer</Button>
                            </div>
                        }
                        <DropFile typeFile='.xlsx' compressImage={false} changeFile={e => setExcel(e)}  message="Charger la liste des étudiants"/>
                        <Button style={{display : "block", margin : "20px auto"}} className={classes.button} disabled={excel==="" ? true : false} variant="outlined" onClick={e => envoieExcel()}>Enregistrer liste étudiants</Button>
                    </FormControl>
                </form>
            </div>
            <div className={classes.divPromoModele}>
                <div>
                    <InputLabel className={classes.labelSelectPromo}>Promotion selectionnée</InputLabel>
                    <Select className={classes.selectPromo} value={selectPromo} onChange={handleChange2} input={<Input/>}>
                        {tabPromo.map((element, index) => (
                            <MenuItem key={index} value={element.id_promo}>{element.nom_promo}</MenuItem>
                        ))}
                    </Select>
                </div>
                <div> 
                    <InputLabel className={classes.labelSelectPromo}>Modèle selectionné</InputLabel>
                    <Select className={classes.selectModele} value={selectionModele} onChange={handleChangeModele} input={<Input/>}>
                        {modele.tabName.map((element, index) => (
                            <MenuItem key={index} value={element.index}>{element.nom}</MenuItem>
                        ))}
                    </Select>
                </div>
                <Button className={classes.button} disabled={(selectionModele === "") || (selectPromo === "") ? true : false} variant="outlined" onClick={() => envoieAttribution()}>Envoyer</Button>
            </div>
        </div>
    );
}