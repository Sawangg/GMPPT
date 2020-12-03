import {BrowserRouter, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import TodoListAccordeon from './pages/CreationSujet'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Profil from './pages/Profil'
import Accueil from './pages/Accueil'

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

function App() {

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>

        <Route path='/' component={Navbar}/>

        <Route exact path='/' component={Login}/>

        <Route exact path='/profil' component={Profil}/>

        <Route exact path='/home' component={Accueil}/>

        <Route exact path='/creation-sujets' component={TodoListAccordeon}/>

      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;