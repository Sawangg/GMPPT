import { Button, Table, TableCell, TableHead, TableRow, TableBody, TextField } from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import React, {useState} from 'react'
import _ from 'lodash'

import { useDispatch, useSelector } from "react-redux";
import useConstructor from '../../components/use/useContructor';

import {getAllUnite, selectUnites, enregistreUnite, selectActualise, addUnite,
    selectIndexEnMofid, changeNomComplet, changeAbreviation} from '../../slice/UniteSlice'

export default function GestionUnites(){

    const useStyles = makeStyles((theme) => ({
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

    useConstructor(()=> {
        if(!actualise){
            console.log("yo")
            dispatch(getAllUnite()) 
        } 
    })

    //permet de savoir si ce nom est utilisé une seule fois dans le tabUnites
    //reste l'abreviation à faire
    //oui cette méthode est déguelasse et j'en suis fier !
    const modifIsUnique = () =>{

        let verif = true
        
        for (let i =0 ; i<tabUnites.length; i++){
            verif = (i === indexEnModif) || 
                (tabUnites[i].nomComplet !== tabUnites[indexEnModif].nomComplet &&
                tabUnites[i].abr !== tabUnites[indexEnModif].abr)
        }

        return verif
        
    }

    const handleClickTest = () =>{
        dispatch(enregistreUnite( "Sans Unité", " " ))
    }

    //change le nom complet d'une unité au fur et à mesure de sa saisie
    //paramètres : index de l'unité et event (valeur)
    const handleChangeNomComplet = (index, event ) =>{
        dispatch(changeNomComplet({
            index : index,
            value : event.target.value
        }))
    }

    //change le nom complet d'une unité au fur et à mesure de sa saisie
    //paramètres : index de l'unité et event (valeur)
    const handleChangeAbreviation = (index, event) =>{
        dispatch(changeAbreviation({
            index : index,
            value : event.target.value
        }))
    }

    //ajoute une unité dans le tableau (n'enregistre pas dans la BD)
    const handleAjouterUnite = () =>{
        if(indexEnModif >=0 && modifIsUnique()){
            dispatch(enregistreUnite(tabUnites[indexEnModif]))
        }
        dispatch(addUnite())
    }

    //affiche l'unité en fonction du fait qu'il est en train d'être modifié ou non
    const afficherUnite = (unite, index) =>{
        return(
            index !== indexEnModif ?
                <>
                <TableCell> {unite.nomComplet} </TableCell>
                <TableCell> {unite.abr} </TableCell>
                </>
            :
                <>
                <TableCell>
                    <TextField value={unite.nomComplet} 
                        onChange={e=>handleChangeNomComplet(index, e)}/>
                </TableCell>
                <TableCell>
                    <TextField value={unite.abr}
                        onChange={e=>handleChangeAbreviation(index, e)}/>
                </TableCell>
                </>
        )
    }

    return(
        <div>
            <h1>Gestion des Unités</h1>
            <Button onClick={handleAjouterUnite}>
                Ajouter une unité
            </Button>
            <Table className={classes.tableauUnite}>
                <TableHead>
                    <TableRow>
                        <TableCell> Nom Complet </TableCell>
                        <TableCell> Abréviation </TableCell>
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
        </div>
    )
}