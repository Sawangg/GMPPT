import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const MyEditor = ({handleChange, value}) => {

    return (
        <div>
            <SunEditor
                onChange={handleChange}
                setContents={value}
                setOptions={{buttonList: [
                    ['undo','redo'],
                    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                    ['table', 'list'],
                    ['removeFormat'],
                    ['outdent', 'indent'],
                    ['fullScreen']
                ]}}
                lang="fr"
                placeholder="Tapez votre énoncé ici..."
                height="300"
                setDefaultStyle="background-color: lightgrey"
            />
        </div>
    );
};

export default MyEditor;