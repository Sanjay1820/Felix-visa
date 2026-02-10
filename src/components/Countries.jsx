import React, { useRef, useEffect, useState } from 'react';
import {
    X, Globe, Users, TrendingUp, Sparkles, Navigation, MapPin,
    ArrowRight, ShieldCheck, Zap, Laptop, Globe2, Award,
    MousePointer2, ExternalLink, Clock, CheckCircle2,
    Languages, CloudSun, Plane
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import InteractiveGlobe from './InteractiveGlobe';

const countriesData = [
    {
        id: 'ca', name: 'Canada', lat: 56, lon: -106,
        description: 'Elite destination for Global Mobility. Renowned for fast-track PR and world-class education.',
        image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2670&auto=format&fit=crop',
        success: '99.2%', sessions: '12,500+',
        tags: ['Express Entry', 'Study Permit', 'Passport Power'],
        visaTypes: ['Express Entry', 'Provincial Nominee', 'Federal Skilled'],
        processingTime: '6-12 Mo',
        keyBenefits: ['Free Healthcare', 'Diverse Environment', 'Stable Economy'],
        language: 'English, French',
        climate: 'Seasonal'
    },
    {
        id: 'us', name: 'USA', lat: 37, lon: -95,
        description: 'The pinnacle of career growth. specialized H1-B, EB-5, and student visas for top-tier tech hubs.',
        image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2699&auto=format&fit=crop',
        success: '96.5%', sessions: '18,200+',
        tags: ['H1-B Specialist', 'Silicon Valley', 'Ivy League'],
        visaTypes: ['H1-B (Work)', 'L-1 (Transfer)', 'F-1 (Student)'],
        processingTime: '12-18 Mo',
        keyBenefits: ['Tech Innovation', 'Global Network', 'Academic Lead'],
        language: 'English',
        climate: 'Varied'
    },
    {
        id: 'uk', name: 'UK', lat: 55, lon: -3,
        description: 'Heritage meets opportunity. Expert guidance for Skilled Worker and Graduate Route visa streams.',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2670&auto=format&fit=crop',
        success: '98.1%', sessions: '8,400+',
        tags: ['Skilled Worker', 'Graduate Route', 'Tier 2'],
        visaTypes: ['Skilled Worker', 'Health & Care', 'Graduate Route'],
        processingTime: '3-8 Wk',
        keyBenefits: ['Business Hub', 'World-Class Edu', 'Rich Heritage'],
        language: 'English',
        climate: 'Temperate'
    },
    {
        id: 'de', name: 'Germany', lat: 51, lon: 10,
        description: 'Europe\'s industrial powerhouse. specialized support for the Opportunity Card and IT Specialist visas.',
        image: 'https://images.unsplash.com/photo-1554072675-66db59dba46f?q=80&w=2670&auto=format&fit=crop',
        success: '97.4%', sessions: '5,100+',
        tags: ['Blue Card', 'Job Seeker', 'EU Talent'],
        visaTypes: ['Blue Card (EU)', 'Skilled Worker', 'Job Seeker'],
        processingTime: '4-12 Wk',
        keyBenefits: ['Industrial Giant', 'EU Mobility', 'Vibrant Culture'],
        language: 'German',
        climate: 'Continental'
    },
    {
        id: 'ae', name: 'UAE', lat: 25, lon: 55,
        description: 'The future of business residency. Premier Golden Visa processing for investors and entrepreneurs.',
        image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=2670&auto=format&fit=crop',
        success: '99.8%', sessions: '25,500+',
        tags: ['Golden Visa', 'Tax Haven', 'Luxury PR'],
        visaTypes: ['Golden Visa', 'Green Visa', 'Remote Work'],
        processingTime: '2-4 Wk',
        keyBenefits: ['Tax-Free Life', 'Ultra Modern', 'Strategic Port'],
        language: 'Arabic, English',
        climate: 'Desert'
    },
    {
        id: 'au', name: 'Australia', lat: -25, lon: 133,
        description: 'Incredible landscapes and economic stability. Your portal to Subclass 189/190 General Skilled Migration.',
        image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2670&auto=format&fit=crop',
        success: '98.7%', sessions: '9,200+',
        tags: ['PR Pathway', 'Regional Visa', 'Work Holiday'],
        visaTypes: ['Subclass 189/190', 'Student (500)', 'Work (482)'],
        processingTime: '8-14 Mo',
        keyBenefits: ['Outdoor Living', 'High Wages', 'Stable Economy'],
        language: 'English',
        climate: 'Subtropical'
    }
];

const Countries = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const detailRef = useRef(null);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedCountry) {
            gsap.fromTo(detailRef.current,
                { y: 100, opacity: 0, scale: 0.9, filter: 'blur(20px)' },
                { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.7, ease: "expo.out" }
            );
        }
    }, [selectedCountry]);

    const handleRedirect = () => {
        navigate('/contact', { state: { targetCountry: selectedCountry.name } });
    };

    return (
        <section ref={containerRef} className="py-24 bg-[#010611] relative overflow-hidden min-h-[1200px] flex flex-col items-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05)_0%,_transparent_70%)] pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-6 mb-16 text-center relative z-10">
                <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
                    <Sparkles className="text-accent" size={16} />
                    <span className="text-accent text-[10px] font-bold uppercase tracking-[0.5em]">Global Network</span>
                </div>
                <h2 className="text-6xl md:text-9xl font-heading font-black text-white mb-8 tracking-tighter uppercase leading-[0.8] drop-shadow-2xl">
                    World <span className="text-gradient">Reach</span>
                </h2>
                <p className="text-gray-400 max-w-3xl mx-auto text-xl font-light leading-relaxed">
                    Hover over a <span className="text-white font-medium">Country Node</span> on the interactive globe to preview intelligence or explore the primary base below.
                </p>
            </div>

            {/* Interactive Globe Hub */}
            <div className="relative w-full max-w-screen-2xl h-[600px] md:h-[800px] z-10 flex items-center justify-center mb-24">
                <div className="w-full h-full relative">
                    <InteractiveGlobe
                        countries={countriesData}
                        selectedCountry={selectedCountry}
                        onSelect={setSelectedCountry}
                    />
                </div>
            </div>

            {/* Country Intelligence Grid */}
            <div className="container mx-auto px-4 md:px-6 relative z-10 box-intelligence">
                <div className="text-center mb-16">
                    <h3 className="text-3xl font-heading font-black text-white mb-4 uppercase tracking-tighter">Sector Intelligence Base</h3>
                    <div className="h-[2px] w-24 bg-accent mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {countriesData.map((country, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedCountry(country)}
                            className="group relative bg-[#0b1b36] border border-white/5 hover:border-accent/40 rounded-[2.5rem] overflow-hidden transition-all duration-500 cursor-pointer shadow-3xl hover:-translate-y-4 flex flex-col"
                        >
                            <div className="h-56 relative overflow-hidden">
                                <img
                                    src={country.image}
                                    alt={country.name}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b36] via-[#0b1b36]/20 to-transparent"></div>
                                <div className="absolute top-4 left-4">
                                    <div className="flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
                                        <span className="text-[8px] font-black text-white uppercase tracking-widest">Active Hub</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-6 left-8">
                                    <h4 className="text-3xl font-heading font-black text-white tracking-widest leading-none drop-shadow-2xl">{country.name}</h4>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <p className="text-[11px] text-gray-400 font-light leading-relaxed mb-8 line-clamp-2 flex-grow">
                                    {country.description}
                                </p>
                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                    <div className="flex flex-col">
                                        <span className="text-accent/50 text-[8px] uppercase tracking-widest font-bold">Success Ratio</span>
                                        <span className="text-white font-black text-xl tracking-tighter">{country.success}</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white group-hover:bg-accent group-hover:text-primary transition-all shadow-2xl group-hover:rotate-45">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Premium Intelligence Modal */}
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
                            {/* Visual Asset Side */}
                            <div className="lg:w-2/5 relative h-[350px] md:h-[500px] lg:h-auto overflow-hidden group/image border-r border-white/5">
                                <img
                                    src={selectedCountry.image}
                                    alt={selectedCountry.name}
                                    className="w-full h-full object-cover transition-transform duration-[15000ms] group-hover/image:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b36] via-[#0b1b36]/40 to-transparent"></div>

                                <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16 right-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-3 h-3 rounded-full bg-accent animate-ping shadow-[0_0_15px_#d4af37]"></div>
                                        <span className="text-accent text-[10px] uppercase tracking-[0.5em] font-black underline decoration-2 underline-offset-8">Mission Intel Dossier</span>
                                    </div>
                                    <h3 className="text-5xl md:text-7xl lg:text-9xl font-heading font-black text-white tracking-tighter leading-[0.8] uppercase drop-shadow-2xl select-none mb-8">{selectedCountry.name}</h3>

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

                            {/* Data Intelligence Side */}
                            <div className="lg:w-3/5 p-8 md:p-12 lg:p-20 space-y-12 bg-gradient-to-br from-[#0b1b36] to-[#010611] overflow-y-auto">
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 text-accent mb-2">
                                            <Plane size={20} />
                                            <span className="text-xs font-black uppercase tracking-[0.3em]">Primary Visa Nodes</span>
                                        </div>
                                        <div className="space-y-3">
                                            {selectedCountry.visaTypes.map((type, i) => (
                                                <div key={i} className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:border-accent/30 transition-colors">
                                                    <ShieldCheck size={14} className="text-accent/40" />
                                                    <span className="text-xs text-gray-200 font-medium">{type}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 text-accent mb-2">
                                            <Award size={20} />
                                            <span className="text-xs font-black uppercase tracking-[0.3em]">Migration Benefits</span>
                                        </div>
                                        <div className="space-y-3">
                                            {selectedCountry.keyBenefits.map((benefit, i) => (
                                                <div key={i} className="flex items-center gap-3 px-6 py-3 bg-accent/5 border border-accent/10 rounded-xl hover:border-accent/40 transition-colors">
                                                    <CheckCircle2 size={14} className="text-accent" />
                                                    <span className="text-xs text-white/90 font-medium">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

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
                                        <div className="text-3xl md:text-4xl font-black text-white tracking-tighter pt-1 uppercase leading-none">{selectedCountry.processingTime}</div>
                                    </div>
                                    <div className="space-y-3 text-center md:text-left">
                                        <div className="flex items-center justify-center md:justify-start gap-3 text-accent/60 mb-1">
                                            <Users size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Case Volume</span>
                                        </div>
                                        <div className="text-4xl md:text-5xl font-black text-white tracking-tighter">{selectedCountry.sessions}</div>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <button
                                        onClick={handleRedirect}
                                        className="w-full bg-accent text-primary font-black py-8 md:py-10 rounded-[2.5rem] md:rounded-[3.5rem] hover:bg-white hover:shadow-[0_25px_80px_rgba(212,175,55,0.5)] transition-all uppercase tracking-[0.5em] md:tracking-[0.8em] text-[11px] flex items-center justify-center gap-6 group"
                                    >
                                        Execute Mission Inquiry <ArrowRight size={28} className="group-hover:translate-x-5 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Countries;
