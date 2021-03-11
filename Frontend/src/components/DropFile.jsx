import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import imageCompression from 'browser-image-compression';

import { makeStyles } from "@material-ui/core";

export default function DropFile(props) {

	const useStyles = makeStyles((theme) => ({
		divDrop: {
			"&:hover": {
				backgroundColor: theme.palette.secondary.light
			},
			border: "dashed 2px",
			borderColor: theme.palette.primary.main,
			textAlign: "center",
			cursor: "pointer",
			padding: "0 2%",
			width: "40%",
			minWidth: "250px",
			margin: "auto",
			height: 175,
			position: "relative",
			zIndex: 10,
			[theme.breakpoints.down('sm')]: {
				width: "90%",
				marginBottom: "2%"
			}
		},
		cloudIcon: {
			fontSize: "400%"
		}
	}));

	const classes = useStyles();

	//s'execute lors de l'ajout d'un (ou plusieurs) fichier(s) dans le dropFile
	const onDrop = useCallback(accepted_files => {
		//pour lire tous les fichiers déposés
		accepted_files.forEach(async (file) => {
			//si on veut une compression d'image
			if (props.compressImage) {
				const compressedFile = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 800, useWebWorker: true });
				//retouner les fichiers à l'élément parent
				await props.changeFile(compressedFile);
			} else {
				//retouner les fichiers à l'élément parent
				props.changeFile(file);
			}
		})
	}, [props]);

	//définir les types de fichiers acceptés et le nombre de fichiers à déposer
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop, accept: props.typeFile, maxFiles: 1 });

	//affichage du nom des fichiers déposés
	const files = acceptedFiles.map(file => (
		<p key={file.path}>{file.path.length > 20 ? file.path.substring(0, 20) + "..." : file.path}</p>
	));

	return (
		<div {...getRootProps()} className={classes.divDrop}>
			<input {...getInputProps()} />
			<p>{props.message}</p>
			<CloudUploadOutlinedIcon className={classes.cloudIcon} />
			{files}
		</div>
	);
}