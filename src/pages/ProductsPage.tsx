import { useEffect, useState } from 'react';
import { ProductDTO } from '../types/dtos';
import Product from '../components/Product';
import { makeGetAllProductsRequest, makeGetSpecialsRequest } from '../network/requests';

export default function ProductsPage() {
    const [products, setProducts] = useState<ProductDTO[]>([]);

    useEffect(() => {
        makeGetAllProductsRequest().then((response) => {
            console.log('Fetched products', response);
            setProducts(response);
        }).catch((error) => {
            console.error('Failed to fetch products', error);
        });
    }, []);

    return (
        <div className='page'>
            <div className='w-full p-4 text-center' style={{ backgroundColor: '#FFF3B0', color: '#335C67', fontFamily: 'Pacifico, cursive' }}>
                <h2 className='text-3xl'>Check out our products!</h2>
            </div>
            <ul className='grid-cols-4 grid grid-flow-row w-full gap-2'>
                {products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </ul>
        </div>
    );
}
