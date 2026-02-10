import React, { useRef, useEffect, useState } from 'react';
import {
    MapPin, Globe, ArrowRight, Plane, Building,
    TrendingUp, Users, X, Globe2, Sparkles,
    ShieldCheck, Zap, Laptop, Award, MousePointer2,
    ExternalLink, Clock, CheckCircle2, Languages, CloudSun
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const countries = [
    {
        id: 'ca', name: 'Canada', x: '22%', y: '35%',
        description: 'Elite destination for Global Mobility. Renowned for fast-track permanent residency, world-class education systems, and high quality of life.',
        image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2670&auto=format&fit=crop',
        success: '99.2%', sessions: '12,500+',
        tags: ['Express Entry', 'Study Permit', 'Passport Power'],
        stats: 'Number #1 for PR',
        visaTypes: ['Express Entry', 'Provincial Nominee', 'Federal Skilled Worker'],
        processingTime: '6 - 12 Months',
        keyBenefits: ['Free Healthcare', 'Diverse Environment', 'Economic Stability'],
        language: 'English, French',
        climate: 'Seasonal / Temperate'
    },
    {
        id: 'us', name: 'USA', x: '20%', y: '48%',
        description: 'The pinnacle of career growth. We specialize in H1-B, EB-5, and student visas for top-tier American universities and tech hubs.',
        image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2699&auto=format&fit=crop',
        success: '96.5%', sessions: '18,200+',
        tags: ['H1-B Specialist', 'Silicon Valley', 'Ivy League'],
        stats: '50k+ Visas',
        visaTypes: ['H1-B (Work)', 'L-1 (Transfer)', 'F-1 (Student)', 'EB-5 (Investor)'],
        processingTime: '12 - 18 Months',
        keyBenefits: ['Tech Innovation', 'Global Network', 'Academic Excellence'],
        language: 'English',
        climate: 'Varied (Tropical to Arctic)'
    },
    {
        id: 'uk', name: 'UK', x: '47%', y: '38%',
        description: 'Heritage meets opportunity. Expert guidance for Skilled Worker, Innovator Founder, and Graduate Route visa streams.',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2670&auto=format&fit=crop',
        success: '98.1%', sessions: '8,400+',
        tags: ['Skilled Worker', 'Graduate Route', 'Tier 2'],
        stats: '2 Year Post-Study Work',
        visaTypes: ['Skilled Worker', 'Health & Care', 'Student Visa', 'Scale-up'],
        processingTime: '3 - 8 Weeks',
        keyBenefits: ['Rich Heritage', 'Business Hub', 'World-Class Education'],
        language: 'English',
        climate: 'Temperate Maritime'
    },
    {
        id: 'de', name: 'Germany', x: '51%', y: '42%',
        description: 'Europe\'s industrial powerhouse. specialized support for the Opportunity Card (Chancenkarte) and IT Specialist visas.',
        image: 'https://images.unsplash.com/photo-1554072675-66db59dba46f?q=80&w=2670&auto=format&fit=crop',
        success: '97.4%', sessions: '5,100+',
        tags: ['Blue Card', 'Job Seeker', 'EU Talent'],
        stats: '26 Countries Access',
        visaTypes: ['Blue Card (EU)', 'Skilled Worker', 'Job Seeker', 'Vocational'],
        processingTime: '4 - 12 Weeks',
        keyBenefits: ['Industrial Giant', 'EU Mobility', 'Vibrant Culture'],
        language: 'German',
        climate: 'Moderate Continental'
    },
    {
        id: 'ae', name: 'UAE', x: '60%', y: '58%',
        description: 'The future of business residency. Premier Golden Visa processing for investors, entrepreneurs, and exceptional talents.',
        image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=2670&auto=format&fit=crop',
        success: '99.8%', sessions: '25,500+',
        tags: ['Golden Visa', 'Tax Haven', 'Luxury PR'],
        stats: 'Tax Free Income',
        visaTypes: ['Golden Visa', 'Green Visa', 'Remote Work', 'Investor'],
        processingTime: '2 - 4 Weeks',
        keyBenefits: ['Tax-Free Life', 'Ultra Modern', 'Strategic Location'],
        language: 'Arabic, English',
        climate: 'Desert / Sunny'
    },
    {
        id: 'au', name: 'Australia', x: '85%', y: '82%',
        description: 'Incredible landscapes and economic stability. Your portal to Subclass 189/190 General Skilled Migration and Student pathways.',
        image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2670&auto=format&fit=crop',
        success: '98.7%', sessions: '9,200+',
        tags: ['PR Pathway', 'Regional Visa', 'Work Holiday'],
        stats: 'High Minimum Wage',
        visaTypes: ['Subclass 189/190', 'Student (500)', 'Work (482)', 'Partner'],
        processingTime: '8 - 14 Months',
        keyBenefits: ['Outdoor Living', 'High Wages', 'Stable Economy'],
        language: 'English',
        climate: 'Subtropical / Arid'
    },
    {
        id: 'nz', name: 'New Zealand', x: '92%', y: '88%',
        description: 'Secure, green, and growing. Fast-track residency for Green List roles in healthcare, construction, and technology.',
        image: 'https://images.unsplash.com/photo-1507699622177-f888f145af0f?q=80&w=2574&auto=format&fit=crop',
        success: '97.9%', sessions: '4,800+',
        tags: ['Green List', 'Accredited employer', 'Family PR'],
        stats: 'Safe & Peaceful',
        visaTypes: ['Green List PR', 'Work to Residence', 'Entrepreneur', 'Student'],
        processingTime: '4 - 10 Months',
        keyBenefits: ['Nature & Peace', 'Work-Life Balance', 'Safety Rank #1'],
        language: 'English, Māori',
        climate: 'Temperate'
    },
    {
        id: 'pl', name: 'Poland', x: '53%', y: '38%',
        description: 'Strategic EU Gateway. Expert assistance for Type D Work Visas and Temporary Residence Cards (TRC) in the Schengen area.',
        image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2670&auto=format&fit=crop',
        success: '95.6%', sessions: '6,300+',
        tags: ['Work Visa', 'Schengen TRC', 'EU Bridge'],
        stats: 'EU Marketplace',
        visaTypes: ['Work Visa Type D', 'TRC (Residence)', 'Blue Card', 'Business'],
        processingTime: '4 - 8 Weeks',
        keyBenefits: ['EU Gateway', 'Affordable EU Life', 'Thriving Economy'],
        language: 'Polish',
        climate: 'Continental'
    }
];

const CountriesPage = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const headerRef = useRef(null);
    const mapRef = useRef(null);
    const listRef = useRef(null);
    const detailRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
            );

            // Map Animation
            gsap.fromTo(mapRef.current,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.4 }
            );

            // Cards Animation
            gsap.fromTo(".country-card",
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: listRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, headerRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            gsap.fromTo(detailRef.current,
                { y: 100, opacity: 0, scale: 0.9, filter: 'blur(20px)' },
                { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.7, ease: "expo.out" }
            );
        }
    }, [selectedCountry]);

    const handleInquiry = (e, country) => {
        e?.stopPropagation();
        navigate('/contact', { state: { targetCountry: country.name } });
    };

    return (
        <div className="bg-[#010611] min-h-screen pt-24 overflow-x-hidden">
            {/* Mission Control Header */}
            <section className="container mx-auto px-4 md:px-6 py-16 text-center relative z-10">
                <div ref={headerRef} className="max-w-5xl mx-auto">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
                        <Sparkles className="text-accent" size={14} />
                        <span className="text-accent text-[9px] md:text-[11px] font-black uppercase tracking-[0.5em]">Command Center: Global Access</span>
                    </div>
                    <h1 className="text-4xl md:text-8xl lg:text-9xl font-heading font-black text-white mb-10 leading-[0.85] tracking-tighter uppercase">
                        Serving Clients <br className="hidden md:block" />
                        <span className="text-gradient">Worldwide</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-xl font-light leading-relaxed mb-16 opacity-80">
                        Strategic visa and immigration architecture for the world's most high-performance global hubs.
                    </p>
                </div>

                {/* Industrial HUD Map Interface */}
                <div ref={mapRef} className="interactive-map-container relative w-full max-w-7xl mx-auto h-[450px] md:h-[750px] mb-32 md:mb-48 group z-10 px-4 md:px-0">
                    <div className="absolute inset-0 bg-[#020817] rounded-[2.5rem] md:rounded-[4.5rem] overflow-hidden shadow-[0_0_150px_rgba(0,0,0,0.8)] border border-white/5">
                        <div className="absolute inset-0" style={{
                            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)',
                            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)'
                        }}>
                            <img
                                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
                                alt="World Map Overlay"
                                className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen transition-transform duration-[60s] ease-linear transform scale-110"
                            />
                        </div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-[0.05]"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-accent/5 blur-[200px] rounded-full pointer-events-none"></div>
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#010611] to-transparent"></div>
                    </div>

                    {/* HUD Pointers & Logic */}
                    <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
                        {countries.map((country, index) => (
                            <div
                                key={index}
                                className="map-pin absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group/pin pointer-events-auto"
                                style={{ left: country.x, top: country.y }}
                                onClick={() => setSelectedCountry(country)}
                            >
                                <div className="relative flex flex-col items-center">
                                    <div className="relative flex flex-col items-center group/marker">
                                        <div className="absolute w-12 h-12 md:w-24 md:h-24 bg-accent/10 rounded-full blur-2xl animate-pulse"></div>
                                        <div className="w-2.5 h-2.5 md:w-4 md:h-4 bg-accent rounded-full border-2 border-white shadow-[0_0_30px_#d4af37] relative z-20 transition-all duration-500 group-hover/pin:scale-150"></div>
                                        <div className="hud-line w-[1px] h-12 md:h-24 bg-gradient-to-t from-accent/80 via-accent/20 to-transparent group-hover/pin:h-32 transition-all duration-700 origin-bottom"></div>
                                        <div className="mt-2 md:mt-3 text-center">
                                            <div className="px-4 md:px-8 py-2 md:py-3 bg-[#0b1b36]/95 backdrop-blur-3xl border border-white/10 rounded-xl md:rounded-full transition-all duration-500 group-hover/pin:bg-accent group-hover/pin:border-white shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-accent group-hover/pin:bg-primary animate-pulse"></div>
                                                <span className="text-[9px] md:text-[12px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-white group-hover/pin:text-primary whitespace-nowrap">
                                                    {country.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategic KPI Section */}
            <section className="py-24 bg-[#010611] border-y border-white/5 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
                        <div className="p-8 group">
                            <Globe size={48} className="text-accent mx-auto mb-6 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                            <h3 className="text-3xl font-black text-white mb-3 tracking-tighter uppercase">50+ Hubs</h3>
                            <p className="text-gray-400 font-light leading-relaxed">Strategic architecture for major global destinations and migration corridors.</p>
                        </div>
                        <div className="p-8 group">
                            <TrendingUp size={48} className="text-accent mx-auto mb-6 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                            <h3 className="text-3xl font-black text-white mb-3 tracking-tighter uppercase">99.8% Success</h3>
                            <p className="text-gray-400 font-light leading-relaxed">High-precision processing with industry-leading approval performance metrics.</p>
                        </div>
                        <div className="p-8 group">
                            <Users size={48} className="text-accent mx-auto mb-6 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                            <h3 className="text-3xl font-black text-white mb-3 tracking-tighter uppercase">15k Mission</h3>
                            <p className="text-gray-400 font-light leading-relaxed">Trusted by a global network of professionals, students, and tier-1 investors.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sector Intelligence Grid */}
            <section ref={listRef} className="container mx-auto px-4 md:px-6 py-32 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div className="max-w-2xl">
                        <div className="text-accent text-[11px] font-black uppercase tracking-[0.6em] mb-4">Database Access</div>
                        <h2 className="text-4xl md:text-6xl font-heading font-black text-white mb-8 uppercase tracking-tighter leading-none">Sector <span className="text-gradient">Intel</span> Base</h2>
                        <div className="h-[4px] w-32 bg-accent mb-8"></div>
                        <p className="text-gray-400 text-xl font-light">Interactive dossier exploration for premium global migration corridors.</p>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                            <MousePointer2 className="text-accent" size={20} />
                            <span className="text-[10px] text-white font-black uppercase tracking-[0.4em]">Initialize Node Interaction</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {countries.map((country, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedCountry(country)}
                            className="country-card group relative bg-[#0b1b36]/40 backdrop-blur-sm rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-accent/40 transition-all duration-500 shadow-2xl hover:-translate-y-4 flex flex-col cursor-pointer"
                        >
                            <div className="h-64 relative overflow-hidden">
                                <img
                                    src={country.image}
                                    alt={country.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b36] via-[#0b1b36]/20 to-transparent"></div>
                                <div className="absolute top-6 left-6">
                                    <div className="px-4 py-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
                                        <span className="text-[8px] font-black text-white uppercase tracking-widest">Active Hub</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-6 left-10">
                                    <h3 className="text-4xl font-heading font-black text-white drop-shadow-2xl uppercase tracking-widest">{country.name}</h3>
                                </div>
                                <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white backdrop-blur-md group-hover:bg-accent group-hover:text-primary transition-all group-hover:rotate-45">
                                    <ArrowRight size={24} />
                                </div>
                            </div>

                            <div className="p-10 pt-4 flex flex-col flex-grow">
                                <p className="text-[13px] text-gray-400 font-light mb-10 leading-relaxed flex-grow line-clamp-3 opacity-80">
                                    {country.description}
                                </p>
                                <div className="border-t border-white/5 pt-8 mt-auto flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-accent/60 text-[8px] font-black uppercase tracking-widest mb-1">Success Ratio</span>
                                        <span className="text-white font-black text-2xl tracking-tighter">{country.success}</span>
                                    </div>
                                    <button className="px-8 py-3 rounded-full bg-accent/10 border border-accent/20 text-accent text-[9px] font-black uppercase tracking-[0.3em] group-hover:bg-accent group-hover:text-primary transition-all">
                                        Open Intel
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Premium Data Dossier Modal */}
            {selectedCountry && (
                <div
                    className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-3xl overflow-y-auto"
                    onClick={() => setSelectedCountry(null)}
                >
                    <div
                        ref={detailRef}
                        className="bg-[#0b1b36] border border-white/10 rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-[0_50px_150px_rgba(0,0,0,1)] w-full max-w-7xl relative my-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedCountry(null)}
                            className="absolute top-6 right-6 md:top-10 md:right-10 p-4 md:p-5 bg-black/50 hover:bg-accent hover:text-primary rounded-full transition-all text-white backdrop-blur-md border border-white/10 z-[110] shadow-2xl"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex flex-col lg:flex-row min-h-[700px]">
                            {/* Left Side: Visuals */}
                            <div className="lg:w-2/5 relative h-[350px] md:h-[500px] lg:h-auto overflow-hidden group/image border-r border-white/5">
                                <img
                                    src={selectedCountry.image}
                                    alt={selectedCountry.name}
                                    className="w-full h-full object-cover transition-transform duration-[15000ms] group-hover/image:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b36] via-[#0b1b36]/40 to-transparent"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0b1b36]/60 to-transparent lg:block hidden"></div>

                                <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16 right-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-3 h-3 rounded-full bg-accent animate-ping shadow-[0_0_15px_#d4af37]"></div>
                                        <span className="text-accent text-[10px] uppercase tracking-[0.5em] font-black underline decoration-2 underline-offset-8">Mission Intel Dossier</span>
                                    </div>
                                    <h3 className="text-5xl md:text-7xl lg:text-9xl font-heading font-black text-white tracking-tighter leading-[0.8] uppercase drop-shadow-2xl select-none mb-8">{selectedCountry.name}</h3>

                                    {/* Quick Info Grid */}
                                    <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
                                        <div className="flex items-center gap-3">
                                            <Languages className="text-accent/60" size={18} />
                                            <div className="flex flex-col">
                                                <span className="text-[8px] text-gray-400 uppercase tracking-widest">Language</span>
                                                <span className="text-[11px] text-white font-bold">{selectedCountry.language}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <CloudSun className="text-accent/60" size={18} />
                                            <div className="flex flex-col">
                                                <span className="text-[8px] text-gray-400 uppercase tracking-widest">Climate</span>
                                                <span className="text-[11px] text-white font-bold">{selectedCountry.climate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Detailed Intelligence */}
                            <div className="lg:w-3/5 p-8 md:p-12 lg:p-20 space-y-12 bg-gradient-to-br from-[#0b1b36] to-[#010611] overflow-y-auto">
                                {/* Header Info */}
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-1 bg-accent"></div>
                                            <h4 className="text-2xl font-black text-white uppercase tracking-widest">Strategic Overview</h4>
                                        </div>
                                        <Globe2 className="text-accent opacity-20" size={40} />
                                    </div>
                                    <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed opacity-90 border-l-2 border-accent/20 pl-8">
                                        {selectedCountry.description}
                                    </p>
                                </div>

                                {/* Deep Dive Content */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    {/* Visa Streams */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 text-accent mb-2">
                                            <Plane size={20} />
                                            <span className="text-xs font-black uppercase tracking-[0.3em]">Primary Visa Nodes</span>
                                        </div>
                                        <div className="space-y-3">
                                            {selectedCountry.visaTypes.map((type, i) => (
                                                <div key={i} className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:border-accent/30 transition-colors group/visa">
                                                    <ShieldCheck size={14} className="text-accent/40 group-hover/visa:text-accent transition-colors" />
                                                    <span className="text-xs text-gray-200 font-medium">{type}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Key Benefits */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 text-accent mb-2">
                                            <Award size={20} />
                                            <span className="text-xs font-black uppercase tracking-[0.3em]">Migration Benefits</span>
                                        </div>
                                        <div className="space-y-3">
                                            {selectedCountry.keyBenefits.map((benefit, i) => (
                                                <div key={i} className="flex items-center gap-3 px-6 py-3 bg-accent/5 border border-accent/10 rounded-xl hover:border-accent/40 transition-colors group/benefit">
                                                    <CheckCircle2 size={14} className="text-accent group-hover/benefit:scale-110 transition-transform" />
                                                    <span className="text-xs text-white/90 font-medium">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Metrics Section */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-white/5">
                                    <div className="space-y-3 text-center md:text-left">
                                        <div className="flex items-center justify-center md:justify-start gap-2 text-accent/60 mb-1">
                                            <TrendingUp size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Success Ratio</span>
                                        </div>
                                        <div className="text-4xl md:text-5xl font-black text-white tracking-tighter">{selectedCountry.success}</div>
                                    </div>
                                    <div className="space-y-3 text-center md:text-left">
                                        <div className="flex items-center justify-center md:justify-start gap-2 text-accent/60 mb-1">
                                            <Clock size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Avg Timeline</span>
                                        </div>
                                        <div className="text-3xl md:text-4xl font-black text-white tracking-tighter pt-1 uppercase">{selectedCountry.processingTime}</div>
                                    </div>
                                    <div className="space-y-3 text-center md:text-left">
                                        <div className="flex items-center justify-center md:justify-start gap-2 text-accent/60 mb-1">
                                            <Users size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Case Volume</span>
                                        </div>
                                        <div className="text-4xl md:text-5xl font-black text-white tracking-tighter">{selectedCountry.sessions}</div>
                                    </div>
                                </div>

                                {/* CTA Section */}
                                <div className="pt-6">
                                    <button
                                        onClick={(e) => handleInquiry(e, selectedCountry)}
                                        className="w-full bg-accent text-primary font-black py-8 md:py-10 rounded-[2.5rem] md:rounded-[3.5rem] hover:bg-white hover:shadow-[0_25px_80px_rgba(212,175,55,0.5)] transition-all uppercase tracking-[0.5em] md:tracking-[0.8em] text-[11px] flex items-center justify-center gap-6 group"
                                    >
                                        Execute Mission Inquiry <ArrowRight size={28} className="group-hover:translate-x-5 transition-transform" />
                                    </button>
                                    <p className="text-center text-[9px] text-gray-500 uppercase tracking-[0.4em] mt-8 font-bold">Secure Data Handshake Protocol Enabled</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                .interactive-map-container { height: 450px !important; }
                @media (min-width: 768px) { .interactive-map-container { height: 750px !important; } }
                .text-gradient {
                    background: linear-gradient(to right, #ffffff, #d4af37);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                ::-webkit-scrollbar {
                    width: 6px;
                }
                ::-webkit-scrollbar-track {
                    background: #010611;
                }
                ::-webkit-scrollbar-thumb {
                    background: #0b1b36;
                    border-radius: 10px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #d4af37;
                }
            `}} />
        </div>
    );
};

export default CountriesPage;
