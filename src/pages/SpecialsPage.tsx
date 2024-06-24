import { useEffect, useState } from 'react';
import { ProductDTO } from '../types/dtos';
import Product from '../components/Product';
import { makeGetSpecialsRequest } from '../network/requests';

export default function SpecialsPage() {
    const [products, setProducts] = useState<ProductDTO[]>([]);

    useEffect(() => {
        let savedSpecials = localStorage.getItem('specials');
        if (savedSpecials) {
            const { products, timestamp } = JSON.parse(savedSpecials);
            setProducts(products);
            console.log('Loaded specials from cache');
            if (Date.now() - timestamp < 1000 * 60 * 15) {
                console.log('Skipping specials fetch from server, cache is fresh');
                return;
            }
        }
        makeGetSpecialsRequest().then((response) => {
            console.log('Fetched specials', response);
            setProducts(response);
            localStorage.setItem('specials', JSON.stringify({ products: response, timestamp: Date.now() }));
        }).catch((error) => {
            console.error('Failed to fetch products', error);
        });
    }, []);

    return (
        <div className='page'>
            <div className='w-full p-4 text-center' style={{ backgroundColor: '#FFF3B0', color: '#335C67', fontFamily: 'Pacifico, cursive' }}>
                <h2 className='text-3xl'>Check out our specials for the week!</h2>
            </div>
            <ul className='grid-cols-4 grid grid-flow-row w-full gap-2'>
                {products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </ul>
        </div>
    );
}
