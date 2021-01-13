import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import imageCompression from 'browser-image-compression';

import '../styles/DropFile.css'

export default function DropFile(props) {

  //s'execute lors de l'ajout d'un (ou plusieurs) fichier(s) dans le dropFile
  const onDrop = useCallback(acceptedFiles => {
    //pour lire tous les fichiers déposés
    acceptedFiles.forEach(async (file) => {
      //si on veut une compression d'image
      if (props.compressImage){
        const compressedFile = await imageCompression(file, {maxSizeMB: 1, maxWidthOrHeight: 800, useWebWorker: true});
        //retouner les fichiers à l'élément parent
        await props.changeFile(compressedFile)
      } else {
        //retouner les fichiers à l'élément parent
        props.changeFile(file)
      }
    })
  }, [props])

  //définir les types de fichiers acceptés et le nombre de fichiers à déposer
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop, accept: props.typeFile, maxFiles : 1})

  //affichage du nom des fichiers déposés
  const files = acceptedFiles.map(file => (
      <p key={file.path}>{file.path.length > 20 ? file.path.substring(0, 20)+"..." : file.path}</p>
    ));

  return (
      <div {...getRootProps()} className="divDrop">
        <input {...getInputProps()} />
        <p>{props.message}</p>
        <CloudUploadOutlinedIcon style={{fontSize : "400%"}}/>
        {files}
      </div>
  );
}