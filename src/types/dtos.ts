export type UserDTO = {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    dateJoined: string,
    subscribingTo: number[]
}

export type ProductDTO = {
    id: number,
    name: string,
    price: number,
    unit: string,
    imageUrl: string,
    isSpecial: boolean,
    originalPrice: number
}

export interface ProductDetailDTO extends ProductDTO {
    reviews: ReviewDTO[]
}

export type ReviewBaseDTO = {
    id: number,
    authorId: number,
    authorsFirstName: string,
    text: string,
    isDeleted: boolean,
}

export interface ReviewDTO extends ReviewBaseDTO{
    numberOfStars: number,
    replies: ReplyDTO[]
}

export interface ReplyDTO extends ReviewBaseDTO {
}

export type CreateReplyDTO = {
    type: "REPLY",
    text: string,
    reviewId: number
}

export type CreateReviewDTO = {
    type: "REVIEW",
    text: string,
    numberOfStars: number,
    productId: number
}

export type CreateReviewResponseDTO = {
    message: string,
    review: ReviewDTO
}

export type CreateReplyResponseDTO = {
    message: string,
    reply: ReplyDTO
}

export type ReplyEditDTO = {
    id: number,
    type: "REPLY",
    text: string,
}

export type ReviewEditDTO = {
    id: number,
    type: "REVIEW",
    text: string,
    numberOfStars: number
}


export type RegisterDTO = {
    email: string, 
    password: string,
    firstName: string,
    lastName: string,
}

export type LoginDTO = {
    email: string, 
    password: string
}

export type CartItemDTO = {
    productId: number,
    amount: number
}

export type CartItem = {
    productId: number,
    productName: string,
    unitPrice: number,
    unit: string,
    imageUrl: string
    amount: number
}

export type CartDTO = {
    items: CartItem[]
}



export type AddressDTO = {
    streetName: string,
    streetNumber: string,
    apartmentNumber: string,
    postalCode: string,
}

export type CardDetailsDTO = {
    name: string,
    cardNumber: string,
    expiryMonth: string,
    expiryYear: string,
    CVV: string,
}

export type PlaceOrderDTO = {
    address: AddressDTO | null
    cardDetails: CardDetailsDTO
}


export interface UpdateUserDTO extends RegisterDTO {
    oldPassword: string
}

export type OrderConfirmationDTO = {
    success: boolean,
    address: AddressDTO | null //null represents that the order is a pickup order
    orderedItems: CartItem[]
}