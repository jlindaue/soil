import { useContext, useEffect, useState } from "react";
import { AppContext } from "../commons/state";

let waiting = 0;

export default function NotificationPopup() {
    const {notification} = useContext(AppContext);
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        if (notification.text==="") return;
        setShow(true)
        waiting++;
        setTimeout(() => {
            waiting--;
            if (waiting===0) setShow(false);
        }, 3000);
    }, [notification]);

    function determineColor(){
        if (notification.type=="ERROR")
            return "bg-red-200 text-red-600"
        else if (notification.type=="SUCCESS")
            return "bg-green-200 text-green-600"
        else if (notification.type=="WARNING")
            return "bg-orange-200 text-orange-600"
        else
            return "bg-blue-200 text-blue-600"
    }

    return !show ? null : (
        <div className="fixed top-0 z-50 w-full md:left-1/3 md:w-1/3 flex justify-center align-middle">
            <div className="relative w-full max-w-md h-auto overflow-y-hidden">
                <div className={"relative rounded-lg shadow " + determineColor()}>    
                    <div className="p-4">
                        {notification.text}
                    </div>
                </div>
            </div>
        </div> 
    )
}
