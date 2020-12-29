import React from "react";
import { Route, Redirect } from "react-router-dom";

import Navbar from "./Navbar";
import MenuProfil from "./MenuProfil";

import { useDispatch } from "react-redux";
import { userDetails } from "../slice/UserSlice";
import { useSelector } from "react-redux";
import { selectUserName, selectJustLogin, setJustLogin } from "../slice/UserSlice";

export default function PrivateRoute({forProf, component: Component, ...rest}) {
  
  const dispatch = useDispatch();
  const user = useSelector(selectUserName);
  const justLogin = useSelector(selectJustLogin);

  const selection = (props) => {
    if (!justLogin || user.isLogin === undefined) {
      dispatch(userDetails());
      setJustLogin(false);
    }
    if (user.isLogin !== undefined) {
      return user.isProf === forProf || forProf === undefined ? (
        <div>
          <Navbar />
          <MenuProfil />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      );
    }
  };

  return <Route {...rest} render={(props) => selection(props)} />;
}
