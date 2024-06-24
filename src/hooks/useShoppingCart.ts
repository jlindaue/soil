import { User } from '../types/types';
import { CartDTO, CartItem, PlaceOrderDTO, ProductDTO } from '../types/dtos';
import { makeAddCartItemRequest, makePlaceOrderRequest, makeRemoveCartItemRequest, makeUpdateCartItemAmountRequest } from '../network/requests';
import { displayError } from '../commons/notifications';
import { useContext } from 'react';
import { AppContext, OrderContext } from '../commons/state';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '../routing/Routes';

function calculateOrderCost(order: CartDTO): number{
    let totalCost = 0;
    order.items.forEach(item=>{
        totalCost += item.unitPrice * item.amount;
    })
    return totalCost;
}

function updateOrderAmount(order: CartDTO, updatedItem: CartItem) : CartDTO{
    const orderCopy: CartDTO = {items: []};
    if (updatedItem.amount === 0){
        orderCopy.items = order.items.filter((item) => item.productId !== updatedItem.productId);
    }else{
        let present = false;
        orderCopy.items = order.items.map((item:CartItem) => {
            if (item.productId === updatedItem.productId){
                present = true;
                return {...item, amount: updatedItem.amount};
            }
            return item;
        });
        if (!present){
            orderCopy.items.push(updatedItem);
        }
    }
    return orderCopy;
}

export default function useShoppingCart() {
    const {order, setOrder} = useContext(OrderContext);
    const {setNotification} = useContext(AppContext);
    const navigate = useNavigate();

    const _onAmountChange = (productId: number, amount: number) => {
        const cartItem = order.items.find((item: CartItem) => item.productId === productId);
        if (cartItem === undefined) {
            console.log('App error: Item not found in cart');
            return;
        }
        cartItem.amount = amount;
        if (cartItem === undefined) return;
        const updatedOrder: CartDTO = updateOrderAmount(order, cartItem);
        setOrder(updatedOrder);
    };

    const updateCartItemAmount = async (productId: number, amount: number) => {
        try{
            await makeUpdateCartItemAmountRequest({productId, amount});
        }catch(e){
            displayError(e, "Failed to add item to cart", setNotification)
            return;
        }
        _onAmountChange(productId, amount);
    }

    const removeItemFromCart = async (productId: number) => {
        try{
            await makeRemoveCartItemRequest(productId);
        }catch(e){
            displayError(e, "Failed to add item to cart", setNotification)
            return;
        }
        _onAmountChange(productId, 0);
    };

    const addItemToCart = async (product: ProductDTO, user: User, amount: number) => {
        if (product === null) return;
        if (user.email === '') {
            setNotification({text: 'Please log in to add items to your cart', type: 'ERROR', show: true});
            return;
        }
        console.log('Adding to cart', amount);
        order.items.forEach(item => {if (item.productId === product.id) {amount += item.amount;}});
        const newCartItem: CartItem = {
            productId: product.id,
            productName: product.name,
            unitPrice: product.price,
            unit: product.unit,
            imageUrl: product.imageUrl,
            amount: amount,
        }
        try{
            await makeAddCartItemRequest({productId: product.id, amount});
        }catch(e){
            displayError(e, "Failed to add item to cart", setNotification)
            return;
        }
        const updatedOrder : CartDTO = updateOrderAmount(order, newCartItem);
        setOrder(updatedOrder);
        setNotification({text: 'Item added to cart', type: 'SUCCESS', show: true});
    }

    const clearCart = () => {
        setOrder({items: []});
    }

    const setCart = (cart: CartDTO) => {
        setOrder(cart);
    }

    const placeOrder = async (placeOrderDTO: PlaceOrderDTO) => {
        try{
            let response = await makePlaceOrderRequest(placeOrderDTO);
            if (response.success){
                clearCart();
                navigate(AppRoutes.orderConfirmation.path, {state: response});
            }else{
                setNotification({text: "Cannot proceed with this order", type: 'ERROR', show: true});
            }
        }catch(e){
            console.log(e);
            displayError(e, "Failed to place order", setNotification);
        }
    }

    const totalCost = calculateOrderCost(order);
    const itemsInOrder = order.items.length;

    return {
        order,
        updateCartItemAmount,
        addItemToCart,
        removeItemFromCart,
        itemsInOrder,
        clearCart,
        setCart,
        placeOrder,
        totalCost,
    };
}