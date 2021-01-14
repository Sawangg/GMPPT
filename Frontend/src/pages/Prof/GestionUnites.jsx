import { Button, Table } from '@material-ui/core';
import React, {useState} from 'react'

import { useDispatch, useSelector } from "react-redux";
import useConstructor from '../../components/use/useContructor';

import {getAllUnite, selectUnites, addUnite} from '../../slice/UniteSlice'

export default function GestionUnites(){

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
            <h1>Gestion des Unités</h1>
            <Button onClick={handleClickTest}> yo </Button>

            <Table>

            </Table>
        </div>
    )
}