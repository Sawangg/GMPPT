import React, {useState} from 'react'
import { TextField, Button, Select, MenuItem, Input, InputLabel, FormControl, makeStyles, Fab, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PropagateLoader from "react-spinners/PropagateLoader";

import AssociationModele from '../../components/promo/DialogAssociationModele';
import AjoutListeEtu from '../../components/promo/AjoutListeEtu';
import Table from '../../components/promo/TableEtudiant';
import useConstructor from '../../components/use/useContructor'

import { getAllPromo, selectPromo, selectEnregistrePromo, addPromo, removePromo, getEtudiantsPromo } from "../../slice/PromoSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Promo() {

    const useStyles = makeStyles((theme) => ({
        mapDisplayEtu: {
            display : "flex",
            justifyContent : "space-around"
        },
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
        menuItem: {
            color: theme.palette.primary.main
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

    
    const dispatch = useDispatch();

    const [nouvellePromo, setNouvellePromo] = useState([]);
    const [select, setSelect] = useState("");
    const [assoModele, setAssoModele] = useState(false);
    const [listEtu, setListEtu] = useState(false);

    const isEnregistre = useSelector(selectEnregistrePromo);
    const tabPromo = useSelector(selectPromo);

    useConstructor(() => {
        if (!isEnregistre) dispatch(getAllPromo());
    });

    const ajouterPromo = () => {
        dispatch(addPromo(nouvellePromo)).then(() => dispatch(getAllPromo()));
        setNouvellePromo("");
    }

    const remove = () => {
        dispatch(removePromo(select));
        setSelect("");
    }

    const changePromo = (e) => {
        setSelect(e.target.value)
        dispatch(getEtudiantsPromo(e.target.value.idPromo))
    }
    
    const displayEtu = () => {
        return (
            <div>
                {tabEtudiants.map((e) => (
                    <div className={classes.mapDisplayEtu}>
                        <p>{e.prenom}</p>
                        <p>{e.nom}</p>
                        <p>mot de passe</p>
                        <Button>Modifier</Button>
                    </div>
                ))}
                <Button variant="contained" color="primary">Ajouter un étudiant</Button>
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
                                <Select className={classes.selectPromo} value={select} onChange={(e) => changePromo(e)} input={<Input/>}>
                                    <MenuItem className={classes.menuItem} value={"ajoutPromo"}>Ajouter promotion</MenuItem>
                                    {tabPromo === undefined  ? <PropagateLoader size={15} color={"rgb(7, 91, 114)"} css={{margin : "30px auto", display : "flex", justifyContent : "center"}}/> 
                                    : tabPromo.map((element, index) => (
                                        <MenuItem key={index} value={element}>{element.nom}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <Fab className={classes.fabDelete} size="small" aria-label="delete"
                                disabled={select.idPromo === "" || select === "ajoutPromo"}
                                onClick={() => remove()}
                            >
                                <DeleteIcon/>
                            </Fab>
                        </div>
                        {select !== "ajoutPromo" 
                            ? <>
                                <Button className={classes.button} disabled={select===""} variant="contained" color="primary" onClick={() => setAssoModele(true)}>Associer à un modèle</Button>
                                <Button className={classes.button} disabled={select===""} variant="contained" color="primary" onClick={() => setListEtu(true)}>Ajouter une liste d'étudiants</Button>
                                <AssociationModele selectPromo={select.idPromo} open={assoModele} setClose={() => setAssoModele(false)} />
                                <AjoutListeEtu selectPromo={select.idPromo} open={listEtu} setClose={() => setListEtu(false)}/>
                                {select !== "" ? <Table/> : null}
                            </>
                            :<div className={classes.divNomPromo}>
                                <TextField autoFocus size="small" label="Nom de la promo" variant="outlined" required value={nouvellePromo} onChange={e => setNouvellePromo(e.target.value)}/>
                                <Button className={classes.button} disabled={nouvellePromo === ""} variant="outlined" onClick={() => ajouterPromo()}>Créer</Button>
                            </div>
                        }
                    </FormControl>
                </form>
            </div>
        </div>
    );
}