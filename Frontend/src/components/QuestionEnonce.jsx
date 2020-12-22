import React from "react"
import SunEditor from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

export default function QuestionEnonce(props) {
    return  (
        <div className='center' style={{width:'40%'}}>
            <SunEditor
                onChange={props.handleChange}
                setOptions={{buttonList: [
                        ['undo','redo'],
                        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                        ['table', 'list'],
                        ['removeFormat']
                    ]}}
                lang="fr"
                placeholder="Tapez votre question ici..."
                height="200"
                setDefaultStyle="background-color: lightgrey"
            />
        </div>
    );
}