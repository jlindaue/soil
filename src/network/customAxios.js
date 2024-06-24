import MockAdapter from "axios-mock-adapter";
import Axios from "axios";
import { BACKEND_URL } from '../commons/config';
import { Paths } from "./paths";

export let axios;
if (process.env.REACT_APP_MOCK_REST_API){
    axios = Axios.create({baseURL: "http://localhost:3000"});
}else{
    axios = Axios.create({baseURL: BACKEND_URL});
}



const mockUser = {"id": 3, "email":"test@email.com", "firstName":"Pepik", "lastName":"Smith", "dateJoined":'2024-05-30T05:01:25.000Z', subscribingTo: []}

const mockReviews = [{
    id: 1,
    authorId: 1,
    authorsFirstName: "John",
    subscribingAuthor: false,
    text: "Great product",
    isDeleted: false,
    numberOfStars: 5,
    replies: [],
},{
    id: 2,
    authorId: 2,
    authorsFirstName: "Jane",
    subscribingAuthor: true,
    text: "I didn't like it",
    isDeleted: false,
    numberOfStars: 1,
    replies: []
},{
    id: 3,
    authorId: 3,
    authorsFirstName: "Jack",
    subscribingAuthor: false,
    text: "It's ok",
    isDeleted: false,
    numberOfStars: 3,
    replies: [
        {
            id: 4,
            authorId: 4,
            authorsFirstName: "Jill",
            subscribingAuthor: false,
            text: "I agree",
            isDeleted: false
        },
        {
            id: 5,
            authorId: 3,
            authorsFirstName: "Jack",
            subscribingAuthor: false,
            text: "I disagree",
            isDeleted: false
        }
    ]
}]

//batata, meat, onion, parmesan, potato, pasta
const mockProducts = [{
    "id": 1,
    "name": "Batatas",
    "description": "Our homegrown batatas",
    "price": 10.00,
    "amount": 1,
    "unit": "kg",
    "imageUrl": "/images/batata.jpg",
    "reviews": mockReviews,
    isSpecial: true,
    originalPrice: 15.00,
},{
    "id": 2,
    "name": "Beef",
    "description": "Our premium beef",
    "price": 20.00,
    "amount": 1,
    "unit": "kg",
    "imageUrl": "/images/beef.jpg",
    "reviews": mockReviews
},{
    "id": 3,
    "name": "Onions",
    "description": "Our homegrown onions",
    "price": 5.00,
    "amount": 1,
    "unit": "kg",
    "imageUrl": "/images/onions.jpg",
    "reviews": mockReviews
},{
    "id": 4,
    "name": "Parmesan",
    "description": "Our signature parmesan",
    "price": 15.00,
    "amount": 1,
    "unit": "kg",
    "imageUrl": "/images/parmesan.jpg",
    "reviews": mockReviews
},{
    "id": 5,
    "name": "Potatoes",
    "description": "Our homegrown potatoes",
    "price": 7.00,
    "amount": 1,
    "unit": "kg",
    "imageUrl": "/images/potatoes.jpg",
    "reviews": mockReviews
},{
    "id": 6,
    "name": "Pasta",
    "description": "Our homegrown pasta",
    "price": 8.00,
    "amount": 1,
    "unit": "kg",
    "imageUrl": "/images/pasta.jpg",
    "reviews": mockReviews
}]


const cartItems = [{
    productId: 1,
    productName: "Batatas",
    unitPrice: 10.00,
    unit: "kg",
    imageUrl: "/images/batata.jpg",
    amount: 1
},{
    productId: 2,
    productName: "Beef",
    unitPrice: 20.00,
    unit: "kg",
    imageUrl: "/images/meat.jpg",
    amount: 1
},{
    productId: 3,
    productName: "Onions",
    unitPrice: 5.00,
    unit: "kg",
    imageUrl: "/images/onion.jpg",
    amount: 1
}]


let currentUser = {...mockUser}

const updateUser = (user) => {
    currentUser.email = user.email;
    currentUser.firstName = user.firstName;
    currentUser.lastName = user.lastName;
    console.log(currentUser);
}

function getRandomInt(max=100000) {
    return Math.floor(Math.random() * max);
  }

if (process.env.REACT_APP_MOCK_REST_API) {
    const mock = new MockAdapter(axios, {delayResponse: 200});
    mock.onGet(Paths.currentUserUrl).reply(()=>{console.log(currentUser); return [200, currentUser]});
    mock.onPost(Paths.loginUrl).reply(200, {loggedIn: true});
    
    mock.onPost(Paths.registerUserUrl).reply(({data}) => {updateUser(JSON.parse(data)); return [204];});
    mock.onPost(Paths.logoutUrl).reply(200);
    mock.onGet(Paths.getSpecialsUrl).reply(200, mockProducts);
    mock.onGet(Paths.getAllProductsUrl).reply(200, mockProducts);
    mock.onGet(/\/api\/products\/\d/).reply((config) => {
        const id = config.url.match(/\/products\/(\d+)/)[1];
        return [200, mockProducts.find(p=>p.id === parseInt(id))];
    });
    mock.onDelete(Paths.deleteUserUrl).reply(()=>{currentUser = {...mockUser}; return [200]});
    mock.onPut(Paths.updateUserUrl).reply(({data}) => {updateUser(JSON.parse(data)); return [204];});
    mock.onPost(Paths.placeOrderUrl).reply(200, {success: true, orderedItems: cartItems, address: null});

    mock.onGet(Paths.getCartUrl).reply(200, {items:cartItems});
    mock.onPost(Paths.addCartItemUrl).reply(({data}) => {console.log(data); return [204];});
    mock.onPut(Paths.updateCartItemAmountUrl).reply(({data}) => {console.log(data); return [204];});
    mock.onDelete(Paths.removeCartItemUrl).reply(({data}) => {console.log(data); return [204];});

    mock.onPost(Paths.addReviewUrl).reply(({data}) => {console.log(data); return [204, {message: "Successfully added review", reply: {id: getRandomInt()}, review: {id: getRandomInt()}}]});
    // mock.onPost(Paths.addReviewUrl).reply(400, { message: "Review ID is required for replies." });
    mock.onPut(Paths.editReviewUrl).reply(204);
    mock.onDelete(/\/api\/reply\/\d/).reply(204);
    mock.onDelete(/\/api\/review\/\d/).reply(204);

    mock.onPost(Paths.subscribeUrl).reply(204);
    mock.onPost(Paths.unsubscribeUrl).reply(204);
}