import React, {useState} from 'react';
import {
  Button, 
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination,
  TableRow
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import FilterListIcon from '@material-ui/icons/FilterList';

import { useSelector } from 'react-redux';
import { selectEtudiants } from '../../slice/PromoSlice';

export default function StickyHeadTable() {

  // const useStyles = makeStyles((theme) => ({
  //   linkConsulter: {
  //     textDecoration: "none",
  //     color: "white"
  //   }
  // }));

  const [page, setPage] = useState(0);

  const rowsPerPage = 10;

  const tabEtudiants = useSelector(selectEtudiants);

  const columns = [
    {id: 'nom', label: 'Nom', minWidth: 170 },
    {id: 'prenom', label: 'Prénom', minWidth: 170 },
    {id: 'mdp', label: 'Mot de passe', minWidth: 170, align: 'right'},
    {id: 'id', label: 'Sujet n°', minWidth: 170, align: 'right'},
    {id: 'modele', label: "Modèle 3D", minWidth: 170, align: 'right'},
  ];

  //gère le changement de page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const displayColumn = (column, row) => {

    if (column.id === 'mdp'){
        return (
            <Button variant="outlined" color="primary">
                Réinitialiser mot de passe
            </Button>
        )
    }
    else if (column.id === 'modele'){
        return (
            <Button startIcon={row.id%2 === 0 ? <CheckIcon/> : <CloseIcon/>} variant="outlined" color={row.id%2 === 0 ? "primary" : "default"}>
                Ajouter les modèles 3D pour ce sujet
            </Button>
        )
    }
    else {
        return (
            row[column.id]
        )
    }

  }

  const [filtre, setFiltre] = useState(false);

  const EnhancedTableToolbar = () => {
  
    return (
      <Toolbar>
          <Typography style={{width : "98%"}} variant="h6" id="tableTitle" component="div">Promotion</Typography>
          <Tooltip title="filtrer les modèles déja ajoutés">
            <IconButton onClick={() => setFiltre(!filtre)} aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
      </Toolbar>
    );
  };


  return (
    <Paper>
    <EnhancedTableToolbar/>
      <TableContainer >
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
            {tabEtudiants.filter(elem => filtre ? elem.id === 87 : true).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover tabIndex={-1} key={row.nom}>
                  {/* affiche les infos pour chaque colonne d'élément de rows */}
                  {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                            {displayColumn(column, row)}
                      </TableCell>
                  ))}
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