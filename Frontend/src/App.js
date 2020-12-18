import React from 'react'
import {BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { MuiThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
//unstable_createMuiStrictModeTheme pour éviter les warnings strict mod de theme material ui
import frFR from '@material-ui/core/locale';

import Formules from './pages/Formules'
import Login from './pages/Login'
import AccueilProf from './pages/AccueilProf'
import AccueilEtu from './pages/AccueilEtu'
import RepondreQuestions from './pages/RepondreQuestions'
import PrivateRoute from './components/PrivateRoute'
import ProfilProf from './pages/Profil'
import ImportModele from './pages/ImportModele'
import Correction from './pages/Correction'
import Enonces from "./pages/Enonces";

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

        {/* LOGIN */}
        <Route exact path='/' component={Login}/>

        {/* PROF */}

        <PrivateRoute forProf={true} exact path='/prof/home' component={AccueilProf}/>
        <PrivateRoute forProf={true} exact path='/prof/gestion-sujets' component={AccueilProf}/>
        <PrivateRoute forProf={true} exact path='/prof/enonces' component={Enonces}/>
        <PrivateRoute forProf={true} exact path='/prof/formules' component={Formules}/>
        <PrivateRoute forProf={true} exact path='/prof/modeles3D' component={ImportModele}/>
        <PrivateRoute forProf={true} exact path='/prof/gestion-correction' component={Correction}/>

        {/* ETU */}
        <PrivateRoute forProf={false} exact path='/etu/home' component={AccueilEtu}/>
        <PrivateRoute forProf={true} exact path='/etu/repondre-questions' component={RepondreQuestions}/>

        {/* POUR LES DEUX */}
        <PrivateRoute forProf={true} exact path='/profil' component={ProfilProf}/>

        {/* REDIRECTION */}
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
}, frFR);