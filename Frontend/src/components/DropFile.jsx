import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import imageCompression from 'browser-image-compression';

import '../styles/DropFile.css'

export default function DropFile(props) {

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(async (file) => {
        const compressedFile = await imageCompression(file, {maxSizeMB: 0.5, maxWidthOrHeight: 500, useWebWorker: true});
        await props.changeModele(compressedFile)
    })
  }, [props])

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop, accept: 'image/jpeg, image/png', maxFiles : 1})

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