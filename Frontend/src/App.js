import React from 'react'
import {BrowserRouter, Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import CreationSujet from './pages/CreationSujet'
import Login from './pages/Login'
import Accueil from './pages/Accueil'
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>

      <Switch>
        <Route exact path='/login' component={Login}/>

        <PrivateRoute exact path='/' component={Accueil}/>
        
        <PrivateRoute path='/creation-sujets' component={CreationSujet}/>

        <PrivateRoute exact path='/gestion-sujets' component={Accueil}/>

        <PrivateRoute exact path='/gestion-correction' component={Accueil}/>
      </Switch>

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