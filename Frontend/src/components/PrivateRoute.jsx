import React from "react";
import { Route, Redirect } from "react-router-dom";

import Navbar from "./Navbar";
import MenuProfil from "./MenuProfil";
import useConstructor from "./use/useContructor";

import { useDispatch } from "react-redux";
import { userDetails } from "../slice/UserSlice";
import { useSelector } from "react-redux";
import { selectUserName } from "../slice/UserSlice";

export default function PrivateRoute({forProf, component: Component, ...rest}) {
  const dispatch = useDispatch();
  const user = useSelector(selectUserName);

  useConstructor(() => dispatch(userDetails()));

  const selection = (props) => {
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
