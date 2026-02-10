import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { serviceData } from '../utils/serviceData';
import { ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';
import gsap from 'gsap';

const ServiceDetail = () => {
    const { type } = useParams();
    const data = serviceData[type];
    const heroRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Simple entry animation - NO ScrollTrigger to ensure visibility
        const ctx = gsap.context(() => {
            // Hero Animation
            gsap.fromTo(heroRef.current?.children,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    delay: 0.1,
                    clearProps: "all"
                }
            );

            // Content Animation - cascade in immediately
            gsap.fromTo(".animate-in",
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power3.out",
                    delay: 0.4, // Wait for hero slightly
                    clearProps: "all"
                }
            );

        });
        return () => ctx.revert();
    }, [type]);

    if (!data) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center text-white">
                <div className="text-center p-8 bg-white/5 rounded-2xl border border-white/10">
                    <h2 className="text-4xl font-heading mb-4 font-bold">Service Not Found</h2>
                    <Link to="/services" className="inline-block px-6 py-3 bg-accent text-primary font-bold rounded hover:bg-white transition-colors">
                        Back to All Services
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-primary min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={data.heroImage}
                        alt={data.title}
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/90 to-primary"></div>
                </div>

                <div ref={heroRef} className="container mx-auto px-4 relative z-10 text-center">
                    <span className="text-accent text-sm uppercase tracking-widest font-bold mb-4 block">Visa Services</span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
                        {data.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto">
                        {data.subtitle}
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section ref={contentRef} className="container mx-auto px-4 md:px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column - Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Overview */}
                        <div className="animate-in bg-white/5 p-8 rounded-2xl border border-white/5">
                            <h2 className="text-2xl font-heading font-bold text-white mb-6 border-l-4 border-accent pl-4">Overview</h2>
                            <p className="text-gray-300 text-lg leading-relaxed font-light">
                                {data.overview}
                            </p>
                        </div>

                        {/* Benefits */}
                        <div className="animate-in">
                            <h2 className="text-2xl font-heading font-bold text-white mb-8 border-l-4 border-accent pl-4">Key Benefits</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {data.benefits?.map((benefit, index) => (
                                    <div key={index} className="bg-white/5 border border-white/10 p-6 rounded-xl hover:border-accent/30 transition-colors group">
                                        <CheckCircle className="text-accent mb-4 group-hover:scale-110 transition-transform" size={28} />
                                        <h4 className="text-xl font-bold text-white mb-2">{benefit.title}</h4>
                                        <p className="text-gray-400 text-sm font-light leading-relaxed">{benefit.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Process Steps */}
                        <div className="animate-in">
                            <h2 className="text-2xl font-heading font-bold text-white mb-8 border-l-4 border-accent pl-4">Application Process</h2>
                            <div className="space-y-4">
                                {data.process?.map((step, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.07] transition-colors">
                                        <span className="text-4xl font-heading font-bold text-white/20 shrink-0">{step.step}</span>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                                            <p className="text-gray-400 font-light leading-relaxed">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FAQs */}
                        <div className="animate-in">
                            <h2 className="text-2xl font-heading font-bold text-white mb-8 border-l-4 border-accent pl-4">Common Questions</h2>
                            <div className="space-y-4">
                                {data.faq?.map((item, index) => (
                                    <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/5 hover:border-accent/30 transition-colors">
                                        <div className="flex items-start gap-4 mb-3">
                                            <HelpCircle className="text-accent mt-1 min-w-[20px]" size={20} />
                                            <h4 className="text-lg font-bold text-white leading-snug">{item.q}</h4>
                                        </div>
                                        <p className="text-gray-400 pl-9 font-light leading-relaxed">{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:col-span-1 animate-in">
                        <div className="sticky top-24 space-y-8">
                            {/* CTA Card */}
                            <div className="bg-gradient-to-br from-[#0f2a4a] to-blue-900 border border-accent/20 rounded-2xl p-8 shadow-2xl text-center relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-accent/20 transition-colors"></div>
                                <h3 className="text-2xl font-heading font-bold text-white mb-4 relative z-10">Start Your Application</h3>
                                <p className="text-gray-300 mb-8 font-light relative z-10">
                                    Get expert guidance for your {data.title} application today.
                                </p>
                                <Link to="/contact" className="w-full py-4 bg-accent text-primary font-bold rounded-lg hover:bg-white transition-all duration-300 flex items-center justify-center uppercase tracking-widest mb-4 relative z-10 shadow-lg hover:shadow-accent/20 hover:-translate-y-1">
                                    Book Consultation
                                    <ArrowRight size={18} className="ml-2" />
                                </Link>
                                <p className="text-xs text-center text-gray-400 relative z-10">Free initial assessment • No hidden fees</p>
                            </div>

                            {/* Other Services */}
                            <div className="bg-[#0a192f] rounded-2xl p-6 border border-white/5 shadow-lg">
                                <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider border-b border-white/10 pb-4">Other Services</h4>
                                <ul className="space-y-1">
                                    {Object.keys(serviceData).map((key) => {
                                        if (key === type) return null;
                                        return (
                                            <li key={key}>
                                                <Link to={`/services/${key}`} className="text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-all flex items-center justify-between group">
                                                    {serviceData[key].title}
                                                    <ArrowRight size={16} className="text-accent opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetail;
