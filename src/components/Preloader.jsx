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
            {/* Mission Control Grid Background */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05)_0%,_transparent_70%)]"></div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Visa Animation Icon */}
                <div ref={planeRef} className="mb-8 relative">
                    <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full scale-150 animate-pulse"></div>
                    <Plane size={48} className="text-accent transform rotate-45" />
                </div>

                <div ref={brandRef} className="text-center mb-10">
                    <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter mb-2">
                        FILIX
                    </h1>
                    <div className="flex items-center gap-3 justify-center">
                        <div className="h-[1px] w-8 bg-accent/50"></div>
                        <span className="text-xs md:text-sm font-black uppercase tracking-[0.5em] text-accent">
                            BY SAGAR
                        </span>
                        <div className="h-[1px] w-8 bg-accent/50"></div>
                    </div>
                </div>

                <div className="w-64 flex flex-col items-center">
                    <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative">
                        <div ref={progressRef} className="h-full w-full bg-gradient-to-r from-accent/50 via-accent to-accent/50 shadow-[0_0_20px_#d4af37]"></div>
                    </div>
                    <p ref={statusRef} className="mt-4 text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 animate-pulse">
                        Validating Visa Protocol...
                    </p>
                </div>
            </div>

            {/* Corner Decorative Elements */}
            <div className="absolute top-10 left-10 p-4 border-l border-t border-white/10 opacity-20">
                <Globe size={24} className="text-white" />
            </div>
            <div className="absolute bottom-10 right-10 p-4 border-r border-b border-white/10 opacity-20">
                <ShieldCheck size={24} className="text-white" />
            </div>
        </div>
    );
};

export default Preloader;
