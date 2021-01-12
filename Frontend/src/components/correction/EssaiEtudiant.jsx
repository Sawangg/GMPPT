import React from 'react'

import { Table, TableContainer, TableHead, TableRow, Paper, TableCell, TableBody, Typography, IconButton, DialogActions, Button } from '@material-ui/core'
import { Dialog, DialogContent, DialogTitle} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'

import { useDispatch, useSelector } from 'react-redux'
import { changeReponseJuste, selectEssaisWithID } from '../../slice/ConsulterSlice'

export default function EssaiEtudiant(props){

    const dispatch = useDispatch()

    const essai = useSelector(selectEssaisWithID(props.indexEssai))

    const handleClose = () =>{
        props.setOpen(false)
    }

    const handleClickJuste = (indexQ, indexR) =>{
        dispatch(changeReponseJuste({
            indexE : props.indexEssai,
            indexQ : indexQ,
            indexR : indexR
        }))
    }

    //bouton du prof pour dire si une réponse est juste ou non
    //paramètres : index de la question, index de la reponse, bool
    const boutonJustePourProf = (indexQ, indexR, juste) =>{
        return(
            <IconButton onClick={e=>handleClickJuste(indexQ, indexR)}>
                {iconeJuste(juste)}
            </IconButton>
        )
    }


    //élément de la dernière colonne 
    const iconeJuste = (juste) =>{
        return(
            juste
            ?
            <CheckIcon/>
            :
            <ClearIcon/>
        )
        
    }

    return(
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>
                Essai du {essai.dateEssai}
            </DialogTitle>

            <DialogContent>
                {console.log(essai)}
                {essai.tabQuestions.map((question, indexQuestion)=>{
                    return(
                        <>
                        <Typography variant="h6">Question 1</Typography>
                        <TableContainer component={Paper} >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Valeur donnée
                                        </TableCell>
                                        <TableCell>
                                            Ecart avec la bonne valeur
                                        </TableCell>
                                        <TableCell>
                                            Conseil de l'application
                                        </TableCell>
                                        <TableCell>
                                            Votre avis
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {question.tabReponses.map((reponse, indexReponse) =>
                                    <TableRow>
                                        {/* Valeur donnée par l'étudiant */}
                                        <TableCell>
                                            {reponse.value}
                                        </TableCell>
                                        {/* Ecart avec la valeur juste */}
                                        <TableCell>
                                            {reponse.ecart}
                                        </TableCell>
                                        <TableCell align="center">
                                            {iconeJuste(reponse.justeApp)}
                                        </TableCell>
                                        {/* Réponse juste où non */}
                                        <TableCell align="center">
                                            {boutonJustePourProf(indexQuestion, indexReponse, reponse.justeProf)}
                                        </TableCell>
                                    </TableRow>)
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {
                            question.justif !== "" ?
                            <>
                            <Typography variant = "h6">Justification de l'étudiant :</Typography>
                            {console.log(question)}
                            <p>{question.justif}</p>
                            </>
                            :
                            <Typography variant = "h6">Pas de justification de l'étudiant</Typography>

                        }
                        
                        </>
                    )})}
                
                
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Fermer</Button>
            </DialogActions>

        </Dialog>
    )

}