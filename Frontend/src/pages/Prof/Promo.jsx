import React, {useState} from 'react'
import { TextField, Button, Select, MenuItem, Input, InputLabel, FormControl, makeStyles, Fab, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { getAllPromoAPI, addPromoAPI, etudiantNewAPI, deletePromoAPI } from '../../utils/api'

import AttributionSujet from '../../components/AttributionSujet';
import DropFile from '../../components/DropFile';
import useConstructor from '../../components/use/useContructor'

import '../../styles/ImportModele3D.css'

export default function Accueil() {

    const useStyles = makeStyles((theme) => ({
        divNomPromo: {
            display : "flex",
            justifyContent : "center",
            marginTop : "3%"
        },
        button: {
            display : "block",
            margin : "20px auto"
        },
        divPromo: {
            marginTop : 50,
            boxShadow : "0px 8px 20px -5px rgba(0,0,0,0.69)",
            padding : "1% 0.5%",
            width : "80%",
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
            display : "grid",
            gridTemplateColumns : "1fr 1fr",
            margin : "auto",
            width : "18%",
            gridGap : 20
        },
        labelSelectPromo: {
            position : "relative"
        },
        selectPromo: {
            width : 200,
            marginTop : "0 !important"
        },
        fabDelete: {
            color: "white",
            backgroundColor: theme.palette.error.main,
            "&:hover": {
                backgroundColor: theme.palette.error.dark
            }
        }
    }));
    const classes = useStyles();

    const [promo, setPromo] = useState("");
    const [excel, setExcel] = useState("");
    const [select, setSelect] = useState("");
    const [tabPromo, setTabPromo] = useState([])

    useConstructor(() => {
        getAllPromoAPI()
        .then(e => setTabPromo(e.data))
        .catch(() => console.log("erreur"))
    });

    const addPromo = () => {
        addPromoAPI(promo).then(() => {
            getAllPromoAPI()
            .then(e => setTabPromo(e.data))
            .catch(() => console.log("erreur"))
        }).catch(() => console.log("nop"));
        setPromo("");
    }

    const envoieExcel = () => {
        const data = new FormData();
        data.append('fileUploaded', excel);
        etudiantNewAPI(select, data).then(fichier => console.log(fichier)).catch((err) => console.log(err));
    };

    const changePromo = (e) => {
        setPromo(e.target.value);
    };

    const handleChange = (event) => {
        setSelect(event.target.value);
        console.log(event.target.value)
    };

    const removePromo = () => {
        deletePromoAPI(select.id_promo)
        .then(() => console.log("supp"))
        .catch(() => console.log("erreur"))
        let tabTemp = [...tabPromo];
        tabTemp.splice(tabTemp.indexOf(select), 1);
        setTabPromo(tabTemp);
        setSelect("");
    }

    return (
        <div>
            <Typography variant="h1">PROMOTION</Typography>
            <div className={classes.divPromo}>
                <form className={classes.form}>
                    <FormControl className={classes.formControl}>
                        <div className={classes.divSelectPromo}>
                            <div>
                                <InputLabel className={classes.labelSelectPromo}>Promotion selectionnée</InputLabel>
                                <Select className={classes.selectPromo} value={select.id_promo} onChange={handleChange} input={<Input/>}>
                                    <MenuItem style={{color : "#075b72"}} value={"ajoutPromo"}>Ajouter promotion</MenuItem>
                                    {tabPromo.map((element, index) => (
                                        <MenuItem key={index} value={element}>{element.nom_promo}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <Fab className={classes.fabDelete} size="small" aria-label="delete"
                                disabled={select.id_promo === "" || select === "ajoutPromo"}
                                onClick={() => removePromo()}
                            >
                                <DeleteIcon/>
                            </Fab>
                        </div>
                        {select !== "ajoutPromo" ? null 
                            :<div className={classes.divNomPromo}>
                                <TextField autoFocus size="small" label="Nom de la promo" variant="outlined" required value={promo} onChange={e => changePromo(e)}/>
                                <Button className={classes.button} disabled={promo===""} variant="outlined" onClick={() => addPromo()}>Créer</Button>
                            </div>
                        }
                        <DropFile typeFile='.xlsx' compressImage={false} changeFile={e => setExcel(e)}  message="Charger la liste des étudiants de la promotion"/>
                        <Button className={classes.button} disabled={excel===""} variant="contained" color="primary" onClick={() => envoieExcel()}>Enregistrer liste étudiants</Button>
                    </FormControl>
                </form>
            </div>
            <AttributionSujet tabPromo={tabPromo}/>
        </div>
    );
}