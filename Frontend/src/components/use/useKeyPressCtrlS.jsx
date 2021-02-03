import { useEffect, useState } from "react";

export default function useKeyPress() {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {

    const downHandler = (e) => {
        if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) && e.keyCode === 83){
            e.preventDefault();
            setKeyPressed(true);
        } else {
          setKeyPressed(false);
        }
    };

    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []);

  return keyPressed;
}
