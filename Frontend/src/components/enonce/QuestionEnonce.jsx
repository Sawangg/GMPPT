import React from "react"
import SunEditor from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import deleteButton from "./deletePlugin";
import {makeStyles} from "@material-ui/core";

export default function QuestionEnonce(props) {

    const useStyles = makeStyles((theme) => ({
        divQuestion: {
            display: "block",
            margin: "auto",
            width:'40%'
        }
    }));
    const classes = useStyles();

    return  (
        <div className={classes.divQuestion}>
            <SunEditor
                id={"cocou"}
                setContents={props.value}
                onChange={props.handleChange}
                setOptions={{
                    buttonList: [
                        ['undo','redo'],
                        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                        ['table', 'list'],
                        ['removeFormat'],
                        [
                            {
                                name: 'delete_button',
                                dataCommand: 'delete_button',
                                title: 'Supprimer la question',
                                dataDisplay: 'command',
                                innerHTML: "<Button id='"+props.id+"'>X</Button>"
                            }
                        ]
                    ],
                    plugins: [
                        deleteButton()
                    ]}}
                lang="fr"
                placeholder="Tapez votre question ici..."
                height="50"
                setDefaultStyle="background-color: lightgrey"
            />
        </div>
    );
}