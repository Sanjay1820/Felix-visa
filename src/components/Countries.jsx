import React, { useRef, useEffect, useState } from 'react';
import { X, Globe, Users, TrendingUp, Sparkles, Navigation, MapPin, ArrowRight, ShieldCheck, Zap, Laptop, Globe2, Award, MousePointer2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import InteractiveGlobe from './InteractiveGlobe';

const countriesData = [
    {
        id: 'ca', name: 'Canada', lat: 56, lon: -106,
        description: 'Elite destination for Global Mobility. Renowned for fast-track permanent residency, world-class education systems, and high quality of life.',
        image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2670&auto=format&fit=crop',
        success: '99.2%', sessions: '12,500+',
        tags: ['Express Entry', 'Study Permit', 'Passport Power']
    },
    {
        id: 'us', name: 'USA', lat: 37, lon: -95,
        description: 'The pinnacle of career growth. We specialize in H1-B, EB-5, and student visas for top-tier American universities and tech hubs.',
        image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2699&auto=format&fit=crop',
        success: '96.5%', sessions: '18,200+',
        tags: ['H1-B Specialist', 'Silicon Valley', 'Ivy League']
    },
    {
        id: 'uk', name: 'UK', lat: 55, lon: -3,
        description: 'Heritage meets opportunity. Expert guidance for Skilled Worker, Innovator Founder, and Graduate Route visa streams.',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2670&auto=format&fit=crop',
        success: '98.1%', sessions: '8,400+',
        tags: ['Skilled Worker', 'Graduate Route', 'Tier 2']
    },
    {
        id: 'de', name: 'Germany', lat: 51, lon: 10,
        description: 'Europe\'s industrial powerhouse. specialized support for the Opportunity Card (Chancenkarte) and IT Specialist visas.',
        image: 'https://images.unsplash.com/photo-1554072675-66db59dba46f?q=80&w=2670&auto=format&fit=crop',
        success: '97.4%', sessions: '5,100+',
        tags: ['Blue Card', 'Job Seeker', 'EU Talent']
    },
    {
        id: 'ae', name: 'UAE', lat: 25, lon: 55,
        description: 'The future of business residency. Premier Golden Visa processing for investors, entrepreneurs, and exceptional talents.',
        image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=2670&auto=format&fit=crop',
        success: '99.8%', sessions: '25,500+',
        tags: ['Golden Visa', 'Tax Haven', 'Luxury PR']
    },
    {
        id: 'au', name: 'Australia', lat: -25, lon: 133,
        description: 'Incredible landscapes and economic stability. Your portal to Subclass 189/190 General Skilled Migration and Student pathways.',
        image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2670&auto=format&fit=crop',
        success: '98.7%', sessions: '9,200+',
        tags: ['PR Pathway', 'Regional Visa', 'Work Holiday']
    },
    {
        id: 'nz', name: 'New Zealand', lat: -40, lon: 174,
        description: 'Secure, green, and growing. Fast-track residency for Green List roles in healthcare, construction, and technology.',
        image: 'https://images.unsplash.com/photo-1507699622177-f888f145af0f?q=80&w=2574&auto=format&fit=crop',
        success: '97.9%', sessions: '4,800+',
        tags: ['Green List', 'Accredited employer', 'Family PR']
    },
    {
        id: 'pl', name: 'Poland', lat: 52, lon: 19,
        description: 'Strategic EU Gateway. Expert assistance for Type D Work Visas and Temporary Residence Cards (TRC) in the Schengen area.',
        image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2670&auto=format&fit=crop',
        success: '95.6%', sessions: '6,300+',
        tags: ['Work Visa', 'Schengen TRC', 'EU Bridge']
    }
];

const Countries = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const detailRef = useRef(null);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedCountry) {
            const tl = gsap.timeline();
            tl.fromTo(detailRef.current,
                { y: 100, opacity: 0, scale: 0.9, filter: 'blur(10px)' },
                { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: "back.out(1.7)" }
            );
        }
    }, [selectedCountry]);

    const handleRedirect = () => {
        // Pass the country name to the contact page via state
        navigate('/contact', { state: { targetCountry: selectedCountry.name } });
    };

    return (
        <section ref={containerRef} className="py-24 bg-[#010611] relative overflow-hidden min-h-[900px] flex flex-col items-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,170,255,0.05)_0%,_transparent_70%)] pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-6 mb-16 text-center relative z-10">
                <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
                    <Sparkles className="text-accent" size={16} />
                    <span className="text-accent text-[10px] font-bold uppercase tracking-[0.5em]">Global Network</span>
                </div>
                <h2 className="text-6xl md:text-9xl font-heading font-black text-white mb-8 tracking-tighter uppercase leading-[0.8] drop-shadow-2xl">
                    World <span className="text-gradient">Reach</span>
                </h2>
                <p className="text-gray-400 max-w-3xl mx-auto text-xl font-light leading-relaxed">
                    Select a <span className="text-white font-medium">Country Node</span> on the interactive globe to view specialized visa intelligence and migration pathways.
                </p>
            </div>

            <div className="relative w-full max-w-screen-2xl h-[700px] md:h-[900px] z-10 flex items-center justify-center">
                <div className="w-full h-full relative">
                    <InteractiveGlobe
                        countries={countriesData}
                        selectedCountry={selectedCountry}
                        onSelect={setSelectedCountry}
                    />
                </div>

                {selectedCountry && (
                    <div
                        ref={detailRef}
                        className="fixed inset-0 z-[999] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm pointer-events-auto"
                        onClick={() => setSelectedCountry(null)}
                    >
                        <div
                            className="bg-[#0b1b36] border border-white/10 rounded-[4rem] overflow-hidden shadow-[0_50px_150px_rgba(0,0,0,1)] w-full max-w-5xl max-h-[90vh] overflow-y-auto relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedCountry(null)}
                                className="absolute top-10 right-10 p-5 bg-black/50 hover:bg-accent hover:text-primary rounded-full transition-all text-white backdrop-blur-md border border-white/10 z-[110] shadow-2xl"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex flex-col lg:flex-row h-full">
                                <div className="lg:w-1/2 relative h-[300px] lg:h-auto overflow-hidden group/image">
                                    <img
                                        src={selectedCountry.image}
                                        alt={selectedCountry.name}
                                        className="w-full h-full object-cover transition-transform duration-[5000ms] group-hover/image:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b36] via-[#0b1b36]/40 to-transparent"></div>
                                    <div className="absolute bottom-12 left-12">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-3 h-3 rounded-full bg-accent animate-ping shadow-[0_0_15px_#d4af37]"></div>
                                            <span className="text-accent text-[10px] uppercase tracking-[0.4em] font-black underline decoration-2 underline-offset-4">Zone Analysis</span>
                                        </div>
                                        <h3 className="text-7xl font-heading font-black text-white tracking-tighter leading-none uppercase drop-shadow-xl select-none">{selectedCountry.name}</h3>
                                    </div>
                                </div>

                                <div className="lg:w-1/2 p-12 md:p-16 space-y-12 bg-gradient-to-br from-[#0b1b36] to-[#010611]">
                                    <div className="space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-2xl font-black text-white uppercase tracking-widest border-l-4 border-accent pl-6">Mission Overview</h4>
                                            <ExternalLink className="text-accent opacity-30" size={24} />
                                        </div>
                                        <p className="text-gray-200 text-xl md:text-2xl font-light leading-relaxed opacity-95">
                                            {selectedCountry.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {selectedCountry.tags.map(tag => (
                                            <span key={tag} className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-[11px] text-white font-bold uppercase tracking-[0.3em] backdrop-blur-xl shadow-lg hover:border-accent/40 transition-colors">{tag}</span>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-2 gap-10 pt-10 border-t border-white/10">
                                        <div className="group/stat">
                                            <div className="text-[10px] text-accent/60 group-hover/stat:text-accent font-black uppercase tracking-[0.5em] mb-3 transition-colors">Success Ratio</div>
                                            <div className="text-5xl font-black text-white tracking-tighter group-hover/stat:scale-105 transition-transform">{selectedCountry.success}</div>
                                        </div>
                                        <div className="group/stat">
                                            <div className="text-[10px] text-accent/60 group-hover/stat:text-accent font-black uppercase tracking-[0.5em] mb-3 transition-colors">Case Volume</div>
                                            <div className="text-5xl font-black text-white tracking-tighter group-hover/stat:scale-105 transition-transform">{selectedCountry.sessions}</div>
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <button
                                            onClick={handleRedirect}
                                            className="w-full bg-accent text-primary font-black py-8 rounded-[2.5rem] hover:bg-white hover:shadow-[0_20px_60px_rgba(212,175,55,0.4)] transition-all uppercase tracking-[0.6em] text-[10px] flex items-center justify-center gap-4 group"
                                        >
                                            Consult for {selectedCountry.name} <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Countries;
