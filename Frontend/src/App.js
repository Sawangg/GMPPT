import React from 'react'
import {BrowserRouter, Route, Switch } from "react-router-dom";
import { MuiThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
//unstable_createMuiStrictModeTheme pour éviter les warnings strict mod de theme material ui


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

        <PrivateRoute forProf={true} exact path='/' component={Accueil}/>
        
        <PrivateRoute exact path='/creation-sujets' component={CreationSujet}/>

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
  }
});