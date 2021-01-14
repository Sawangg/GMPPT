import React from 'react'
import {BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { MuiThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
//unstable_createMuiStrictModeTheme pour éviter les warnings strict mod de theme material ui
import frFR from '@material-ui/core/locale';

import Formules from './pages/Prof/Formules';
import AccueilProf from './pages/Prof/AccueilProf';
import Architecture from './pages/Prof/Architecture';
import Correction from './pages/Prof/Correction';
import Enonces from "./pages/Prof/Enonces";
import VariableAleatoires from './pages/Prof/VariablesAleatoires'
import Consulter from './pages/Prof/ConsulterEtudiant';
import Promo from './pages/Prof/Promo';

import RepondreQuestions from './pages/Etu/RepondreQuestions';
import AccueilEtu from './pages/Etu/AccueilEtu';

import Profil from './pages/Profil';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';


import { Provider } from 'react-redux';
import store from './utils/store';

import CssBaseline from '@material-ui/core/CssBaseline'
import "./styles/App.css";


export default function App() {

    const theme = createMuiTheme({
        palette: {
            primary: {
                light: '#c0dff8',
                main: '#075b72'
            },
            secondary: {
                main: '#cfcfcf'
            },
            error: {
                main: '#c51150'
            },
            warning: {
                main: '#ffa016',
                dark: '#b75c08'
            },
            success: {
                main: '#5bb65f',
                dark: '#244826'
            },
        },
        overrides: {
            MuiCssBaseline: {
                '@global': {
                    body: {
                        fontFamily: "Amaranth",
                    },
                },
            },
        },
    }, frFR);

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
        <PrivateRoute forProf={true} exact path='/prof/promo' component={Promo}/>
        <PrivateRoute forProf={true} exact path='/prof/enonces' component={Enonces}/>
        <PrivateRoute forProf={true} exact path='/prof/formules' component={Formules}/>
        <PrivateRoute forProf={true} exact path='/prof/architecture' component={Architecture}/>
        <PrivateRoute forProf={true} exact path='/prof/gestion-correction' component={Correction}/>
        <PrivateRoute forProf={true} exact path='/prof/variable-aleatoires' component={VariableAleatoires}/>
        <PrivateRoute forProf={true} exact path='/prof/correction/:value' component={Consulter}/>

        {/* ETU */}
        <PrivateRoute forProf={false} exact path='/etu/home' component={AccueilEtu}/>
        <PrivateRoute forProf={false} exact path='/etu/repondre-questions' component={RepondreQuestions}/>

        {/* POUR LES DEUX */}
        <PrivateRoute exact path='/profil' component={Profil}/>

        {/* REDIRECTION */}
        <Route render={() => <Redirect to="/" />} />

      </Switch>

      </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  );
}