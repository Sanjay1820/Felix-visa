import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cta = () => {
    return (
        <section className="py-24 bg-gradient-to-br from-primary via-[#0f2a4a] to-primary relative overflow-hidden text-center">
            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8 leading-tight">
                    Ready to Start Your <br />
                    <span className="text-gradient">Global Journey?</span>
                </h2>
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
                    Join thousands of successful clients who have trusted Felix by Sagar for their visa and immigration needs.
                </p>
                <Link to="/contact" className="px-10 py-4 bg-accent text-primary font-bold text-lg uppercase tracking-wide rounded hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl inline-flex items-center group">
                    Get Free Consultation
                    <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] mix-blend-overlay"></div>
        </section>
    );
};

export default Cta;
