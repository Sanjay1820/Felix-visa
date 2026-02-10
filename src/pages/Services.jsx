import React, { useRef, useEffect } from 'react';
import { GraduationCap, Briefcase, Plane, Building2, UserPlus, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: 'Study Visa',
        description: 'Expert guidance for university selection, application, and student visa processing for top destinations like USA, UK, Canada, and Australia.',
        icon: <GraduationCap size={40} className="text-accent" />,
        path: '/services/study',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2670&auto=format&fit=crop'
    },
    {
        title: 'Work Visa',
        description: 'Comprehensive support for skilled workers, employer-sponsored visas, and temporary work permits to advance your international career.',
        icon: <Briefcase size={40} className="text-accent" />,
        path: '/services/work',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop'
    },
    {
        title: 'Tourist Visa',
        description: 'Hassle-free tourist visa services for individuals, families, and groups. Explore the world with confidence and ease.',
        icon: <Plane size={40} className="text-accent" />,
        path: '/services/tourist',
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670&auto=format&fit=crop'
    },
    {
        title: 'Business Visa',
        description: 'Specialized visa solutions for entrepreneurs, investors, and business professionals looking to expand globally.',
        icon: <Building2 size={40} className="text-accent" />,
        path: '/services/business',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2671&auto=format&fit=crop'
    },
    {
        title: 'Permanent Residency',
        description: 'Navigate the complex PR pathways with our expert consultants. Secure your future in your dream country.',
        icon: <UserPlus size={40} className="text-accent" />,
        path: '/services/pr',
        image: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=2670&auto=format&fit=crop'
    },
    {
        title: 'Family Sponsorship',
        description: 'Reunite with your loved ones. We assist with spousal, parent, and child sponsorship applications.',
        icon: <FileText size={40} className="text-accent" />,
        path: '/contact',
        image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2670&auto=format&fit=crop'
    }
];

const Services = () => {
    const listRef = useRef(null);
    const headerRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    delay: 0.2
                }
            );

            gsap.fromTo(".service-card",
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: listRef.current,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, listRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="pt-24 bg-primary min-h-screen">
            <section className="container mx-auto px-4 md:px-6 py-12 md:py-24 text-center">
                <div ref={headerRef}>
                    <span className="text-accent text-sm uppercase tracking-widest font-bold mb-4 block">Our Expertise</span>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
                        Comprehensive <span className="text-gradient">Visa Solutions</span>
                    </h1>
                    <p className="text-gray-400 max-w-3xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                        Whether you're looking to study, work, travel, or settle abroad, Felix by Sagar offers end-to-end visa and immigration services tailored to your needs.
                    </p>
                </div>
            </section>

            <section ref={listRef} className="container mx-auto px-4 md:px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Link
                            to={service.path}
                            key={index}
                            className="service-card group relative overflow-hidden rounded-3xl bg-[#0a192f] border border-white/5 hover:border-accent/40 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-accent/10 flex flex-col h-full"
                        >
                            {/* Image Part */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-colors duration-500"></div>
                                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 group-hover:bg-accent group-hover:text-primary text-white transition-all duration-300">
                                    {service.icon}
                                </div>
                            </div>

                            {/* Content Part */}
                            <div className="p-8 flex flex-col flex-grow relative z-10">
                                <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-accent transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed font-light mb-8 flex-grow">
                                    {service.description}
                                </p>
                                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between group-hover:border-accent/20 transition-colors">
                                    <span className="text-sm font-bold text-accent uppercase tracking-widest group-hover:text-white transition-colors">
                                        Explore
                                    </span>
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all duration-300 transform group-hover:translate-x-2">
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Services;
