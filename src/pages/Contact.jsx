import React, { useRef, useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Send, Globe, MessageSquare, Briefcase, FileCheck, Plane, Loader2, CheckCircle2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const location = useLocation();
    const targetCountry = location.state?.targetCountry || 'Canada';

    const headerRef = useRef(null);
    const formRef = useRef(null);
    const infoRef = useRef(null);
    const faqRef = useRef(null);
    const bgRef = useRef(null);

    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [formData, setFormData] = useState({
        name: '',
        passport: '',
        email: '',
        phone: '',
        visaCategory: 'Student Visa',
        destination: targetCountry,
        message: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
            );

            gsap.to(".floating-stamp", {
                y: -15,
                rotation: 5,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: { amount: 2, from: "random" }
            });

            gsap.to(".bg-plane", {
                x: "120vw",
                y: -100,
                duration: 20,
                repeat: -1,
                ease: "none",
                delay: 1
            });

            gsap.fromTo(formRef.current,
                { opacity: 0, x: 30 },
                { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.5 }
            );

            gsap.fromTo(".contact-card",
                { opacity: 0, x: -30 },
                { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", delay: 0.5 }
            );

            gsap.fromTo(".faq-item",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: faqRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

        });
        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/send_contact.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                gsap.fromTo(".success-overlay", { opacity: 0, scale: 0.8, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            // Localhost simulation
            if (window.location.hostname === 'localhost') {
                setTimeout(() => setStatus('success'), 1500);
            } else {
                setStatus('error');
            }
        }
    };

    return (
        <div className="pt-24 bg-primary min-h-screen relative overflow-hidden">
            <div ref={bgRef} className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2674&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                <div className="floating-stamp absolute top-[15%] left-[10%] text-white/5 transform -rotate-12"><FileCheck size={120} /></div>
                <div className="floating-stamp absolute bottom-[20%] right-[10%] text-white/5 transform rotate-12"><Globe size={180} /></div>
                <div className="bg-plane absolute top-[40%] -left-[10%] text-white/10"><Plane size={64} className="transform rotate-12" /></div>
                <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary"></div>
            </div>

            <section className="container mx-auto px-4 md:px-6 py-12 text-center relative z-10">
                <div ref={headerRef}>
                    <span className="text-accent text-[10px] uppercase tracking-[0.6em] font-black mb-4 block">Official Consultation</span>
                    <h1 className="text-5xl md:text-8xl font-heading font-black text-white mb-6 uppercase tracking-tighter">
                        Mission <span className="text-gradient">Control</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-xl font-light opacity-80">
                        Initiate your global transition. Our certified operatives are standing by for tactical visa deployment.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 md:px-6 pb-24 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto items-start">
                    <div ref={infoRef} className="lg:w-1/3 space-y-8">
                        <div className="contact-card bg-white/5 border border-white/10 p-8 rounded-3xl flex items-start gap-6 hover:border-accent/40 transition-colors backdrop-blur-xl group">
                            <div className="p-4 bg-accent/10 rounded-2xl text-accent group-hover:scale-110 transition-transform"><Phone size={28} /></div>
                            <div>
                                <h3 className="text-xl font-black text-white mb-1 uppercase tracking-tight">Direct Comms</h3>
                                <p className="text-gray-400 font-light">+1 (555) 123-4567</p>
                            </div>
                        </div>
                        <div className="contact-card bg-white/5 border border-white/10 p-8 rounded-3xl flex items-start gap-6 hover:border-accent/40 transition-colors backdrop-blur-xl group">
                            <div className="p-4 bg-accent/10 rounded-2xl text-accent group-hover:scale-110 transition-transform"><Mail size={28} /></div>
                            <div>
                                <h3 className="text-xl font-black text-white mb-1 uppercase tracking-tight">Mission Intel</h3>
                                <p className="text-gray-400 font-light">sanjaythakor4973@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    <div ref={formRef} className="lg:w-2/3 w-full">
                        <div className="bg-[#0a192f]/80 backdrop-blur-3xl border border-white/10 p-10 md:p-16 rounded-[4rem] shadow-2xl relative min-h-[600px] flex flex-col justify-center">
                            {status === 'success' ? (
                                <div className="success-overlay text-center space-y-8 py-10">
                                    <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto border-2 border-accent">
                                        <CheckCircle2 className="text-accent" size={48} />
                                    </div>
                                    <h2 className="text-5xl font-heading font-black text-white uppercase tracking-tighter">Request <span className="text-gradient">Logged</span></h2>
                                    <p className="text-gray-400 text-xl font-light">Data transmitted to sanjaythakor4973@gmail.com. Our team will contact you shortly.</p>
                                    <button onClick={() => setStatus('idle')} className="text-accent text-sm font-black uppercase tracking-[0.5em] border-b border-accent/30 pb-1 hover:border-accent transition-all">New Message</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] text-accent/60 uppercase tracking-[0.4em] font-black ml-2">Full Legal Name</label>
                                            <input name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-light" placeholder="As per passport" required />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] text-accent/60 uppercase tracking-[0.4em] font-black ml-2">Email Address</label>
                                            <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-light" placeholder="john@example.com" required />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] text-accent/60 uppercase tracking-[0.4em] font-black ml-2">Contact Number</label>
                                            <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-light" placeholder="+1 (000) 000-0000" required />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] text-accent/60 uppercase tracking-[0.4em] font-black ml-2">Target Destination</label>
                                            <select name="destination" value={formData.destination} onChange={handleChange} className="w-full bg-[#0b1b36] border border-white/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-accent/50 transition-all font-light appearance-none cursor-pointer">
                                                <option value="Canada">Canada</option>
                                                <option value="Australia">Australia</option>
                                                <option value="United Kingdom">United Kingdom</option>
                                                <option value="USA">USA</option>
                                                <option value="Europe">Europe</option>
                                                <option value="Germany">Germany</option>
                                                <option value="UAE">UAE</option>
                                                <option value="New Zealand">New Zealand</option>
                                                <option value="Poland">Poland</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] text-accent/60 uppercase tracking-[0.4em] font-black ml-2">Mission Notes</label>
                                        <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-white focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-light resize-none" placeholder="Describe your background..."></textarea>
                                    </div>
                                    <button disabled={status === 'loading'} type="submit" className="w-full bg-accent text-primary font-black py-8 rounded-[2.5rem] hover:bg-white transition-all duration-500 uppercase tracking-[0.8em] text-xs shadow-2xl flex items-center justify-center gap-4 group">
                                        {status === 'loading' ? <Loader2 className="animate-spin" size={24} /> : <>Initiate Assessment <Send size={20} className="group-hover:translate-x-2 transition-transform" /></>}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
