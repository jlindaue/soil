import { useContext, useState } from 'react';
import { ReviewDTO, ReplyDTO, CreateReplyResponseDTO } from '../types/dtos';
import { makeDeleteReviewRequest, makeEditReviewRequest, makeAddReviewRequest, makeSubscribeRequest, makeUnsubscribeRequest, makeAddReplyRequest } from '../network/requests';
import Reply from './Reply';
import useUser from '../hooks/useUser';
import Stars from './Stars';
import AuthorWithSubscription from './AuthorWithSubscription';
import { AppContext } from '../commons/state';
import { displayError } from '../commons/notifications';
import axios from 'axios';

type ReviewProps = {
    initialReview: ReviewDTO;
    onDeleteReview: () => any;
}

export default function Review({ initialReview, onDeleteReview }: ReviewProps) {
    const { user } = useUser();
    const [review, setReview] = useState(initialReview);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(review.text);
    const [editStars, setEditStars] = useState(review.numberOfStars);
    const [newReplyText, setNewReplyText] = useState('');
    const {setNotification} = useContext(AppContext);

    const onDelete = async () => {
        try {
            await makeDeleteReviewRequest(review.id);
            onDeleteReview();
            setNotification({text:"Successfully deleted review",type:"SUCCESS",show:true})
        } catch (error) {
            console.error(error);
            displayError(error, "Failed to delete review", setNotification);
        }
    }

    const onEdit = async () => {
        try {
            await makeEditReviewRequest({ id: review.id, type: "REVIEW", text: editText, numberOfStars: editStars });
            setNotification({text:"Successfully edited",type:"SUCCESS",show:true})
            setReview({ ...review, text: editText, numberOfStars: editStars });
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            displayError(error, "Failed to edit review", setNotification);
        }
    }

    function onDeleteReply(replyId: number) {
        setReview({
            ...review!,
            replies: review.replies.filter((reply) => reply.id !== replyId)
        });
    }

    const onAddReply = async () => {
        if (newReplyText.trim() === '') return;

        try {
            const response: CreateReplyResponseDTO = await makeAddReplyRequest({
                reviewId: review.id,
                text: newReplyText,
                type: "REPLY"
            });
            console.log("Returned id: ", response.reply.id)
            const newReply: ReplyDTO = {
                id: response.reply.id,
                text: newReplyText,
                authorId: user.id,
                authorsFirstName: user.firstName,
                isDeleted: false
            };
            setReview({
                ...review,
                replies: [...review.replies, newReply]
            });
            setNewReplyText('');
            setNotification({text:"Successfully added reply",type:"SUCCESS",show:true})
        } catch (error) {
            console.error(error);
            displayError(error, "Failed to add reply", setNotification);
        }
    }

    function renderReplyForm() {
        if (user.id === -1) return null
        if (isEditing) return null
        return (
            <div className="mt-4">
                <textarea
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Add a reply..."
                    value={newReplyText}
                    onChange={(e) => setNewReplyText(e.target.value)}
                />
                <button
                    className={`px-4 py-2 text-white rounded ${disableNewReply ? 'cursor-not-allowed bg-blue-300' : 'hover:cursor-pointer bg-blue-500'}`}
                    disabled={disableNewReply}
                    title="Reply must be between 1 and 100 character long."
                    onClick={onAddReply}>
                    Add Reply
                </button>
            </div>
        )
    }

    const disableNewReply = newReplyText.length > 100 || newReplyText.trim() === '';

    return (
        <div className="p-4 border rounded shadow-md bg-white">
            {review.isDeleted ? (
                <p className="text-gray-500">This review has been deleted.</p>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <AuthorWithSubscription authorId={review.authorId} authorsFirstName={review.authorsFirstName} />
                            <p className="text-gray-600">{review.text}</p>
                        </div>
                        <div>
                            <Stars
                                numberOfStars={review.numberOfStars}
                                editable={false}
                            />
                        </div>
                    </div>

                    {isEditing ? (
                        <div className="mt-4">
                            <textarea
                                className="w-full p-2 border rounded mb-2"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                            />
                            <div className="flex items-center mb-2">
                                <Stars
                                    numberOfStars={editStars}
                                    editable={true}
                                    onRatingChange={setEditStars}
                                />
                            </div>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                                onClick={onEdit}
                            >
                                Save
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div className="mt-4 flex items-center">
                            {user.id === review.authorId && (
                                <>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded mr-2"
                                        onClick={onDelete}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-green-500 text-white rounded"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Edit
                                    </button>
                                </>
                            )}
                        </div>
                    )}

                    {review.replies.map(reply => (
                        <Reply key={reply.id} reply={reply} onDeleteReply={() => onDeleteReply(reply.id)} />
                    ))}

                    {renderReplyForm()}
                </>
            )}
        </div>
    );
}
