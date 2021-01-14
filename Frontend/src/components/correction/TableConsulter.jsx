import React, {useState} from 'react';
import {
  Button, makeStyles,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination,
  TableRow
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { selectEtudiants, setEtudiantsForTests } from '../../slice/CorrectionSlice';

import {Link} from 'react-router-dom'

export default function StickyHeadTable() {

  const useStyles = makeStyles((theme) => ({
    linkConsulter: {
      textDecoration: "none",
      color: "white"
    }
  }));
  const classes = useStyles();

  const dispatch = useDispatch()

  const [page, setPage] = useState(0);

  const rowsPerPage = 10;

  const tabEtudiants = useSelector(selectEtudiants)

  //met en place le test
  if(tabEtudiants.length <= 1){
    dispatch(setEtudiantsForTests())
  }

  const columns = [
    {id: 'nom', label: 'Nom', minWidth: 170 },
    {id: 'prenom', label: 'Prénom', minWidth: 170 },
    {id: 'promo', label: 'Promo', minWidth: 170},
    {id: 'avancement', label: 'Avancement', minWidth: 170, align: 'right'},
    {id: 'note', label: 'Note actuelle', minWidth: 170, align: 'right'},
    {id: 'sujet', label: "Sujet de l'éleve", minWidth: 170, align: 'right'},
  ];

  const columnConsulterSujet = columns[columns.length - 1]

  //si la colonne demande quelque chose d'autre à ajouter, le rajoutera
  const affichageEnplus = (id) =>{
    let string = ""
    switch (id){
      case "note" : 
        string = "/20"
        break
      case "avancement" :
        string = "%"
        break
      default :
        string = ""
    }
    return string
  }

  //gère le changement de page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  return (
    <Paper>

      <TableContainer>
        <Table stickyHeader aria-label="sticky table">

          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

 
          {/* affiche les lignes de rowd une par une dans le tableau */}
          <TableBody>
            {/* affiche les lignes 10 par 10 */}
            {tabEtudiants.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover tabIndex={-1} key={row.nom}>
                  {/* affiche les infos pour chaque colonne d'élément de rows */}
                  {columns.map((column) => { 
                    return (
                      column.id !== 'sujet' ?

                      //cas des données du tableau d'étudiants
                      <TableCell key={column.id} align={column.align}>
                        {row[column.id]}

                        {/* affiche /20 ou % dans certains cas */}
                        {affichageEnplus(column.id)}
                      </TableCell> 
                      :
                      //cas de la colonne consulter sujet
                      <TableCell key={'sujet'} align={columnConsulterSujet.align}>
                        <Button variant="contained" color="primary">
                          <Link className={classes.linkConsulter} to={"/prof/correction/" + row.id}>
                            Consulter
                          </Link>
                        </Button>
                      </TableCell>
                    )
                  })}
                </TableRow>
              );
            })}
          </TableBody>

        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={tabEtudiants.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
      />

      
      
    </Paper>

    
    
  );
}