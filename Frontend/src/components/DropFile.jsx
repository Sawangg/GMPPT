import React from 'react';
import {useDropzone} from 'react-dropzone';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import { compress, decompress } from 'lz-string'

import '../styles/DropFile.css'

export default function DropFile(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({accept: 'image/jpeg, image/png', maxSize : 1000000});

  const envoie = () =>{
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file);
      reader.onload = () =>{
        let rawLog = reader.result;
        convertUrlToImage(rawLog)
      };
    })
    }

  const convertUrlToImage = (rawLog) =>{
    let test = compress(rawLog);
    let ok = decompress(test);
    console.log(test.length)
    console.log(ok.length)
    let newImage = document.createElement('img');
    newImage.style.width = '200px';
    newImage.src = rawLog;
    document.getElementById("imgTest").innerHTML = newImage.outerHTML;
  }

  function bytesToSize(bytes) { 
    let sizes = ['Bytes', 'Ko', 'Mo', 'Go', 'To']; 
    let i = parseInt(Math.floor(Math.log(bytes)/Math.log(1024))); 
    return Math.round(bytes/Math.pow(1024, i), 2) + ' ' + sizes[i]; 
  }; 
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {bytesToSize(file.size)}
    </li>
  ));

  return (
    <div className="center" style={{width : "80%"}}>
      <div {...getRootProps()} className="divDrop">
        <input {...getInputProps()} />
        <p>{props.message}</p>
        <CloudUploadOutlinedIcon style={{fontSize : "400%"}}/>
      </div>
      <div id="TheImageContents"></div>
      <aside>
        <h4>Fichiers</h4>
        <ul>{files}</ul>
        <div id="imgTest"></div>
        <button onClick={e => envoie()}>Envoyer</button>
      </aside>
    </div>
  );
}