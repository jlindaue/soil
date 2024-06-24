import { useContext } from "react";
import { AppContext, defaultUserState } from "../commons/state";
import { makeDeleteCurrentUserRequest, makeGetCartRequest, makeGetCurrentUserRequest, makeLoginRequest, makeLogoutRequest, makeRegisterUserRequest, makeSubscribeRequest, makeUnsubscribeRequest, makeUpdateUserRequest } from "../network/requests";
import AppRoutes from "../routing/Routes";
import { displayError } from "../commons/notifications";
import { LoginDTO, RegisterDTO, UpdateUserDTO } from "../types/dtos";
import { useNavigate } from "react-router-dom";
import useShoppingCart from "./useShoppingCart";
import App from "../App";





export default function useUser() {
    const {user, setUser, setNotification} = useContext(AppContext);
    const navigate = useNavigate();
    const {setCart, clearCart} = useShoppingCart();

    
    async function loadUser(){
        try{
            const getUserResponse = await makeGetCurrentUserRequest()
            setUser({...getUserResponse})
            const getCartResponse = await makeGetCartRequest();
            setCart(getCartResponse)
            return getUserResponse
        }catch(e){
            console.log(e)
            setUser({...defaultUserState})
        }
    }
    
    async function loginUser(credentials: LoginDTO, forgetPassword: ()=>any, firstLogin: boolean) {
        try{
            const resp = await makeLoginRequest(credentials);
            if (resp.loggedIn){
                const loadedUser = await loadUser();
                forgetPassword();
                navigate(AppRoutes.home.path);
                console.log(user)
                setNotification({text:`Welcome ${loadedUser!.firstName}`,type:"SUCCESS",show:true})
            }else{
                setNotification({text:"Incorrect login details.",type:"ERROR",show:true})
            }
        }catch(e){
            displayError(e, "Login Failed", setNotification);
        }
    }

    async function updateUser(userInfo: UpdateUserDTO, forgetPassword: ()=>any) {
        try{
            await makeUpdateUserRequest(userInfo);
            setNotification({text:"Profile updated",type:"SUCCESS",show:true})
            forgetPassword();
            setUser({...user, firstName: userInfo.firstName, lastName: userInfo.lastName, email: userInfo.email});
        }catch(e){
            displayError(e, "Update Failed", setNotification);
        }
    }
    
    
    async function registerUser(userInfo: RegisterDTO, forgetPassword: ()=>any) {
        try{
            await makeRegisterUserRequest(userInfo);
            loginUser({email: userInfo.email, password: userInfo.password}, forgetPassword, true);
        }catch(e){
            displayError(e, "Registration Failed", setNotification);
        }
    }
    
    async function logoutUser(){
        try{
            setUser({...defaultUserState})
            console.log("Logging out")
            await makeLogoutRequest();
            clearCart();
            setNotification({text:"Logged out",type:"SUCCESS",show:true})
        }catch(e){
            displayError(e, "Network error.", setNotification);
        }
    }

    async function deleteUser() {
        try{
            await makeDeleteCurrentUserRequest();
            setNotification({text:"Account deleted",type:"SUCCESS",show:true})
            setUser({...defaultUserState});
            clearCart();
            navigate(AppRoutes.register.path);
        }catch(e){
            displayError(e, "Delete Failed", setNotification);
        }
    }


    async function addSubscription(subscribeeId: number){
        try {
            await makeSubscribeRequest(subscribeeId);
            setNotification({text:"Successfully subscribed",type:"SUCCESS",show:true})
            setUser(()=>{return {...user, subscribingTo: [...user.subscribingTo, subscribeeId]}});
        } catch (error) {
            console.error(error);
        }
    }

    async function removeSubscription(subscribeeId: number){
        try {
            await makeUnsubscribeRequest(subscribeeId);
            setNotification({text:"Successfully unsubscribed",type:"SUCCESS",show:true})
            setUser(()=>{return {...user, subscribingTo: user.subscribingTo.filter((id)=>id!==subscribeeId)}});
        } catch (error) {
            console.error(error);
        }
    }
    
    return {user, loadUser, loginUser, registerUser, logoutUser, updateUser, deleteUser, addSubscription, removeSubscription};
}