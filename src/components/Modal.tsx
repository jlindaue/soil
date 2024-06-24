import { FaTimes } from "react-icons/fa";

type Props = {
    isOpen: boolean,
    children: JSX.Element | JSX.Element[],
    onClose?: () => void
}


export default function Modal(props: Props){
    return (
        <>
            <div className={(props.isOpen ? "" : "hidden ") + "fixed w-screen top-0 left-0 z-50 h-screen opacity-70 bg-slate-500"}></div>
            <div className={(props.isOpen ? "" : "hidden ") + "fixed top-0 left-0 z-50 w-screen p-4 md:inset-0 h-full md:h-full flex justify-center align-middle"}>
                <div className="relative w-full h-full md:max-w-md md:h-auto overflow-y-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">    
                {props.onClose ? <FaTimes className="closeButton topRight" onClick={props.onClose}/> : null}
                        <div className="px-6 py-6 lg:px-8">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}