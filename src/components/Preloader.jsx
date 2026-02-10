import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Plane, ShieldCheck, Globe } from 'lucide-react';

const Preloader = ({ onComplete }) => {
    const containerRef = useRef(null);
    const brandRef = useRef(null);
    const planeRef = useRef(null);
    const progressRef = useRef(null);
    const statusRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
            }
        });

        // Initial state
        gsap.set(containerRef.current, { autoAlpha: 1 });
        gsap.set(brandRef.current, { opacity: 0, scale: 0.9, filter: 'blur(10px)' });
        gsap.set(planeRef.current, { x: -50, opacity: 0 });
        gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left center' });
        gsap.set(statusRef.current, { opacity: 0, y: 10 });

        // Animation sequence
        tl.to(brandRef.current, {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: "expo.out"
        })
            .to(planeRef.current, {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, "-=0.6")
            .to(statusRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.5
            }, "-=0.2")
            .to(progressRef.current, {
                scaleX: 1,
                duration: 2,
                ease: "power2.inOut"
            })
            .to(containerRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut",
                pointerEvents: 'none'
            });

        return () => tl.kill();
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#010611] text-white overflow-hidden"
        >
            {/* Cinematic Radial Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.08)_0%,_transparent_70%)]"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10"></div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Visa Orbit Animation */}
                <div className="relative mb-12 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                    <div ref={globeRef} className="opacity-40">
                        <Globe size={80} className="text-white animate-[pulse_3s_infinite]" />
                    </div>
                    <div ref={planeRef} className="absolute">
                        <Plane size={44} className="text-accent transform rotate-[45deg] drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
                    </div>
                    {/* Pulsing Orbit Ring */}
                    <div className="absolute inset-0 border-[2px] border-accent/20 rounded-full animate-[spin_4s_linear_infinite]"></div>
                    <div className="absolute inset-[-10px] border border-white/5 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
                </div>

                {/* Proper Brand Identity */}
                <div ref={brandRef} className="text-center mb-16">
                    <h1 className="text-6xl md:text-8xl font-heading font-black text-white tracking-tighter leading-none mb-3">
                        Filix
                    </h1>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[2px] w-12 md:w-20 bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
                        <span className="text-sm md:text-xl font-light text-accent tracking-[0.6em] uppercase whitespace-nowrap">
                            by Sagar
                        </span>
                        <div className="h-[2px] w-12 md:w-20 bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
                    </div>
                </div>

                {/* Mission Status System */}
                <div className="w-64 flex flex-col items-center">
                    <div className="w-full h-[1.5px] bg-white/5 relative overflow-hidden rounded-full">
                        <div ref={progressRef} className="h-full w-full bg-gradient-to-r from-accent/40 via-accent to-accent/40 shadow-[0_0_20px_#d4af37]"></div>
                    </div>
                    <div ref={statusRef} className="mt-5 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
                            Initializing Mission Profile
                        </span>
                    </div>
                </div>
            </div>

            {/* Corner Tactical Icons */}
            <div className="absolute top-12 left-12 p-5 border-l border-t border-white/5 opacity-20">
                <Globe size={24} className="text-white" />
            </div>
            <div className="absolute bottom-12 right-12 p-5 border-r border-b border-white/5 opacity-20">
                <ShieldCheck size={24} className="text-white" />
            </div>
        </div>
    );
};

export default Preloader;
