import React, { useState } from 'react';
import _ from "lodash";

import { Button, Toolbar, Typography, Tooltip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import FilterListIcon from '@material-ui/icons/FilterList';

import { useSelector } from 'react-redux';
import { selectEtudiants } from '../../slice/PromoSlice';

export default function StickyHeadTable() {

	const [page, setPage] = useState(0);
	const [filtre, setFiltre] = useState(false);
	const tabEtudiants = useSelector(selectEtudiants);
	const rowsPerPage = 10;

	const columns = [
		{ id: 'nom', label: 'Nom', minWidth: 170 },
		{ id: 'prenom', label: 'Prénom', minWidth: 170 },
		{ id: 'mdp', label: 'Mot de passe', minWidth: 170, align: 'right' },
		{ id: 'sujet', label: 'Sujet n°', minWidth: 170, align: 'right' },
		{ id: 'modele', label: "Modèle 3D", minWidth: 170, align: 'right' },
	];

	//gère le changement de page
	const handleChangePage = (_event, newPage) => {
		setPage(newPage);
	};

	const displayColumn = (column, row) => {
		if (column.id === 'mdp') {
			return (
				<Button variant="outlined" color="primary">
					Réinitialiser mot de passe
				</Button>
			);
		} else if (column.id === 'modele') {
			if (row.id !== null) {
				let indexEtu = _.findIndex(tabEtudiants, (o) => {return o.id === row.id});

				if (indexEtu === -1){
					return null
				}

				if (tabEtudiants[indexEtu].image1 && tabEtudiants[indexEtu].image2 ){
					return (
						<Button startIcon={<CheckIcon />} variant="outlined" color={"primary"}>
							Ajouter les modèles 3D pour ce sujet
						</Button>
					);
				}else{
					return (
						<Button startIcon={<CloseIcon />} variant="outlined" color={"default"}>
							Ajouter les modèles 3D pour ce sujet
						</Button>
					);
				}
			}
		} else {
			return (row[column.id]);
		}
	}

	const EnhancedTableToolbar = () => {
		return (
			<Toolbar>
				<Typography style={{ width: "98%" }} variant="h6" id="tableTitle" component="div">Promotion</Typography>
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
			<EnhancedTableToolbar />
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

					{/* affiche les lignes de row une par une dans le tableau */}
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