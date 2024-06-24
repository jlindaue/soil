
import { ProductDTO } from '../types/dtos';
import { Link } from 'react-router-dom';
import AppRoutes from '../routing/Routes';

type ProductProps = {
    product: ProductDTO;
}

export default function Product({ product }: ProductProps) {
    return (
        <Link
            to={`${AppRoutes.productDetail.path}/${product.id}`}
            className={`min-w-[200px] rounded-lg shadow-lg bg-white hover:scale-110 transition-transform duration-300 ease-in-out 
                        ${product.isSpecial ? 'border-4 border-yellow-500' : ''}`}
        >
            <div className="h-[200px] overflow-hidden rounded-t-lg relative">
                <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover transition-all duration-300 ease-in-out" />
                {product.isSpecial && (<img src="/images/offer.png" alt="" width="70" height="70" className='absolute right-2 top-2'/>)}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <div className="text-gray-500 flex items-center gap-2">
                    {product.isSpecial && (
                        <>
                            <span className="line-through text-red-500">${product.originalPrice}</span>
                            <span className="text-green-500 font-bold">${product.price}</span>
                        </>
                    )}
                    {!product.isSpecial && (
                        <span>${product.price}</span>
                    )}
                    <span> / {product.unit}</span>
                </div>
            </div>
        </Link>
    );
}