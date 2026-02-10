import React, { useState, useEffect, useRef } from 'react';
import { Quote, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        name: "Aarav Sharma",
        visa: "Student Visa (Canada)",
        text: "My dream of studying in Canada became a reality thanks to Felix by Sagar. Their guidance was impeccable from start to finish.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2670&auto=format&fit=crop",
        country: "Canada"
    },
    {
        name: "Sarah Johnson",
        visa: "Work Permit (UK)",
        text: "The team handled my complex case with such professionalism. I am now happily working in London. Highly recommended!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop",
        country: "UK"
    },
    {
        name: "Michael Chen",
        visa: "Business Visa (USA)",
        text: "Efficient, transparent, and result-oriented. Felix made my business expansion to the US smooth and hassle-free.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop",
        country: "USA"
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const testimonialRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        gsap.fromTo(testimonialRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
    }, [currentIndex]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(containerRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 bg-[#0a192f] relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-accent text-sm uppercase tracking-widest font-bold mb-2 block">Success Stories</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Client Testimonials</h2>
                </div>

                <div className="max-w-4xl mx-auto bg-primary border border-white/5 rounded-2xl p-8 md:p-12 relative shadow-2xl">
                    <div className="absolute top-8 left-8 text-accent opacity-20">
                        <Quote size={80} />
                    </div>

                    <div ref={testimonialRef} className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-full overflow-hidden border-2 border-accent shadow-lg">
                            <img
                                src={testimonials[currentIndex].image}
                                alt={testimonials[currentIndex].name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <p className="text-xl md:text-2xl text-gray-300 font-light italic mb-6 leading-relaxed">
                                "{testimonials[currentIndex].text}"
                            </p>

                            <div>
                                <h4 className="text-xl font-bold text-white">{testimonials[currentIndex].name}</h4>
                                <p className="text-sm text-accent uppercase tracking-wide mb-2">{testimonials[currentIndex].visa}</p>
                                <div className="flex justify-center md:justify-start space-x-1 text-accent">
                                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                        <Star key={i} size={16} fill="#d4af37" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-accent w-8' : 'bg-gray-600 hover:bg-gray-400'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent opacity-5 blur-[120px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500 opacity-5 blur-[100px] rounded-full pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>
        </section>
    );
};

export default Testimonials;
