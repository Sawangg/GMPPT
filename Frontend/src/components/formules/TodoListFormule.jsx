import React, { useCallback, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';

import Item from './ItemFormule';
import PopUp from '../PopUp';

import { useDispatch, useSelector } from "react-redux";
import { addFormule, undoFormule, selectTabFormuleLength } from "../../slice/FormulesSlice";

const TodoListFormule = ({ indexCategorie }) => {

    const useStyles = makeStyles(() => ({
        buttonAjouterFormule: {
            display: "block",
            margin: "6% auto 0 auto",
        }
    }));

    const classes = useStyles();

    const [openPopUpSave, setOpenPopUpSave] = useState(false);

    const dispatch = useDispatch();
    const tabFormuleLength = useSelector(selectTabFormuleLength(indexCategorie));
    const { max_formule } = window;

    const undo = () => {
        dispatch(undoFormule())
        setOpenPopUpSave(false);
    }

    const ajout = useCallback(() => {
        dispatch(addFormule(indexCategorie));
    }, [dispatch, indexCategorie]);

    return (
        <div>
            {Array(tabFormuleLength).fill(0).map((_, index) => (
                <Item onRemove={() => setOpenPopUpSave(true)} indexFormule={index} length={tabFormuleLength} key={index} indexCategorie={indexCategorie} />
            ))}
            <Button
                className={classes.buttonAjouterFormule}
                disabled={tabFormuleLength >= max_formule}
                variant="contained"
                color="primary"
                onClick={() => ajout()}
            >
                Ajouter des formules
            </Button>
            <PopUp
                message="Formule supprimée"
                actionName="RETOUR"
                action={() => undo()}
                open={openPopUpSave}
                handleClose={() => setOpenPopUpSave(false)}
                pos="right"
            />
        </div>
    );
}

export default React.memo(TodoListFormule);