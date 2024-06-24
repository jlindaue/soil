import { NotificationState } from "../types/types";

export function displayError(e: any, message: string, setNotification: (n: NotificationState)=>any){
    console.log(e)
    if (e?.response?.data?.message){
        message = e.response.data.message;
    }else if (e?.response?.status === 401){
        message += " (401: Unauthorized, please login)";
    }else if (e?.response?.status === 404){
        message += " (404: Resource not found)"
    }
    setNotification({text:message,type:"ERROR",show:true});
    console.log(e);
}