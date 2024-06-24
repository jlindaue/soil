import { useState } from "react";

import { GeneralObject, RegisterCredentials } from "../types/types";
import { hashPassword } from "../commons/hashPassword";
import { Link, useNavigate } from "react-router-dom";
import { RegisterDTO } from "../types/dtos";
import useUser from "../hooks/useUser";
import {verifyEmail, verifyPasswordQuality} from "../commons/verifiers";



function verifyCredentials(credentials: RegisterCredentials): string[]{
    let messages = [] as string[];
    verifyEmail(messages, credentials.email, "emailR");
    verifyPasswordQuality(messages, credentials.password, "passwordR");
    
    if (credentials.passwordVerification !== credentials.password){
        document.querySelector("#passwordVerificationR")?.classList.add("bg-red-100");
        messages.push("Passwords do not match.")
    }

    if (credentials.firstName == ""){
        document.querySelector("#firstName")?.classList.add("bg-red-100");
        messages.push("Enter your first name.")
    }

    if (credentials.lastName == ""){
        document.querySelector("#lastName")?.classList.add("bg-red-100");
        messages.push("Enter your last name.")
    }
    return messages;
}





export default function RegisterPage(){
    const [issues, setIssues] = useState<string[]>([]);
    const [credentials, setCredentials] = useState<RegisterCredentials>({
        email: "", 
        password: "", 
        passwordVerification: "", 
        firstName: "",
        lastName: ""});

    const navigate = useNavigate();
    const {user, registerUser} = useUser();

    if (user.email !== ""){
        navigate("/");
    }

    const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.classList.remove("bg-red-100");
        const newCredentials = {...credentials} as RegisterCredentials;
        (newCredentials as unknown as GeneralObject)[e.target.name] = e.target.value;
        setCredentials(newCredentials);
    }

    const forgetPassword = () => {
        const newCredentials = {...credentials};
        newCredentials.password = "";
        setCredentials(newCredentials);
    }

    function _tryToRegister(){
        let messages = verifyCredentials(credentials);
        setIssues(messages)
        if (messages.length == 0){
            const hashedPassword = hashPassword(credentials.password);
            const registerDTO: RegisterDTO = {
                email: credentials.email,
                password: hashedPassword,
                firstName: credentials.firstName,
                lastName: credentials.lastName
            }
            registerUser(registerDTO, forgetPassword);
        }
    }

    return (
        <div className="page">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Register</h3>
            <form method="post" target="" className="space-y-6 w-1/2">
            <div>
                    <label htmlFor="emailR" className="formLabel required">Email</label>
                    <input id="emailR" type="text" name='email' placeholder="Your email" onChange={_onChange} value={credentials.email} className="formInput"/>
                </div>
                <div>
                    <label htmlFor="passwordR" className="formLabel required">Password</label>
                    <input id="passwordR" type="password" name='password' onChange={_onChange} value={credentials.password} placeholder="Password" className="formInput"/>
                </div>
                <div>
                    <label htmlFor="passwordVerificationR" className="formLabel required">Password verification</label>
                    <input id="passwordVerificationR" type="password" name='passwordVerification' onChange={_onChange} value={credentials.passwordVerification} placeholder="Password verification" className="formInput"/>
                </div>
                <div>
                    <label htmlFor="firstName" className="formLabel required">First name</label>
                    <input id="firstName" type="text" name='firstName' onChange={_onChange} value={credentials.firstName} placeholder="Your first name" className="formInput"/>
                </div>
                <div>
                    <label htmlFor="lastName" className="formLabel required">Last name</label>
                    <input id="lastName" type="text" name='lastName' onChange={_onChange} value={credentials.lastName} placeholder="Your last name" className="formInput"/>
                </div>
                <ul className={`bg-red-200 p-2 rounded-md text-red-600 ${issues.length==0?"hidden":""}`}>
                    {issues.map((issue,i)=>(<li key={i}>{issue}</li>))}
                </ul>

                <button type="submit" onClick={e=>{e.preventDefault();_tryToRegister()}} className="flex items-center justify-center gap-3 blueButton">
                    Register
                </button>

                <div className="flex justify-start">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already have an account?&nbsp;
                        <Link to="/login" className="link">Login</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
