import { AddressDTO } from '../types/dtos';
import { GeneralObject } from '../types/types';

type AddressInputProps = {
    address: AddressDTO,
    setAddress: (address: AddressDTO) => any
}

export default function AddressInput(props: AddressInputProps) {
    const address: AddressDTO = props.address;

    const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.classList.remove("bg-red-100");
        const updatedAddress = {...address} as AddressDTO;
        (updatedAddress as unknown as GeneralObject)[e.target.name] = e.target.value;
        props.setAddress(updatedAddress);
    }

    return (
        <div className=''>
            <h2 className='font-semibold text-xl my-3'>Address in Melbourne:</h2>
            <div className="">
                <div className="flex gap-1">
                    <input id="AddressStreetName" 
                        type="text"
                        name='streetName'
                        onChange={_onChange}
                        value={address.streetName} 
                        placeholder="Street name*" 
                        title="Enter street name"
                        className="formInput"/>
                    <input id="AddressStreetNumber" 
                        type="text"
                        name='streetNumber'
                        onChange={_onChange}
                        value={address.streetNumber} 
                        placeholder="Street number*" 
                        title="Enter street number"
                        className="formInput"/>
                </div>
                <div className="flex gap-1">
                    <input id="AddressApartmentNumber" 
                        type="text"
                        name='apartmentNumber'
                        onChange={_onChange}
                        value={address.apartmentNumber} 
                        title="Enter apartment number"
                        placeholder="Apt number" 
                        className="formInput"/>
                    <input id="AddressPostalCode" 
                        type="text"
                        name='postalCode'
                        onChange={_onChange}
                        value={address.postalCode} 
                        placeholder="ZIP Code*" 
                        title="Enter postal code"
                        className="formInput"/>
                </div>
            </div>
        </div>
    );
}