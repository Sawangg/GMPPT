import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import _ from "lodash"

import Item from './ItemChoixUnite';

export default function ChoixUnite(props){

    const handleChangeUnite = (event, indTab) =>{
        let index = event.target.value;
        const newTab = _.cloneDeep(props.unite);
        newTab[indTab].id = index;
        props.setUnite(newTab);
    }

    const addPartieUnite = (index) =>{
        let newTab = [...props.unite];
        newTab.splice(index, 0, { id:0 , puissance : 1});
        props.setUnite(newTab);
    }

    const deletePartieUnite = (index) =>{
        let newTab=[...props.unite];
        newTab.splice(index, 1);
        props.setUnite(newTab);
    }

    const handlePuissance = (e, index) =>{
        let puis = e.target.value;
        if(!isNaN(puis)){
            if(puis === 0){
                puis = 1;
            }else{
                puis = parseInt(puis,10) ;
            }
            let newTab = [...props.unite];
            newTab[index].puissance = puis;
            props.setUnite(newTab);
        }
        
    }

    return(
        <Dialog open={props.open}>
            <DialogTitle>
                Choix de l'unité
            </DialogTitle>
            <DialogContent className="alignement_horizontal">
                {props.unite.map((i, index) => 
                    <>
                    <Item index={index} unite={i} unites={props.unites} 
                        handleChangeUnite={handleChangeUnite} addPartieUnite={addPartieUnite}
                        deletePartieUnite={deletePartieUnite} handlePuissance={handlePuissance} 
                        tabLength={props.unite.length} />
                    {index < props.unite.length-1 ? <b>.</b> : null}
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={e=>props.handleClose()}>
                    Appliquer
                </Button>
            </DialogActions>
        </Dialog>
    )

}