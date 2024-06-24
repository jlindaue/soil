//import * from "./dtos";

import { LoginDTO, RegisterDTO, UpdateUserDTO, UserDTO } from "./dtos"




export type NotificationType = "INFO" | "SUCCESS" | "WARNING" | "ERROR"


export type NotificationState = {
    text: string,
    type: NotificationType,
    show: boolean
}


export interface LoginCredentials extends LoginDTO {
}

export interface RegisterCredentials extends RegisterDTO {
    passwordVerification: string
}

export type GeneralObject = {
    [key: string]: string
}

export interface ProfileDetails extends UpdateUserDTO {
}


export interface User extends UserDTO {   
}

export interface ErrorResponse {
    message: string;
}