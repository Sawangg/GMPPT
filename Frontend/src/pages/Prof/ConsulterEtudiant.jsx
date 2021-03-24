import React, { useState } from 'react';
import _ from 'lodash';
import moment from 'moment';

import { Redirect } from "react-router-dom";

import { ListItemText, ListItem, List, Divider, Button, ListItemAvatar, Avatar, makeStyles } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import { useDispatch, useSelector } from 'react-redux';
import { selectEssais, selectMessage, selectReponsesJustes, selectEtudiantConsulter, changeMessage, getReponsesCorDB, getEssaisDB } from '../../slice/ConsulterSlice';

import EssaiEtudiant from '../../components/correction/EssaiEtudiant';
import Message from '../../components/correction/Message';
import useConstructor from '../../components/use/useContructor';

export default function Consulter() {

    const useStyles = makeStyles(() => ({
        messageBouton: {
            float: "right",
        }
    }));

    const classes = useStyles();

    const dispatch = useDispatch();

    //le tableau d'essai
    const tabEssais = useSelector(selectEssais);

    //tableau des réponses qui sont justes
    const tabReponsesJustes = useSelector(selectReponsesJustes);

    //message qui est à envoyer
    const message = useSelector(selectMessage);

    //index de l'essai sur lequel les détails du dialogue EssaiEtudiant
    const [indexEssaiDialog, setIndexEssai] = useState(0);

    //booléen pour l'ouvertire des détails de l'essai
    const [openDetails, setOpenDetails] = useState(false);

    //booléen pour l'ouverture du message
    const [openMessage, setOpenMessage] = useState(false);

    //numéro de l'étudiant
    const etudiant = useSelector(selectEtudiantConsulter);

    useConstructor(() => {
        dispatch(getReponsesCorDB({
            idPromo: etudiant.id_promo,
            idEtudiant: etudiant.id_etudiant
        }));
        dispatch(getEssaisDB({
            idEtudiant: etudiant.id_etudiant
        }));
    });

    //affiche un dialog lors d'un clic sur un essai pour avoir plus de détail
    //Paramètres : l'index de l'essai
    const handleClickDetails = (index) => {
        setIndexEssai(index);
        setOpenDetails(true);
    }

    //s'occupe de l'ouverture de l'éditeur du message
    const hancleClickMessage = () => {
        setOpenMessage(true);
    }

    //s'occupe du changement du message au fur et à mesure de sa saisie
    const handleChangeMessage = (msg) => {
        dispatch(changeMessage(msg));
    }

    //PAS ENCORE FAIT LE LIEN A L'API
    //envoie le message à l'étudiant
    const handleSend = () => {
        //console.log("lien avec l'api pour envoyer pas encore fait")
        //console.log(message)
    }

    //le nombre de question juste dans un essai
    //Paramètre : index de l'essai
    const nbQuestionsJustes = (index) => {
        //le nombre de questions justes
        let nb = 0;
        //on analyse chaque question
        tabEssais[index].tabQuestions.forEach(question => {
            //on regarde si il y a le bon nombre de réponses justes
            let indexQ = _.findIndex(tabReponsesJustes, function (o) {
                return o.num === question.num;
            });

            if (indexQ !== -1){

                let questionJuste = question.tabReponses.length === tabReponsesJustes[indexQ].tabReponses.length;
                let i = 0;
                //on regarde si toutes les réponses sont justes
                while (questionJuste && i < question.tabReponses.length) {
                    questionJuste = question.tabReponses[i].justeProf;
                    i++;
                }
                if (questionJuste) {
                    nb++;
                }
                
            }else{
                console.error("Problème pour le calcul du nombre de réponses justes 'Consulter Etudiant'")
            }

        })
        return nb;
    }

    //retourne le nombre de questions
    const nbQuestions = () => {
        return tabReponsesJustes.length;
    }

    //s'occupe de l'icone qui indique si l'essai a été revu par le professeur
    const corrigeIcon = (revu) => {
        if (revu) {
            return (
                <Avatar color="primary">
                    <CheckIcon />
                </Avatar>
            )
        } else {
            return (
                <Avatar color="error">
                    <CloseIcon />
                </Avatar>
            )
        }
    }

    return (
        //on redirige vers la page de correction si il n'y a pas d'id étudiant donné
        etudiant.id_etudiant === undefined
            ? <Redirect to="/prof/gestion-correction" />
            : <div>
                <Button className={classes.messageBouton} variant="contained" color="primary" onClick={hancleClickMessage}>
                    <SendIcon />Envoyer un message à l'étudiant
                    </Button>
                <h1>
                    Etudiant : {etudiant.prenom + ' ' + etudiant.nom}
                </h1>

                {tabEssais === undefined || tabReponsesJustes === undefined 
                    ? null 
                    : <>
                        <List>
                            <Divider />
                            {tabEssais.map((item, index) => (
                                <>
                                    <ListItem button onClick={e => handleClickDetails(index)}>
                                        <ListItemText
                                            primary={"Essai du " + moment(item.dateEssai).format("DD/MM/YYYY")}
                                            secondary={"Questions justes : " + nbQuestionsJustes(index)
                                                + "/" + nbQuestions()} />
                                        <ListItemAvatar>
                                            {corrigeIcon(item.corrige)}
                                        </ListItemAvatar>
                                    </ListItem>
                                    <Divider />
                                </>
                            ))}
                        </List>
                        <EssaiEtudiant indexEssai={indexEssaiDialog} open={openDetails} setOpen={setOpenDetails} />
                    </>
                }

                <Message open={openMessage} destinataire={etudiant.prenom + " " + etudiant.nom} setOpen={setOpenMessage}
                    message={message} handleChangeMessage={handleChangeMessage} handleSend={handleSend} />

            </div>
    );
}