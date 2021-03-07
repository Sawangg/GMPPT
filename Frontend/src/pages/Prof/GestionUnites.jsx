import React from 'react'

import { Button, Table, TableCell, TableHead, TableRow, TableBody, TextField, Typography, IconButton } from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import CircleLoader from "react-spinners/CircleLoader";
import SaveIcon from '@material-ui/icons/Save';

import { useDispatch, useSelector } from "react-redux";
import useConstructor from '../../components/use/useContructor';

import {getAllUnite, selectUnites, enregistreUnites, selectActualise, addUnite, setIndexEnModif,
    selectIndexEnMofid, changeNomComplet, changeAbreviation, deleteUnite, selectEnregistreUnite, setEnregistre} from '../../slice/UniteSlice'
import PopUp from '../../components/PopUp';

export default function GestionUnites(){

    const useStyles = makeStyles((theme) => ({
        hr: {
            width: "80%",
            marginBottom: "2%"
        },
        tableauUnite : {
            width : "80%",
            margin : "auto",
            boxShadow: "0px 8px 20px -5px rgba(0,0,0,0.69)",
        },
        addButton: {
            marginLeft: "3%",
            marginBottom: "2%"
        },
        deleteButton : {
            backgroundColor: theme.palette.error.main,
            "&:hover": {
                backgroundColor: theme.palette.error.dark
            },
            color: "white",
            boxShadow: "0px 8px 20px -5px rgba(0,0,0,0.69)",
        },
        modifButton : {
            backgroundColor: theme.palette.primary.light,
            "&:hover": {
                backgroundColor: theme.palette.secondary.main
            },
            color: "black",
            boxShadow: "0px 8px 20px -5px rgba(0,0,0,0.69)",
            marginRight: "10%"
        },
        tableCell: {
            textAlign: "center"
        },
        tableRow: {
            backgroundColor: theme.palette.secondary.light
        }
    }));

    const classes = useStyles();

    const dispatch = useDispatch();

    const tabUnites = useSelector(selectUnites);

    const actualise = useSelector(selectActualise);

    const indexEnModif = useSelector(selectIndexEnMofid);

    const isEnregistre = useSelector(selectEnregistreUnite);

    useConstructor(()=> {
        if (!isEnregistre){
            dispatch(getAllUnite())
        };
    })

    //permet de savoir si ce nom est utilisé une seule fois dans le tabUnites
    //renvoie aussi une valeur fausse si les chaines sont vides
    const modifIsUnique = () =>{

        if (indexEnModif < 0){ // si il n'y pas de champ qui est en train d'être modifié
            return true
        }else if (tabUnites[indexEnModif].abrev.length === 0 ||
            tabUnites[indexEnModif].nom.length === 0){ // si l'un des champ est vide
            return false
        };


        for (let i =0 ; i<tabUnites.length; i++){ 
            let verif = (i === indexEnModif) || 
                (tabUnites[i].nom !== tabUnites[indexEnModif].nom &&
                tabUnites[i].abrev !== tabUnites[indexEnModif].abrev)

            if (!verif) return false // renvoie faux si le nom ou l'abreviation est retrouvée autre part
        };

        return true // retourne vrai par défaut
        
    }

    //change le nom complet d'une unité au fur et à mesure de sa saisie
    //paramètres : index de l'unité et event (valeur)
    const handleChangeNomComplet = (index, event ) =>{
        dispatch(changeNomComplet({
            index : index,
            value : event.target.value
        }));
    }

    //change le nom complet d'une unité au fur et à mesure de sa saisie
    //paramètres : index de l'unité et event (valeur)
    const handleChangeAbreviation = (index, event) =>{
        dispatch(changeAbreviation({
            index : index,
            value : event.target.value
        }));
    }

    //enregistre l'unité dans la base de données
    const enregistrer = () =>{
        dispatch(enregistreUnites(tabUnites))
        setEnregistre(true)
    }

    //ajoute une unité dans le tableau (n'enregistre pas dans la BD)
    const handleAjouterUnite = () =>{
        dispatch(addUnite())
    }

    const handleDeleteUnite = (index) =>{
        if(tabUnites[index].nom !== "Sans Unité"){
            dispatch(deleteUnite(index))
        }
    }

    const handleModifUnite = (index) =>{
        dispatch(setIndexEnModif(index))
    }

    const handleSaveLocal = () =>{
        dispatch(setIndexEnModif(-1))
    }

    const buttonsUniteSansModif = (index) =>{
        return(
            tabUnites[index].nom !== "Sans Unité" 
            ?
            <div>
                <IconButton className={classes.modifButton} onClick={e=>handleModifUnite(index)} disabled={modifIsUnique()}>
                    <CreateIcon />
                </IconButton>
                <IconButton className={classes.deleteButton} onClick={e=>handleDeleteUnite(index)}>
                    <DeleteIcon />
                </IconButton>
            </div>
            :
            null
        )
    }

    //affiche l'unité en fonction du fait qu'il est en train d'être modifié ou non
    const afficherUnite = (unite, index) =>{
        return(
            index !== indexEnModif ?
                <>

                <TableCell className={classes.tableCell}> { unite.nom } </TableCell>
                <TableCell className={classes.tableCell}> { unite.abrev } </TableCell>
                <TableCell className={classes.tableCell}> { buttonsUniteSansModif(index) } </TableCell>

                </>
            :
                <>
                <TableCell>
                    <TextField value={unite.nom} 
                        onChange={e=>handleChangeNomComplet(index, e)}/>
                </TableCell>
                <TableCell>
                    <TextField value={unite.abrev}
                        onChange={e=>handleChangeAbreviation(index, e)}/>
                </TableCell>
                <TableCell>
                    <IconButton onClick={e=>handleSaveLocal(index)} disabled={!modifIsUnique()}>
                        <SaveIcon />
                    </IconButton>
                    <IconButton onClick={e=>handleDeleteUnite(index)}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
                </>
        )
    }

    return(
        !actualise 
        ?
        <CircleLoader size={50} color={"rgb(7, 91, 114)"} css={{margin : "auto", display : "flex", justifyContent : "center"}} />
        :
        <div>
            <Typography variant="h1">Gestion des unités</Typography>
            <hr className={classes.hr}/>
        
            <Button className={classes.addButton} variant="contained" color="primary" onClick={handleAjouterUnite}>
                Ajouter une unité
            </Button>

            <Table className={classes.tableauUnite}>
                <TableHead>
                    <TableRow className={classes.tableRow}>
                        <TableCell className={classes.tableCell}> Nom Complet </TableCell>
                        <TableCell className={classes.tableCell}> Abréviation </TableCell>
                        <TableCell /> {/*  Pour les boutons */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tabUnites.map((unite, index) =>{
                        return(
                            <TableRow key={index}>
                                {afficherUnite(unite, index)}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <PopUp 
                open={ indexEnModif < 0 && !isEnregistre } 
                handleClose={ () => enregistrer() }
                actionName="enregistrer" 
                action={ () => enregistrer() } 
                message="Cliquez ici pour enregistrer les unités" 
                severity="warning"/>
        </div>
    )
}