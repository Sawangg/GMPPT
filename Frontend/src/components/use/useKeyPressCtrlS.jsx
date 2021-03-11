import { useEffect, useState } from "react";

export default function useKeyPress() {
	const [keyPressed, setKeyPressed] = useState(false);

	const downHandler = (e) => {
		if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) && e.keyCode === 83) {
			e.preventDefault();
			setKeyPressed(true);
			setInterval(() => { 
				setKeyPressed(false);
			}, 500); //car si on appuie pas sur une autre touche, reste true
		} else {
			setKeyPressed(false);
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", downHandler);
		return () => {
			window.removeEventListener("keydown", downHandler);
		};
	});

	return keyPressed;
}