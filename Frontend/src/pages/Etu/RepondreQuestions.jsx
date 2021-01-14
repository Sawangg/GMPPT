import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import jsPDF from 'jspdf';
import { Button, makeStyles, Typography } from '@material-ui/core';

import GetAppIcon from '@material-ui/icons/GetApp';

import { useDispatch, useSelector } from "react-redux";
import { selectAllQuestions, selectSujet, getQuestions, getReponses, enregistrerReponses
        } from "../../slice/RepondreQuestionsSlice"
import useConstructor from '../../components/use/useContructor'

import Question from '../../components/reponses/ItemQuestion'
import { etudiantModeleAPI } from '../../utils/api';

export default function RepondreQuestions(){

    const useStyles = makeStyles((theme) => ({
        contenant: {
            margin : "10%",
            textAlign: "center"
        },
        buttonFixed: {
            position: "fixed",
            top : "30px",
            right : "120px"
        }
    }));

    const classes = useStyles();
    const tabQuestions = useSelector(selectAllQuestions);
    const sujet = useSelector(selectSujet);
    const dispatch = useDispatch();

    useConstructor(async () => {
        etudiantModeleAPI().then(modele => {
            dispatch(getQuestions(modele.data[0].id_modele));
            dispatch(getReponses())
        });
    });

    const handleEnvoyerReponses = () =>{
        dispatch(enregistrerReponses(tabQuestions))
    }

    //trandforme en pdf le sujet
    const downloadPdf = () =>{
        const MARGE_COTE = 15
        const MARGE_HAUT = 20
        const MARGE_BAS = 20
        const HAUTEUR_A4 = 297
        const LARGEUR_A4 = 210

        //met le sujet dans la bonne font family
        var sujetForPdf = '<div style="font-family: sans-serif">' + sujet + '</div>'

        //document pdf en format a4
        var doc = new jsPDF('p', 'mm', 'a4')

        var options = {
            pagesplit : true,
            'width' : LARGEUR_A4 - 2 * MARGE_COTE,
            'height' : HAUTEUR_A4 - MARGE_HAUT - MARGE_BAS,
        }

        doc.setFontSize(12)

        //transmet le sujet au document pdf
        doc.fromHTML(sujetForPdf,MARGE_COTE,MARGE_HAUT + 10,options)
        
        doc.addPage()

        var number_of_pages = doc.internal.getNumberOfPages()
        for (var i = 1; i <= number_of_pages; i++) {

            doc.setPage(i)

            //header
            doc.text(MARGE_COTE, MARGE_HAUT, "N° étudiant : 1 - N° sujet : 14582")
            doc.text(LARGEUR_A4 - MARGE_COTE, MARGE_HAUT, "Sujet de Pierre Dupont" , 'right')

            //footer
            doc.setLineWidth(0.5)
            doc.line(MARGE_COTE, HAUTEUR_A4 - MARGE_BAS - 5, LARGEUR_A4-MARGE_COTE, HAUTEUR_A4 - MARGE_BAS - 5)
            doc.text(MARGE_COTE, HAUTEUR_A4 - MARGE_BAS, "Pierre Carillo")
            doc.text(LARGEUR_A4/2, HAUTEUR_A4 - MARGE_BAS, "IUT du Limousin - GMP", "center")
            doc.text(LARGEUR_A4 - MARGE_COTE, HAUTEUR_A4 - MARGE_BAS, "Page " + i + "/" + number_of_pages, "right")
        }

        doc.save("sujet.pdf")
    }

    //affiche les différentes questions avec leurs réponses
    const displayQuestions = () => {
        //n'affiche rien si il n'y a pas de questions
        return tabQuestions.length === 0 ? <div>Pas de questions pour l'instant</div> 
        : tabQuestions.map((i, index) => (
            <Question key={i.indexQuestion} question={i} id={index}/>
        ));
    }

    return (
        <div className={classes.contenant}>
            <Typography variant="h1">Réponses aux questions</Typography>
            <div className={classes.buttonFixed} >
                {/*bouton de téléchargement du sujet en pdf */}
                <Button variant="contained" color="primary" onClick={downloadPdf}>
                    <GetAppIcon/>
                    Télécharger
                </Button>
            </div>

            <h2>Sujet</h2>

            {/* affichage du sujet */ }
            <div id="sujet">{ReactHtmlParser(sujet)}</div>

            {/* affichage des questions */}
            {displayQuestions()}


            <Button variant="contained" color="primary"
                onClick={handleEnvoyerReponses}>
              
                Envoyer les réponses
            </Button>
        </div>
    );
}