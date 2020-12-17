import MyEditor from "../components/MyEditor";
import React from "react";
import {Button} from "@material-ui/core";

export default function Enonces() {

    const sendContent = () => (
        console.log("Cadeau !")
    );

    return (
        <div style={{width:"70%", margin:'auto', textAlign:'center'}}>
            <h1>Création de l'énoncé</h1>
            <MyEditor/>
            <Button onClick={() => sendContent()}>Enregistrer</Button>
        </div>
    );
}