import { FaUserPlus, FaUserMinus } from "react-icons/fa";
import useUser from '../hooks/useUser';

type AuthorWithSubscriptionProps = {
    authorsFirstName: string;
    authorId: number;
}

export default function AuthorWithSubscription({ authorId, authorsFirstName }: AuthorWithSubscriptionProps) {
    const { user, addSubscription, removeSubscription } = useUser();

    const subscribingAuthor = user.subscribingTo.includes(authorId);

    return (
        <h4 className="font-semibold flex gap-2 items-center">
            {authorsFirstName}
            {user.id !== -1 && user.id !== authorId && (!subscribingAuthor ?
                <FaUserPlus className="text-gray-500 hover:cursor-pointer hover:text-gray-800" onClick={()=>addSubscription(authorId)}/>
                : <FaUserMinus className="text-gray-500 hover:cursor-pointer hover:text-gray-800" onClick={()=>removeSubscription(authorId)}/>
            )}
        </h4>)
}
