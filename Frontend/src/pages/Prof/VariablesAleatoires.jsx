import React from 'react';
import { TextField, Typography, Slider } from '@material-ui/core';

export default function VariablesAleatoires() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      function valueLabelFormat(value) {
          if (value !== 0){
            return `10^-${value}`;
          } else {
              return 0
          }
      }

    return (
        <div style={{display : "flex"}}>
             <TextField 
                    className="fieldNomCategorie" 
                    multiline 
                    label="Nom de la variable" 
                    variant="outlined" 
                    size="small" 
                    // value={props.item.nom} 
                    // onChange={e => dispatch(changeNom({index : props.index, event : e.target.value}))}
                />
                <div>
                <TextField 
                    className="fieldNomCategorie" 
                    multiline 
                    label="Valeur min" 
                    variant="outlined" 
                    size="small" 
                />
                <TextField 
                    className="fieldNomCategorie" 
                    multiline 
                    label="Valeur max" 
                    variant="outlined" 
                    size="small" 
                />
                </div>
                <div>
                <Slider
                    value={value}
                    min={0}
                    step={1}
                    max={6}
                    getAriaValueText={valueLabelFormat}
                    valueLabelFormat={valueLabelFormat}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="non-linear-slider"
                />
                <Typography gutterBottom>Précision</Typography>
                </div>
        </div>
    )

}