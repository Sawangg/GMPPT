import React, {useState} from 'react'
import { Button, Select, MenuItem, Input, InputLabel, makeStyles } from '@material-ui/core';

import { attributionSujetAPI } from '../utils/api'

import { selectModele } from "../slice/ModeleSlice";
import { useSelector } from "react-redux";

export default function AttributionSujet(props){

    const [selectPromo, setSelectPromo] = useState("");
    const [selectionModele, setSelectionModele] = useState("");

    const useStyles = makeStyles((theme) => ({
        divPromoModele: {
            marginTop : 50,
            display : "flex",
            justifyContent : "space-around",
            flexWrap : "wrap",
            width : "60%",
            margin : "3% auto",
            boxShadow : "0px 8px 20px -5px rgba(0,0,0,0.69)",
            padding : "2% 1%"
        },
        selectPromo: {
            width : 200,
            marginTop : "0 !important"
        },
        selectModele: {
            width : 200
        }
    }));
    const classes = useStyles();

    const modele = useSelector(selectModele);

    const envoieAttribution = () => {
        attributionSujetAPI(selectPromo, selectionModele);
    };

    const handleChange2 = (event) => {
        setSelectPromo(event.target.value);
    };

    const handleChangeModele = (event) => {
        setSelectionModele(event.target.value);
    };

    return (
        <div className={classes.divPromoModele}>
                <p style={{width : "100%", textAlign : "center", margin : "0px auto 60px auto", fontSize : "150%"}}>Associer un modèle à une promotion</p>
                <div>
                    <InputLabel className={classes.labelSelectPromo}>Promotion selectionnée</InputLabel>
                    <Select className={classes.selectPromo} value={selectPromo} onChange={handleChange2} input={<Input/>}>
                        {props.tabPromo.map((element, index) => (
                            <MenuItem key={index} value={element.id_promo}>{element.nom_promo}</MenuItem>
                        ))}
                    </Select>
                </div>
                <div> 
                    <InputLabel className={classes.labelSelectPromo}>Modèle selectionné</InputLabel>
                    <Select className={classes.selectModele} value={selectionModele} onChange={handleChangeModele} input={<Input/>}>
                        {modele.tabName.map((element, index) => (
                            <MenuItem key={index} value={element.index}>{element.nom}</MenuItem>
                        ))}
                    </Select>
                </div>
                <Button className={classes.button} disabled={(selectionModele === "") || (selectPromo === "") ? true : false} variant="contained" color="primary" onClick={() => envoieAttribution()}>Envoyer</Button>
        </div>
    )

}