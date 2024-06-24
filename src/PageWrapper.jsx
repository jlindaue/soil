import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Helmet } from 'react-helmet';
import Routing from "./routing/Routing";
import AppRoutes from "./routing/Routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotificationPopup from './components/NotificationPopup';
import HomePage from "./pages/HomePage";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CalculatorPage from './pages/CalculatorPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SpecialsPage from "./pages/SpecialsPage";
import CartPage from "./pages/CartPage";
import ScrollToTop from "./components/ScrollToTop";
import OrderCheckoutPage from "./pages/OrderCheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import ProductsPage from "./pages/ProductsPage";

export default function PageWrapper(){
    return (
        <BrowserRouter history={Routing._history}>
            <ScrollToTop />
            <Helmet>
                <title>Soil</title>
            </Helmet>
            <NotificationPopup/>
            <Navbar />
            <div className="flex flex-col min-h-screen"> {/* Ensuring the flex column layout and minimum screen height */}
                <div className="flex-grow"> {/* This div will grow to take up all available space */}
                    <Routes>
                        <Route path={AppRoutes.home.path} element={<HomePage />}/>
                        <Route path={AppRoutes.login.path} element={<LoginPage />}/>
                        <Route path={AppRoutes.register.path} element={<RegisterPage />}/>
                        <Route path={AppRoutes.calculator.path} element={<CalculatorPage />}/>
                        <Route path={AppRoutes.profile.path} element={<ProfilePage />}/>
                        <Route path={AppRoutes.specials.path} element={<SpecialsPage />}/>
                        <Route path={AppRoutes.products.path} element={<ProductsPage />}/>
                        <Route path={AppRoutes.cart.path} element={<CartPage />}/>
                        <Route path={AppRoutes.orderCheckout.path} element={<OrderCheckoutPage />}/>
                        <Route path={AppRoutes.orderConfirmation.path} element={<OrderConfirmationPage />}/>
                        <Route path={`${AppRoutes.productDetail.path}/:productId`} element={<ProductDetailPage/>} />
                    </Routes>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}
