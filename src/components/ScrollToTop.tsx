import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);  // This will trigger the effect every time the pathname changes

    return null;  // This component does not render anything
};

export default ScrollToTop;
