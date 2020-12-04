import React, {useState} from 'react'
import {BrowserRouter, Route, Redirect, useLocation } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import TodoListAccordeon from './pages/CreationSujet'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Accueil from './pages/Accueil'

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

function App() {

  const [authentif, setAuthentif] = useState(false);

  const changeAuthentif = () =>{
     setAuthentif(!authentif)
  }

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      authentif === true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )

  const HeaderRedirection = () => {
    const location = useLocation();
    if (authentif){
      return location.pathname === "/login" ? <Redirect to="/"/> : <></>;
    }
    return null;
	}


  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>

        <HeaderRedirection/>

        <Route exact path='/login'>
            <Login changeAuthentif={e => changeAuthentif()}/>
        </Route>

        <PrivateRoute path='/' component={Navbar}/>

        <PrivateRoute exact path='/'>
          <Accueil changeAuthentif={e => changeAuthentif()}/>
        </PrivateRoute>

        <PrivateRoute exact path='/creation-sujets' component={TodoListAccordeon}/>

      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;