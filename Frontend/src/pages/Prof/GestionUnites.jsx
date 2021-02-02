import React , {useState} from 'react'

import { Button, Table, TableCell, TableHead, TableRow, TableBody, TextField, Typography, IconButton } from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import _ from 'lodash'
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import CircleLoader from "react-spinners/CircleLoader";
import SaveIcon from '@material-ui/icons/Save';

import { useDispatch, useSelector } from "react-redux";
import useConstructor from '../../components/use/useContructor';

import {getAllUnite, selectUnites, enregistreUnites, selectActualise, addUnite, setIndexEnModif,
    selectIndexEnMofid, changeNomComplet, changeAbreviation, deleteUnite, selectEnregistre, setEnregistre} from '../../slice/UniteSlice'
import PopUp from '../../components/PopUp';

export default function GestionUnites(){

    const useStyles = makeStyles((theme) => ({
        hr: {
            width: "80%",
            marginBottom: "2%"
        },
        tableauUnite : {
            width : "40%",
            margin : "auto"
        }
    }));

    const classes = useStyles();

    const dispatch = useDispatch()

    const tabUnites = useSelector(selectUnites)

    const actualise = useSelector(selectActualise)

    const indexEnModif = useSelector(selectIndexEnMofid)

    const isEnregistre = useSelector(selectEnregistre)

    useConstructor(()=> {
        if (!actualise){
            dispatch(getAllUnite())
        };
    })

    //permet de savoir si ce nom est utilisé une seule fois dans le tabUnites
    //reste l'abreviation à faire
    //oui cette méthode est déguelasse et j'en suis fier !
    const modifIsUnique = () =>{

        let verif = true
        
        for (let i =0 ; i<tabUnites.length; i++){
            verif = (i === indexEnModif) || 
                (tabUnites[i].nom !== tabUnites[indexEnModif].nom &&
                tabUnites[i].abrev !== tabUnites[indexEnModif].abrev)
        }

        return verif
        
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

    const buttonsUnite = (index) =>{
        return(
            tabUnites[index].nom !== "Sans Unité" 
            ?
            <div>
            <IconButton onClick={e=>handleDeleteUnite(index)}>
                <DeleteIcon />
            </IconButton>
            <IconButton onClick={e=>handleModifUnite(index)}>
                <CreateIcon />
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
                <TableCell> { unite.nom } </TableCell>
                <TableCell> { unite.abrev } </TableCell>
                <TableCell> { buttonsUnite(index) } </TableCell>
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
                    <IconButton onClick={e=>handleSaveLocal(index)}>
                        <SaveIcon />
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
        
            <Button onClick={handleAjouterUnite}>
                Ajouter une unité
            </Button>

            <Table className={classes.tableauUnite}>
                <TableHead>
                    <TableRow>
                        <TableCell> Nom Complet </TableCell>
                        <TableCell> Abréviation </TableCell>
                        <TableCell /> {/*  Pour les boutons */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tabUnites.map((unite, index) =>{
                        return(
                            <TableRow>
                                {afficherUnite(unite, index)}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            {console.log(isEnregistre)}
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