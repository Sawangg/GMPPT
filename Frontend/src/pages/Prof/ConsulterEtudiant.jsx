import React, { useState } from 'react'

import {ListItemText, ListItem, List, Divider, Button} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';

import { useDispatch, useSelector } from 'react-redux'
import { selectEssais, selectReponsesJustes } from '../../slice/ConsulterSlice'
import { setEssaisForTest } from '../../slice/ConsulterSlice'

import EssaiEtudiant from '../../components/correction/EssaiEtudiant'
import Message from '../../components/correction/Message';

import '../../styles/Correction.css'

export default function Consulter(props){

    const dispatch = useDispatch()

    const tabEssais = useSelector(selectEssais)

    const tabReponsesJustes = useSelector(selectReponsesJustes)

    const [indexEssaiDialog, setIndexEssai] = useState(0)

    const [openDetails, setOpenDetails] = useState(false)

    const [openMessage, setOpenMessage] = useState(false)

    if(tabEssais.length === 1){
        dispatch(setEssaisForTest())
    }

    const etu = props.match.params.value

    //affiche un dialog lors d'un clic sur un essai pour avoir plus de détail
    //Paramètres : l'index de l'essai
    const handleClickDetails = (index) =>{
        setIndexEssai(index)
        setOpenDetails(true)
    }

    const hancleClickMessage = () =>{
        setOpenMessage(true)
    }

    //le nombre de question juste dans un essai
    //Paramètre : index de l'essai
    const nbQuestionsJustes = (index) =>{
        //le nombre de questions justes
        let nb = 0
        //on analyse chaque question
        tabEssais[index].tabQuestions.forEach(question => {
            //on regarde si il y a le bon nombre de 
            //PROBLEME !!!!!!!!!!!!!! Flemme de le faire maintenant ;)
            let questionJuste = question.tabReponses.length === tabReponsesJustes[0].tabReponses.length
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

    const nbQuestions = () =>{
        return tabReponsesJustes.length
    }

    return(
        <div>
            <Button className="messageBouton" color="primary" onClick={hancleClickMessage}>
                <SendIcon/>Envoyer un message à l'étudiant
            </Button>
            <h1>
                Etudiant : pas encore fait le lien avec l'API ;) {/*etu.prenom + ' ' + etu.nom*/}
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
                        </ListItem>

                        <Divider />
                    </>
                 ) )}
            </List>

            <EssaiEtudiant indexEssai={indexEssaiDialog} open={openDetails}
                setOpen={setOpenDetails}/>

            <Message open={openMessage} setOpen={setOpenMessage}/>
        </div>
    )
}