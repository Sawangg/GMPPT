import React, {useState} from 'react';
import _ from "lodash"
import {Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles} from '@material-ui/core';
import {TextField, MenuItem, InputAdornment} from '@material-ui/core';
import LoopIcon from '@material-ui/icons/Loop';
import DeleteIcon from '@material-ui/icons/Delete';


import { useDispatch, useSelector } from 'react-redux';
import { selectUnites, getAllUnite, setTest } from '../../slice/UniteSlice'
import useConstructor from '../use/useContructor';

//props
//  => open (booléen pour savoir si le dialog est ouvert ou fermé)
//  => unite (tableau de parties unités faisant l'unité d'une réponse [{abr : string, puissance : int }])
//  => setTabUnite() (fonction changeant le tableau d'unités)
//  => handleClose() (fonction appelé à la fermeture du dialog (doit s'occupe de fermer le dialog))
export default function ChoixUnite(props){

    const useStyles = makeStyles((theme) => ({
        alignementHorizontal: {
            display : "flex",
            flexDirection: "row",
            justifyContent: "center",
            columnGap: "20px",
            alignItems: "center",
            flexWrap: "wrap"
        },
        buttonDelete: {
            color: theme.palette.error.main,
            "&:hover": {
                color: theme.palette.error.dark,
            }
        },
        buttonGap: {
            display: "flex",
            justifyContent: "center",
            columnGap: "10px"
        },
        choixInput: {
            marginBottom : "10px"
        },
        puissance: {
            width: "40px"
        }
    }));
    const classes = useStyles();

    //Partie unité : 'Kg^3' est une partie d'unité de 'm^2.Kg^3'
    //caractérisé par un    id (identifiant de l'unité dans le tableau unites)
    //                      puissance

    const [actualise, setActualise] = useState(false)

    const [tabUnites, setUnites] = useState([{abr : " ", puissance : 1}])

    const dispatch = useDispatch();  

    const unitesReference = useSelector(selectUnites)

    if(unitesReference.length === 1){
        
        //dispatch(getAllUnite())
    } 

    useConstructor(() => {
        dispatch(getAllUnite())
        //dispatch(setTest())
    });

    const NB_MAX_PARTIES_UNITE = 6
    const MAX_WIDTH = "lg" //taille de la boite de dialogue

    //gère l'ajout d'une partie d'unité dans l'unité de la réponse
    const handleAjouterUnite = () =>{
        let newTab =[...tabUnites, {abr : " ", puissance : 1}]
        setUnites(newTab)
    }

    //remete l'unité à [{id : 0, puissance : 1}], soit sans unité
    const handleRemettreAZero = () =>{
        setUnites([{abr : " ", puissance : 1}])
    }

    const actualiseOpen = () =>{
        if(props.open && !actualise){
            setUnites(_.cloneDeep(props.unite))
            setActualise(true)
        }else if(!props.open && actualise){
            setActualise(false)
        }
    }

    //gère le changement d'unité par action sur le select
    const handleChangeUnite = (index, event) =>{
        let newTab = [...tabUnites]
        newTab[index].abr = event.target.value
        setUnites(newTab)
    }

    //gère la suppression de cette partie d'unité
    const handleDeleteUnite = (index) =>{
        let newTab = [...tabUnites]
        newTab.splice(index, 1)
        setUnites(newTab)
    }

    //gère le changement de la puissance au fur et à mesure que l'étudiant la tape
    //n'accepte que nombres entre -100 et 100
    const handleChangePuissance = (index, event) =>{
        let value = event.target.value
        if((!isNaN(value)&& Math.abs(value) < 100 ) || value==='-' ){
            changePuissance(index, value)
        }
    }

    //lorque l'on quitte le focus sur la puissance, s'assure que la puissance soit bonne
    //si valeur est égal à 0, ou à '-' ou à '', transforme en 1
    const handleBlurUnite = (index) =>{
        let pow = tabUnites[index].puissance
        if(parseInt(pow) === 0 || pow === '-' || pow === ''){
            changePuissance(index, 1)
        }
    }

    //change directement la puissance d'une unité
    const changePuissance = (index, value) =>{
        let newTab = [...tabUnites]
        newTab[index].puissance = value
        setUnites(newTab)
    }

    //gère la fermeture de la fenêtre avec annulation
    const handleAnnuler = () =>{
        props.handleClose()
    }

    //gère la fermeture de la fenêtre avec application
    const handleAppliquer = () =>{
        supprimerIterationsSansUnite()
        props.setTabUnite(tabUnites)
        props.handleClose()
    }

    //supprime les itérations de Sans Unité (abr : " ") qui ne sont pas utiles
    //si le tableau ne contient que des Sans unité, il n'en restera qu'un
    const supprimerIterationsSansUnite = () =>{
        _.remove(tabUnites, function(o){
            return o.abr === " "
        })

        if (tabUnites.length === 0){
            tabUnites.push({abr : " ", puissance : 1})
        }

    }

    //affiche une partie d'unité
    const partieUnite = (partieUnite, index) => {
        return(
            <div className={classes.choixInput}>
              <div className={classes.buttonGap}>
                {tabUnites.length > 1 
                ? 
                <IconButton className={classes.buttonDelete} size="small" onClick={e=>handleDeleteUnite(index)} >
                    <DeleteIcon/>
                </IconButton>
                : null 
                }
              </div>
      
              {/* Select de l'unité */}
              <TextField select value={partieUnite.abr} onChange={e=>handleChangeUnite(index, e)}>
                  {unitesReference.map((i) => 
                  <MenuItem key={i.abrev} value={i.abrev} >
                      {i.nom}
                  </MenuItem>)}
              </TextField>
      
              {/* affiche la modif de puissance que si n'est pas Sans unité */}
              {partieUnite.abr !== " " ? 
              <>
              {/* modif puissance */}
              <TextField value={partieUnite.puissance} className={classes.puissance}
                  onChange={e=>handleChangePuissance(index, e)}
                  onBlur={e=>handleBlurUnite(index)}
                  InputProps={{ startAdornment: (
                          <InputAdornment position="start">
                            ^
                          </InputAdornment>
                          ),
                      }} />
              </>
              : null }
            </div>
          )
    }



    return(
        <Dialog 
            open={props.open} //ouverture gérée dans ItemReponse
            maxWidth={MAX_WIDTH}
            fullWidth={false}
        >
            {actualiseOpen()}
            <DialogTitle className={classes.alignementHorizontal}>
                Choix de l'unité
            </DialogTitle>

            <DialogContent>
                <div className={classes.alignementHorizontal}>
                    {/* affiche un à un les différentes parties d'unités*/}
                    {tabUnites.map((i, index) => 
                        <div key={index}>
                        {partieUnite(i, index)}
                        
                        {/* interserction avec des . entre les parties d'unité */}
                        {index < tabUnites.length-1 ? <b>.</b> : null}
                        </div>
                    )}
                </div>

                {/* boutons d'action dans la fenêtre */}
                <div className={classes.alignementHorizontal}>

                    {/* bouton ajout de partie d"unité */}
                    <Button 
                        variant="contained"
                        color="primary"
                        onClick={handleAjouterUnite}
                        
                        //disabled si on atteint la limite de partie d'unité (6)
                        disabled={tabUnites.length >= NB_MAX_PARTIES_UNITE }
                    >
                        Ajouter Unite
                    </Button>

                    {/* bouton pour remettre à zéro cette unité en entière */}
                    <IconButton size="small" color="primary" onClick={handleRemettreAZero} 
                        title="remettre à 0">
                        <LoopIcon/>
                    </IconButton>

                </div>
            </DialogContent>

            {/* boutons de fermeture de boite de dialogue */}
            <DialogActions>

                {/* bouton pour annuler la modification de l'unité */}
                <Button onClick={handleAnnuler}>
                    Annuler
                </Button>

                {/* bouton pour appliquer à toutes les réponses de la question cette même unité */}
                {/*
                <Button onClick={e=>props.handleClose("appliquer a tous")} 
                    title="appliquer l'unité à toutes les réponses de la question">
                    Appliquer à tous
                </Button>
                */}

                {/* bouton pour appliquer uniquement à cette réponse cette unité */}
                <Button onClick={handleAppliquer}>
                    Appliquer
                </Button>
                
            </DialogActions>
        </Dialog>
    )

}