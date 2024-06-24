import { useRef } from 'react';
import { CardDetailsDTO } from '../types/dtos';

type CreditCardInputProps = {
    cardDetails: CardDetailsDTO,
    setCardDetails: (address: CardDetailsDTO) => any
}


export default function CreditCardInput(props: CreditCardInputProps) {
    const cardDetails: CardDetailsDTO = props.cardDetails;
    const expiryMonthInput = useRef<HTMLInputElement>(null);
    const expiryYearInput = useRef<HTMLInputElement>(null);


    const restrictValue = {
        cardNumber: (value: string) => value.replace(/\D/g, "").slice(0, 16),
        expiryMonth: (value: string) => value.replace(/\D/g, "").slice(0, 2),
        expiryYear: (value: string) => value.replace(/\D/g, "").slice(0, 2),
        CVV: (value: string) => value.replace(/\D/g, "").slice(0, 3),
        name: (value: string) => value.replace(/\d/g, "")
    }

    const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.classList.remove("bg-red-100");
        const updatedDetails = {...cardDetails} as CardDetailsDTO;
        updatedDetails[e.target.name as keyof CardDetailsDTO] = restrictValue[e.target.name as keyof typeof restrictValue](e.target.value);
        if (e.target.name === "expiryMonth" || e.target.name === "expiryYear"){
            expiryMonthInput.current?.classList.remove("bg-red-100");
            expiryYearInput.current?.classList.remove("bg-red-100");
        }
        props.setCardDetails(updatedDetails);
    }

    return (
        <div className=''>
            <h2 className='font-semibold text-xl my-3'>Payment details:</h2>
            <div className="">
                <div className="flex gap-1">
                    <input id="cardName" 
                        type="text"
                        name='name'
                        onChange={_onChange}
                        value={cardDetails.name} 
                        placeholder="Name on card*"
                        title="Enter name as written on card" 
                        className="formInput"/>
                </div>
                <div className="flex gap-1">
                    <input id="cardNumber"
                        type="text"
                        name='cardNumber'
                        onChange={_onChange}
                        value={cardDetails.cardNumber.replace(/(.{4})(?=.)/g, "$1 ")} 
                        placeholder="Card number*" 
                        title="Enter 16 digit card number"
                        className="formInput"/>
                </div>
                <div className="flex gap-1">
                    <input id="expiryMonth" ref={expiryMonthInput}
                        type="text"
                        name='expiryMonth'
                        onChange={_onChange}
                        value={cardDetails.expiryMonth} 
                        placeholder="Expiry month*" 
                        title="Enter month in format MM"
                        className="formInput"/>
                    <input id="expiryYear" ref={expiryYearInput}
                        type="text"
                        name='expiryYear'
                        onChange={_onChange}
                        value={cardDetails.expiryYear} 
                        title="Enter year in format YY"
                        placeholder="Expiry year*" 
                        className="formInput"/>
                    <input id="CVV" 
                        type="text"
                        name='CVV'
                        onChange={_onChange}
                        value={cardDetails.CVV} 
                        placeholder="CVV*" 
                        title="Enter 3 digit CVV"
                        className="formInput"/>
                </div>                    
            </div>
        </div>
    );
}