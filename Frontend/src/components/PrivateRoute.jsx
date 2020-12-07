import React, {useState} from 'react'
import { Route, Redirect } from "react-router-dom";

import Navbar from './Navbar'

import { getUserDetails } from '../utils/api.js';

export default function PrivateRoute ({component: Component, ...rest}) {
  
  const [connect, setConnect] = useState();

    const detectConnexion = async () => {
      await getUserDetails().then(() => {
        setConnect(true);
      }).catch(() => {
        setConnect(false);
      });
    }

    detectConnexion();

    const selection = (props) => {
      if (connect !== undefined){
        return connect
            ? <>
            <Navbar/> 
            <Component {...props} /> 
            </>
            : <Redirect to="/login" />
      }
    }

      return (
          <Route {...rest} render={props => (
            selection(props)
          )} />
      );
};