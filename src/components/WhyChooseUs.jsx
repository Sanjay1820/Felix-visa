import React, { useRef, useEffect } from 'react';
import { ShieldCheck, Users, Trophy, Handshake } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from([contentRef.current, imageRef.current], {
                x: (index) => index === 0 ? -100 : 100,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const features = [
        {
            icon: <ShieldCheck size={32} className="text-accent" />,
            title: "98% Success Rate",
            description: "Our meticulous process ensures the highest approval chances for your visa application."
        },
        {
            icon: <Users size={32} className="text-accent" />,
            title: "Global Experts",
            description: "A team of certified immigration lawyers and consultants with decades of experience."
        },
        {
            icon: <Handshake size={32} className="text-accent" />,
            title: "Transparent Process",
            description: "No hidden fees. We maintain complete transparency throughout your journey."
        },
        {
            icon: <Trophy size={32} className="text-accent" />,
            title: "Award Winning",
            description: "Recognized globally for excellence in immigration and visa services."
        }
    ];

    return (
        <section ref={sectionRef} className="py-24 bg-primary relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Content */}
                    <div ref={contentRef} className="lg:w-1/2">
                        <span className="text-accent text-sm uppercase tracking-widest font-bold mb-2 block">Why Choose Felix</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8 leading-tight">
                            Your Dreams, Our <span className="text-gradient">Commitment.</span>
                        </h2>
                        <p className="text-gray-400 mb-10 text-lg leading-relaxed font-light">
                            Choosing the right partner for your migration journey is crucial. At Felix by Sagar, we combine expertise with empathy to deliver results that change lives.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start space-x-4 group hover:bg-white/5 p-4 rounded-lg transition-colors">
                                    <div className="p-3 bg-primary-light rounded-lg border border-white/10 group-hover:border-accent/50 transition-colors">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                                        <p className="text-sm text-gray-400 font-light">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image */}
                    <div ref={imageRef} className="lg:w-1/2 relative bg-primary-light p-1 rounded-2xl">
                        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/5 group">
                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop"
                                alt="Expert Consultant"
                                className="w-full h-[600px] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-60"></div>

                            {/* Floating Stats Card */}
                            <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 shadow-lg">
                                <p className="text-4xl font-bold text-white mb-1">15+</p>
                                <p className="text-xs text-gray-300 uppercase tracking-widest">Years of Experience</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
