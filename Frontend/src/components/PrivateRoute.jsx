import React, {useState, useEffect} from 'react'
import { Route, Redirect } from "react-router-dom";

import Navbar from './Navbar'

import { getUserDetails } from '../utils/api.js';

export default function PrivateRoute ({forProf, component: Component, ...rest}) {
  
  const [connect, setConnect] = useState();
  const [info, setInfo] = useState({pseudo : "oucouc", password : "cocou", prof : ""})

    useEffect(() => {
      let justOne = true;
      if(justOne){
        getUserDetails()
        .then((data) => {
          if (Boolean(Number(data.data.isProf)) === forProf){
              setConnect(true);
              setInfo({pseudo : data.data.username, password : data.data.password, prof : data.data.isProf});
          } else {
            setConnect(false);
          }
        })
        .catch(() => setConnect(false));
      }
      return () => justOne = false;
    });

    const selection = (props) => {
      if (connect !== undefined){
        return connect
            ? <div>
                <Navbar/> 
                <Component info={info} {...props} /> 
              </div>
            : <Redirect to="/" />
      }
    }

      return (
          <Route {...rest} render={props => (
            selection(props)
          )} />
      );
};