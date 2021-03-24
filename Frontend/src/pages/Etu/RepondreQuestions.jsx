import React, { useCallback, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import jsPDF from 'jspdf';
import { Button, makeStyles, Typography } from '@material-ui/core';

import GetAppIcon from '@material-ui/icons/GetApp';

import { useDispatch, useSelector } from "react-redux";
import { selectReponses, getSujet, enregistrerReponses, selectSujetEnregistre, etudiantVariables, getModele3D, getEtudiantModele } from "../../slice/RepondreQuestionsSlice";

import useConstructor from '../../components/use/useContructor';
import Question from '../../components/reponses/ItemQuestion';
import PopUp from '../../components/PopUp';

export default function RepondreQuestions() {

    const useStyles = makeStyles(() => ({
        hr: {
            marginBottom: "2%"
        },
        contenant: {
            width: "80%",
            margin: "auto",
        },
        buttonFixed: {
            position: "absolute",
            top: "30px",
            right: "120px"
        },
        sujet: {
            boxShadow: "0px 8px 20px -5px rgba(0,0,0,0.69)",
            padding: "1% 2% 4% 2%",
            margin: "4%"
        },
        center: {
            textAlign: "center",
            display: "block",
            margin: "2% auto"
        },
        modeles: {
            display: "flex",
            justifyContent: "space-around"
        },
        image: {
            width: 200
        }
    }));

    const classes = useStyles();
    const [popUp, setPopUp] = useState(false);
    const reponses = useSelector(selectReponses);
    const isEnregistre = useSelector(selectSujetEnregistre);
    const dispatch = useDispatch();

    useConstructor(() => {
        if (!isEnregistre) {
            dispatch(getEtudiantModele()).then(modele => {
                if (modele.payload[0] !== undefined) {
                    dispatch(getSujet(modele.payload[0].id_modele)).then((sujet) => {
                        dispatch(etudiantVariables(sujet.payload.id_auth));
                        dispatch(getModele3D(sujet.payload.id_auth));
                    });
                } else {
                    alert("erreur, pas de sujet asoscié");
                }
            });
        }
    });

    const handleEnvoyerReponses = useCallback(() => {
        dispatch(enregistrerReponses(reponses.tabQuestions));
        setPopUp(true);
    }, [dispatch, reponses]);

    // Transforme le pdf en sujet
    const downloadPdf = () => {
        let sujetForPdf = `<div id="sujetPDF"> ${reponses.sujet}<br/>`;

        reponses.tabQuestions.forEach(elem => {
            sujetForPdf += `${elem.enonce}<br/>`;
        });
        sujetForPdf += "</div>";

        const pdf = new jsPDF();

        pdf.html(sujetForPdf, {
            callback: (doc) => {
                doc.setFontSize(10);
                doc.setFont("helvetica", "normal");
                doc.addPage();
                const img = new Image();
                img.src = reponses.image1;
                doc.addImage(img, '', 50, 30, 100, 100);
                const img2 = new Image();
                img2.src = reponses.image2;
                doc.addImage(img2, '', 50, 150, 100, 100);

                const number_of_pages = doc.internal.getNumberOfPages();
                for (let i = 1; i <= number_of_pages; ++i) {
                    doc.setPage(i);

                    //header
                    doc.text("N° étudiant : 1 - N° sujet : 14559", 15, 10);
                    doc.text("Sujet de Pierre Dupont", 190, 10, null, null, "right");

                    //footer
                    doc.setDrawColor(136, 139, 141);
                    doc.setLineWidth(0.5);
                    doc.line(10, 280, 200, 280);
                    doc.text("Pierre Carillo", 20, 290);
                    doc.text("IUT du Limousin - GMP", 105, 290, null, null, "center");
                    doc.text(`Page ${i} / ${number_of_pages}`, 190, 290, null, null, "right");
                }
                doc.save('sujet.pdf');
            },
            x: 7,
            y: 14,
        });
    }

    //affiche les différentes questions avec leurs réponses
    const displayQuestions = () => {
        //n'affiche rien si il n'y a pas de questions
        return (
            reponses.tabQuestions.length === 0
                ? <div>Pas de questions pour l'instant</div>
                : reponses.tabQuestions.map((i, index) => (
                    <Question key={i.indexQuestion} question={i} id={index} />
                ))
        );
    }

    return isEnregistre && (
        <div className={classes.contenant}>
            <Typography variant="h1">Réponses aux questions</Typography>
            <hr className={classes.hr} />
            <div className={classes.buttonFixed} >
                {/*bouton de téléchargement du sujet en pdf */}
                <Button variant="contained" color="primary" onClick={downloadPdf}>
                    <GetAppIcon />
                    Télécharger
                </Button>
            </div>

            {/* affichage du sujet */}
            <div className={classes.sujet}>
                <h2 className={classes.center}>Sujet</h2>
                <div id="sujet">{ReactHtmlParser(reponses.sujet)}</div>
            </div>

            <div className={classes.modeles}>
                <div>
                    <img className={classes.image} src={reponses.image1} alt="img modele1" />
                    <p className={classes.center}>modèle 1</p>
                </div>

                <div>
                    <img className={classes.image} src={reponses.image2} alt="img modele2" />
                    <p className={classes.center}>modèle 2</p>
                </div>
            </div>

            {/* affichage des questions */}
            {displayQuestions()}

            <Button variant="contained" color="primary"
                onClick={handleEnvoyerReponses}
                className={classes.center}>
                Envoyer les réponses
            </Button>
            <PopUp severity="success" message="Suppression d'association réussie" open={popUp} handleClose={() => setPopUp(false)} />
        </div>
    );
}