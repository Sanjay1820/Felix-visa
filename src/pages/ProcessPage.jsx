import React, { useRef, useEffect } from 'react';
import { Calendar, FileText, CheckCircle, Send, Flag, ArrowDown, Search, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProcessPage = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const progressRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
            );

            // Timeline Items Animation
            gsap.fromTo(".timeline-item",
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Progress Line Animation
            gsap.fromTo(progressRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: true
                    }
                }
            );
        });
        return () => ctx.revert();
    }, []);

    const steps = [
        {
            icon: <Search size={28} />,
            title: "Expert Consultation",
            description: "We dive deep into your background to identify the most viable pathways for your global goals.",
            details: ["Profile Assessment", "Policy Guidance", "Pathway Selection"],
            color: "text-blue-400"
        },
        {
            icon: <Award size={28} />,
            title: "Eligibility Check",
            description: "A formal evaluation of your credentials against the latest immigration and visa criteria.",
            details: ["Points Calculation", "Document Verification", "Risk Analysis"],
            color: "text-accent"
        },
        {
            icon: <FileText size={28} />,
            title: "Documentation",
            description: "Precision-led assistance in gathering and formatting every required document for a bulletproof file.",
            details: ["Checklist Curation", "Form Filling", "SOP Drafting"],
            color: "text-emerald-400"
        },
        {
            icon: <Send size={28} />,
            title: "Submission",
            description: "Meticulous filing of your online or physical application with direct embassy coordination.",
            details: ["Portal Management", "Fee Settlement", "Embassy Tracking"],
            color: "text-orange-400"
        },
        {
            icon: <Flag size={28} />,
            title: "Final Approval",
            description: "Receiving your visa and providing post-landing guidance for a seamless transition abroad.",
            details: ["Interview Prep", "Landing Support", "Settlement Guide"],
            color: "text-purple-400"
        }
    ];

    return (
        <div className="bg-primary min-h-screen pt-24 pb-24">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

            <section ref={headerRef} className="container mx-auto px-4 md:px-6 text-center mb-20 relative z-10">
                <span className="text-accent text-sm uppercase tracking-widest font-bold mb-4 block">The Methodology</span>
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
                    Our Precision <span className="text-gradient">Process</span>
                </h1>
                <p className="text-gray-400 max-w-3xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                    Moving abroad is a journey of a thousand miles. We make every step intentional, transparent, and successful.
                </p>
            </section>

            <section ref={sectionRef} className="container mx-auto px-4 md:px-6 relative max-w-5xl">
                {/* Vertical Line Container */}
                <div className="absolute left-[20px] md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5">
                    {/* Animated Progress Line */}
                    <div
                        ref={progressRef}
                        className="w-full bg-accent origin-top shadow-[0_0_15px_rgba(212,175,55,0.8)]"
                        style={{ height: '100%' }}
                    ></div>
                </div>

                <div className="space-y-16 md:space-y-32 relative z-10">
                    {steps.map((step, index) => (
                        <div key={index} className={`timeline-item flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-8 md:gap-0`}>

                            {/* Card Content */}
                            <div className="w-full md:w-[45%]">
                                <div className="bg-[#0a192f] border border-white/10 p-8 rounded-3xl hover:border-accent/40 transition-all duration-500 shadow-xl group hover:-translate-y-2">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`p-4 rounded-2xl bg-white/5 ${step.color} group-hover:bg-accent group-hover:text-primary transition-all duration-300`}>
                                            {step.icon}
                                        </div>
                                        <div>
                                            <span className="text-accent text-xs font-bold uppercase tracking-widest block mb-1">Phase 0{index + 1}</span>
                                            <h3 className="text-2xl font-heading font-bold text-white">{step.title}</h3>
                                        </div>
                                    </div>
                                    <p className="text-gray-400 font-light leading-relaxed mb-6">
                                        {step.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {step.details.map((detail, i) => (
                                            <span key={i} className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/5">
                                                {detail}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Center Dot */}
                            <div className="absolute left-[20px] md:left-1/2 md:transform md:-translate-x-1/2 w-10 h-10 flex items-center justify-center">
                                <div className="w-4 h-4 rounded-full bg-primary border-4 border-accent shadow-[0_0_10px_rgba(212,175,55,0.5)] z-20"></div>
                            </div>

                            {/* Empty spacer for desktop */}
                            <div className="hidden md:block w-[45%]"></div>
                        </div>
                    ))}
                </div>

                {/* Final Completion Indicator */}
                <div className="mt-16 text-center relative z-10">
                    <div className="inline-block p-8 bg-gradient-to-br from-accent to-[#b8860b] rounded-full shadow-2xl scale-125 hover:scale-150 transition-transform duration-500 cursor-pointer">
                        <Flag size={32} className="text-primary" />
                    </div>
                    <h4 className="text-white font-heading font-bold text-2xl mt-8">Success Guaranteed Approach</h4>
                </div>
            </section>
        </div>
    );
};

export default ProcessPage;
