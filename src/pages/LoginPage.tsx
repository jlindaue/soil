import { useState } from "react";

import { GeneralObject, LoginCredentials } from "../types/types";
import { hashPassword } from "../commons/hashPassword";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import {verifyEmail, verifyPasswordQuality} from "../commons/verifiers";



function verifyCredentials(credentials: LoginCredentials): string[]{
    let messages = [] as string[];
    verifyPasswordQuality(messages, credentials.password, "passwordL");
    verifyEmail(messages, credentials.email, "emailL");
    return messages;
}



export default function LoginPage(){
    const [issues, setIssues] = useState<string[]>([]);
    const [credentials, setCredentials] = useState<LoginCredentials>({email: "", password: ""});
    const {user, loginUser} = useUser();
    const navigate = useNavigate();

    if (user.email !== ""){
        navigate("/");
    }

    const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.classList.remove("bg-red-100");
        const newCredentials = {...credentials} as LoginCredentials;
        (newCredentials as unknown as GeneralObject)[e.target.name] = e.target.value;
        setCredentials(newCredentials);
    }

    const forgetPassword = () => {
        const newCredentials = {...credentials};
        newCredentials.password = "";
        setCredentials(newCredentials);
    }

    function _tryLogin(){
        let messages = verifyCredentials(credentials);
        setIssues(messages)
        if (messages.length == 0){
            const hashedPassword = hashPassword(credentials.password);
            loginUser({...credentials, password: hashedPassword}, forgetPassword, false);
        }
    }

    return (
        <div className="page">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Login</h3>
            <form method="post" target="" className="space-y-6 w-1/2">
                <div>
                    <label htmlFor="emailL" className="formLabel">Email</label>
                    <input id="emailL" type="text" name='email' placeholder="Your email" onChange={_onChange} value={credentials.email} className="formInput"/>
                </div>
                <div>
                    <label htmlFor="passwordL" className="formLabel">Password</label>
                    <input id="passwordL" type="password" name='password' onChange={_onChange} value={credentials.password} placeholder="Your password" className="formInput"/>
                </div>

                <ul className={`bg-red-200 p-2 rounded-md text-red-600 ${issues.length==0?"hidden":""}`}>
                    {issues.map(issue=>(<li>{issue}</li>))}
                </ul>
                
                <button type="submit" onClick={e=>{e.preventDefault();_tryLogin()}} className="flex items-center justify-center gap-3 blueButton">
                    Login
                </button>
                <div className="flex justify-between">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        <Link to="/register" className="link">Create an account</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
