import React, {useState, useEffect} from 'react'
import { Route, Redirect } from "react-router-dom";

import Navbar from './Navbar'

import { getUserDetails } from '../utils/api.js';

export default function PrivateRoute ({forProf, component: Component, ...rest}) {
  
  const [connect, setConnect] = useState();

    useEffect(() => {
      let justOne = true;
      if(justOne){
        getUserDetails()
        .then((data) => {
          setConnect(true);
          console.log(data.data);
          console.log(forProf)
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
                <Component {...props} /> 
              </div>
            : <Redirect to="/login" />
      }
    }

      return (
          <Route {...rest} render={props => (
            selection(props)
          )} />
      );
};