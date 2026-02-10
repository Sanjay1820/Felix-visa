import React, { useRef, useEffect } from 'react';
import { GraduationCap, Briefcase, Plane, Building2, UserPlus, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: 'Study Visa',
        description: 'Comprehensive guidance for university selection, application, and student visa processing for top destinations.',
        icon: <GraduationCap size={32} />,
        path: '/services/study',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop'
    },
    {
        title: 'Work Visa',
        description: 'Expand your career horizon with international job opportunities. Expert handling of skilled worker permits.',
        icon: <Briefcase size={32} />,
        path: '/services/work',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop'
    },
    {
        title: 'Tourist Visa',
        description: 'Explore the world with hassle-free tourist visa processing for individuals and families traveling globally.',
        icon: <Plane size={32} />,
        path: '/services/tourist',
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop'
    },
    {
        title: 'Business Visa',
        description: 'Strategic visa solutions for investors, entrepreneurs, and corporate professionals seeking global expansion.',
        icon: <Building2 size={32} />,
        path: '/services/business',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop'
    },
    {
        title: 'Permanent Residency',
        description: 'Your reliable pathway to settling abroad permanently. We provide end-to-end PR application support.',
        icon: <UserPlus size={32} />,
        path: '/services/pr',
        image: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=1000&auto=format&fit=crop'
    },
    {
        title: 'Immigration Guide',
        description: 'Professional document verification and preparation services to ensure the highest success rates.',
        icon: <FileText size={32} />,
        path: '/process',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000&auto=format&fit=crop'
    }
];

const Features = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 90%",
                    }
                }
            );

            // Cards animation
            gsap.fromTo(".feature-card",
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-[#050f1e] relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div ref={headerRef} className="text-center mb-16">
                    <span className="text-accent text-sm uppercase tracking-[0.3em] font-bold mb-4 block">World-Class Solutions</span>
                    <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
                        Visa <span className="text-gradient">Categories</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                        We specialize in a broad spectrum of visa services, ensuring your international mobility is seamless and successful.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Link
                            to={service.path}
                            key={index}
                            className="feature-card group relative bg-primary-light/40 border border-white/5 rounded-3xl overflow-hidden hover:border-accent/40 transition-all duration-500 flex flex-col h-full shadow-2xl backdrop-blur-md"
                        >
                            {/* Image Header */}
                            <div className="h-48 relative overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/20 to-transparent"></div>
                                <div className="absolute top-4 left-4 p-3 bg-accent text-primary rounded-2xl shadow-xl transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                                    {service.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 pt-6 flex flex-col flex-grow">
                                <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-accent transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 font-light leading-relaxed mb-8 flex-grow">
                                    {service.description}
                                </p>
                                <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                                    <span className="text-xs font-bold text-accent uppercase tracking-widest group-hover:underline">View Details</span>
                                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-accent group-hover:text-primary group-hover:border-accent transition-all duration-300">
                                        <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
