
import { Link } from 'react-router-dom';
import AppRoutes from '../routing/Routes';

export default function HomePage() {
    return (
        <div className="page bg-gray-700">
            <div className='p-10 text-white text-xl font-medium'>
                <h1>Welcome to SOIL, we care!</h1>
                
                <div className='banner bg-black p-4 rounded-lg my-2'>
                    Do you need help creating your nutritional plan?
                    You can use our <Link to={AppRoutes.calculator.path} className='link text-blue-300'>calculator</Link> to get started.
                </div>
                <div className='banner bg-black p-4 rounded-lg my-2'>
                    Do you want to start growing your own vegetables in your backyard? Come and see us any Wednesday at 6 pm at
                    one of our seminars. We have everything you need. 
                </div>
            </div>
            
            
            <div className='px-10 w-full flex gap-4'>
                <Link to={AppRoutes.specials.path} className="transition duration-300 transform hover:scale-105 inline-block">
                    <div className="bg-cover bg-center bg-no-repeat rounded-lg shadow-lg" style={{  backgroundImage: `url(${process.env.PUBLIC_URL}/images/groceryimage2.jpg)`,  width: '300px', height: '300px', filter: 'brightness(170%)', }} >
                        <div className="flex flex-col justify-end h-full bg-black bg-opacity-50 rounded-lg">
                                <p className="text-black text-xl font-bold p-4">Check out our <span className="underline">SPECIALS!</span></p>
                        </div>
                    </div>
                </Link>
                
                <div className='text-container p-4 bg-black bg-opacity-50 rounded-lg shadow-xl '>
                    <p className="text-white font-semibold text-xl">
                    "Since the early 2000's, SOIL has been uncompromising in the commitment to provide products that change the lives of customers. We are more than your local grocery store; we are a community of people who are united in our love for pure products that protect the health of people and our planet."
                    </p>
                </div>
            </div>
            


            
        </div>
    );
}





