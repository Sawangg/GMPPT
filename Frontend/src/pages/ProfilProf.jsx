import React from 'react';

export default function Profile(props){

    return(
        <div>
            <p>{props.info.pseudo}</p>
            <p>{props.info.password}</p>
        </div>
    );

}