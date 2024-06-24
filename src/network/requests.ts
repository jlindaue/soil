import { CartDTO, CartItemDTO, CreateReplyDTO, CreateReplyResponseDTO, CreateReviewDTO, CreateReviewResponseDTO, LoginDTO, OrderConfirmationDTO, PlaceOrderDTO, ProductDTO, ProductDetailDTO, RegisterDTO, ReplyEditDTO, ReviewEditDTO, UpdateUserDTO, UserDTO } from "../types/dtos";
import {axios} from "./customAxios";
import { Paths } from "./paths";

axios.defaults.withCredentials = true

export async function makeLoginRequest(credentials: LoginDTO): Promise<{ loggedIn: boolean }> {
    return (await axios.post(Paths.loginUrl, credentials)).data;
}

export async function makeGetCurrentUserRequest(): Promise<UserDTO> {
    return (await axios.get(Paths.currentUserUrl)).data;
}

export async function makeUpdateUserRequest(userInfo: UpdateUserDTO) {
    return await axios.put(Paths.updateUserUrl, userInfo);
}

export async function makeDeleteCurrentUserRequest() {
    return await axios.delete(Paths.deleteUserUrl);
}

export async function makeRegisterUserRequest(userInfo: RegisterDTO) {
    return await axios.post(Paths.registerUserUrl, userInfo);
}

export async function makeLogoutRequest() {
    return await axios.post(Paths.logoutUrl);
}

export async function makeGetProductRequest(productId: number): Promise<ProductDetailDTO> {
    return (await axios.get(`${Paths.getProductUrl}/${productId}`)).data;
}

export async function makeGetSpecialsRequest(): Promise<ProductDTO[]> {
    return (await axios.get(Paths.getSpecialsUrl)).data;
}

export async function makeGetAllProductsRequest(): Promise<ProductDTO[]> {
    return (await axios.get(Paths.getAllProductsUrl)).data;
}

export async function makeUpdateCartItemAmountRequest(cartItem: CartItemDTO) {
    return await axios.put(Paths.updateCartItemAmountUrl, cartItem);
}

export async function makeAddCartItemRequest(cartItem: CartItemDTO) {
    return await axios.post(Paths.addCartItemUrl, cartItem);
}

export async function makeRemoveCartItemRequest(productId: number) {
    return await axios.delete(`${Paths.removeCartItemUrl}/${productId}`);
}

export async function makePlaceOrderRequest(order: PlaceOrderDTO): Promise<OrderConfirmationDTO> {
    return (await axios.post(Paths.placeOrderUrl, order)).data;
}

export async function makeGetCartRequest(): Promise<CartDTO> {
    return (await axios.get(Paths.getCartUrl)).data;
}

export async function makeDeleteReviewRequest(id: number) {
    return await axios.delete(`${Paths.deleteReviewUrl}/${id}`);
}

export async function makeDeleteReplyRequest(id: number) {
    return await axios.delete(`${Paths.deleteReplyUrl}/${id}`);
}

export async function makeEditReviewRequest(editDto: ReviewEditDTO | ReplyEditDTO) {
    return await axios.put(Paths.editReviewUrl, editDto);
}

export async function makeAddReviewRequest(review: CreateReviewDTO): Promise<CreateReviewResponseDTO> {
    return (await axios.post(Paths.addReviewUrl, review)).data;
}

export async function makeAddReplyRequest(review: CreateReplyDTO): Promise<CreateReplyResponseDTO> {
    return (await axios.post(Paths.addReviewUrl, review)).data;
}


export async function makeSubscribeRequest(otherUserId: number) {
    return await axios.post(Paths.subscribeUrl, {otherUserId});
}

export async function makeUnsubscribeRequest(otherUserId: number) {
    return await axios.post(Paths.unsubscribeUrl, {otherUserId});
}