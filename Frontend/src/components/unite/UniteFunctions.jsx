import React from 'react';

//donne en html l'unité en fonction d'un tableau d'unités
//props -> tabUnites ({abr, puissance})
export function afficherUnites(tabUnites) {
    return (
        <div>
            {tabUnites.map((i, index) => (
                <var key={index}>
                    {i.abr}
                    <sup> {i.puissance !== 1 && i.abr !== " " ? i.puissance : null} </sup>
                </var>
            )
            )}
        </div>
    );
}