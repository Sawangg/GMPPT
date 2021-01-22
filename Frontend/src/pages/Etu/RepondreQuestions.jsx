import React, { useCallback } from 'react';
import ReactHtmlParser from 'react-html-parser';
import jsPDF from 'jspdf';
import { Button, makeStyles, Typography } from '@material-ui/core';

import GetAppIcon from '@material-ui/icons/GetApp';

import { useDispatch, useSelector } from "react-redux";
import { selectReponses , getSujet, enregistrerReponses, selectSujetEnregistre, etudiantVariables, getModele3D, getEtudiantModele } from "../../slice/RepondreQuestionsSlice"

import useConstructor from '../../components/use/useContructor'

import Question from '../../components/reponses/ItemQuestion'

export default function RepondreQuestions(){

    const useStyles = makeStyles((theme) => ({
        hr: {
            marginBottom: "2%"
        },
        contenant: {
            margin : "10%",
        },
        buttonFixed: {
            position: "absolute",
            top : "30px",
            right : "120px"
        }
    }));

    const classes = useStyles();
    const reponses = useSelector(selectReponses);
    const isEnregistre = useSelector(selectSujetEnregistre);
    const dispatch = useDispatch();

    useConstructor(() => {
        if (!isEnregistre){
            dispatch(getEtudiantModele())
            .then(modele => {
                dispatch(getSujet(modele.payload[0].id_modele))
                .then((sujet) => {
                    dispatch(etudiantVariables(sujet.payload.id_auth));
                    dispatch(getModele3D(sujet.payload.id_auth));
                });
            })
        }
    });


    const handleEnvoyerReponses = useCallback(() => {
        dispatch(enregistrerReponses(reponses.tabQuestions))
    }, [dispatch, reponses]);

    //trandforme en pdf le sujet
    const downloadPdf = () => {
        const MARGE_COTE = 15
        const MARGE_HAUT = 20
        const MARGE_BAS = 20
        const HAUTEUR_A4 = 297
        const LARGEUR_A4 = 210

        //met le sujet dans la bonne font family
        let sujetForPdf = '<h1 style="font-family: sans-serif; display : block; margin : auto;">' + reponses.sujet + '</h1><br/><br/><br/><br/><hr>'

        reponses.tabQuestions.forEach((elem, index) => {
            sujetForPdf+=
                `<p>Question ${index+1} :</p>
                <br/>
                ${elem.enonce}
                <br/><br/>`;
        });

        //document pdf en format a4
        let doc = new jsPDF('p', 'mm', 'a4')

        let options = {
            pagesplit : true,
            'width' : LARGEUR_A4 - 2 * MARGE_COTE,
            'height' : HAUTEUR_A4 - MARGE_HAUT - MARGE_BAS,
        }

        doc.setFontSize(12)

        //transmet le sujet au document pdf
        doc.addHTML(sujetForPdf,MARGE_COTE,MARGE_HAUT + 10,options)
        
        doc.addPage()

        //ajout image
        const img = new Image()
        img.src = reponses.image1;
        doc.addImage(img, 'jpg', 10, 78, 50, 15);

        let number_of_pages = doc.internal.getNumberOfPages()
        for (let i = 1; i <= number_of_pages; i++) {

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
        return reponses.tabQuestions.length === 0 ? <div>Pas de questions pour l'instant</div> 
        : reponses.tabQuestions.map((i, index) => (
            <Question key={i.indexQuestion} question={i} id={index}/>
        ));
    }

    return isEnregistre && (
        <div className={classes.contenant}>
            <Typography variant="h1">Réponses aux questions</Typography>
            <hr className={classes.hr}/>
            <div className={classes.buttonFixed} >
                {/*bouton de téléchargement du sujet en pdf */}
                <Button variant="contained" color="primary" onClick={downloadPdf}>
                    <GetAppIcon/>
                    Télécharger
                </Button>
            </div>

            {/* affichage du sujet */ }
            <div style={{boxShadow: "0px 8px 20px -5px rgba(0,0,0,0.69)", padding: "1% 2% 4% 2%", margin : "4%"}}>
                <h2 style={{textAlign : "center"}}>Sujet</h2>
                <div id="sujet">{ReactHtmlParser(reponses.sujet)}</div>
            </div>
           

            <div style={{display : "flex", justifyContent : "space-around"}}>
                <div>
                    <img style={{width : 200}} src={reponses.image1} alt="img modele1"/>
                    <p style={{textAlign : "center"}}>modèle 1</p>
                </div>

                <div>
                    <img style={{width : 200}} src={reponses.image2} alt="img modele2"/>
                    <p style={{textAlign : "center"}}>modèle 2</p>
                </div>
            </div>
            

            {/* affichage des questions */}
            {displayQuestions()}


            <Button variant="contained" color="primary"
                onClick={handleEnvoyerReponses}>
              
                Envoyer les réponses
            </Button>
        </div>
    );
}