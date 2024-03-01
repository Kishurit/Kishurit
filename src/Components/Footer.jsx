import React from "react";
import { useSelector } from "react-redux";
import useOnline from '../hooks/useOnline';
import { BsWifi, BsWifiOff } from "react-icons/bs";

export default function Footer() {
    const data = useSelector((state) => state.data.total);
    const { isOnline } = useOnline();
    const WifiIcon = () => isOnline ? <BsWifi/> : <BsWifiOff/>;

    return (
        <div className="fixed-bottom bg-light"> 
            <h5 className="me-4 mt-1">
                <WifiIcon/> {data} רשומות
            </h5>
        </div>
    );
}
