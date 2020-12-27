import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import jsPDF from 'jspdf';
import {Button} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';

import { useSelector } from "react-redux";
import {selectAll } from "../../slice/RepondreQuestionsSlice"

import Items from '../../components/reponses/ItemQuestion'

import '../../styles/RepondreQuestions.css'


export default function RepondreQuestions(){

    const questionsTab = useSelector(selectAll)
    
    const unitesTab = [
        {index : 0, nom : "Sans unité", abrv : " "}, 
        {index : 1, nom : "Newton", abrv : "N"}, 
        {index : 2, nom : "Kilogamme", abrv: "Kg"}]

    const sujet = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt leo est, in placerat ex cursus id. In malesuada scelerisque leo, ut pharetra ligula venenatis laoreet. Duis in elementum est. Ut aliquam diam ultrices, sagittis nibh sit amet, <b> tincidunt ipsum </b>. Aliquam ac mauris dignissim, porttitor urna in, lacinia urna. Donec rhoncus consectetur eros ac ullamcorper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc commodo a enim ac ultricies. Vestibulum egestas molestie urna, in posuere odio tempus sit amet. Morbi facilisis sit amet dolor non ultrices. Donec dapibus commodo justo ac tempus. In hac habitasse platea dictumst. Curabitur ultricies iaculis lorem nec interdum. Etiam vel odio ligula. Suspendisse vestibulum nisi et risus posuere varius. In hac habitasse platea dictumst.</p>"


    const downloadPdf = () =>{
        const MARGE_COTE = 15;
        const MARGE_HAUT = 20;
        const MARGE_BAS = 20;
        const HAUTEUR_A4 = 297;
        const LARGEUR_A4 = 210;

        var doc = new jsPDF('p', 'mm', 'a4');

        var options = {
            pagesplit : true,
            'width' : LARGEUR_A4 - 2 * MARGE_COTE,
            'height' : HAUTEUR_A4 - MARGE_HAUT - MARGE_BAS,
        }

        doc.setFontSize(12);

        doc.fromHTML(sujet,MARGE_COTE,MARGE_HAUT + 10,options);
        doc.addPage();

        var number_of_pages = doc.internal.getNumberOfPages();
        for (var i = 1; i <= number_of_pages; i++) {

            doc.setPage(i);

            //header
            doc.text(MARGE_COTE, MARGE_HAUT, "N° étudiant : 1 - N° sujet : 14582");
            doc.text(LARGEUR_A4 - MARGE_COTE, MARGE_HAUT, "Sujet de Pierre Dupont" , 'right');

            //footer
            doc.setLineWidth(0.5);
            doc.line(MARGE_COTE, HAUTEUR_A4 - MARGE_BAS - 5, LARGEUR_A4-MARGE_COTE, HAUTEUR_A4 - MARGE_BAS - 5);
            doc.text(MARGE_COTE, HAUTEUR_A4 - MARGE_BAS, "Pierre Carillo");
            doc.text(LARGEUR_A4/2, HAUTEUR_A4 - MARGE_BAS, "IUT du Limousin - GMP", "center");
            doc.text(LARGEUR_A4 - MARGE_COTE, HAUTEUR_A4 - MARGE_BAS, "Page " + i + "/" + number_of_pages, "right");
        }

        doc.save("sujet.pdf");
    }

    const displayQuestions = () => {
        return questionsTab.length === 0 ? <div>Pas de questions pour l'instant</div> 
        : questionsTab.map((i) => (
            <Items question={i} unites={unitesTab}/>
        ))
    }

    return(<div className="contenant">
        
        <div className="buttonFixed" >
            <Button variant="contained" color="secondary" onClick={downloadPdf}>
                <GetAppIcon/>
                Télécharger
            </Button>
        </div>
        <h1>Répondre aux questions</h1>
        
        <h2>Sujet</h2>
        <div id="sujet">{ReactHtmlParser(sujet)}</div>
        {displayQuestions()}
    </div>);
}