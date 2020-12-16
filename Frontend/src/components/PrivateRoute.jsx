import React, {useState} from 'react'
import { Route, Redirect } from "react-router-dom";

import Navbar from './Navbar'
import useConstructor from './useContructor'

import { getUserDetails } from '../utils/api.js';

import { useDispatch } from "react-redux";
import { loginUser, logoutUser, changeUserName, changePassword } from "../slice/UserSlice";

export default function PrivateRoute ({forProf, component: Component, ...rest}) {
  
  const dispatch = useDispatch();
  const [connect, setConnect] = useState(undefined);

  useConstructor(() => {
    getUserDetails()
    .then((data) => {
      if (Boolean(Number(data.data.isProf)) === forProf){
        setConnect(true);
        dispatch(changeUserName(data.data.username))
        dispatch(changePassword(data.data.password))
        dispatch(loginUser(data.data.isProf));
      } else {
        setConnect(false);
        dispatch(logoutUser());
      }
    })
      .catch(() => {
        setConnect(false);
        dispatch(logoutUser());
      });
    });

    const selection = (props) => {
      if (connect !== undefined){
        return connect
            ? <div>
                <Navbar/> 
                <Component {...props} /> 
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