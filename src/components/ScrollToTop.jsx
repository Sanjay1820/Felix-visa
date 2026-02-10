import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Instant scroll to top on route change to prevent "scrolling up" animation
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
