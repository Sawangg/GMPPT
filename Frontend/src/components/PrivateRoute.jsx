import React, {useEffect, useState} from 'react'
import { Route, Redirect } from "react-router-dom";

import Navbar from './Navbar'

import { getUserDetails } from '../utils/api.js';

export default function PrivateRoute ({component: Component, ...rest}) {

  const [connect, setConnect] = useState(true);

    useEffect(() => {
    let justOne = true;
    getUserDetails().then(() => {
      console.log("connecté")
      if(justOne){
        setConnect(true)
      }
    }).catch(() => {
      console.log("pas connecté")
      if(justOne){
        setConnect(false)
      }
    })
    return () => justOne = false;
  }, [connect]);

      return (
          <Route {...rest} render={props => (
              connect 
              ? <>
              <Navbar/> 
              <Component {...props} /> 
              </>
              : <Redirect to="/login" />
          )} />
      );
};