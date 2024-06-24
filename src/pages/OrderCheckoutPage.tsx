
import useShoppingCart from '../hooks/useShoppingCart';
import AddressInput from '../components/AddressInput';
import { useState } from 'react';
import CreditCardInput from '../components/CreditCardInput';
import { Link } from 'react-router-dom';
import AppRoutes from '../routing/Routes';
import { AddressDTO, CardDetailsDTO, CartDTO } from '../types/dtos';
import { verifyAddress, verifyCardDetails } from '../commons/verifiers';




function submitOrder(order: CartDTO, address: AddressDTO, pickup: string | undefined, cardDetails: CardDetailsDTO, 
        setIssues: (issues: string[])=>any, placeOrder: (placeOrderDTO: any)=>any){
    let messages = [] as string[];
    if (pickup === undefined){
        messages.push("Select either delivery or pickup");
    }
    if (pickup === "deliver"){
        messages = messages.concat(verifyAddress(address));
    }
    messages = messages.concat(verifyCardDetails(cardDetails));
    setIssues(messages);
    if (messages.length > 0){
        return;
    }
    const products = [] as {productId: number, amount: number}[];
    order.items.forEach(item => {
        products.push({productId: item.productId, amount: item.amount});
    });
    const placeOrderDTO = (pickup === "deliver") ? {address, cardDetails} : {address: null, cardDetails};
    placeOrder(placeOrderDTO);
}
    

export default function OrderCheckoutPage() {
    const [issues, setIssues] = useState<string[]>([]);
    const [pickup, setPickup] = useState<string>();
    const {order, clearCart, totalCost, placeOrder} = useShoppingCart();
    
    const [address, setAddress] = useState<AddressDTO>({
        streetName: "",
        streetNumber: "",
        apartmentNumber: "",
        postalCode: ""
    });
    
    const [cardDetails, setCardDetails] = useState<CardDetailsDTO>({
        name: "",
        cardNumber: "",
        expiryMonth: "",
        expiryYear: "",
        CVV: ""
    });


    return (
        <div className='page'>
            <h1 className='font-semibold text-2xl'>Order checkout</h1>
            
            {/* Choose either delivery or pickup at store, select */}
            <div className='flex items-center'>
                <input className='mx-3' type="radio" id="deliveryChoicePickup" name="delivery" value="pickup" onChange={e => setPickup(e.target.value)}/>
                <label htmlFor="deliveryChoicePickup">Pickup up at the store</label>

                <input className='mx-3 ml-12' type="radio" id="deliveryChoiceDeliver" name="delivery" value="deliver" onChange={e => setPickup(e.target.value)}/>
                <label htmlFor="deliveryChoiceDeliver">Deliver</label>
            </div>

            {pickup === "deliver" ?
                <AddressInput address={address} setAddress={setAddress}/>:
                null
            }
            <CreditCardInput cardDetails={cardDetails} setCardDetails={setCardDetails}/>
            <ul className={`bg-red-200 p-2 rounded-md text-red-600 ${issues.length==0?"hidden":""}`}>
                {issues.map((issue,i)=>(<li key={i}>{issue}</li>))}
            </ul>
            <div className="font-semibold text-2xl flex gap-5">
                <p>Your total:</p>
                <p>${totalCost}</p>
            </div>
            <input className='blueButton max-w-72 hover:cursor-pointer' 
                type="submit" 
                value="Place order"
                onClick={e=>{e.preventDefault(); submitOrder(order, address, pickup, cardDetails, setIssues, placeOrder)}}/>
            <Link to={AppRoutes.cart.path} className="link">Back to cart</Link>
        </div>
    );
}