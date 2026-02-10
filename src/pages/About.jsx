import React, { useEffect, useRef } from 'react';
import { Target, Users, Globe, Award, CheckCircle, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    // Refs for animation
    const headerRef = useRef(null);
    const storyRef = useRef(null);
    const visionRef = useRef(null);
    const timelineRef = useRef(null);
    const teamRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Header Animation (Always play immediately)
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
            );

            // Story Section
            gsap.fromTo(storyRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: storyRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Vision Cards
            gsap.fromTo(".vision-card",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: visionRef.current,
                        start: "top 85%",
                    }
                }
            );

            // Timeline
            gsap.fromTo(".timeline-item",
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: "top 85%",
                    }
                }
            );

            // Team
            gsap.fromTo(".team-member",
                { opacity: 0, scale: 0.9 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: teamRef.current,
                        start: "top 85%",
                    }
                }
            );

        });
        return () => ctx.revert();
    }, []);

    // Data handling
    const stats = [
        { label: "Years Exp.", value: "15+" },
        { label: "Visas", value: "5k+" },
        { label: "Countries", value: "30+" },
        { label: "Success", value: "98%" }
    ];

    const timelineData = [
        { year: "2010", title: "Inception", description: "Started as a small consultancy in Mumbai helping students." },
        { year: "2015", title: "Expansion", description: "Opened branches in Delhi and Bangalore, adding PR services." },
        { year: "2018", title: "Global Reach", description: "Formed partnerships with 500+ universities worldwide." },
        { year: "2024", title: "Digital Era", description: "Launched full digital services for remote consultations." }
    ];

    const teamData = [
        { name: "Sagar Verma", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop" },
        { name: "Elena Rodriguez", role: "Head of Legal", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" },
        { name: "David Chen", role: "Senior Consultant", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop" }
    ];

    return (
        <div className="pt-24 bg-primary min-h-screen overflow-x-hidden">
            {/* Header */}
            <section className="container mx-auto px-4 md:px-6 py-12 text-center">
                <div ref={headerRef}>
                    <span className="text-accent text-sm uppercase tracking-widest font-bold mb-4 block">About Felix</span>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
                        Crafting Your <span className="text-gradient">Global Future</span>
                    </h1>
                    <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed font-light">
                        More than consultants; we are your strategic partners in navigating the world.
                    </p>
                </div>
            </section>

            {/* Story */}
            <section ref={storyRef} className="bg-primary-light py-20 relative">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/2 relative z-10">
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
                                alt="Team working" className="rounded-2xl shadow-2xl border border-white/5 w-full" />
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl -z-10"></div>
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-heading font-bold text-white mb-6">Our Story</h2>
                            <p className="text-gray-300 mb-6 font-light leading-relaxed">
                                Founded with a vision to simplify global mobility, Felix by Sagar has grown from a boutique consultancy to an international leader. We align your dreams with reality through expert guidance and transparent processes.
                            </p>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                                {stats.map((s, i) => (
                                    <div key={i} className="border-l-2 border-accent pl-4">
                                        <div className="text-2xl font-bold text-white">{s.value}</div>
                                        <div className="text-xs text-gray-500 uppercase">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section ref={visionRef} className="py-20 container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Vision */}
                    <div className="vision-card bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                        <Target className="text-accent mb-4" size={32} />
                        <h3 className="text-xl font-bold text-white mb-2">Our Vision</h3>
                        <p className="text-gray-400 font-light text-sm">To be the most trusted global immigration consultancy, breaking borders for talent.</p>
                    </div>
                    {/* Mission */}
                    <div className="vision-card bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                        <Award className="text-accent mb-4" size={32} />
                        <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
                        <p className="text-gray-400 font-light text-sm">Empowering individuals with transparent, ethical, and personalized visa solutions.</p>
                    </div>
                    {/* Values */}
                    <div className="vision-card bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                        <Globe className="text-accent mb-4" size={32} />
                        <h3 className="text-xl font-bold text-white mb-2">Core Values</h3>
                        <ul className="text-gray-400 font-light text-sm space-y-1">
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-accent" /> Integrity</li>
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-accent" /> Clients First</li>
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-accent" /> Excellence</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section ref={timelineRef} className="py-20 bg-[#0a192f] relative">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl font-heading font-bold text-center text-white mb-16">Our Journey</h2>
                    <div className="space-y-12 border-l border-white/10 ml-4 md:max-w-2xl md:mx-auto">
                        {timelineData.map((item, i) => (
                            <div key={i} className="timeline-item pl-8 relative">
                                <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-accent rounded-full"></div>
                                <span className="text-accent font-bold text-xl block mb-1">{item.year}</span>
                                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                <p className="text-gray-400 font-light">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section ref={teamRef} className="py-20 container mx-auto px-4 md:px-6">
                <h2 className="text-3xl font-heading font-bold text-center text-white mb-12">Leadership</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamData.map((member, i) => (
                        <div key={i} className="team-member text-center">
                            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-4 border-2 border-accent/20">
                                <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-xl font-bold text-white">{member.name}</h3>
                            <p className="text-accent text-sm tracking-widest uppercase">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Accreditations - Static (No Anim) so it always shows */}
            <section className="py-12 border-t border-white/5 mt-10">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-500 uppercase tracking-widest text-xs mb-8">Accredited By</p>
                    <div className="flex flex-wrap justify-center gap-8 opacity-60">
                        <div className="flex items-center gap-2"><ShieldCheck size={28} className="text-white" /> <span className="font-bold text-white">ICCRC</span></div>
                        <div className="flex items-center gap-2"><Globe size={28} className="text-white" /> <span className="font-bold text-white">MARA</span></div>
                        <div className="flex items-center gap-2"><Award size={28} className="text-white" /> <span className="font-bold text-white">British Council</span></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
