import React, { useRef, useEffect } from 'react';
import { MapPin, Globe, ArrowRight, Plane, Building, TrendingUp, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const countries = [
    { name: 'USA', x: '21%', y: '32%', description: 'Top destination for higher education and skilled migration.', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2699&auto=format&fit=crop', stats: '50k+ Visas' },
    { name: 'Canada', x: '25%', y: '25%', description: 'Welcoming policies for students, workers, and PR seekers.', image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2670&auto=format&fit=crop', stats: 'Number #1 for PR' },
    { name: 'UK', x: '47%', y: '28%', description: 'Rich history and world-renowned universities beckon global talent.', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2670&auto=format&fit=crop', stats: '2 Year Post-Study Work' },
    { name: 'Europe', x: '52%', y: '30%', description: 'Diverse opportunities across 26 Schengen countries.', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2670&auto=format&fit=crop', stats: '26 Countries Access' },
    { name: 'UAE', x: '58%', y: '45%', description: 'A hub for business, investment, and luxury lifestyle.', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=2670&auto=format&fit=crop', stats: 'Tax Free Income' },
    { name: 'Australia', x: '85%', y: '75%', description: 'High quality of life and excellent migration pathways.', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2670&auto=format&fit=crop', stats: 'High Minimum Wage' },
    { name: 'New Zealand', x: '92%', y: '85%', description: 'Stunning landscapes and a balanced lifestyle await.', image: 'https://images.unsplash.com/photo-1507699622177-f888f145af0f?q=80&w=2574&auto=format&fit=crop', stats: 'Safe & Peaceful' },
];

const CountriesPage = () => {
    const headerRef = useRef(null);
    const mapRef = useRef(null);
    const listRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Header Animation
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

            // Map Animation
            gsap.fromTo(mapRef.current,
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    delay: 0.4
                }
            );

            // Cards Animation - Reliable stagger fromTo
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
        }, [headerRef, mapRef, listRef]);
        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-primary min-h-screen pt-24">
            <section className="container mx-auto px-4 md:px-6 py-12 text-center">
                <div ref={headerRef} className="px-4">
                    <span className="text-accent text-[10px] md:text-sm uppercase tracking-[0.4em] font-black mb-4 block">Our Global Reach</span>
                    <h1 className="text-3xl md:text-6xl lg:text-7xl font-heading font-black text-white mb-6 leading-[1.1] tracking-tighter">
                        Serving Clients <br className="md:hidden" />
                        <span className="text-gradient">Worldwide</span>
                    </h1>
                    <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-xl font-light leading-relaxed mb-12 opacity-80">
                        We specialize in visa and immigration services for the world's most sought-after destinations.
                    </p>
                </div>

                {/* Interactive Map Hub - Redesigned to allow 'Floating HUD' overflow */}
                <div ref={mapRef} className="interactive-map-container relative w-full max-w-6xl mx-auto h-[450px] md:h-[650px] mb-32 md:mb-40 group z-10 px-4 md:px-0">

                    {/* Visual Boundary Layer (Rounded Background & Effects) */}
                    <div className="absolute inset-0 bg-[#020817] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.6)] border border-white/5">
                        {/* Map Image with Atmospheric Fade Mask */}
                        <div className="absolute inset-0" style={{
                            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)',
                            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)'
                        }}>
                            <img
                                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
                                alt="World Map"
                                className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen transition-transform duration-[60s] ease-linear transform hover:scale-110"
                            />
                        </div>

                        {/* Animated Grid Overlay */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-[0.03]"></div>

                        {/* Central Energy Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/10 blur-[180px] rounded-full pointer-events-none"></div>

                        {/* Bottom Horizon Shadow */}
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#020817] to-transparent"></div>
                    </div>

                    {/* INTERACTION LAYER - Allows Tooltips to float OVER the page content */}
                    <div className="absolute inset-0 z-20">
                        {countries.map((country, index) => (
                            <div
                                key={index}
                                className="map-pin absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group/pin"
                                style={{
                                    left: country.x,
                                    top: country.y
                                }}
                            >
                                <div className="relative flex flex-col items-center">
                                    {/* Mission Node Marker */}
                                    <div className="relative flex flex-col items-center group/marker">
                                        <div className="absolute w-8 h-8 md:w-16 md:h-16 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
                                        <div className="w-2 h-2 md:w-3 md:h-3 bg-accent rounded-full border border-white shadow-[0_0_20px_#d4af37] relative z-20 transition-all duration-500 group-hover/pin:scale-125 group-hover/pin:shadow-[0_0_30px_#d4af37]"></div>

                                        {/* Vertical Tracking Line */}
                                        <div className="hud-line w-[1px] h-8 md:h-18 bg-gradient-to-t from-accent/80 via-accent/30 to-transparent group-hover/pin:h-24 transition-all duration-700 origin-bottom"></div>

                                        {/* HUD Anchor Point Name */}
                                        <div className="mt-1 md:mt-2 text-center pointer-events-none">
                                            <div className="px-3 md:px-6 py-1 md:py-2.5 bg-[#0b1b36]/90 backdrop-blur-2xl border border-white/10 rounded-lg md:rounded-full transition-all duration-500 group-hover/pin:bg-accent group-hover/pin:border-white shadow-2xl group-hover/pin:-translate-y-1">
                                                <span className="text-[8px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-white group-hover/pin:text-primary whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                                                    {country.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* PREMIUM MISSION INTELLIGENCE CARD - Smart Alignment System */}
                                    <div
                                        className="tooltip-card absolute bottom-[145%] left-1/2 opacity-0 group-hover/pin:opacity-100 transition-all duration-700 w-[240px] sm:w-[320px] md:w-[380px] pointer-events-none z-[200]"
                                        style={{ transform: 'translateX(var(--tooltip-shift, -50%)) translateY(var(--tooltip-y-shift, 40px))' }}
                                    >
                                        <div className="bg-[#0b1b36]/98 backdrop-blur-3xl border border-accent/40 p-5 sm:p-7 md:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.95)] relative overflow-hidden">

                                            {/* Top Status Header */}
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping shadow-[0_0_100px_#d4af37]"></div>
                                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent text-left">Node Connected</span>
                                                </div>
                                                <div className="px-3 py-1 bg-white/5 border border-white/5 rounded text-[8px] font-black text-gray-400 uppercase tracking-widest">
                                                    SECURE
                                                </div>
                                            </div>

                                            <h4 className="text-3xl md:text-5xl font-heading font-black text-white mb-4 uppercase tracking-tighter leading-none text-left drop-shadow-md">
                                                {country.name}
                                            </h4>

                                            <p className="text-[10px] md:text-sm text-gray-200 font-light leading-relaxed mb-8 opacity-90 text-left">
                                                {country.description}
                                            </p>

                                            {/* Intelligence Metrics */}
                                            <div className="grid grid-cols-2 gap-4 sm:gap-8 pt-4 sm:pt-8 border-t border-white/10 text-left">
                                                <div>
                                                    <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-accent/60 mb-1">Success Ratio</p>
                                                    <p className="text-lg sm:text-xl md:text-3xl font-black text-white tracking-tighter">99.1%</p>
                                                </div>
                                                <div>
                                                    <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-accent/60 mb-1">Core Stat</p>
                                                    <p className="text-[9px] sm:text-xs md:text-md font-bold text-white uppercase tracking-tight leading-tight line-clamp-1">{country.stats}</p>
                                                </div>
                                            </div>

                                            {/* Decorative Scanline */}
                                            <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent"></div>
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
                .tooltip-card { --tooltip-y-shift: 40px; }
                .group/pin:hover .tooltip-card { --tooltip-y-shift: 0px; }

                @media (max-width: 1024px) {
                    .map-pin { transform: translate(-50%, -50%) scale(0.9); }
                }

                @media (max-width: 768px) {
                    .map-pin { transform: translate(-50%, -50%) scale(0.8); }
                    .interactive-map-container { height: 500px !important; }
                    
                    /* Smart Shift for edge countries (Mobile/Tablet) */
                    .map-pin[style*="left: 8"], .map-pin[style*="left: 9"] {
                        --tooltip-shift: -85%;
                    }
                    .map-pin[style*="left: 1"], .map-pin[style*="left: 2"] {
                        --tooltip-shift: -15%;
                    }
                }

                @media (max-width: 480px) {
                    .map-pin { transform: translate(-50%, -50%) scale(0.65); }
                    .interactive-map-container { height: 450px !important; }
                    
                    /* Aggressive shift for very small screens */
                    .map-pin[style*="left: 8"], .map-pin[style*="left: 9"] {
                        --tooltip-shift: -92% !important;
                    }
                    .map-pin[style*="left: 1"], .map-pin[style*="left: 2"] {
                        --tooltip-shift: -8% !important;
                    }
                }

                /* Standard fallback for desktop edges */
                .map-pin[style*="left: 85"], .map-pin[style*="left: 9"] {
                    --tooltip-shift: -80%;
                }
                .map-pin[style*="left: 10"], .map-pin[style*="left: 5"] {
                    --tooltip-shift: -20%;
                }
            `}} />

            {/* Why Global Section - NEW CONTENT */}
            <section className="py-12 bg-primary-light/30 border-y border-white/5 mb-20 fade-in-section">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
                        <div className="p-4">
                            <Globe size={40} className="text-accent mx-auto mb-4 opacity-80" />
                            <h3 className="text-2xl font-bold text-white mb-2">50+ Countries</h3>
                            <p className="text-sm text-gray-400">Comprehensive visa assistance for major global destinations.</p>
                        </div>
                        <div className="p-4">
                            <TrendingUp size={40} className="text-accent mx-auto mb-4 opacity-80" />
                            <h3 className="text-2xl font-bold text-white mb-2">98% Success Rate</h3>
                            <p className="text-sm text-gray-400">Proven track record in securing visas and PR approvals.</p>
                        </div>
                        <div className="p-4">
                            <Users size={40} className="text-accent mx-auto mb-4 opacity-80" />
                            <h3 className="text-2xl font-bold text-white mb-2">10k+ Happy Clients</h3>
                            <p className="text-sm text-gray-400">Trusted by students, professionals, and families worldwide.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Country List - Upgraded Cards */}
            <section ref={listRef} className="container mx-auto px-4 md:px-6 pb-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-heading font-bold text-white mb-4">Explore Destinations</h2>
                    <p className="text-gray-400 font-light">Detailed guides for your dream country.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {countries.map((country, index) => (
                        <div key={index} className="country-card group relative bg-primary-light rounded-2xl overflow-hidden border border-white/5 hover:border-accent/40 transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col">
                            {/* Image Header with Overlay */}
                            <div className="h-56 relative overflow-hidden">
                                <img
                                    src={country.image}
                                    alt={country.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-light to-transparent opacity-90"></div>
                                <div className="absolute bottom-4 left-6">
                                    <h3 className="text-3xl font-heading font-bold text-white drop-shadow-md">{country.name}</h3>
                                </div>
                                <div className="absolute top-4 right-4 bg-white/10 p-2 rounded-full backdrop-blur-sm group-hover:bg-accent group-hover:text-primary transition-colors text-white">
                                    <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                </div>
                            </div>

                            <div className="p-8 pt-2 flex flex-col flex-grow">
                                <p className="text-gray-400 font-light mb-6 leading-relaxed flex-grow">
                                    {country.description}
                                </p>

                                <div className="border-t border-white/5 pt-4 mt-auto">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-accent font-bold uppercase tracking-wider text-xs">Top Feature</span>
                                        <span className="text-white font-medium bg-white/5 px-3 py-1 rounded-full">{country.stats}</span>
                                    </div>
                                    <Link to="/contact" className="mt-6 w-full py-3 rounded-lg bg-white/5 hover:bg-white text-white hover:text-primary font-bold text-center block transition-all uppercase tracking-widest text-xs border border-white/5 hover:border-transparent">
                                        Check Eligibility
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CountriesPage;
