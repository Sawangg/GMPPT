import React from "react"
import SunEditor from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import {makeStyles} from "@material-ui/core";

import { useSelector } from "react-redux";
import { selectQuestion } from "../../slice/EnoncesSlice"

export default function QuestionEnonce({ index, handleChange }) {

    const useStyles = makeStyles((theme) => ({
        divQuestion: {
            display: "block",
            margin: "auto",
            width:'100%',
            boxShadow : "0px 8px 20px -5px rgba(0,0,0,0.3)",
        }
    }));
    const classes = useStyles();

    const value = useSelector(selectQuestion(index))

    return  (
        <div className={classes.divQuestion}>
            <SunEditor
                defaultValue={value}
                onChange={handleChange}
                setOptions={{
                    buttonList: [
                        ['undo','redo'],
                        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                        ['table', 'list'],
                        ['removeFormat'],
                    ]
                }}
                lang="fr"
                placeholder="Tapez votre question ici..."
                height="200"
                setDefaultStyle="background-color: lightgrey"
            />
        </div>
    );
}