import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-primary flex items-center justify-center text-center px-4">
            <div className="max-w-xl">
                <div className="bg-primary-light border border-white/5 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl transform translate-x-12 -translate-y-12"></div>

                    <div className="mb-6 flex justify-center">
                        <AlertTriangle size={64} className="text-accent animate-pulse" />
                    </div>

                    <h1 className="text-6xl font-heading font-bold text-white mb-4">404</h1>
                    <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>

                    <p className="text-gray-400 mb-8 font-light">
                        We apologize, but the page you are looking for has either been moved or does not exist.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/" className="px-6 py-3 bg-accent text-primary font-bold rounded hover:bg-white transition-all duration-300 flex items-center justify-center uppercase tracking-widest shadow-lg">
                            <Home size={18} className="mr-2" />
                            Return Home
                        </Link>
                        <Link to="/contact" className="px-6 py-3 border border-white/20 text-white font-medium rounded hover:bg-white/10 transition-all duration-300 uppercase tracking-widest">
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
