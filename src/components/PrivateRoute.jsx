import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { getUserDetails } from '../utils/api.js';

const checkConnexion = () =>{
    getUserDetails().then(data => {
      console.log("connexté")
      return true;
    }).catch(err => {
      console.log("pas connecté")
      return false;
    })
  }
  
export default function PrivateRoute ({ component: Component, ...rest }) {
    <Route {...rest} render={(props) => (
      checkConnexion() 
      ? <Component {...props} />
      : <Redirect to='/login' />
    )} />
}