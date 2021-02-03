import React, { useState } from 'react'
import _ from 'lodash'

import { Redirect } from "react-router-dom";

import {ListItemText, ListItem, List, Divider, Button, ListItemAvatar,Avatar, makeStyles} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import { useDispatch, useSelector } from 'react-redux'
import { selectEssais, selectMessage, selectReponsesJustes, selectEtudiantConsulter } from '../../slice/ConsulterSlice'
import { setEssaisForTest, changeMessage, getEssaisDB } from '../../slice/ConsulterSlice'

import EssaiEtudiant from '../../components/correction/EssaiEtudiant'
import Message from '../../components/correction/Message';
import useConstructor from '../../components/use/useContructor';

export default function Consulter(props){

    const useStyles = makeStyles((theme) => ({
        messageBouton: {
            float : "right",
        }
    }));
    const classes = useStyles();

    const dispatch = useDispatch()

    //le tableau d'essai
    const tabEssais = useSelector(selectEssais)

    //tableau des réponses qui sont justes
    const tabReponsesJustes = useSelector(selectReponsesJustes)

    //message qui est à envoyer
    const message = useSelector(selectMessage)

    //index de l'essai sur lequel les détails du dialogue EssaiEtudiant
    const [indexEssaiDialog, setIndexEssai] = useState(0)

    //booléen pour l'ouvertire des détails de l'essai
    const [openDetails, setOpenDetails] = useState(false)

    //booléen pour l'ouverture du message
    const [openMessage, setOpenMessage] = useState(false)

    //numéro de l'étudiant
    const etudiant = useSelector(selectEtudiantConsulter)

    useConstructor(() => {
        dispatch(getEssaisDB({
            idPromo : etudiant.id_promo,
            idEtudiant : etudiant.id_etudiant
        }))
    });

    //affiche un dialog lors d'un clic sur un essai pour avoir plus de détail
    //Paramètres : l'index de l'essai
    const handleClickDetails = (index) =>{
        setIndexEssai(index)
        setOpenDetails(true)
    }

    //s'occupe de l'ouverture de l'éditeur du message
    const hancleClickMessage = () =>{
        setOpenMessage(true)
    }

    //s'occupe du changement du message au fur et à mesure de sa saisie
    const handleChangeMessage = (message) =>{
        dispatch(changeMessage(message))
    }

    //PAS ENCORE FAIT LE LIEN A L'API
    //envoie le message à l'étudiant
    const handleSend = () =>{
        console.log("lien avec l'api pour envoyer pas encore fait")
        console.log(message)
    }

    //le nombre de question juste dans un essai
    //Paramètre : index de l'essai
    const nbQuestionsJustes = (index) =>{
        //le nombre de questions justes
        let nb = 0
        //on analyse chaque question
        tabEssais[index].tabQuestions.forEach(question => {
            //on regarde si il y a le bon nombre de réponses justes
            let indexQ = _.findIndex(tabReponsesJustes, function(o) { return o.num === question.num; })
            let questionJuste = question.tabReponses.length === tabReponsesJustes[indexQ].tabReponses.length
            let i = 0
            //on regarde si toutes les réponses sont justes
            while (questionJuste && i < question.tabReponses.length){
                questionJuste = question.tabReponses[i].justeProf
                i++
            }
            if (questionJuste){
                nb++
            }
        })
        return nb
    }

    //retourne le nombre de questions
    const nbQuestions = () =>{
        return tabReponsesJustes.length
    }

    //s'occupe de l'icone qui indique si l'essai a été revu par le professeur
    const corrigeIcon = (revu) =>{
        if (revu) {
            return(
                <Avatar color="primary">
                    <CheckIcon />
                </Avatar>
            )
        }else{
            return(
                <Avatar color="error">
                    <CloseIcon />
                </Avatar>
            )
        }
    }

    return(
        etudiant.id_etudiant === undefined ?
        <Redirect to="/prof/gestion-correction"/>
        :
        <div>
            <Button className={classes.messageBouton} variant="contained" color="primary" onClick={hancleClickMessage}>
                <SendIcon/>Envoyer un message à l'étudiant
            </Button>
            <h1>
                Etudiant : {etudiant.prenom + ' ' + etudiant.nom}
            </h1>   

            <List>
                <Divider />
                {tabEssais.map((item, index) => (
                    <>
                        <ListItem button onClick={e => handleClickDetails(index)}>
                            <ListItemText
                                primary={"Essai du " + item.dateEssai}
                                secondary={"Questions justes : " + nbQuestionsJustes(index)
                                    +  "/" + nbQuestions()}/>
                            <ListItemAvatar>
                                {corrigeIcon(item.corrige)}
                            </ListItemAvatar>
                        </ListItem>

                        <Divider />
                    </>
                 ) )}
            </List>

            <EssaiEtudiant indexEssai={indexEssaiDialog} open={openDetails}
                setOpen={setOpenDetails}/>

            <Message open={openMessage} destinataire={etudiant.prenom + " " + etudiant.nom} setOpen={setOpenMessage} 
            message={message} handleChangeMessage={handleChangeMessage} handleSend={handleSend}/>
        </div>
    )
}