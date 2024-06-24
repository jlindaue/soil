import { useContext, useEffect, useState } from 'react';
import { CreateReviewResponseDTO, ProductDetailDTO, ReviewDTO } from '../types/dtos';
import { useNavigate, useParams } from 'react-router-dom';
import useShoppingCart from "../hooks/useShoppingCart"
import { makeAddReviewRequest, makeGetProductRequest } from '../network/requests';
import Routes from '../routing/Routes';
import { AppContext } from '../commons/state';
import Review from '../components/Review';
import Stars from '../components/Stars';
import { displayError } from '../commons/notifications';
import axios from 'axios';

export default function ProductDetailPage() {
    const [product, setProduct] = useState<ProductDetailDTO|null>(null);
    const {user, setNotification} = useContext(AppContext);
    const navigate = useNavigate();
    const [newReviewText, setNewReviewText] = useState('');
    const [newReviewStars, setNewReviewStars] = useState(0);


    const { productId: productIdString } = useParams();
    const { addItemToCart } = useShoppingCart();


    useEffect(() => {
        let productId;
        try{
            if (!productIdString){
                throw new Error('No product ID provided');
            }
            productId = parseInt(productIdString);
        }catch(e){
            navigate(Routes.home.path);
            return;
        }
        makeGetProductRequest(productId).then((response) => {
            setProduct(response);
        }).catch((error) => {
            console.error('Failed to fetch product', error);
        });
    }, []);

    const onAddReview = async () => {
        try {
            const response: CreateReviewResponseDTO = await makeAddReviewRequest({
                productId: product!.id,
                text: newReviewText,
                numberOfStars: newReviewStars,
                type: "REVIEW"
            });
            const newReview: ReviewDTO = {
                id: response.review.id,
                text: newReviewText,
                numberOfStars: newReviewStars,
                authorId: user.id,
                authorsFirstName: user.firstName,
                isDeleted: false,
                replies: []
            };
            setProduct({
                ...product!,
                reviews: [...product!.reviews, newReview]
            });
            setNewReviewText('');
            setNewReviewStars(0);
            setNotification({text:"Successfully added review",type:"SUCCESS",show:true})
        } catch (error) {
            console.error(error);
            displayError(error, "Failed to add review", setNotification);
        }
    }

    const disableNewReview = newReviewText.length > 100 || newReviewStars === 0;
    const userHasAlreadyReviewed = product?.reviews.some((review: ReviewDTO) => review.authorId === user.id);


    function renderReviewForm() {
        if (user.id === -1) return (
            <div className="border p-4 rounded shadow-md bg-white">
                <h3 className="text-xl font-semibold mb-2">Add a Review</h3>
                <p className="text-sm text-gray-600">You must be logged in to review this product.</p>
            </div>
        )
        if (userHasAlreadyReviewed) return (
            <div className="border p-4 rounded shadow-md bg-white">
                <h3 className="text-xl font-semibold mb-2">Add a Review</h3>
                <p className="text-sm text-gray-600">You have already reviewed this product.</p>
            </div>
        )
        return (
            <div className="border p-4 rounded shadow-md bg-white">
                <h3 className="text-xl font-semibold mb-2">Add a Review</h3>
                <textarea
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Write your review here..."
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                />
                <div className="flex items-center mb-2">
                    <Stars numberOfStars={newReviewStars} editable={true} onRatingChange={(newRating: number) => setNewReviewStars(newRating)} />
                </div>
                <button
                    className={`px-4 py-2 text-white rounded ${
                        (disableNewReview) ? 'cursor-not-allowed bg-blue-300' : 'hover:cursor-pointer bg-blue-500'}`}
                    onClick={onAddReview}
                    disabled={disableNewReview}
                    title="Review must have a rating and cannot be longer than 100 characters."
                    >
                    Submit Review
                </button>
            </div>
        )
    }

    function onDeleteReview(reviewId: number) {
        setProduct({
            ...product!,
            reviews: product!.reviews.filter((review) => review.id !== reviewId)
        });
    }

    return (product === null) ? (<div>Loading...</div>) : (
        <div className='page items-center'>
            <div className='h-[300px] w-[600px] rounded-lg overflow-hidden relative'>
                <img src={product.imageUrl} alt={product.name} className='h-full w-full object-cover' />
                {product.isSpecial && (<img src="/images/offer.png" alt="" width="70" height="70" className='absolute right-2 top-2'/>)}
            </div>
            <div className='flex justify-between flex-row w-2/3 p-5 items-center'>
                <div className='font-semibold text-xl'>{product.name}</div>
                <div className="text-gray-500 flex items-center gap-2">
                    {product.isSpecial && (
                        <>
                            <span className="line-through text-red-500">${product.originalPrice}</span>
                            <span className="text-green-500 font-bold">${product.price}</span>
                        </>
                    )}
                    {!product.isSpecial && (
                        <span>${product.price}</span>
                    )}
                    <span> / {product.unit}</span>
                </div>
                <div className='flex gap-3 items-center'>
                    <input id="amountPD" type='number' min='0.5' max='10' step='0.5' defaultValue='1' className='border p-2 rounded' />
                    <p>{product.unit}</p>
                    <div className='ml-5 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer' onClick={() => {
                        let amount = parseFloat((document.getElementById('amountPD') as HTMLInputElement).value);
                        addItemToCart(product, user, amount);
                    }}>Add to cart</div>
                </div>
            </div>
            <div className='w-2/3 p-5'>
                <h2 className='text-2xl font-bold mb-4'>Reviews</h2>
                <div className='mb-6'>
                    {product.reviews.map((review) => (
                        <Review key={review.id} initialReview={review} 
                            onDeleteReview={()=>onDeleteReview(review.id)}
                            />
                    ))}
                </div>
                {renderReviewForm()}
            </div>
        </div>
    );
}