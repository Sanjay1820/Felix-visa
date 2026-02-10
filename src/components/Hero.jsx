import React, { useEffect, useRef } from 'react';
import { ArrowRight, Globe, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Globe3D from './Globe3D';

const Hero = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const badgeRef = useRef(null);
    const globeContainerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.fromTo(badgeRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.3 }
            )
                .fromTo(titleRef.current,
                    { y: 60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                    "-=0.4"
                )
                .fromTo(subtitleRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                    "-=0.6"
                )
                .fromTo(ctaRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                    "-=0.6"
                );

            // Animate the globe container entry
            gsap.fromTo(globeContainerRef.current,
                { opacity: 0, scale: 0.8, x: 100 },
                { opacity: 1, scale: 1, x: 0, duration: 2, ease: "power2.out", delay: 0.5 }
            );

            // Floating animation for content
            gsap.to(".hero-content-inner", {
                y: -10,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative w-full h-screen min-h-[750px] overflow-hidden flex items-center bg-[#020817]">
            {/* Background Layers */}
            <div className="absolute inset-0 z-0">
                {/* Deep Space Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0a192f_0%,_#020817_100%)]"></div>

                {/* Subtle Space Particles/Stars Image */}
                <img
                    src="https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?q=80&w=2672&auto=format&fit=crop"
                    alt="Space Background"
                    className="w-full h-full object-cover opacity-20 mix-blend-screen"
                />

                {/* Dynamic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-[#020817]/60 to-transparent z-1"></div>
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#020817] to-transparent z-1"></div>
            </div>

            {/* REAL 3D EARTH GLOBE - Prominently Placed */}
            <div
                ref={globeContainerRef}
                className="absolute right-[-10%] md:right-[5%] lg:right-[10%] top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] lg:w-[850px] lg:h-[850px] z-2 pointer-events-none drop-shadow-[0_0_50px_rgba(0,170,255,0.2)]"
            >
                <Globe3D />
                {/* Radial Glow around the globe */}
                <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[120px] -z-1"></div>
            </div>

            {/* Glowing Highlights */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 blur-[180px] rounded-full pointer-events-none z-0"></div>

            {/* Content Container */}
            <div className="container mx-auto px-4 md:px-8 relative z-10 hero-content-inner">
                <div className="max-w-3xl text-center md:text-left">
                    <div ref={badgeRef} className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-10 shadow-2xl">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_10px_#d4af37]"></span>
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-accent">98.7% Visa Approval Success</span>
                    </div>

                    <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-8 leading-[1.05] tracking-tight">
                        Your Global <br />
                        <span className="text-gradient drop-shadow-[0_0_40px_rgba(212,175,55,0.4)]">Journey Begins</span>
                    </h1>

                    <p ref={subtitleRef} className="text-lg md:text-2xl text-gray-300 mb-12 max-w-xl font-light leading-relaxed">
                        Navigate complex borders with Felix by Sagar. Expertly engineered immigration solutions for <span className="text-white font-medium border-b border-accent/30 pb-1">Study, Work, and Permanent Residency</span>.
                    </p>

                    <div ref={ctaRef} className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
                        <Link to="/contact" className="px-10 py-5 bg-accent text-primary font-bold text-sm rounded-2xl hover:bg-white transition-all shadow-[0_15px_30px_rgba(212,175,55,0.25)] hover:shadow-[0_20px_45px_rgba(212,175,55,0.45)] hover:-translate-y-1.5 flex items-center justify-center uppercase tracking-[0.2em] group">
                            Start Application
                            <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1.5 transition-transform" />
                        </Link>
                        <Link to="/services" className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold text-sm rounded-2xl hover:bg-white/10 transition-all backdrop-blur-xl flex items-center justify-center uppercase tracking-[0.2em] shadow-xl">
                            Explore Services
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-20 flex flex-wrap items-center gap-8 justify-center md:justify-start opacity-70">
                        <div className="flex items-center gap-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/80 group cursor-default">
                            <div className="p-2 bg-white/5 rounded-lg group-hover:bg-accent/10 transition-colors">
                                <ShieldCheck size={18} className="text-accent" />
                            </div> Certified Experts
                        </div>
                        <div className="flex items-center gap-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/80 group cursor-default">
                            <div className="p-2 bg-white/5 rounded-lg group-hover:bg-accent/10 transition-colors">
                                <Globe size={18} className="text-accent" />
                            </div> 50+ Countries
                        </div>
                        <div className="flex items-center gap-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/80 group cursor-default">
                            <div className="p-2 bg-white/5 rounded-lg group-hover:bg-accent/10 transition-colors">
                                <Zap size={18} className="text-accent" />
                            </div> Rapid Processing
                        </div>
                    </div>
                </div>
            </div>

            {/* Precision UI Scroll Indicator */}
            <div className="absolute bottom-10 left-12 hidden md:flex flex-col items-center gap-5 group cursor-pointer z-10" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                <div className="w-[1px] h-24 bg-gradient-to-b from-accent to-transparent relative">
                    <div className="absolute top-0 left-0 w-full h-8 bg-white/60 animate-scroll-line"></div>
                </div>
                <span className="[writing-mode:vertical-lr] text-[10px] uppercase font-bold tracking-[0.5em] text-gray-500 group-hover:text-accent transition-colors">Explore</span>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scroll-line {
                    0% { transform: translateY(-32px); opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { transform: translateY(96px); opacity: 0; }
                }
                .animate-scroll-line {
                    animation: scroll-line 2.5s cubic-bezier(0.76, 0, 0.24, 1) infinite;
                }
            ` }} />
        </section>
    );
};

export default Hero;
