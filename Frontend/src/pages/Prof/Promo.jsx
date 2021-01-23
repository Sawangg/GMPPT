import React, {useState} from 'react'
import { TextField, Button, Select, MenuItem, Input, InputLabel, FormControl, makeStyles, Fab, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PropagateLoader from "react-spinners/PropagateLoader";

import { getAllPromoAPI, addPromoAPI, etudiantNewAPI, deletePromoAPI } from '../../utils/api'

import PopUp from '../../components/PopUp';
import AttributionSujet from '../../components/AttributionSujet';
import DropFile from '../../components/DropFile';
import AssociationModele from '../../components/promo/DialogAssociationModele';
import AjoutListeEtu from '../../components/promo/AjoutListeEtu';
import useConstructor from '../../components/use/useContructor'

import '../../styles/ImportModele3D.css'

export default function Promo() {

    const useStyles = makeStyles((theme) => ({
        hr: {
            width: "80%",
            marginBottom: "2%"
        },
        divNomPromo: {
            display : "flex",
            justifyContent : "center",
            marginTop : "3%",
        },
        button: {
            display : "block",
            margin : "20px auto"
        },
        divPromo: {
            boxShadow : "0px 8px 20px -5px rgba(0,0,0,0.69)",
            padding : "1% 0.5%",
            width : "80%",
            margin : "auto",
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

    const [promo, setPromo] = useState([]);
    const [select, setSelect] = useState("");
    const [tabPromo, setTabPromo] = useState(undefined);
    const [assoModele, setAssoModele] = useState(false);
    const [listEtu, setListEtu] = useState(false);

    useConstructor(() => {
        getAllPromoAPI()
        .then(e => {
            setTabPromo(e.data);
            setSelect(e.data[0]);
        })
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

    const removePromo = () => {
        deletePromoAPI(select.id_promo)
        .then(() => console.log("supp"))
        .catch(() => console.log("erreur"))
        let tabTemp = [...tabPromo];
        tabTemp.splice(tabTemp.indexOf(select), 1);
        setTabPromo(tabTemp);
        setSelect("");
    }

    const displayEtu = () => {
        return (
            <div>
                <p>Liste étudiants prenom / nom / mdp</p>
                <p>Flo Toto test</p>
            </div>
        )
    }

    return (
        <div>
            <Typography variant="h1">PROMOTION</Typography>
            <hr className={classes.hr}/>
            <div className={classes.divPromo}>
                <form className={classes.form}>
                    <FormControl className={classes.formControl}>
                        <div className={classes.divSelectPromo}>
                            <div>
                                <InputLabel className={classes.labelSelectPromo}>Promotion selectionnée</InputLabel>
                                <Select className={classes.selectPromo} value={select} onChange={(e) => setSelect(e.target.value)} input={<Input/>}>
                                    <MenuItem style={{color : "#075b72"}} value={"ajoutPromo"}>Ajouter promotion</MenuItem>
                                    {tabPromo === undefined  ? <PropagateLoader size={15} color={"rgb(7, 91, 114)"} css={{margin : "30px auto", display : "flex", justifyContent : "center"}}/> 
                                    : tabPromo.map((element, index) => (
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
                        {select !== "ajoutPromo" 
                            ? <>
                                <Button className={classes.button} disabled={select===""} variant="contained" color="primary" onClick={() => setListEtu(true)}>Ajouter une liste d'étudiants</Button>
                                <Button className={classes.button} disabled={select===""} variant="contained" color="primary" onClick={() => setAssoModele(true)}>Associer à un modèle</Button>
                                <AssociationModele selectPromo={select.id_promo} open={assoModele} setClose={() => setAssoModele(false)} />
                                <AjoutListeEtu selectPromo={select.id_promo} open={listEtu} setClose={() => setListEtu(false)}/>
                                {select !== "" ? displayEtu() : null}
                            </>
                            :<div className={classes.divNomPromo}>
                                <TextField autoFocus size="small" label="Nom de la promo" variant="outlined" required value={promo} onChange={e => setPromo(e.target.value)}/>
                                <Button className={classes.button} disabled={promo===""} variant="outlined" onClick={() => addPromo()}>Créer</Button>
                            </div>
                        }
                    </FormControl>
                </form>
            </div>
        </div>
    );
}