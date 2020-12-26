import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import imageCompression from 'browser-image-compression';

import '../styles/DropFile.css'

export default function DropFile(props) {

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(async (file) => {
      if (props.compressImage){
        const compressedFile = await imageCompression(file, {maxSizeMB: 1, maxWidthOrHeight: 800, useWebWorker: true});
        await props.changeFile(compressedFile)
      } else {
        props.changeFile(file)
      }
    })
  }, [props])

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop, accept: props.typeFile, maxFiles : 1})

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