import React, { memo } from "react";

import { FixedSizeList as List, areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import ItemVariablesAleatoire from "../../components/variable/ItemVariableAleatoire";
import { useDispatch, useSelector } from "react-redux";
import { selectVariablesAleatoires, removeVariable } from "../../slice/VariablesAleatoiresSlice";

import "../../styles/Test.css";

export default function Test() {
  const dispatch = useDispatch();
  const tableauVariables = useSelector(selectVariablesAleatoires);

  
  const Row = memo(
    (props) => {
      const { index, style } = props;

      //supprimer une ligne de variables aléatoires
      const remove = (index) => {
        dispatch(removeVariable(index));
        //setOpenPopUpUndo(true);
      };
      
      return (
        <div
          className={index % 2 ? "ListItemOdd" : "ListItemEven"}
          style={{
            ...style,
            backgroundColor: "white",
          }}
        >
          <ItemVariablesAleatoire
            removeVariable={() => remove(index)}
            length={tableauVariables.length}
            key={index}
            index={index}
            item={tableauVariables[index]}
          />
        </div>
      );
    }, areEqual);

  return (
    <AutoSizer>
    {({ width }) => (
        <List
        className="List"
        height={500}
        itemCount={tableauVariables.length}
        itemSize={100}
        width={width}
      >
        {Row}
      </List>
    )}
    </AutoSizer>
  );
}
