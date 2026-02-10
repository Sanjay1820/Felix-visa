import React from 'react';

const GenericPage = ({ title }) => {
    return (
        <section className="min-h-screen bg-primary flex items-center justify-center pt-24">
            <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-4">{title}</h1>
                <p className="text-accent text-xl uppercase tracking-widest">Coming Soon</p>
                <p className="text-gray-400 mt-4 max-w-md mx-auto">
                    Global excellence takes time. We are crafting this page to perfection.
                </p>
            </div>
        </section>
    );
};

export default GenericPage;
