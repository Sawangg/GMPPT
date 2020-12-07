import React, {useState, useEffect} from 'react'
import { Route, Redirect } from "react-router-dom";

import Navbar from './Navbar'

import { getUserDetails } from '../utils/api.js';

export default function PrivateRoute ({component: Component, ...rest}) {
  
  const [connect, setConnect] = useState();

    useEffect(() => {
      let justOne = true;
      if(justOne){
        getUserDetails()
        .then(() => setConnect(true))
        .catch(() => setConnect(false));
      }
      return () => justOne = false;
    });

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