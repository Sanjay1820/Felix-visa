import React, { useRef, useEffect } from 'react';
import { Quote, Star, MapPin, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        name: "Aarav Sharma",
        visa: "Student Visa (Canada)",
        text: "My dream of studying in Canada became a reality thanks to Filix by Sagar. Their guidance was impeccable from start to finish. I'm now pursuing my Masters at UT.",
        rating: 5,
        country: "Canada",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2670&auto=format&fit=crop",
        tags: ["Education", "Settlement"]
    },
    {
        name: "Sarah Johnson",
        visa: "Work Permit (UK)",
        text: "The team handled my complex case with such professionalism. I am now happily working in London. The legal team's attention to detail is unmatched.",
        rating: 5,
        country: "UK",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop",
        tags: ["Professional", "Tech Visa"]
    },
    {
        name: "Michael Chen",
        visa: "Business Visa (USA)",
        text: "Efficient, transparent, and result-oriented. Filix made my business expansion to the US smooth and hassle-free. They know the commercial nuances deeply.",
        rating: 5,
        country: "USA",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop",
        tags: ["Investors", "Expansion"]
    },
    {
        name: "Priya Patel",
        visa: "PR (Australia)",
        text: "I was worried about my PR application, but the experts at Filix explained every step clearly and made the process stress-free. 10/10 service!",
        rating: 5,
        country: "Australia",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop",
        tags: ["Migration", "Family"]
    },
    {
        name: "David Lee",
        visa: "Tourist Visa (Europe)",
        text: "Got my Schengen visa in record time! The team helped me with the itinerary and documentation perfectly. Highly recommended for travelers.",
        rating: 5,
        country: "Schengen",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
        tags: ["Travel", "Fast-Track"]
    },
    {
        name: "Emma Wilson",
        visa: "Partner Visa (NZ)",
        text: "Reuniting with my partner was only possible because of your dedication. You didn't just file papers, you joined families. Forever grateful.",
        rating: 5,
        country: "New Zealand",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop",
        tags: ["Spousal", "Emotion"]
    }
];

const TestimonialsPage = () => {
    const gridRef = useRef(null);
    const headerRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
            );

            gsap.fromTo(".testimonial-card",
                { opacity: 0, y: 40, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 80%",
                    }
                }
            );
        }, [headerRef, gridRef]);
        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-primary min-h-screen pt-24 pb-24 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')] pointer-events-none"></div>

            <section ref={headerRef} className="container mx-auto px-4 md:px-6 text-center mb-24 relative z-10">
                <span className="text-accent text-sm uppercase tracking-widest font-bold mb-4 block">Success Stories</span>
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
                    Trusted by <span className="text-gradient">Thousands</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                    Behind every visa is a human story. We take pride in being a part of these life-changing transitions across the globe.
                </p>
            </section>

            <section ref={gridRef} className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {testimonials.map((item, index) => (
                        <div key={index} className="testimonial-card break-inside-avoid bg-[#0a192f] border border-white/5 rounded-[2.5rem] p-8 hover:border-accent/40 transition-all duration-500 shadow-2xl group flex flex-col">
                            {/* Rating & Quote Icon */}
                            <div className="flex justify-between items-center mb-8">
                                <div className="flex gap-1">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <Star key={i} size={16} className="text-accent fill-accent" />
                                    ))}
                                </div>
                                <Quote size={32} className="text-accent/20 group-hover:text-accent/40 transition-colors" />
                            </div>

                            {/* Content */}
                            <p className="text-gray-300 font-light text-lg italic leading-relaxed mb-10 flex-grow">
                                "{item.text}"
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-10">
                                {item.tags.map((tag, i) => (
                                    <span key={i} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/5 text-gray-500 group-hover:text-accent transition-colors">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* User Info */}
                            <div className="flex items-center justify-between border-t border-white/5 pt-8">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-14 h-14 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10"
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-primary shadow-lg border-2 border-primary">
                                            <CheckCircle2 size={12} strokeWidth={3} />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-base group-hover:text-accent transition-colors">{item.name}</h4>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold flex items-center gap-1">
                                            <MapPin size={10} className="text-accent" /> {item.visa}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-mono font-bold text-white/20 group-hover:text-accent/20 uppercase transition-colors">{item.country}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Trust Badges Section */}
            <section className="container mx-auto px-4 md:px-6 mt-32 relative z-10 border-t border-white/5 pt-16">
                <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="flex items-center gap-2 text-white font-heading font-bold text-xl"><Globe className="text-accent" /> GLOBAL ALLIANCE</div>
                    <div className="flex items-center gap-2 text-white font-heading font-bold text-xl"><Star className="text-accent" /> ELITE CONSULTANTS</div>
                    <div className="flex items-center gap-2 text-white font-heading font-bold text-xl"><CheckCircle2 className="text-accent" /> CERTIFIED ISO</div>
                    <div className="flex items-center gap-2 text-white font-heading font-bold text-xl"><Quote className="text-accent" /> VERIFIED SUCCESS</div>
                </div>
            </section>
        </div>
    );
};

export default TestimonialsPage;
