import { Link } from "react-router-dom";
import AppRoutes from "../routing/Routes";

import { FaCartShopping } from "react-icons/fa6";
import useShoppingCart from "../hooks/useShoppingCart";
import useUser from "../hooks/useUser";

type NavBarItem={
    target: string, text: string
}

export default function Navbar(){
    const {user, logoutUser} = useUser();
    const {itemsInOrder} = useShoppingCart();

    const navBarItems: NavBarItem[] = [
        {target: AppRoutes.home.path, text: "Home"},
        {target: AppRoutes.specials.path, text: "Specials"},
        {target: AppRoutes.products.path, text: "View all products"},
        {target: AppRoutes.calculator.path, text: "Calculator"}
    ]

    return (
        <nav className={`bg-slate-800 text-slate-300 font-medium px-4 sticky top-0 z-40`}>
            <ul className="flex flex-row p-1">
                {navBarItems.map((item: NavBarItem,i: number)=>(
                    <Link key={i} to={item.target} className="p-2 hover:bg-slate-900 hover:cursor-pointer">{item.text}</Link>
                ))}
                <li className="absolute right-1 flex flex-row gap-1 items-center">
                    {(user.email === "") ? 
                        (<>
                            <Link to={AppRoutes.login.path} className="blueButton">Login</Link>
                            <Link to={AppRoutes.register.path} className="blueButton">Register</Link>
                        </>):
                        (<>
                            <Link to={AppRoutes.profile.path} className="p-2 hover:bg-slate-900 hover:cursor-pointer">Profile</Link>
                            <Link to={AppRoutes.cart.path} className="flex flex-row gap-3 bg-green-500 rounded-md h-full p-2 hover:cursor-pointer">
                                <FaCartShopping className="text-2xl"/>
                                <span className="text-sm">{itemsInOrder}</span>
                            </Link>
                            <button className="blueButton" onClick={()=>logoutUser()}>Logout</button>
                        </>)
                    }
                </li>
            </ul>
        </nav>
    );
}