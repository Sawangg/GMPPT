import { useEffect } from 'react';

export default function useUnload(active) {

    const handleBeforeUnload = event => {
        if (active) event.preventDefault();
    }

    useEffect(() => {
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        }
    });
}