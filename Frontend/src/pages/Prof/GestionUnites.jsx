import {Button, makeStyles, Table, Typography} from '@material-ui/core';
import React, {useState} from 'react'

import { useDispatch, useSelector } from "react-redux";
import useConstructor from '../../components/use/useContructor';

import {getAllUnite, selectUnites, addUnite} from '../../slice/UniteSlice'

export default function GestionUnites(){

    const useStyles = makeStyles((theme) => ({
        hr: {
            width: "80%",
            marginBottom: "2%"
        }
    }));
    const classes = useStyles();

    const dispatch = useDispatch()

    const tabUnites = useSelector(selectUnites)

    useConstructor(()=>
        dispatch(getAllUnite())
    )

    const handleClickTest = () =>{
        dispatch(addUnite( "Sans Unité", " " ))
    }

    return(
        <div>
            <Typography variant="h1">Gestion des unités</Typography>
            <hr className={classes.hr}/>
            <Button onClick={handleClickTest}> yo </Button>

            <Table>

            </Table>
        </div>
    )
}