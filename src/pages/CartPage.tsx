//empty home page

import { Link } from 'react-router-dom';
import AppRoutes from '../routing/Routes';

import { FaTrash } from "react-icons/fa";
import useShoppingCart from '../hooks/useShoppingCart';

export default function CartPage() {
    const { order, updateCartItemAmount, totalCost, removeItemFromCart, itemsInOrder } = useShoppingCart();

    return (
        <div className='page'>
            <h1>Cart</h1>
            {(order.items.length === 0) ? (
                <div className='banner'>
                    Your cart is empty. 
                    <Link to={AppRoutes.specials.path} className='link'>Check out our specials</Link>!
                </div>) : 
                (order.items.map((item) => (
                    <div key={item.productId} className='cartItem'>
                        <img src={item.imageUrl} alt={item.productName} className='h-[50px] w-[50px] object-cover rounded-full' />
                        <div className='grid grid-cols-3 items-center flex-grow'>
                            <p>{item.productName}</p>
                            <div className='flex gap-3 items-center w-full justify-center'>
                                <input className='max-w-20' type='number' min='0.5' max='10' step='0.5' value={item.amount} onChange={(e)=>{updateCartItemAmount(item.productId, parseFloat(e.target.value))}}/>
                                <p className=''>{item.unit}</p>
                            </div>
                            <p>${item.unitPrice * item.amount}</p>
                        </div>
                        <FaTrash className="text-2xl hover:cursor-pointer" onClick={() => removeItemFromCart(item.productId)}/>
                    </div>
                )))
            }
            <div className="font-semibold text-2xl flex gap-5">
                <p>Your total:</p>
                <p>${totalCost}</p>
            </div>
            {itemsInOrder > 0 ? <Link to={AppRoutes.orderCheckout.path} className="blueButton">Checkout</Link> : null}
        </div>
    );
}