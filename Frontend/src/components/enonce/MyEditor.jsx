import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const MyEditor = props => {

    return (
        <div>
            <SunEditor
                onChange={props.handleChange}
                setContents={props.value}
                setOptions={{buttonList: [
                    ['undo','redo'],
                    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                    ['table', 'list'],
                    ['removeFormat'],
                    ['outdent', 'indent'],
                    ['fullScreen', 'preview']
                ]}}
                lang="fr"
                placeholder="Tapez votre énoncé ici..."
                height="200"
                setDefaultStyle="background-color: lightgrey"
            />
        </div>
    );
};

export default MyEditor;