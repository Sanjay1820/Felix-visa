import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';

const Layout = () => {
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const handlePreloaderComplete = () => {
        setLoading(false);
    };

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="relative min-h-screen flex flex-col">
            {loading && <Preloader onComplete={handlePreloaderComplete} />}

            <div className={`flex flex-col flex-grow transition-opacity duration-1000 ${loading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <Navbar />
                <main className="flex-grow">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
