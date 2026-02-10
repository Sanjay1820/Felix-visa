import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Globe, ClipboardCheck, UserCheck, BarChart3, Clock, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import gsap from 'gsap';

const EligibilityAnalysis = () => {
    const headerRef = useRef(null);
    const formRef = useRef(null);
    const backgroundRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        destination: 'Canada',
        category: 'Study Permit',
        qualification: '',
        brief: ''
    });

    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
            );

            gsap.fromTo(".form-element",
                { opacity: 0, x: -30 },
                { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.5 }
            );

            gsap.fromTo(".info-card",
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)', delay: 0.8 }
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
        setErrorMessage('');

        try {
            // PROPER WORKING MODE: We try the PHP backend first.
            // If on localhost:5174, Vite will serve the PHP as text, which causes an error.
            const response = await fetch('/api/send_eligibility.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok && result.status === 'success') {
                setStatus('success');
            } else {
                throw new Error(result.message || 'System transmission error');
            }
        } catch (error) {
            console.error("Transmission Error:", error);

            // FALLBACK / WORKING MODE SIMULATION
            // Since Vite doesn't run PHP locally, we'll provide a 'Working success' 
            // but warn about the server requirement in console.
            if (window.location.hostname === 'localhost') {
                console.warn("PHP detected on Localhost. Simulating success for UI testing. Deploy to a PHP server for real mail transmission.");
                setTimeout(() => {
                    setStatus('success');
                }, 2000);
            } else {
                setStatus('error');
                setErrorMessage(error.message || 'Mission aborted. Check node connectivity.');
            }
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-[#010611] flex items-center justify-center p-6 text-center">
                <div className="success-message max-w-2xl space-y-10">
                    <div className="w-32 h-32 bg-accent/20 rounded-full flex items-center justify-center mx-auto border-2 border-accent shadow-[0_0_50px_rgba(212,175,55,0.4)] relative">
                        <CheckCircle2 className="text-accent" size={64} />
                        <div className="absolute inset-0 border-4 border-accent rounded-full animate-ping opacity-25"></div>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-5xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter">Mission <span className="text-gradient">Logged</span></h2>
                        <p className="text-accent text-[10px] font-black uppercase tracking-[0.8em] animate-pulse">Transmission Hash: #FLX-{Math.floor(Math.random() * 90000) + 10000}</p>
                    </div>
                    <p className="text-gray-400 text-xl md:text-2xl font-light leading-relaxed">
                        Your assessment criteria reached our encrypted vault. A specialized strategist will transmit the final eligibility report to <span className="text-white font-bold">{formData.email}</span> within 24 hours.
                    </p>
                    <div className="pt-10">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="px-16 py-6 bg-accent text-primary font-black uppercase tracking-[0.6em] text-[10px] rounded-full hover:bg-white transition-all shadow-2xl hover:-translate-y-2 duration-500"
                        >
                            Return to Command Hub
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#010611] pt-32 pb-24 relative overflow-hidden">
            {/* Cinematic Background */}
            <div ref={backgroundRef} className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full"></div>
                <div className="absolute inset-0 bg-[#010611] opacity-60"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header Section */}
                <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-20">
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
                        <Sparkles className="text-accent" size={16} />
                        <span className="text-accent text-[10px] font-black uppercase tracking-[0.5em]">Global Audit v2.2</span>
                    </div>
                    <h1 className="text-5xl md:text-9xl font-heading font-black text-white mb-8 tracking-tighter uppercase leading-[0.85]">
                        Eligibility <span className="text-gradient">Analysis</span>
                    </h1>
                    <p className="text-gray-400 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto opacity-80">
                        Evaluated by elite immigration operatives and AI-benchmarks.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Left Side: Information & Trust */}
                    <div className="lg:col-span-4 space-y-12">
                        <div className="info-card p-12 bg-white/5 border border-white/10 rounded-[4rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <div className="relative z-10">
                                <ShieldCheck className="text-accent mb-8" size={56} />
                                <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">Precision Audit</h3>
                                <p className="text-gray-400 text-lg leading-relaxed font-light">
                                    Multi-point verification of academic and financial status ensures 99.2% approval probability.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { icon: <Clock size={24} />, label: "Rapid Result", value: "24 Hours" },
                                { icon: <BarChart3 size={24} />, label: "Accuracy", value: "99.2%" },
                                { icon: <Globe size={24} />, label: "Reach", value: "50+ Nations" },
                                { icon: <UserCheck size={24} />, label: "Expert Review", value: "Verified" }
                            ].map((stat, i) => (
                                <div key={i} className="info-card p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl hover:bg-white/10 transition-all cursor-default text-center group">
                                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        {stat.icon}
                                    </div>
                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{stat.label}</div>
                                    <div className="text-xl font-black text-white tracking-tighter uppercase">{stat.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div ref={formRef} className="lg:col-span-8 bg-white/5 border border-white/10 rounded-[5rem] backdrop-blur-[60px] p-12 md:p-20 shadow-[0_60px_120px_rgba(0,0,0,0.6)] relative overflow-hidden">
                        <form className="space-y-12" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="form-element space-y-4">
                                    <label className="text-[11px] text-accent/60 font-black uppercase tracking-[0.5em] ml-2">Full Legal Name</label>
                                    <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-white/5 border border-white/10 rounded-3xl px-10 py-6 text-white outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-light text-lg" placeholder="John Doe" />
                                </div>
                                <div className="form-element space-y-4">
                                    <label className="text-[11px] text-accent/60 font-black uppercase tracking-[0.5em] ml-2">Digital Signature (Email)</label>
                                    <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-white/5 border border-white/10 rounded-3xl px-10 py-6 text-white outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-light text-lg" placeholder="john@example.com" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="form-element space-y-4">
                                    <label className="text-[11px] text-accent/60 font-black uppercase tracking-[0.5em] ml-2">Target Destination</label>
                                    <select name="destination" value={formData.destination} onChange={handleChange} className="w-full bg-[#0b1b36] border border-white/10 rounded-3xl px-10 py-6 text-white outline-none focus:border-accent/50 transition-all font-light appearance-none text-lg cursor-pointer">
                                        <option value="Canada">Canada</option>
                                        <option value="USA">USA</option>
                                        <option value="UK">UK</option>
                                        <option value="Germany">Germany</option>
                                        <option value="UAE">UAE</option>
                                    </select>
                                </div>
                                <div className="form-element space-y-4">
                                    <label className="text-[11px] text-accent/60 font-black uppercase tracking-[0.5em] ml-2">Visa Category</label>
                                    <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-[#0b1b36] border border-white/10 rounded-3xl px-10 py-6 text-white outline-none focus:border-accent/50 transition-all font-light appearance-none text-lg cursor-pointer">
                                        <option value="Study Permit">Study Permit</option>
                                        <option value="Work Visa">Work Visa</option>
                                        <option value="Permanent Residency">Permanent Residency</option>
                                        <option value="Business / Investor">Business / Investor</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-element space-y-4">
                                <label className="text-[11px] text-accent/60 font-black uppercase tracking-[0.5em] ml-2">Highest Qualification</label>
                                <input required name="qualification" value={formData.qualification} onChange={handleChange} type="text" className="w-full bg-white/5 border border-white/10 rounded-3xl px-10 py-6 text-white outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-light text-lg" placeholder="e.g., Master's in Computer Science" />
                            </div>

                            <div className="form-element space-y-4">
                                <label className="text-[11px] text-accent/60 font-black uppercase tracking-[0.5em] ml-2">Professional Brief</label>
                                <textarea required name="brief" value={formData.brief} onChange={handleChange} rows="5" className="w-full bg-white/5 border border-white/10 rounded-[3rem] px-10 py-8 text-white outline-none focus:border-accent/50 focus:bg-white/10 transition-all font-light resize-none text-lg" placeholder="Describe your current role and years of experience..."></textarea>
                            </div>

                            <div className="form-element pt-10">
                                <button
                                    disabled={status === 'loading'}
                                    className="w-full bg-accent text-primary font-black py-12 rounded-[3.5rem] hover:bg-white hover:shadow-[0_40px_100px_rgba(212,175,55,0.4)] transition-all uppercase tracking-[1em] text-sm flex items-center justify-center gap-8 group disabled:opacity-50 relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                    {status === 'loading' ? (
                                        <Loader2 className="animate-spin" size={32} />
                                    ) : (
                                        <>Generate Eligibility Report <ArrowRight size={24} className="group-hover:translate-x-6 transition-transform duration-700" /></>
                                    )}
                                </button>

                                {status === 'error' && (
                                    <div className="flex items-center justify-center gap-4 mt-8 p-6 bg-red-500/10 border border-red-500/30 rounded-3xl text-red-500">
                                        <AlertTriangle size={24} />
                                        <p className="text-[11px] uppercase tracking-[0.2em] font-black">{errorMessage}</p>
                                    </div>
                                )}

                                <p className="text-[9px] text-center text-gray-600 uppercase tracking-widest mt-10 flex items-center justify-center gap-3">
                                    <ClipboardCheck size={14} className="text-accent" /> Encrypted Protocol • Automated Success Audit Enabled
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EligibilityAnalysis;
