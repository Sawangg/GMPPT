import React, {useState} from 'react'
import { TextField, Button, Select, MenuItem, Input, Typography, InputLabel, FormControl } from '@material-ui/core';
import DropFile from '../../components/DropFile';

import '../../styles/ImportModele3D.css'

export default function Accueil() {

    const [promo, setPromo] = useState("");
    const [excel, setExcel] = useState("");
    const [select, setSelect] = useState("2");

    const envoie = () =>{
        console.log("ocucu")
    }

    const changePromo = (e) =>{
        setPromo(e.target.value);
    }

    const handleChange = (event) => {
        setSelect(event.target.value);
    };

    return (
        <div>
             <div style={{display : "flex", justifyContent : "center", marginTop : "3%"}}>
                <TextField autoFocus size="small" label="Nom de la promo" variant="outlined" required value={promo} onChange={e => changePromo(e)}/>
                <Button disabled={promo==="" ? true : false} style={{marginLeft : 20}} color="primary" variant="outlined" onClick={e => envoie()}>Envoyer</Button>
            </div>
            <div style={{marginTop : 50}}>
                <Typography align="center">Selectionner une promotion pour ajouter une liste d'étudiants</Typography>
                <form style={{display : "flex", justifyContent : "center", marginBottom : 20}}>
                    <FormControl style={{display : "block", margin : "50px auto", width : "100%"}}>
                        <div>
                            <InputLabel>Promotion</InputLabel>
                            <Select style={{width : 200}} value={select} onChange={handleChange} input={<Input/>}>
                                <MenuItem value="2">Test1</MenuItem>
                                <MenuItem value="1">Test2</MenuItem>
                            </Select>
                        </div>
                        <DropFile typeFile='.xlsx, .xls, .ods, .xlr, .tab' compressImage={false} changeFile={e => setExcel(e)}  message="Charger la liste des étudiants"/>
                    </FormControl>
                </form>
            </div>
        </div>
    );
}