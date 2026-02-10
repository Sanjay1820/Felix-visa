import React, { useRef, useEffect } from 'react';
import { Clock, Tag, ArrowRight, Bookmark, Heart, Share2, Search } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BlogPage = () => {
    const listRef = useRef(null);
    const headerRef = useRef(null);

    const posts = [
        {
            id: 1,
            title: "Top 5 Countries for International Students in 2024",
            excerpt: "Discover the best destinations for higher education, comparing costs, university rankings, and post-study work opportunities. We break down the tuition vs quality ratio for you.",
            category: "Education",
            date: "May 15, 2024",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop",
            featured: true
        },
        {
            id: 2,
            title: "Canada Express Entry: Latest Draw Updates",
            excerpt: "Stay informed about the recent CRS score cut-offs and changes in the Express Entry system for skilled workers. What the new category-based draws mean for you.",
            category: "Immigration News",
            date: "June 02, 2024",
            readTime: "3 min read",
            image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=2670&auto=format&fit=crop",
            featured: false
        },
        {
            id: 3,
            title: "How to Secure Funding for Your Startup Visa",
            excerpt: "A comprehensive guide for entrepreneurs looking to expand their business globally through investor visa programs. Learn about angel investor requirements.",
            category: "Business",
            date: "June 10, 2024",
            readTime: "7 min read",
            image: "https://images.unsplash.com/photo-1559136555-930d72f18615?q=80&w=2670&auto=format&fit=crop",
            featured: false
        },
        {
            id: 4,
            title: "Travel Checklist: Before You Fly Abroad",
            excerpt: "Essential tips and a downloadable checklist to ensure a smooth journey to your new home abroad. From health insurance to local currency tips.",
            category: "Travel",
            date: "June 20, 2024",
            readTime: "4 min read",
            image: "https://images.unsplash.com/photo-1436491865332-7a61a1042a56?q=80&w=2074&auto=format&fit=crop",
            featured: false
        },
        {
            id: 5,
            title: "Understanding Policy Changes in UK Work Visas",
            excerpt: "The UK government recently announced shifts in minimum salary requirements. Read our expert analysis on how this impacts healthcare workers and IT professionals.",
            category: "Policy",
            date: "June 25, 2024",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
            featured: false
        },
        {
            id: 6,
            title: "Schengen Visa Interview Preparedness Guide",
            excerpt: "What to say when the consulate officer asks about your itinerary. We list the 10 most common questions and the professional way to answer them.",
            category: "Assessment",
            date: "July 05, 2024",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?q=80&w=2000&auto=format&fit=crop",
            featured: false
        }
    ];

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
            );

            gsap.fromTo(".blog-card",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: listRef.current,
                        start: "top 85%",
                    }
                }
            );
        }, [headerRef, listRef]);
        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-primary min-h-screen pt-24 pb-24 relative overflow-hidden">
            <section ref={headerRef} className="container mx-auto px-4 md:px-6 text-center mb-24 relative z-10">
                <span className="text-accent text-sm uppercase tracking-widest font-bold mb-4 block">Knowledge Center</span>
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
                    Immigration <span className="text-gradient">Journal</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                    Decode the complexities of international policy and stay ahead of the curve with our expert-led insights.
                </p>

                {/* Filter / Search Bar Visual */}
                <div className="mt-12 max-w-xl mx-auto flex gap-4">
                    <div className="flex-grow bg-white/5 border border-white/10 rounded-xl px-6 py-4 flex items-center gap-3 text-gray-500">
                        <Search size={20} />
                        <span className="text-sm font-light">Search topics or keywords...</span>
                    </div>
                    <button className="bg-accent px-6 rounded-xl text-primary font-bold shadow-lg shadow-accent/20">
                        Filter
                    </button>
                </div>
            </section>

            <section ref={listRef} className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <article key={post.id} className="blog-card flex flex-col bg-[#0a192f] rounded-[2rem] overflow-hidden border border-white/5 hover:border-accent/40 shadow-2xl transition-all duration-500 group h-full">
                            {/* Image Header */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a192f] to-transparent"></div>
                                <div className="absolute top-6 left-6 flex gap-2">
                                    <span className="bg-accent text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                        {post.category}
                                    </span>
                                    {post.featured && (
                                        <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/20">
                                            Featured
                                        </span>
                                    )}
                                </div>
                                <div className="absolute top-6 right-6 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                    <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-accent hover:text-primary transition-colors">
                                        <Bookmark size={14} />
                                    </button>
                                    <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-accent hover:text-primary transition-colors">
                                        <Share2 size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Post Content */}
                            <div className="p-8 pt-2 flex-grow flex flex-col">
                                <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4 space-x-6">
                                    <span className="flex items-center gap-1.5"><Clock size={12} className="text-accent" /> {post.date}</span>
                                    <span className="flex items-center gap-1.5"><Tag size={12} className="text-accent" /> {post.readTime}</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-4 leading-snug group-hover:text-accent transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-400 font-light leading-relaxed mb-8 flex-grow line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                                    <button className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest hover:text-accent transition-colors">
                                        Read Story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <div className="flex items-center gap-1 text-gray-600 text-[10px]">
                                        <Heart size={14} /> 24
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Newsletter Box inside the blog list */}
                <div className="mt-20 bg-gradient-to-br from-[#0f2a4a] to-blue-900 rounded-[3rem] p-12 md:p-16 border border-accent/20 relative overflow-hidden text-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Never Miss a Policy Update</h2>
                        <p className="text-gray-300 mb-10 max-w-xl mx-auto font-light">Join 15,000+ subscribers who receive our monthly visa news summary.</p>
                        <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                            <input type="email" placeholder="Your work email..." className="flex-grow px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-accent" />
                            <button className="px-8 py-4 bg-accent text-primary font-bold rounded-xl shadow-lg hover:shadow-accent/20 hover:bg-white transition-all uppercase tracking-widest text-xs">
                                Join Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogPage;
