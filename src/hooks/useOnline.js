import {useEffect, useState} from 'react';
import { NotificationManager} from 'react-notifications';
export const useOnline = () => { 
    const [isOnline, setIsOnline] = useState(window.navigator.onLine ?? true);         
    useEffect(() => {
        const handOnline = () => {
            setIsOnline(true);
        };

        const handleOffline = () => {
            setIsOnline(false);
        };

        window.addEventListener('online', handOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return isOnline;
}

export const useOnlineNotification = () => { 
    
    useEffect(() => {
        const handOnline = () => {
            NotificationManager.success('Success', 'you are online') 
        };

        const handleOffline = () => {
            NotificationManager.error('Error', 'you are offline')
        };

        window.addEventListener('online', handOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
}