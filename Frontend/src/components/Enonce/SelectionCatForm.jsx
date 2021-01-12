import React, { useState } from "react";
import { Button, Input, MenuItem, Select } from "@material-ui/core";
import PropagateLoader from "react-spinners/PropagateLoader";

import { useSelector } from "react-redux";
import { selectActualise, selectFormule } from "../../slice/FormulesSlice";

export default function SelectionCatForm() {
    const catForm = useSelector(selectFormule);
    const actualise = useSelector(selectActualise);

    const [tab, setTab] = useState([{selectCat : "", selectForm : ""}]);

    const handleChangeCat = (event, id) => {
        let arrayCopy = [...tab];
        arrayCopy[id] = {selectCat : event.target.value, selectForm : arrayCopy[id].selectForm}
        setTab(arrayCopy);
    }

    const handleChangeFormule = (event, id) => {
        let arrayCopy = [...tab];
        arrayCopy[id] = {selectCat : arrayCopy[id].selectCat, selectForm : event.target.value}
        setTab(arrayCopy);
    }

    const addElem = () =>{
        setTab([...tab, {selectCat : "", selectForm : ""}])
    }

    const displayElem = (id, elem) =>{
        return (
            <div key={id}>
                    <Select style={{width : 200}} value={elem.selectCat} onChange={e => handleChangeCat(e, id)} input={<Input/>}>
                        {!actualise ? <PropagateLoader size={15} color={"rgb(7, 91, 114)"} css={{margin : "30px auto", display : "flex", justifyContent : "center"}}/> :
                            catForm.map((item, index) => <MenuItem key={index} value={index}>{item.nom}</MenuItem>)}
                    </Select>
                    {elem.selectCat === "" ? null 
                    :<>
                        <Select style={{width : 200}} value={elem.selectForm} onChange={e => handleChangeFormule(e, id)} input={<Input/>}>
                            {catForm[elem.selectCat].tabFormule.map((item, index) => <MenuItem key={index} value={index}>{item.nomFormule}</MenuItem>)}
                        </Select>
                    </>
                }
            </div>
        )
    }


    return (
        <div>
            <Button onClick={() => addElem()}>Ajouter</Button>
            {tab.map((elem, index) => (
                displayElem(index, elem)
            ))}
        </div>
    )
}