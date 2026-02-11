import React, { useRef, useEffect, useState } from 'react';
import {
    MapPin, Globe, ArrowRight, Plane, Building,
    TrendingUp, Users, X, Globe2, Sparkles,
    ShieldCheck, Zap, Laptop, Award, MousePointer2,
    ExternalLink, Clock, CheckCircle2, Languages, CloudSun, Earth
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const countries = [
    {
        id: 'ca', name: 'Canada', x: '18%', y: '32%', labelPos: 'top',
        description: 'Elite Tier-1 destination for global workforce mobility. Strategically engineered for high-velocity Permanent Residency pipelines and world-class academic integration through the Express Entry and Provincial Nominee frameworks.',
        image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2670&auto=format&fit=crop',
        success: '99.2%', sessions: '12,500+',
        tags: ['Express Entry', 'Study Permit', 'Passport Power'],
        stats: 'Number #1 for PR',
        visaTypes: ['Express Entry', 'Provincial Nominee', 'Federal Skilled Worker'],
        processingTime: '6-12 Mo',
        keyBenefits: ['Free Healthcare', 'Diverse Environment', 'Economic Stability'],
        language: 'English, French',
        climate: 'Seasonal / Temperate'
    },
    {
        id: 'us', name: 'USA', x: '16%', y: '58%', labelPos: 'bottom',
        description: 'The global epicenter of professional evolution. specialized architectural support for H1-B specialty occupations, EB-5 investor portfolios, and F-1 academic-to-career transitions across top-tier Silicon Valley and financial corridors.',
        image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2699&auto=format&fit=crop',
        success: '96.5%', sessions: '18,200+',
        tags: ['H1-B Specialist', 'Silicon Valley', 'Ivy League'],
        stats: '50k+ Visas',
        visaTypes: ['H1-B (Work)', 'L-1 (Transfer)', 'F-1 (Student)', 'EB-5 (Investor)'],
        processingTime: '12-18 Mo',
        keyBenefits: ['Tech Innovation', 'Global Network', 'Academic Excellence'],
        language: 'English',
        climate: 'Varied (Tropical to Arctic)'
    },
    {
        id: 'uk', name: 'UK', x: '46%', y: '28%', labelPos: 'top',
        description: 'Sophisticated fusion of heritage and high-tech opportunity. Expert intelligence for Skilled Worker and Graduate Route streams, providing a direct gateway to the London financial sector and prestigious Russell Group ecosystems.',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2670&auto=format&fit=crop',
        success: '98.1%', sessions: '8,400+',
        tags: ['Skilled Worker', 'Graduate Route', 'Tier 2'],
        stats: '2 Year Post-Study Work',
        visaTypes: ['Skilled Worker', 'Health & Care', 'Student Visa', 'Scale-up'],
        processingTime: '3-8 Wk',
        keyBenefits: ['Rich Heritage', 'Business Hub', 'World-Class Education'],
        language: 'English',
        climate: 'Temperate Maritime'
    },
    {
        id: 'de', name: 'Germany', x: '50%', y: '38%', labelPos: 'bottom',
        description: 'Europe\'s industrial core and gateway to the EU market. specialized mission support for the Opportunity Card (Chancenkarte), Blue Card residency, and IT Specialist visas within the Schengen zone infrastructure.',
        image: 'https://images.unsplash.com/photo-1554072675-66db59dba46f?q=80&w=2670&auto=format&fit=crop',
        success: '97.4%', sessions: '5,100+',
        tags: ['Blue Card', 'Job Seeker', 'EU Talent'],
        stats: '26 Countries Access',
        visaTypes: ['Blue Card (EU)', 'Skilled Worker', 'Job Seeker', 'Vocational'],
        processingTime: '4-12 Wk',
        keyBenefits: ['Industrial Giant', 'EU Mobility', 'Vibrant Culture'],
        language: 'German',
        climate: 'Moderate Continental'
    },
    {
        id: 'ae', name: 'UAE', x: '63%', y: '52%', labelPos: 'top',
        description: 'The premier futuristic hub for tax-optimized global business. specialized processing for the 10-year Golden Visa, Green residency for freelancers, and high-impact investor corridors in the heart of global strategic trade.',
        image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=2670&auto=format&fit=crop',
        success: '99.8%', sessions: '25,500+',
        tags: ['Golden Visa', 'Tax Haven', 'Luxury PR'],
        stats: 'Tax Free Income',
        visaTypes: ['Golden Visa', 'Green Visa', 'Remote Work', 'Investor'],
        processingTime: '2-4 Wk',
        keyBenefits: ['Tax-Free Life', 'Ultra Modern', 'Strategic Location'],
        language: 'Arabic, English',
        climate: 'Desert / Sunny'
    },
    {
        id: 'au', x: '88%', y: '82%', name: 'Australia', labelPos: 'top',
        description: 'State-of-the-art stability and premium living standards. providing advanced entry via Subclass 189/190 General Skilled Migration and regional development pathways for the world\'s most ambitious lifestyle seekers.',
        image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2670&auto=format&fit=crop',
        success: '98.7%', sessions: '9,200+',
        tags: ['PR Pathway', 'Regional Visa', 'Work Holiday'],
        stats: 'High Minimum Wage',
        visaTypes: ['Subclass 189/190', 'Student (500)', 'Work (482)', 'Partner'],
        processingTime: '8-14 Mo',
        keyBenefits: ['Outdoor Living', 'High Wages', 'Stable Economy'],
        language: 'English',
        climate: 'Subtropical / Arid'
    }
];

const CountriesPage = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [hoveredCountry, setHoveredCountry] = useState(null);
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

    const getLabelStyles = (pos) => {
        switch (pos) {
            case 'left': return 'right-full mr-2 md:mr-8 top-1/2 -translate-y-1/2';
            case 'right': return 'left-full ml-2 md:ml-8 top-1/2 -translate-y-1/2';
            case 'top': return 'bottom-full mb-2 md:mb-6 left-1/2 -translate-x-1/2';
            case 'bottom': return 'top-full mt-2 md:mt-6 left-1/2 -translate-x-1/2';
            default: return 'top-full mt-2 md:mt-6 left-1/2 -translate-x-1/2';
        }
    }

    return (
        <div className="bg-[#010611] min-h-screen pt-20 md:pt-24 overflow-x-hidden">
            {/* Mission Control Header - Now Fluid Responsive */}
            <section className="container mx-auto px-4 md:px-6 py-10 md:py-16 text-center relative z-10">
                <div ref={headerRef} className="max-w-5xl mx-auto">
                    <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-1.5 md:py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 md:mb-8">
                        <Sparkles className="text-accent w-3 h-3 md:w-[14px] md:h-[14px]" />
                        <span className="text-accent text-[8px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em]">Command Center: Global Access</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[7.5rem] font-heading font-black text-white mb-6 md:mb-8 leading-[1.1] md:leading-[0.9] tracking-tighter uppercase text-balance break-words">
                        Serving Clients <br className="hidden sm:block" />
                        <span className="text-gradient">Worldwide</span>
                    </h1>
                    <p className="text-gray-400 max-w-4xl mx-auto text-[13px] sm:text-base md:text-2xl font-light leading-relaxed mb-6 opacity-80 px-2 sm:px-4">
                        Providing elite mission-critical visa architecture and bespoke immigration intelligence for the world's <span className="text-white font-medium">most high-performance global hubs</span>. We streamline complex bureaucratic corridors, bridging the gap between corporate ambition and seamless global residency with unmatched precision and speed.
                    </p>
                </div>

                {/* Industrial HUD Map Interface - Aspect-Ratio Optimized */}
                <div ref={mapRef} className="interactive-map-container relative w-full lg:max-w-7xl mx-auto aspect-[4/3] sm:aspect-[16/9] md:h-[750px] mb-8 md:mb-12 group z-10 px-0 sm:px-4 md:px-0 mt-8">
                    <div className="absolute inset-0 bg-[#020817] rounded-[1.5rem] md:rounded-[4.5rem] overflow-hidden shadow-[0_0_150px_rgba(0,0,0,0.8)] border border-white/5">
                        <div className="absolute inset-0" style={{
                            maskImage: 'radial-gradient(ellipse at center, black 75%, transparent 100%)',
                            WebkitMaskImage: 'radial-gradient(ellipse at center, black 75%, transparent 100%)'
                        }}>
                            <img
                                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
                                alt="World Map Overlay"
                                className="absolute inset-0 w-full h-full object-cover object-center opacity-60 contrast-125 brightness-110 mix-blend-screen transition-transform duration-[60s] ease-linear transform scale-125"
                            />
                        </div>

                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-[0.08]"></div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent/20 blur-[150px] rounded-full pointer-events-none opacity-40"></div>
                        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[#010611] via-[#010611]/60 to-transparent"></div>
                    </div>

                    {/* HUD Grid Overlay */}
                    <div className="absolute inset-0 z-10 opacity-30 pointer-events-none">
                        <div className="w-full h-full" style={{
                            backgroundImage: `linear-gradient(to right, rgba(212,175,55,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.08) 1px, transparent 1px)`,
                            backgroundSize: '30px 30px'
                        }}></div>
                    </div>

                    {/* Country Markers Grid - Set to Previous Lower Positions as Requested */}
                    <div className="absolute inset-0 z-20 overflow-hidden">
                        {countries.map((country) => {
                            // Reverting to lower-sector coordinates while image remains object-top
                            const coords = {
                                ca: { x: '25%', y: '30%' },
                                us: { x: '22%', y: '55%' },
                                uk: { x: '49%', y: '28%' },
                                de: { x: '52%', y: '40%' },
                                ae: { x: '63%', y: '52%' },
                                au: { x: '82%', y: '75%' }
                            }[country.id] || { x: country.x, y: country.y };

                            return (
                                <div
                                    key={country.id}
                                    className="absolute group/pin cursor-pointer transition-all duration-300 pointer-events-auto"
                                    style={{
                                        left: coords.x,
                                        top: coords.y,
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: hoveredCountry?.id === country.id ? 100 : 20
                                    }}
                                    onMouseEnter={() => setHoveredCountry(country)}
                                    onMouseLeave={() => setHoveredCountry(null)}
                                    onClick={() => setSelectedCountry(country)}
                                >
                                    <div className="relative flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 md:w-5 md:h-5 bg-accent rounded-full border border-white/50 md:border-2 md:border-white shadow-[0_0_15px_rgba(212,175,55,1)] relative z-20 transition-all duration-500 group-hover/pin:scale-125 group-hover/pin:bg-white group-hover/pin:border-accent"></div>
                                        <div className="absolute w-8 h-8 md:w-12 md:h-12 bg-accent/20 rounded-full animate-ping opacity-0 group-hover/pin:opacity-100 duration-1000"></div>

                                        <div className={`absolute ${country.labelPos === 'bottom' ? 'top-1/2' : 'bottom-1/2'} w-[1px] h-6 md:h-16 bg-gradient-to-${country.labelPos === 'bottom' ? 'b' : 't'} from-accent via-accent/20 to-transparent transition-all duration-500 group-hover/pin:h-24`}></div>

                                        <div className={`absolute ${getLabelStyles(country.labelPos)} transition-all duration-500 z-30 opacity-80 group-hover/pin:opacity-100 group-hover/pin:scale-110 scale-90 md:scale-100`}>
                                            <div className="flex items-center gap-2 md:gap-3 px-2 md:px-4 py-1 sm:py-2 bg-[#020817]/95 backdrop-blur-3xl border border-white/10 rounded-lg md:rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] group-hover/pin:border-accent/40">
                                                <img
                                                    src={`https://flagcdn.com/w80/${country.id === 'uk' ? 'gb' : country.id}.png`}
                                                    alt={country.name}
                                                    className="w-4 h-2.5 md:w-8 md:h-5 object-cover rounded-sm border border-white/10"
                                                />
                                                <span className="text-white text-[9px] md:text-[14px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] whitespace-nowrap">
                                                    {country.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Sector Intelligence Grid - Unified Mission Architecture */}
            <section ref={listRef} className="container mx-auto px-4 md:px-6 py-10 md:py-32 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-6 md:gap-8">
                    <div className="max-w-2xl">
                        <div className="text-accent text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] mb-4">Database Access</div>
                        <h2 className="text-3xl md:text-6xl font-heading font-black text-white mb-6 md:mb-8 uppercase tracking-tighter leading-none">Sector <span className="text-gradient">Intel</span> Base</h2>
                        <div className="h-[3px] md:h-[4px] w-20 md:w-32 bg-accent mb-6 md:mb-8"></div>
                        <p className="text-gray-400 text-base md:text-xl font-light">Strategic mission intelligence and interactive dossier exploration for premium global corridors.</p>
                    </div>
                </div>

                {/* Integrated Mission KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-16 md:mb-32">
                    {/* 50+ Hubs */}
                    <div className="group/stat relative p-5 md:p-8 rounded-2xl md:rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md transition-all duration-500 hover:bg-white/[0.04] hover:border-accent/30 hover:-translate-y-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent transition-opacity duration-500 opacity-0 group-hover/stat:opacity-100 rounded-2xl md:rounded-3xl"></div>
                        <div className="relative z-10">
                            <div className="text-2xl sm:text-5xl font-black text-white mb-2 md:mb-4 tracking-tighter">
                                <span className="text-gradient">50+</span> Hubs
                            </div>
                            <div className="h-px w-8 bg-accent/40 mb-3 md:mb-6 group-hover/stat:w-full transition-all duration-700"></div>
                            <p className="text-gray-400 text-[10px] md:text-sm leading-relaxed font-light">
                                Strategic architecture for major global destinations and migration corridors.
                            </p>
                        </div>
                    </div>

                    {/* 99.8% Success */}
                    <div className="group/stat relative p-5 md:p-8 rounded-2xl md:rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md transition-all duration-500 hover:bg-white/[0.04] hover:border-accent/30 hover:-translate-y-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent transition-opacity duration-500 opacity-0 group-hover/stat:opacity-100 rounded-2xl md:rounded-3xl"></div>
                        <div className="relative z-10">
                            <div className="text-2xl sm:text-5xl font-black text-white mb-2 md:mb-4 tracking-tighter">
                                <span className="text-gradient">99.8%</span> Success
                            </div>
                            <div className="h-px w-8 bg-accent/40 mb-3 md:mb-6 group-hover/stat:w-full transition-all duration-700"></div>
                            <p className="text-gray-400 text-[10px] md:text-sm leading-relaxed font-light">
                                High-precision processing with industry-leading approval performance metrics.
                            </p>
                        </div>
                    </div>

                    {/* 15k Mission */}
                    <div className="group/stat relative p-5 md:p-8 rounded-2xl md:rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md transition-all duration-500 hover:bg-white/[0.04] hover:border-accent/30 hover:-translate-y-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent transition-opacity duration-500 opacity-0 group-hover/stat:opacity-100 rounded-2xl md:rounded-3xl"></div>
                        <div className="relative z-10">
                            <div className="text-2xl sm:text-5xl font-black text-white mb-2 md:mb-4 tracking-tighter">
                                <span className="text-gradient">15k</span> Missions
                            </div>
                            <div className="h-px w-8 bg-accent/40 mb-3 md:mb-6 group-hover/stat:w-full transition-all duration-700"></div>
                            <p className="text-gray-400 text-[10px] md:text-sm leading-relaxed font-light">
                                Trusted by a global network of professionals, executing high-performance residency.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                    {countries.map((country, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedCountry(country)}
                            className="country-card group relative bg-[#0b1b36]/40 backdrop-blur-sm rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-accent/40 transition-all duration-500 shadow-2xl hover:-translate-y-2 md:hover:-translate-y-4 flex flex-col cursor-pointer"
                        >
                            <div className="h-48 md:h-64 relative overflow-hidden">
                                <img
                                    src={country.image}
                                    alt={country.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b36] via-[#0b1b36]/20 to-transparent"></div>
                                <div className="absolute top-4 md:top-6 left-4 md:left-6">
                                    <div className="px-3 md:px-4 py-1 md:py-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-1.5 md:gap-2">
                                        <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-accent animate-pulse"></div>
                                        <span className="text-[7px] md:text-[8px] font-black text-white uppercase tracking-widest">Active Hub</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-4 md:bottom-6 left-6 md:left-10">
                                    <h3 className="text-2xl md:text-4xl font-heading font-black text-white drop-shadow-2xl uppercase tracking-widest">{country.name}</h3>
                                </div>
                                <div className="absolute top-4 md:top-6 right-4 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center text-white backdrop-blur-md group-hover:bg-accent group-hover:text-primary transition-all group-hover:rotate-45">
                                    <ArrowRight size={20} className="md:w-6 md:h-6" />
                                </div>
                            </div>

                            <div className="p-6 md:p-10 pt-4 flex flex-col flex-grow">
                                <p className="text-[11px] md:text-[13px] text-gray-400 font-light mb-6 md:mb-10 leading-relaxed flex-grow line-clamp-3 opacity-80">
                                    {country.description}
                                </p>
                                <div className="border-t border-white/5 pt-6 md:pt-8 mt-auto flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-accent/60 text-[7px] md:text-[8px] font-black uppercase tracking-widest mb-1">Success Ratio</span>
                                        <span className="text-white font-black text-lg md:text-2xl tracking-tighter">{country.success}</span>
                                    </div>
                                    <button className="px-4 md:px-8 py-2 md:py-3 rounded-full bg-accent/10 border border-accent/20 text-accent text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] group-hover:bg-accent group-hover:text-primary transition-all">
                                        Open Intel
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {selectedCountry && (
                <div
                    className="fixed inset-0 z-[1000] bg-black/98 backdrop-blur-3xl overflow-y-auto overscroll-contain"
                    onClick={() => setSelectedCountry(null)}
                >
                    <div className="min-h-screen flex items-start sm:items-center justify-center p-0 sm:p-4 md:p-8 lg:p-12">
                        <div
                            ref={detailRef}
                            className="bg-[#0b1b36] border-0 sm:border border-white/10 rounded-none sm:rounded-[3rem] lg:rounded-[4rem] shadow-[0_50px_150px_rgba(0,0,0,1)] w-full h-full sm:h-auto max-w-7xl relative overflow-hidden flex flex-col lg:flex-row"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Static Header Elements for Easy Exit */}
                            <button
                                onClick={() => setSelectedCountry(null)}
                                className="fixed sm:absolute top-4 right-4 sm:top-5 sm:right-5 md:top-8 md:right-8 lg:top-12 lg:right-12 p-3 sm:p-5 bg-black/60 hover:bg-accent hover:text-primary rounded-full transition-all text-white backdrop-blur-xl border border-white/20 z-[1100] shadow-2xl active:scale-90"
                            >
                                <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                            </button>

                            {/* Visual Asset Side - Cinematic Mission Header */}
                            <div className="lg:w-[45%] relative h-[200px] sm:h-[350px] md:h-[450px] lg:h-auto overflow-hidden group/image border-b lg:border-b-0 lg:border-r border-white/5 flex-shrink-0">
                                <img
                                    src={selectedCountry.image}
                                    alt={selectedCountry.name}
                                    className="w-full h-full object-cover transition-transform duration-[15000ms] group-hover/image:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b36] via-[#0b1b36]/30 to-transparent"></div>

                                <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 md:bottom-12 md:left-12 lg:bottom-16 lg:left-16 right-6 sm:right-10">
                                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-6">
                                        <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-accent animate-pulse shadow-[0_0_15px_#d4af37]"></div>
                                        <span className="text-accent text-[7px] sm:text-xs uppercase tracking-[0.4em] md:tracking-[0.6em] font-black underline decoration-2 underline-offset-8">Mission Intel Dossier</span>
                                    </div>
                                    <h3 className="text-3xl sm:text-5xl md:text-7xl lg:text-[8rem] font-heading font-black text-white tracking-tighter leading-none uppercase select-none break-words">
                                        {selectedCountry.name}
                                    </h3>
                                </div>
                            </div>

                            {/* Data Intelligence Side - Accelerated Intelligence Hierarchy */}
                            <div className="lg:w-[55%] p-6 sm:p-10 md:p-12 lg:p-20 space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16 bg-gradient-to-br from-[#0b1b36] to-[#010611] flex flex-col justify-start lg:justify-center">
                                {/* Strategic Overview Block */}
                                <div className="space-y-3 sm:space-y-6 md:space-y-8">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 md:gap-4">
                                            <div className="w-6 md:w-16 h-1 bg-accent"></div>
                                            <h4 className="text-[10px] sm:text-xl md:text-3xl font-black text-white uppercase tracking-widest leading-none">Strategic Overview</h4>
                                        </div>
                                        <Earth className="text-accent opacity-20 w-4 h-4 md:w-8 md:h-8" />
                                    </div>
                                    <p className="text-gray-200 text-[13px] sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed opacity-95 border-l border-accent/20 pl-4 md:pl-10 text-justify md:text-left">
                                        {selectedCountry.description}
                                    </p>
                                </div>

                                {/* Visa & Benefits Tactical Matrix */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-10 md:gap-12">
                                    {/* Visa Protocol Column */}
                                    <div className="space-y-3 md:space-y-8">
                                        <div className="flex items-center gap-2 md:gap-4 text-accent/80 border-b border-white/5 pb-2 md:pb-4">
                                            <Plane className="w-4 h-4 md:w-6 md:h-6" />
                                            <span className="text-[9px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">Primary Visa Protocols</span>
                                        </div>
                                        <div className="space-y-1.5 md:space-y-4">
                                            {selectedCountry.visaTypes.map((type, i) => (
                                                <div key={i} className="flex items-center gap-2 px-3 md:px-8 py-2 md:py-4 bg-white/[0.03] border border-white/5 rounded-xl md:rounded-2xl hover:border-accent/40 hover:bg-white/[0.06] transition-all duration-300 group/item">
                                                    <ShieldCheck className="text-accent/60 group-hover/item:text-accent w-3 h-3 md:w-5 md:h-5" />
                                                    <span className="text-[10px] sm:text-sm md:text-base text-gray-200 font-bold tracking-tight">{type}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Success Benefits Column */}
                                    <div className="space-y-3 md:space-y-8">
                                        <div className="flex items-center gap-2 md:gap-4 text-accent/80 border-b border-white/5 pb-2 md:pb-4">
                                            <Award className="w-4 h-4 md:w-6 md:h-6" />
                                            <span className="text-[9px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">Mission Benefits</span>
                                        </div>
                                        <div className="space-y-1.5 md:space-y-4">
                                            {selectedCountry.keyBenefits.map((benefit, i) => (
                                                <div key={i} className="flex items-center gap-2 px-3 md:px-8 py-2 md:py-4 bg-accent/[0.03] border border-accent/10 rounded-xl md:rounded-2xl hover:border-accent/50 hover:bg-accent/[0.06] transition-all duration-300 group/item">
                                                    <CheckCircle2 className="text-accent group-hover/item:scale-110 transition-transform w-3 h-3 md:w-5 md:h-5" />
                                                    <span className="text-[10px] sm:text-sm md:text-base text-white/95 font-bold tracking-tight">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Global KPI Performance Matrix */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 sm:gap-10 md:gap-12 py-6 sm:py-12 md:py-16 border-y border-white/10">
                                    <div className="space-y-1.5 md:space-y-4">
                                        <div className="flex items-center gap-1.5 md:gap-3 text-accent/50">
                                            <TrendingUp className="w-4 h-4 md:w-6 md:h-6" />
                                            <span className="text-[8px] md:text-[11px] font-black uppercase tracking-widest text-accent">Success Ratio</span>
                                        </div>
                                        <div className="text-xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none">{selectedCountry.success}</div>
                                    </div>
                                    <div className="space-y-1.5 md:space-y-4">
                                        <div className="flex items-center gap-1.5 md:gap-3 text-accent/50">
                                            <Clock className="w-4 h-4 md:w-6 md:h-6" />
                                            <span className="text-[8px] md:text-[11px] font-black uppercase tracking-widest text-accent">Avg Timeline</span>
                                        </div>
                                        <div className="text-base sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase leading-none">{selectedCountry.processingTime}</div>
                                    </div>
                                    <div className="col-span-2 md:col-span-1 space-y-1.5 md:space-y-4 pt-5 md:pt-0 border-t md:border-t-0 border-white/5">
                                        <div className="flex items-center gap-1.5 md:gap-3 text-accent/50">
                                            <Users className="w-4 h-4 md:w-6 md:h-6" />
                                            <span className="text-[8px] md:text-[11px] font-black uppercase tracking-widest text-accent">Case Volume</span>
                                        </div>
                                        <div className="text-xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none">{selectedCountry.sessions}</div>
                                    </div>
                                </div>

                                {/* Primary Strategic Call to Action */}
                                <div className="pt-5 sm:pt-10 md:pt-12 pb-10 sm:pb-0">
                                    <button
                                        onClick={(e) => handleInquiry(e, selectedCountry)}
                                        className="w-full bg-accent text-primary font-black py-4 sm:py-8 md:py-10 lg:py-12 rounded-lg sm:rounded-[3rem] lg:rounded-[4rem] hover:bg-white hover:text-black hover:shadow-[0_40px_100px_rgba(212,175,55,0.4)] transition-all duration-500 uppercase tracking-[0.3em] md:tracking-[0.8em] text-[10px] sm:text-sm md:text-base flex items-center justify-center gap-3 md:gap-8 group active:scale-[0.97]"
                                    >
                                        Execute Mission Inquiry <ArrowRight size={18} className="sm:w-8 sm:h-8 lg:w-10 lg:h-10 group-hover:translate-x-6 transition-transform duration-500" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                .interactive-map-container { height: auto !important; }
                @media (min-width: 768px) { .interactive-map-container { height: 750px !important; } }
                @media (min-width: 1024px) { .interactive-map-container { height: 850px !important; } }
                
                .text-gradient {
                    background: linear-gradient(to right, #ffffff, #d4af37);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                ::-webkit-scrollbar {
                    width: 4px;
                }
                @media (min-width: 768px) {
                    ::-webkit-scrollbar {
                        width: 6px;
                    }
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
