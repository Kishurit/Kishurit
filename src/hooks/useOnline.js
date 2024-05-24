import { useEffect, useState } from "react";

const useOnline = () => {
    
    const [isOnline, setIsOnline] = useState(window.navigator.onLine ?? true);
    const [error, setError] = useState (null);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
        };

        const handleOffline = () => {
            setIsOnline(false);
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };

    }, []);

    const checkConnectivity = () => {
        fetch('https://www.google.com/', { mode: 'no-cors' })
        .then(() => setIsOnline(true && window.navigator.onLine))
        .catch((error) => {
            setIsOnline(false);
            setError(error);
        });
    };

    if (typeof window === "undefined" || typeof navigator === "undefined") {
        return {
            isOnline: null,
            isOffline: null,
            error: "react-use-online meant to be used only in a browser environment.",
        };
    }
    
    return {
        isOnline: isOnline,
        isOffline: !isOnline,
        checkConnectivity: checkConnectivity,
        error: error
    };
};

export default useOnline