import { useEffect, useState } from "react";

import { GeneralObject, ProfileDetails } from "../types/types";
import { hashPassword } from "../commons/hashPassword";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";



function verifyNewValues(details: ProfileDetails): string[]{
    let messages = [];
        if (details.password.length !== 0 && details.password.length < 8){
            document.querySelector("#passwordP")?.classList.add("bg-red-100");
            messages.push("Password must be at least 8 characters long")
        }
        if (details.oldPassword == ""){
            document.querySelector("#oldPasswordP")?.classList.add("bg-red-100");
            messages.push("Enter your old password.")
        }
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(details.email)){
            document.querySelector("#emailP")?.classList.add("bg-red-100");
            messages.push("Email is not in valid format.")
        }

        if (details.firstName == ""){
            document.querySelector("#firstNameP")?.classList.add("bg-red-100");
            messages.push("Enter your first name.")
        }

        if (details.lastName == ""){
            document.querySelector("#lastNameP")?.classList.add("bg-red-100");
            messages.push("Enter your last name.")
        }
    return messages;
}



export default function ProfilePage(){
    const [issues, setIssues] = useState<string[]>([]);
    const [details, setDetails] = useState<ProfileDetails>({
        email: "", 
        password: "", 
        oldPassword: "", 
        firstName: "",
        lastName: ""});
    const {user, updateUser, deleteUser} = useUser();
    const navigate = useNavigate();

    if (user.email === ""){
        navigate("/");
    }

    useEffect(()=>{
        setDetails({
            email: user.email, 
            password: "", 
            oldPassword: "", 
            firstName: user.firstName,
            lastName: user.lastName
        })
    }, [user])

    const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.classList.remove("bg-red-100");
        const newDetails = {...details} as ProfileDetails;
        (newDetails as unknown as GeneralObject)[e.target.name] = e.target.value;
        setDetails(newDetails);
    }

    const forgetPassword = () => {
        const newDetails = {...details};
        newDetails.password = "";
        newDetails.oldPassword = "";
        setDetails(newDetails);
    }

    function _tryToUpdate(){
        let messages = verifyNewValues(details);
        setIssues(messages)
        if (messages.length == 0){
            let hashedPassword = details.password.length === 0 ? "" : hashPassword(details.password);
            const hashedOldPassword = hashPassword(details.oldPassword);
            updateUser({...details, password: hashedPassword, oldPassword: hashedOldPassword}, forgetPassword);
        }
    }

    const dayJoined = new Date(user.dateJoined).toLocaleDateString();    

    return (
        <div className="page">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Profile</h3>
            <p>You joined on {dayJoined}.</p>
            <form method="post" target="" className="space-y-6 w-1/2">
                <div>
                    <label htmlFor="emailP" className="formLabel required">Email</label>
                    <input id="emailP" type="text" name='email' placeholder="Your email" onChange={_onChange} value={details.email} className="formInput"/>
                </div>
                <div>
                    <label htmlFor="passwordP" className="formLabel">New password (if you want to change it)</label>
                    <input id="passwordP" type="password" name='password' onChange={_onChange} value={details.password} placeholder="Password" className="formInput"/>
                </div>
                <div>
                    <label htmlFor="firstNameP" className="formLabel required">First name</label>
                    <input id="firstNameP" type="text" name='firstName' onChange={_onChange} value={details.firstName} placeholder="Your first name" className="formInput"/>
                </div>
                <div>
                    <label htmlFor="lastNameP" className="formLabel required">Last name</label>
                    <input id="lastNameP" type="text" name='lastName' onChange={_onChange} value={details.lastName} placeholder="Your last name" className="formInput"/>
                </div>
                <div>
                    <label htmlFor="oldPasswordP" className="formLabel required">Old Password</label>
                    <input id="oldPasswordP" type="password" name='oldPassword' onChange={_onChange} value={details.oldPassword} placeholder="Old Password" className="formInput"/>
                </div>
                <ul className={`bg-red-200 p-2 rounded-md text-red-600 ${issues.length==0?"hidden":""}`}>
                    {issues.map((issue,i)=>(<li key={i}>{issue}</li>))}
                </ul>

                <button type="submit" onClick={e=>{e.preventDefault();_tryToUpdate()}} className="flex items-center justify-center gap-3 blueButton">
                    Save changes
                </button>
                
                <button type="submit" onClick={e=>{e.preventDefault();deleteUser()}} className="flex items-center justify-center gap-3 redButton">
                    Delete account
                </button>
            </form>
        </div>
    );
}
