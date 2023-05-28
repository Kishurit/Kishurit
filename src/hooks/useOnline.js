import {useEffect, useState} from 'react';
import { NotificationManager} from 'react-notifications';
import { notify } from 'react-noti';
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
    
    const options = {
        autoDismiss: true,
        timeOut: 2500,
        showProgress: false
    }

    const options2 = {...options, title: 'you are offline'}
    const options1 = {...options, title: "you are online"}

    useEffect(() => {
        const handOnline = () => {
            NotificationManager.success('Success', 'you are online') 
            notify.success('Success', {...options1}) 
        };

        const handleOffline = () => {
            NotificationManager.error('Error', 'you are offline')
            notify.error('Error', options2)
        };

        window.addEventListener('online', handOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
}