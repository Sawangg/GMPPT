import { useEffect} from 'react'

export default function useUnload(active) {
    
    useEffect(() => {

        const handleBeforeUnload = event => {
            if (active) event.preventDefault(); 
        }

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () =>  window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [active]);

}