import React, { useRef, useEffect } from 'react';
import { Shield, Target, Users, Award, Handshake, Globe, Star, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const WhyUsPage = () => {
    const heroRef = useRef(null);
    const gridRef = useRef(null);
    const statsRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Hero Intro
            gsap.fromTo(heroRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
            );

            // Stats Counter
            gsap.fromTo(".stat-item",
                { opacity: 0, scale: 0.9 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: "top 85%"
                    }
                }
            );

            // Feature Cards
            gsap.fromTo(".why-card",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Floating Background Shapes
            gsap.to(".bg-shape", {
                y: "random(-20, 20)",
                x: "random(-20, 20)",
                duration: "random(3, 5)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });
        return () => ctx.revert();
    }, []);

    const features = [
        {
            icon: <Shield size={32} />,
            title: "Regulatory Compliance",
            description: "We operate with 100% legal transparency and adherence to international immigration laws and data privacy standards.",
            badge: "Secure"
        },
        {
            icon: <Target size={32} />,
            title: "Strategy-Led Success",
            description: "Not just document filing—we build a legal strategy for your case that maximizes approval probability to 98.7%.",
            badge: "Proven"
        },
        {
            icon: <Zap size={32} />,
            title: "Rapid Processing",
            description: "Our direct portal access and streamlined documentation system reduce standard waiting times by up to 30%.",
            badge: "Fast"
        },
        {
            icon: <Award size={32} />,
            title: "Elite Expertise",
            description: "Your case is handled by consultants who have collectively secured over 10,000 visas across 50 countries.",
            badge: "Expert"
        },
        {
            icon: <Users size={32} />,
            title: "Dedicated Case Officer",
            description: "Get a single point of contact who knows your history, documents, and dreams inside and out.",
            badge: "Personal"
        },
        {
            icon: <Star size={32} />,
            title: "Premium Experience",
            description: "From concierge document pickup to interview drills, we provide a VIP service from start to finish.",
            badge: "Elite"
        }
    ];

    const stats = [
        { label: "Successful Visas", value: "10k+", color: "text-accent" },
        { label: "Approval Rate", value: "98.7%", color: "text-emerald-400" },
        { label: "Countries Served", value: "50+", color: "text-blue-400" },
        { label: "Client Satisfaction", value: "4.9/5", color: "text-yellow-400" },
    ];

    return (
        <div className="bg-primary min-h-screen pt-24 pb-24 relative overflow-hidden">
            {/* Animated Shapes */}
            <div className="bg-shape absolute top-1/4 -left-12 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="bg-shape absolute bottom-1/4 -right-12 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <section ref={heroRef} className="container mx-auto px-4 md:px-6 text-center mb-24 relative z-10">
                <span className="text-accent text-sm uppercase tracking-widest font-bold mb-4 block">The Felix Standard</span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6">
                    Engineering Your <span className="text-gradient">Global Future</span>
                </h1>
                <p className="text-gray-400 max-w-3xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                    Immigration is the single most important decision of your life. We treat it with the precision, care, and legal excellence it deserves.
                </p>
            </section>

            {/* Stats Dashboard */}
            <section ref={statsRef} className="container mx-auto px-4 md:px-6 mb-24 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-item bg-[#0a192f] border border-white/10 p-6 md:p-8 rounded-3xl text-center shadow-xl group hover:border-accent/30 transition-all">
                            <h2 className={`text-3xl md:text-5xl font-heading font-bold mb-2 ${stat.color} group-hover:scale-110 transition-transform`}>{stat.value}</h2>
                            <p className="text-gray-500 text-xs md:text-sm uppercase tracking-widest font-bold">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Grid */}
            <section ref={gridRef} className="container mx-auto px-4 md:px-6 mb-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="why-card group bg-primary-light/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8 hover:bg-[#0a192f] hover:border-accent/40 transition-all duration-500 flex flex-col h-full shadow-2xl">
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-4 bg-white/5 rounded-2xl text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                                    {feature.icon}
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 text-gray-500 group-hover:bg-accent/10 group-hover:text-accent transition-all">
                                    {feature.badge}
                                </span>
                            </div>
                            <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-accent transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 font-light leading-relaxed flex-grow">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Elite CTA */}
            <section className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-4xl mx-auto rounded-[2rem] p-1 bg-gradient-to-r from-accent via-white/20 to-accent/50 shadow-2xl">
                    <div className="bg-primary rounded-[1.9rem] p-10 md:p-16 text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Unrivaled Excellence in Every File</h2>
                        <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                            Don't leave your dreams to chance. Partner with the consultants who have built a legacy of global success stories.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link to="/contact" className="px-10 py-5 bg-accent text-primary font-bold rounded-lg hover:bg-white transition-all shadow-xl hover:-translate-y-1 uppercase tracking-widest text-sm">
                                Apply for Assessment
                            </Link>
                            <Link to="/services" className="px-10 py-5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/5 transition-all text-sm uppercase tracking-widest">
                                Explore Services
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WhyUsPage;
