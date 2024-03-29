import React from "react";
import { Route } from "react-router-dom";

import Navbar from "./Navbar";
import MenuProfil from "./MenuProfil";

import { useDispatch, useSelector } from "react-redux";
import { selectUserName, selectJustLogin, setJustLogin, userDetails} from "../slice/UserSlice";

export default function PrivateRoute({ forProf, component: Component, ...rest }) {

	const dispatch = useDispatch();
	//information de l'utilisateur 
	const user = useSelector(selectUserName);
	//savoir si la personne vient juste de se connecter
	const justLogin = useSelector(selectJustLogin);

	const selection = (props) => {
		//si l'utilisateur n'était pas connecté et que ce n'est pas une connexion depuis la page de login, récuperer les informations
		if (!justLogin || user.isLogin === undefined) {
			dispatch(userDetails());
			setJustLogin(false);
		}

		if (user.isLogin !== undefined) {
			return user.isProf === forProf || forProf === undefined ? (
				//si tout est ok, afficher la nav bar et le menu profil sur toutes les pages et le composant (la page) en question
				<div>
					<Navbar />
					<MenuProfil />
					<Component {...props} />
				</div>
			) : (
				//si ce n'est pas un prof et qu'il veut acceder a une page prof, redirection 
				//le window location recharge la page ! 
				<>
					{window.location.href = '/'}
				</>
			);
		}
	};

	return <Route {...rest} render={(props) => selection(props)} />;
}