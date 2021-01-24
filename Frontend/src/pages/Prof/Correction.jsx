import React from 'react'
import Table from '../../components/correction/TableConsulter'
import {makeStyles, MenuItem, Typography, TextField} from "@material-ui/core";
import useConstructor from '../../components/use/useContructor';

import { useDispatch, useSelector } from 'react-redux';

import { getEtudiantsPromo, selectIdPromo, setIdPromo, getAllPromo, selectEnregistrePromo, selectPromo } from '../../slice/PromoSlice'

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

    const idPromo = useSelector(selectIdPromo)
    const isEnregistrePromo = useSelector(selectEnregistrePromo);
    const tabPromos = useSelector(selectPromo)

    const dispatch = useDispatch()

    useConstructor(() => {if (!isEnregistrePromo) dispatch(getAllPromo())});


    //change l'id de promo qui est corrigée et importe les étudiants de cette promo
    const handleChangePromo = (e) => {
        dispatch(setIdPromo(e.target.value))
        dispatch(getEtudiantsPromo(e.target.value))
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
                        <MenuItem key={element.idPromo} value={element.idPromo} >
                            {element.nom}
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