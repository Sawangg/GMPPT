import React, {useState} from 'react'
import Table from '../../components/correction/TableConsulter'
import {makeStyles, MenuItem, Typography, TextField} from "@material-ui/core";
import useConstructor from '../../components/use/useContructor';

import { getAllPromoAPI, getInfoPromoAPI} from '../../utils/api'

import { useDispatch, useSelector } from 'react-redux';

import { getEtudiantsDB, selectIdPromo, setIdPromo } from '../../slice/CorrectionSlice'

export default function Correction(){
    const useStyles = makeStyles((theme) => ({
        hr: {
            width: "80%",
            marginBottom: "2%"
        },
        divTable: {
            width: "90%",
            margin: "0 auto 2% auto",
            boxShadow : "0px 8px 20px -5px rgba(0,0,0,0.69)",
        },
        choixPromoDiv:{
            width : "200px",
            margin : "auto",
        },
        choixPromoField: {
            width : "100%",
        }
    }));
    const classes = useStyles();

    const [tabPromos, setPromos] = useState( [{ id_promo : 0, nom_promo : "" }] )

    const idPromo = useSelector(selectIdPromo)

    const dispatch = useDispatch()

    useConstructor(() =>{
        getAllPromoAPI()
        .then(e => setPromos(e.data))
        .catch(() => console.log("erreur"))
    });


    //change l'id de promo qui est corrigée et importe les étudiants de cette promo
    const handleChangePromo = (e) => {
        dispatch(setIdPromo(e.target.value))

        dispatch(getEtudiantsDB(e.target.value))
        
        getInfoPromoAPI(e.target.value)
        .then(e => console.log(e))
        .catch(() => console.log("erreur"))
    }

    return(
        <div>
            <Typography variant="h1">Correction</Typography>
            <hr className={classes.hr}/>

            {/* Select pour le choix de la promo */}
            <div className={classes.choixPromoDiv}>
                <TextField select value={idPromo} onChange={e=> handleChangePromo(e)} className={classes.choixPromoField}
                    helperText="Choisissez la promotion" >
                    {tabPromos.map((element)=>{
                        return(
                        <MenuItem key={element.id_promo} value={element.id_promo} >
                            {element.nom_promo}
                        </MenuItem>)
                    })}
                </TextField>
            </div>

            { /* Table pour la correction */}
            {idPromo !== undefined ?
            <div className={classes.divTable}>
                <Table/>
            </div>
            : null }
        </div>
    )

}