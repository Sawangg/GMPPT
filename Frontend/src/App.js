import React from 'react'
import {BrowserRouter, Route, Redirect } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { getUserDetails } from './utils/api.js';

import TodoListAccordeon from './pages/CreationSujet'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Accueil from './pages/Accueil'
//import PrivateRoute from './components/PrivateRoute'

const checkConnexion = () =>{
  getUserDetails().then(data => {
    console.log("connexté")
    return true;
  }).catch(err => {
    console.log("pas connecté")
    return false;
  })
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    checkConnexion() 
    ? <Component {...props} />
    : <Redirect to='/login' />
  )} />
)

function App() {

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>

        <Route exact path='/login' component={Login}/>

        <PrivateRoute path='/' component={Navbar}/>

        <PrivateRoute exact path='/' component={Accueil}/>

        <PrivateRoute exact path='/creation-sujets' component={TodoListAccordeon}/>

      </BrowserRouter>
    </MuiThemeProvider>
  );
}


export default App;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#075b72'
    },
    secondary: {
      main: '#c51150'
    },
    error :{
      main : '#c51150'
    }
  }
});