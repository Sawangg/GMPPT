import React, { useState } from 'react';
import { Fab, makeStyles, Typography } from '@material-ui/core';
import CircleLoader from "react-spinners/CircleLoader";
import AddIcon from '@material-ui/icons/Add';

import Items from '../../components/formules/ItemCategorie';
import useConstructor from '../../components/use/useContructor';
import useUnload from '../../components/use/useUnload';
import SelectionModele from '../../components/SelectionModele';
import EnregistrementFormule from '../../components/formules/EnregistrementFormule';

import { useDispatch, useSelector } from "react-redux";
import { selectTabCategorieLength, selectActualiseFormule, selectEnregistreFormule, addCategorie, getCategoriesFormules } from "../../slice/FormulesSlice";
import { selectIdModeleSelectionne } from "../../slice/ModeleSlice";

export default function TodoListAccordeon() {

    const useStyles = makeStyles(() => ({
        hr: {
            width: "80%",
            marginBottom: "2%"
        },
        fab: {
            marginLeft: "3%",
            marginBottom: "2%"
        }
    }));

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const tabCatLength = useSelector(selectTabCategorieLength);
    const actualise = useSelector(selectActualiseFormule);
    const isEnregistre = useSelector(selectEnregistreFormule);
    const idModele = useSelector(selectIdModeleSelectionne);
    const { max_catformule } = window;

    useConstructor(() => {
        if (!isEnregistre) {
            idModele === null ? setOpen(true) : dispatch(getCategoriesFormules(idModele));
        }
    });

    useUnload(!isEnregistre);

    const displayFormule = () => {
        return (
            <div>
                <Typography variant="h1">FORMULES</Typography>
                <hr className={classes.hr} />
                <Fab className={classes.fab}
                    disabled={tabCatLength >= max_catformule}
                    size="small"
                    color="primary"
                    aria-label="add"
                    onClick={() => dispatch(addCategorie())}
                >
                    <AddIcon />
                </Fab>
                {Array(tabCatLength).fill(0).map((_, index) => (
                    <Items index={index} key={index} length={tabCatLength} />
                ))}
                <EnregistrementFormule />
            </div>
        );
    }

    return (
        idModele === null
            ? <SelectionModele tard={false} setClose={() => setOpen(false)} open={open} />
            : actualise ? displayFormule() : <CircleLoader size={50} color={"rgb(7, 91, 114)"} css={{ margin: "auto", display: "flex", justifyContent: "center" }} />
    );
}