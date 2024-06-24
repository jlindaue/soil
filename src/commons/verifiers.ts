import { AddressDTO, CardDetailsDTO } from "../types/dtos";

export function verifyPasswordQuality(messages: string[], password: string, fieldId: string){
    if (password.length < 8){
        document.getElementById(fieldId)?.classList?.add("bg-red-100");
        messages.push("Password must be at least 8 characters long")
    }
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)){
        document.getElementById(fieldId)?.classList?.add("bg-red-100");
        messages.push("Password must contain at least one number, one capital letter and one small letter")
    }
}

export function verifyEmail(messages: string[], email: string, fieldId: string){
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        document.getElementById(fieldId)?.classList?.add("bg-red-100");
        messages.push("Email is not valid")
    }
}

export function verifyCardDetails(cardDetails: CardDetailsDTO): string[]{
    let messages = [] as string[];
    if (cardDetails.name === "" || /[0-9]/.test(cardDetails.name)){
        document.querySelector("#cardName")?.classList.add("bg-red-100");
        messages.push("Enter the name on the card.")
    }
    if (!/^\d{16}$/.test(cardDetails.cardNumber) || !verifyCardNumberUsingLuhn(cardDetails.cardNumber)){
        document.querySelector("#cardNumber")?.classList.add("bg-red-100");
        messages.push("Enter valid card number.")
    }
    if (!/^\d{2}$/.test(cardDetails.expiryMonth) || parseInt(cardDetails.expiryMonth) > 12 || parseInt(cardDetails.expiryMonth) < 1){
        document.querySelector("#expiryMonth")?.classList.add("bg-red-100");
        messages.push("Enter valid expiry month.")
    }
    if (!/^\d{2}$/.test(cardDetails.expiryYear) || parseInt(cardDetails.expiryYear) < (new Date().getFullYear())%100){
        document.querySelector("#expiryYear")?.classList.add("bg-red-100");
        messages.push("Enter valid expiry year.")
    }
    if (parseInt(cardDetails.expiryYear) === (new Date().getFullYear())%100 && parseInt(cardDetails.expiryMonth) < (new Date().getMonth())+1){
        document.querySelector("#expiryYear")?.classList.add("bg-red-100");
        document.querySelector("#expiryMonth")?.classList.add("bg-red-100");
        messages.push("Enter future expiry date")
    }
    if (!/^\d{3}$/.test(cardDetails.CVV)){
        document.querySelector("#CVV")?.classList.add("bg-red-100");
        messages.push("Enter the CVV.")
    }
    return messages;
}

// Luhn algorithm for verifying card numbers
// https://en.wikipedia.org/wiki/Luhn_algorithm
function verifyCardNumberUsingLuhn(cardNumber: string): boolean{
    let sum = 0;
    let alternate = false;
    for (let i = cardNumber.length - 1; i >= 0; i--){
        let digit = parseInt(cardNumber[i]);
        if (alternate){
            digit *= 2;
            if (digit > 9){
                digit -= 9;
            }
        }
        sum += digit;
        alternate = !alternate;
    }
    return sum % 10 === 0;

}


const MELBOURNE_POSTAL_CODES = [
    "3008",
    "3002",
    "3000",
    "3003",
    "3005",
    "3006",
    "3141",
    "3006",
    "3053",
    "3054",
    "3053",
    "3052",
    "3052",
    "3050",
    "3010"
]


export function verifyAddress(address: AddressDTO): string[]{
    let messages = [] as string[];
    if (address.streetName === "" || address.streetNumber === ""){
        document.querySelector("#AddressStreetName")?.classList.add("bg-red-100");
        document.querySelector("#AddressStreetNumber")?.classList.add("bg-red-100");
        messages.push("Enter a valid address within Melbourne.")
    }
    if (!MELBOURNE_POSTAL_CODES.includes(address.postalCode)){
        document.querySelector("#AddressPostalCode")?.classList.add("bg-red-100");
        messages.push("Sorry, we only deliver within inner city Melbourne suburbs.")
    }
    return messages;
}
