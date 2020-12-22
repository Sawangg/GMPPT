import React, {useState} from 'react'
import { TextField, Button } from '@material-ui/core';

import DropFile from '../../components/DropFile'

export default function Accueil(props) {

    const [sujet, setSujet] = useState("")
    const [image1, setImage1] = useState("")
    const [image2, setImage2] = useState("")

    // const convertUrlToImage = (rawLog) =>{
    //     let ok = decompress(imageCompress);
    //     let newImage = document.createElement('img');
    //     newImage.style.width = '200px';
    //     newImage.src = ok;
    //     document.getElementById("imgTest").innerHTML = newImage.outerHTML;
    //   }

    const onChange = (e) =>{
        const reg = '^[0-9]+$|^$|^\s$';
        if (e.target.value.match(reg)) setSujet(e.target.value);
    }

    const envoie = () =>{
        setSujet("");
        setImage1("");
        setImage2("")
    }

    return (
        <div>
            <div style={{display : "flex"}}>
                <DropFile changeModele={e => setImage1(e)}  message="Importer la PREMIERE image du modèle 3D (moins de 1Mo)"/>
                <DropFile changeModele={e => setImage2(e)}  message="Importer la SECONDE image du modèle 3D (moins de 1Mo)"/>
            </div>
            <div style={{display : "flex", margin: "50px 0 0 20px"}}>
                <TextField autoFocus size="small" label="Numéro du sujet" variant="outlined" required value={sujet} onChange={e => onChange(e)}/>
                <Button style={{marginLeft : 20}} color="primary" variant="outlined" onClick={e => envoie()}>Envoyer</Button>
            </div>
        </div>
    );
}