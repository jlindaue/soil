import { useContext, useState } from 'react';
import { ReplyDTO } from '../types/dtos';
import { makeDeleteReplyRequest } from '../network/requests';
import useUser from '../hooks/useUser';
import AuthorWithSubscription from './AuthorWithSubscription';
import { AppContext } from '../commons/state';
import { displayError } from '../commons/notifications';

type ReplyProps = {
    reply: ReplyDTO;
    onDeleteReply: () => any;
}

export default function Reply({ reply, onDeleteReply }: ReplyProps) {
    const { user } = useUser();
    const [isDeleted, _] = useState(reply.isDeleted);
    const {setNotification} = useContext(AppContext);

    const onDelete = async () => {
        try {
            await makeDeleteReplyRequest(reply.id);
            onDeleteReply();
            setNotification({text:"Successfully deleted reply",type:"SUCCESS",show:true})
        } catch (error) {
            console.error(error);
            displayError(error, "Failed to delete reply", setNotification);
        }
    }

    return (
        isDeleted ? (
            <p className="text-gray-500">This reply has been deleted.</p>
        ):(
            <div className="mt-4 ml-4 p-2 border-l-2 border-gray-200">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <AuthorWithSubscription authorId={reply.authorId} authorsFirstName={reply.authorsFirstName} />
                        <p className="text-gray-600">{reply.text}</p>
                    </div>
                    {user.id === reply.authorId && (
                        <button
                            className="px-2 py-1 bg-red-500 text-white rounded ml-2"
                            onClick={onDelete}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
        )
    );
}
