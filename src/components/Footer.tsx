import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-5 px-4">
            <div className="container mx-auto grid grid-cols-3 gap-8">
                <div>
                    <h2 className="font-bold text-lg mb-3">QUICK LINKS</h2>
                    <ul className="space-y-2">
                        <li><Link to="/specials" className="hover:text-gray-300">Specials</Link></li>
                        <li><Link to="/calculator" className="hover:text-gray-300">Calculator</Link></li>
                        <li><Link to="/cart" className="hover:text-gray-300">Cart</Link></li>
                    </ul>
                </div>
                <div>
                    <h2 className="font-bold text-lg mb-3">BRANCHES</h2>
                    <p>12, Collins Street<br/>Melbourne, VIC 3000</p>
                    <p>4, High Road<br/>Sydney, NSW 2000</p>
                </div>
                <div>
                    <h2 className="font-bold text-lg mb-4">CONTACT US</h2>
                    <p>Email: <a href="mailto:info@soil.com" className="text-blue-400 hover:text-blue-500">info@soil.com</a></p>
                    <p>Phone: (+61) 456-7890</p>
                    <div className="flex space-x-4 mt-3">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebookF} className="w-6 h-6" />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="text-center mt-8 border-t border-gray-700 pt-4">
                &copy; {new Date().getFullYear()} SOIL. All rights reserved.
            </div>
        </footer>
    );
}


