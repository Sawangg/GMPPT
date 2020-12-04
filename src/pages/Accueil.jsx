import React from 'react'
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { getUserDetails } from '../utils/api.js';

export default function Accueil(props) {

    const [ loading, setLoading ] = React.useState(true);

    React.useEffect(() => {
        getUserDetails().then(data => {
            console.log(data);
        }).catch(err => {
            console.log("redirection iciiii");
            console.log(err);
            setLoading(false);
        });
    }, []);

    return !loading && (
        <div style={{position : "absolute", right : 30, top : 30}}>
            <Button variant="contained" color="secondary" startIcon={<ExitToAppIcon />} onClick={e => props.changeAuthentif()}>Déconnexion</Button>
        </div>
    );
}