import React from 'react';

import { useSelector } from "react-redux";
import { selectUserName } from "../slice/UserSlice"

export default function Profile(props){

    const user = useSelector(selectUserName);

    return(
        <div>
            <p>{user.name}</p>
            <p>{user.password}</p>
        </div>
    );

}