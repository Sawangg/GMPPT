import React from "react"
import SunEditor from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import deleteButton from "./deletePlugin";

export default function QuestionEnonce(props) {
    return  (
        <div className='center' style={{width:'40%'}}>
            <SunEditor
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
                                buttonClass: '',
                                title: 'Supprimer la question',
                                dataDisplay: 'command',
                                innerHTML: '<Button>X</Button>'
                            }
                        ]
                    ],
                    plugins: [
                      deleteButton
                    ]}}
                lang="fr"
                placeholder="Tapez votre question ici..."
                height="50"
                setDefaultStyle="background-color: lightgrey"
            />
        </div>
    );
}