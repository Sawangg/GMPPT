import React, {useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button} from '@material-ui/core';

const rowsPerPage = 10;

const columns = [
  {id: 'nom', label: 'Nom', minWidth: 170 },
  {id: 'prenom', label: 'Prénom', minWidth: 170 },
  {id: 'promo', label: 'Promo', minWidth: 170},
  {id: 'avancement', label: 'Avancement', minWidth: 170, align: 'right'},
  {id: 'note', label: 'Note actuelle', minWidth: 170, align: 'right'},
  {id: 'sujet', label: "Sujet de l'éleve", minWidth: 170, align: 'right'},
];

//avec le même nom que les id du dessus !
const createData = (nom, prenom, promo, avancement, note, sujet) => {
    avancement = avancement.toString()+"%";
    note = note.toString()+"/20";
    return { nom, prenom, promo, avancement, note, sujet };
}

const boutton = () => {return <Button variant="outlined" color="primary">Consulter</Button>}

const rows = [
  createData('Florian', 'TORIBIO', 'Année 2', 10, 4, boutton()),
  createData('Raphael', 'GAUTHIER', 'Année 2', 80, 17, boutton()),
  createData('Léana', 'RENON', 'Année 2', 50, 16, boutton()),
  createData('Léo', 'MERCIER', 'Année 2', 40, 11, boutton()),
  createData('Sylvain', 'FREDIANI', 'Année 2', 90, 16, boutton()),
  createData('Test', 'TEST', 'Année 1', 100, 20, boutton())
];

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Paper className="center" style={{width : "80%"}}>
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
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover tabIndex={-1} key={row.nom}>
                  {columns.map((column) => { 
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {row[column.id]}
                      </TableCell>
                    );
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
      />
    </Paper>
  );
}