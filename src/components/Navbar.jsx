import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { title: 'Home', path: '/' },
        { title: 'About Us', path: '/about' },
        { title: 'Visa Services', path: '/services' },
        { title: 'Countries', path: '/countries' },
        { title: 'Process', path: '/process' },
        { title: 'Why Us', path: '/why-us' },
        { title: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-primary/95 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo - Synchronized Mission Branding */}
                <NavLink to="/" className="flex flex-col items-start leading-none group transition-all duration-300">
                    <span className="text-3xl md:text-4xl font-heading font-black text-white tracking-tighter group-hover:text-accent transition-colors mb-0.5">
                        FILIX
                    </span>
                    <div className="flex items-center gap-1.5 translate-x-[1px]">
                        <div className="h-[1px] w-4 bg-accent/60 group-hover:w-6 transition-all"></div>
                        <span className="text-[10px] md:text-[11px] font-light text-accent/90 tracking-[0.4em] uppercase">
                            by Sagar
                        </span>
                    </div>
                </NavLink>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.title}
                            to={link.path}
                            className={({ isActive }) =>
                                `text-sm uppercase tracking-wider transition-colors hover:text-accent ${isActive ? 'text-accent font-medium' : 'text-gray-300'}`
                            }
                        >
                            {link.title}
                        </NavLink>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="hidden md:block">
                    <NavLink
                        to="/contact"
                        className="px-6 py-2 border border-accent text-accent hover:bg-accent hover:text-primary transition-all duration-300 rounded text-sm uppercase tracking-wide font-medium"
                    >
                        Get Consultation
                    </NavLink>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-accent transition-colors">
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-primary border-t border-gray-800 shadow-xl py-4 flex flex-col items-center space-y-6 animate-fadeIn">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.title}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className="text-lg text-gray-300 hover:text-accent transition-colors uppercase tracking-widest"
                        >
                            {link.title}
                        </NavLink>
                    ))}
                    <NavLink
                        to="/contact"
                        onClick={() => setIsOpen(false)}
                        className="px-8 py-3 bg-accent text-primary font-bold uppercase tracking-wide rounded hover:bg-white transition-colors"
                    >
                        Get Consultation
                    </NavLink>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
