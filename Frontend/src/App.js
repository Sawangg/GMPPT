import React from 'react'
import {BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { MuiThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
//unstable_createMuiStrictModeTheme pour éviter les warnings strict mod de theme material ui

import CreationSujet from './pages/CreationSujet'
import Login from './pages/Login'
import AccueilProf from './pages/AccueilProf'
import AccueilEtu from './pages/AccueilEtu'
import PrivateRoute from './components/PrivateRoute'
import ProfilProf from './pages/ProfilProf'
import { Provider } from 'react-redux';
import store from './utils/store';

import CssBaseline from '@material-ui/core/CssBaseline'

function App() {

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
      <CssBaseline/>
      <BrowserRouter>

      <Switch>

        <Route exact path='/' component={Login}/>

        <PrivateRoute forProf={true} exact path='/prof/home' component={AccueilProf}/>
        <PrivateRoute forProf={true} exact path='/prof/creation-sujets' component={CreationSujet}/>
        <PrivateRoute forProf={true}  exact path='/prof/gestion-sujets' component={AccueilProf}/>
        <PrivateRoute forProf={true} exact path='/prof/gestion-correction' component={AccueilProf}/>
        <PrivateRoute forProf={true} exact path='/prof/profil' component={ProfilProf}/>

        <PrivateRoute forProf={false} exact path='/etu/home' component={AccueilEtu}/>

        <Route render={() => <Redirect to="/" />} />

      </Switch>

      </BrowserRouter>
      </Provider>
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
    }
  }
});