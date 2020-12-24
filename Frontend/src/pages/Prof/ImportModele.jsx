import React, {useState} from 'react'
import { TextField, Button } from '@material-ui/core';

import DropFile from '../../components/DropFile'

export default function Accueil(props) {

    const [sujet, setSujet] = useState("")
    const [image1, setImage1] = useState("")
    const [image2, setImage2] = useState("")

    const onChange = (e) =>{
        const reg = '^[0-9]+$|^$';
        if (e.target.value.match(reg)) setSujet(e.target.value);
    }

    const envoie = () =>{
        console.log(image1, image2)
        // setSujet("");
        // setImage1("");
        // setImage2("")
    }

    return (
        <div>
            <div style={{display : "flex"}}>
                <DropFile typeFile='image/*' compressImage={false} changeFile={e => setImage1(e)}  message="Importer la PREMIERE image du modèle 3D"/>
                <DropFile typeFile='image/*' compressImage={true} changeFile={e => setImage2(e)}  message="Importer la SECONDE image du modèle 3D"/>
            </div>
            <div style={{display : "flex", margin: "50px 0 0 20px"}}>
                <TextField autoFocus size="small" label="Numéro du sujet" variant="outlined" required value={sujet} onChange={e => onChange(e)}/>
                <Button style={{marginLeft : 20}} color="primary" variant="outlined" onClick={e => envoie()}>Envoyer</Button>
            </div>
        </div>
    );
}