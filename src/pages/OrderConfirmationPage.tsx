import { Link, useLocation } from "react-router-dom";
import AppRoutes from "../routing/Routes";
import { OrderConfirmationDTO } from "../types/dtos";


export default function OrderConfirmationPage() {
    const location = useLocation();
    const orderConfirmationDTO : OrderConfirmationDTO = location.state || {};

    if (!orderConfirmationDTO?.success){
        return (
            <div className='page'>
                <h1 className='font-semibold text-2xl'>No order to display here</h1>
                <Link to={AppRoutes.cart.path} className='blueButton max-w-64'>Return to shopping cart</Link>
            </div>
        );
    }

    const renderItems = () => {
        return orderConfirmationDTO.orderedItems.map(item => (
            <div key={item.productId} className='flex items-center mb-2 bg-white text-gray-700 p-2.5 w-full rounded-md'>
                <img src={item.imageUrl} alt={item.productName} className='w-12 h-12 mr-10' />
                <h3 className='font-semibold w-1/2'>{item.productName}</h3>
                <p>{item.amount} {item.unit} x ${item.unitPrice}</p>
            </div>
        ));
    };

    const renderAddress = () => {
        const { address } = orderConfirmationDTO;
        if (!address) {
            return <p>Your order is to be picked up at the store</p>;
        }
        return (
            <div>
                <h2 className='font-semibold text-xl'>Delivery Address:</h2>
                <p>{address.streetName} {address.streetNumber}</p>
                {address.apartmentNumber && <p>Apartment: {address.apartmentNumber}</p>}
                <p>Melbourne, VIC {address.postalCode}</p>
            </div>
        );
    };

    return (
        <div className='page'>
            <h1 className='font-semibold text-2xl'>Order completed!</h1>
            <p>Thank you for shopping with us.</p>
            <div className='mt-8'>
                {renderAddress()}
            </div>
            <div className='mt-8 w-2/3'>
                <h2 className='font-semibold text-xl mb-2'>Order Summary:</h2>
                <div>{renderItems()}</div>
            </div>
        </div>
    );
}