import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import { compress } from 'lz-string';

import '../styles/DropFile.css'

export default function DropFile(props) {

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file);
      reader.onload = () =>{
        let rawLog = reader.result;
        let compressRaw = compress(rawLog)
        const data = new FormData() ;
        data.append('file', compressRaw);
        props.changeModele(data)
      };
    })
  }, [props])

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop, accept: 'image/jpeg, image/png', maxSize : 1000000, maxFiles : 1})

  const files = acceptedFiles.map(file => (
      <p key={file.path}>{file.path}</p>
    ));

  return (
      <div {...getRootProps()} className="divDrop center" style={{width : "40%"}}>
        <input {...getInputProps()} />
        <p>{props.message}</p>
        <CloudUploadOutlinedIcon style={{fontSize : "400%"}}/>
        {files}
      </div>
  );
}