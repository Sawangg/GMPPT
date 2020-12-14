import React from 'react';
import {useDropzone} from 'react-dropzone';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';

import '../styles/DropFile.css'

export default function Basic(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({accept: 'image/jpeg, image/png'});
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div className="center" style={{width : "80%"}}>
      <div {...getRootProps()} className="divDrop">
        <input {...getInputProps()} />
        <p>{props.message}</p>
        <CloudUploadOutlinedIcon style={{fontSize : "400%"}}/>
      </div>
      <aside>
        <h4>Fichiers</h4>
        <ul>{files}</ul>
      </aside>
    </div>
  );
}