import React, { useState } from 'react';
import { Button, TextField, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import Reponse from './ItemReponse';

export default function Item(props) {
   const [reponsesTab, setTab] = useState([{index : 0, buttonAdd : true}]);

   const [copyTab, setCopyTab] = useState([...reponsesTab]);

   const addReponse = () =>{
        reponsesTab[reponsesTab.length-1].buttonAdd = false;
        setTab([...reponsesTab, {index : reponsesTab.length, buttonAdd : true}]);
   }

   const deleteReponse = (num) =>{
       if(reponsesTab.length > 1){
            setCopyTab(reponsesTab);
            const newTab = [...reponsesTab];
            newTab.splice(num, 1);
            setTab(newTab);
       }
   }

   const peutSupprimer = () =>{
       return reponsesTab.length > 1;
   }
   
   return(
       <div>
        <Button onClick={addReponse} disabled={reponsesTab.length >= props.nbMaxReponses}>Ajouter Réponse</Button>
            <div className="liste_reponse">
                {reponsesTab.map((i) => (
                    <Reponse num={i.index} buttonAdd={i.buttonAdd} addReponse={e => addReponse()}  
                    deleteReponse={e=>deleteReponse(e)} unites={props.unites} peutSupprimer={e => peutSupprimer()}/>
                ))}
            </div>
        </div>
    )

}