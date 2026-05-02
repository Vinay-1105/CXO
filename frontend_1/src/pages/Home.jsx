import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Twitter, Facebook, Instagram, Briefcase, ChevronLeft, ChevronRight, CheckCircle2, Check, UserPlus, Star, Shield, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthModal } from '../components/AuthModalContext';

const slides = [
    {
        title: "The Problem for Companies",
        content: "Organizations struggle to find experienced CXOs or Advisors quickly. Traditional hiring processes are slow, costly, and inflexible, delaying critical business needs.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "The Problem for Professionals",
        content: "Experienced leaders face limited visibility into flexible, meaningful project opportunities and lack a trusted ecosystem to leverage their expertise.",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop"
    },
    {
        title: "The Market Gap",
        content: "Current solutions fail to connect demand with verified senior talent. Job portals lack project-based roles, while top firms are rigid and expensive.",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Our Solution",
        content: "CXOConnect is a verified marketplace connecting companies with professionals quickly and securely via AI matching and robust governance.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2070&auto=format&fit=crop"
    }
];

// Reusable scroll animation wrapper
const AnimatedSection = ({ children, className, id, style }) => (
    <motion.section
        className={className}
        id={id}
        style={style}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
        {children}
    </motion.section>
);

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const { openModal } = useAuthModal();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);

    const maxSlide = slides.length - 1;

    const nextSlide = () => setCurrentSlide((prev) => (prev === maxSlide ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? maxSlide : prev - 1));

    return (
        <div className="bg-[#fafafa] min-h-screen text-gray-900 font-sans selection:bg-[#0eb59a] selection:text-white pt-20">
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" alt="Hero Background" className="w-full h-full object-cover opacity-40 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/60 to-white"></div>
                </div>

                <motion.div
                    className="relative z-20 max-w-5xl mx-auto px-6 text-center"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#e6f7f4] border border-[#0eb59a]/20 mb-8 text-sm font-semibold text-[#134e40] tracking-wide shadow-sm hover:scale-105 transition-transform cursor-default">
                        <span className="w-2 h-2 rounded-full bg-[#0eb59a] animate-pulse"></span>
                        Premium Executive Talent
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight mb-8 leading-[1.1] text-[#111827]">
                        Elite Expertise.<br /><span className="text-[#134e40]">Scalable Leadership.</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-600 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
                        The premier two-sided marketplace connecting forward-thinking companies with verified senior professionals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <button onClick={openModal} className="px-10 py-4 rounded-full bg-[#134e40] text-white font-semibold text-lg hover:bg-[#0eb59a] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2 group">
                            Get Started
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button onClick={(e) => { e.preventDefault(); document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' }); }} className="px-10 py-4 rounded-full bg-white text-[#134e40] border-2 border-[#134e40] font-semibold text-lg hover:bg-[#134e40] hover:text-white transition-all duration-300 w-full sm:w-auto shadow-sm">
                            Learn More
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Trusted By / Partnered With */}
            <div className="py-14 bg-white border-b border-gray-100">
                <p className="text-center text-gray-500 font-medium mb-10 tracking-widest text-sm uppercase">We've partnered with</p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-8 hover:scale-110 transition-transform" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-8 hover:scale-110 transition-transform" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png" alt="Tesla" className="h-6 hover:scale-110 transition-transform" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%8812.svg" alt="Microsoft" className="h-8 hover:scale-110 transition-transform" />
                </div>
            </div>

            {/* Dark Green Impact Section (Updated Content for Two-Sided Marketplace) */}
            <AnimatedSection className="py-24 px-6 max-w-7xl mx-auto">
                <div className="bg-[#134e40] rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative group">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 blur-[100px] rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-1000"></div>
                    <div className="flex-1 p-12 md:p-16 flex flex-col justify-center relative z-10">
                        <div className="flex items-center gap-2 text-white/80 mb-6 text-sm">
                            <span className="text-yellow-400 tracking-widest">★★★★★</span>
                            <span className="font-medium">Trusted Ecosystem</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                            The premier two-sided marketplace.
                        </h2>
                        <p className="text-teal-50 text-lg leading-relaxed mb-8 opacity-90 font-light">
                            CXOConnect bridges the gap between:
                        </p>
                        <ul className="text-teal-50 space-y-4 mb-8">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="text-[#0eb59a] mt-1 shrink-0" size={20} />
                                <span><strong className="text-white">Companies</strong> (Startups, SMEs, Enterprises) seeking impactful leadership.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="text-[#0eb59a] mt-1 shrink-0" size={20} />
                                <span><strong className="text-white">Senior Professionals</strong> (CXOs, Directors, PMOs, Advisors) seeking flexible engagements.</span>
                            </li>
                        </ul>
                        <p className="text-teal-50 text-base leading-relaxed mb-10 opacity-90 font-light border-l-4 border-[#0eb59a] pl-4">
                            Supported by an expert Admin / PMO layer to ensure trust, meticulous vetting, governance, and seamless managed delivery for fractional leadership and interim roles.
                        </p>
                        <div className="flex items-center gap-6">
                            <button onClick={openModal} className="bg-white text-[#134e40] px-8 py-4 rounded-full font-bold hover:bg-[#0eb59a] hover:text-white transition-all duration-300 inline-flex items-center gap-2 group/btn">
                                Explore Engagements <ChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 min-h-[400px] relative overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" alt="Expert Consulting" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    </div>
                </div>
            </AnimatedSection>

            {/* Comparison Section */}
            <AnimatedSection className="py-24 px-6 max-w-7xl mx-auto" id="about-us">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-[#0eb59a] font-semibold tracking-wide uppercase text-sm mb-4">
                        <div className="w-2 h-2 rounded-full bg-[#0eb59a]"></div>
                        Why choose us
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 tracking-tight">Expert consulting tailored to<br />your business success</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div whileHover={{ y: -5 }} className="bg-white rounded-3xl p-10 md:p-14 border border-gray-100 shadow-md transition-all">
                        <h3 className="text-3xl font-semibold text-gray-900 mb-10">Other Platforms</h3>
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="mt-1 text-gray-400"><Check size={24} /></div>
                                <div>
                                    <h4 className="text-xl font-medium text-gray-900 mb-2">Generic Matching</h4>
                                    <p className="text-gray-500 leading-relaxed text-lg">Algorithm-only solutions that lack personalized insights and verified vetting.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 text-gray-400"><Check size={24} /></div>
                                <div>
                                    <h4 className="text-xl font-medium text-gray-900 mb-2">Limited Governance</h4>
                                    <p className="text-gray-500 leading-relaxed text-lg">Clients are left to navigate complex projects with minimal PMO or expert support.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 text-gray-400"><Check size={24} /></div>
                                <div>
                                    <h4 className="text-xl font-medium text-gray-900 mb-2">Hidden Fees</h4>
                                    <p className="text-gray-500 leading-relaxed text-lg">Unexpected costs and additional charges that inflate your total investment.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div whileHover={{ y: -5 }} className="bg-[#f0fdfa] rounded-3xl p-10 md:p-14 border border-[#ccfbf1] shadow-xl relative overflow-hidden transition-all">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 blur-[80px] rounded-full pointer-events-none"></div>
                        <h3 className="text-3xl font-semibold text-[#134e40] mb-10 relative z-10">With CXOConnect</h3>
                        <div className="space-y-8 relative z-10">
                            <div className="flex gap-4">
                                <div className="mt-1 text-[#0eb59a]"><CheckCircle2 size={28} className="fill-[#0eb59a] text-white" /></div>
                                <div>
                                    <h4 className="text-xl font-medium text-[#134e40] mb-2">Tailored Vetting</h4>
                                    <p className="text-[#134e40]/80 leading-relaxed text-lg">Custom strategies and AI-assisted human vetting designed to fit your unique goals.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 text-[#0eb59a]"><CheckCircle2 size={28} className="fill-[#0eb59a] text-white" /></div>
                                <div>
                                    <h4 className="text-xl font-medium text-[#134e40] mb-2">Dedicated PMO Support</h4>
                                    <p className="text-[#134e40]/80 leading-relaxed text-lg">Expert guidance and hands-on governance at every stage of your project journey.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 text-[#0eb59a]"><CheckCircle2 size={28} className="fill-[#0eb59a] text-white" /></div>
                                <div>
                                    <h4 className="text-xl font-medium text-[#134e40] mb-2">Transparent Pricing</h4>
                                    <p className="text-[#134e40]/80 leading-relaxed text-lg">No surprises—clear escrow structure so you pay only for exactly what you need.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </AnimatedSection>

            {/* Blurred Carousel Slider Section */}
            <AnimatedSection className="py-32 w-full overflow-hidden relative" id="problems">
                <div className="absolute inset-0 bg-[#111827]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1914] to-[#111827]"></div>
                </div>

                <div className="max-w-[100vw] mx-auto relative z-10 flex flex-col items-center overflow-hidden">
                    <div className="inline-flex items-center gap-2 text-[#0eb59a] font-semibold tracking-wide uppercase text-sm mb-4 bg-[#134e40]/40 px-4 py-1.5 rounded-full backdrop-blur-md">
                        <div className="w-2 h-2 rounded-full bg-[#0eb59a]"></div>
                        Services
                    </div>
                    <h2 className="text-center text-5xl md:text-6xl text-white mb-20 font-serif font-bold tracking-tight">What problem can we <span className="text-[#0eb59a]">solve together?</span></h2>

                    <div className="relative w-full flex items-center justify-center px-4 md:px-0">
                        {/* Wrapper for the slides to handle the overflow and flex layout */}
                        <div className="w-full max-w-7xl relative flex justify-center items-center h-[500px]">
                            <AnimatePresence initial={false}>
                                {slides.map((slide, idx) => {
                                    // Determine position relative to currentSlide
                                    let position = 'hidden'; // Default
                                    let zIndex = 0;
                                    let x = 0;
                                    let scale = 0.8;
                                    let opacity = 0;
                                    let blur = 'blur(10px)';

                                    if (idx === currentSlide) {
                                        position = 'center';
                                        zIndex = 30;
                                        x = 0;
                                        scale = 1;
                                        opacity = 1;
                                        blur = 'blur(0px)';
                                    } else if (idx === currentSlide - 1 || (currentSlide === 0 && idx === maxSlide)) {
                                        position = 'left';
                                        zIndex = 20;
                                        x = '-70%';
                                        scale = 0.85;
                                        opacity = 0.6;
                                        blur = 'blur(6px)';
                                    } else if (idx === currentSlide + 1 || (currentSlide === maxSlide && idx === 0)) {
                                        position = 'right';
                                        zIndex = 20;
                                        x = '70%';
                                        scale = 0.85;
                                        opacity = 0.6;
                                        blur = 'blur(6px)';
                                    }

                                    if (position === 'hidden') return null;

                                    return (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0 }}
                                            animate={{
                                                x,
                                                scale,
                                                opacity,
                                                filter: blur,
                                                zIndex,
                                            }}
                                            transition={{ duration: 0.6, ease: "easeInOut" }}
                                            className="absolute w-[90%] md:w-[60%] lg:w-[45%] h-full cursor-pointer"
                                            onClick={() => setCurrentSlide(idx)}
                                        >
                                            <div className="w-full h-full rounded-[2rem] overflow-hidden relative shadow-2xl group border border-white/10">
                                                <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>
                                                <div className="absolute bottom-0 left-0 w-full p-10 z-10 flex flex-col justify-end">
                                                    <h3 className="text-3xl text-white mb-4 font-semibold">{slide.title}</h3>
                                                    <p className="text-gray-300 leading-relaxed text-lg line-clamp-3">{slide.content}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>

                            {/* Left Arrow overlaid on the left card */}
                            <button className="absolute left-[5%] lg:left-[15%] z-40 bg-[#134e40]/80 backdrop-blur-md shadow-2xl text-white rounded-full w-14 h-14 flex items-center justify-center cursor-pointer transition-all hover:bg-[#0eb59a] hover:scale-110" onClick={prevSlide}>
                                <ChevronLeft size={28} />
                            </button>

                            {/* Right Arrow overlaid on the right card */}
                            <button className="absolute right-[5%] lg:right-[15%] z-40 bg-[#134e40]/80 backdrop-blur-md shadow-2xl text-white rounded-full w-14 h-14 flex items-center justify-center cursor-pointer transition-all hover:bg-[#0eb59a] hover:scale-110" onClick={nextSlide}>
                                <ChevronRight size={28} />
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-3 justify-center mt-12 z-20 relative">
                        {slides.map((_, i) => (
                            <span key={i} className={`h-3 rounded-full cursor-pointer transition-all duration-500 ${i === currentSlide ? 'bg-[#0eb59a] w-10 shadow-[0_0_10px_#0eb59a]' : 'bg-white/30 w-3 hover:bg-white/60'}`} onClick={() => setCurrentSlide(i)}></span>
                        ))}
                    </div>
                </div>
            </AnimatedSection>

            {/* Membership Section */}
            <AnimatedSection className="py-24 px-6 max-w-7xl mx-auto bg-white rounded-[3rem] mt-24 border border-gray-100 shadow-xl" id="membership">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-[#0eb59a] font-semibold tracking-wide uppercase text-sm mb-4">
                        <div className="w-2 h-2 rounded-full bg-[#0eb59a]"></div>
                        Exclusive Network
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 tracking-tight">Membership benefits</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">Join a curated community of top-tier executives and forward-thinking companies. Gain access to premium opportunities and resources.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12">
                    <div className="p-8 rounded-3xl bg-[#f8fafc] border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all hover:-translate-y-2">
                        <div className="w-16 h-16 rounded-full bg-[#0eb59a]/10 flex items-center justify-center mb-6 text-[#0eb59a]">
                            <Target size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Curated Matches</h3>
                        <p className="text-gray-600">AI-driven matching ensures you connect with the exact expertise or role you're looking for.</p>
                    </div>

                    <div className="p-8 rounded-3xl bg-[#134e40] text-white border border-[#134e40] flex flex-col items-center text-center hover:shadow-2xl transition-all scale-105 shadow-xl relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#0eb59a]/20 rounded-full blur-2xl"></div>
                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 text-[#0eb59a]">
                            <Shield size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Verified Network</h3>
                        <p className="text-teal-50/80 mb-8">Every member undergoes rigorous vetting to ensure a high-trust environment.</p>
                        <button onClick={openModal} className="mt-auto bg-[#0eb59a] text-white px-8 py-3 rounded-full font-bold w-full hover:bg-teal-400 transition-colors shadow-lg">Become a Member</button>
                    </div>

                    <div className="p-8 rounded-3xl bg-[#f8fafc] border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all hover:-translate-y-2">
                        <div className="w-16 h-16 rounded-full bg-[#0eb59a]/10 flex items-center justify-center mb-6 text-[#0eb59a]">
                            <Star size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">PMO Governance</h3>
                        <p className="text-gray-600">Dedicated support to manage deliverables, escrow, and project success smoothly.</p>
                    </div>
                </div>
            </AnimatedSection>

            {/* Gateways Image Section */}
            <AnimatedSection className="py-32 px-6 max-w-7xl mx-auto">
                <div className="mb-16 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 text-[#0eb59a] font-semibold tracking-wide uppercase text-sm mb-4">
                            <div className="w-2 h-2 rounded-full bg-[#0eb59a]"></div>
                            Join Us
                        </div>
                        <h2 className="text-4xl md:text-6xl text-gray-900 font-serif font-bold tracking-tight">Be a part of our story.</h2>
                    </div>
                    <p className="text-gray-600 text-xl max-w-md md:text-right font-light">Step into our ecosystem to find how you fit in the next generation of fractional leadership.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex flex-col group cursor-pointer" onClick={openModal}>
                        <div className="h-[400px] md:h-[500px] w-full overflow-hidden mb-8 relative rounded-[2rem] shadow-lg group-hover:shadow-2xl transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" alt="Companies" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out" />
                            <div className="absolute bottom-0 left-0 p-10 z-20 w-full">
                                <h4 className="text-4xl text-white mb-3 font-semibold group-hover:text-[#0eb59a] transition-colors">Enterprise Gateway</h4>
                                <p className="text-gray-300 mb-8 text-lg font-light">Find top-tier fractional executives.</p>
                                <button className="bg-white text-[#134e40] px-8 py-3 rounded-full font-bold text-sm group-hover:bg-[#0eb59a] group-hover:text-white transition-colors shadow-lg">
                                    Join as Company
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col group cursor-pointer" onClick={openModal}>
                        <div className="h-[400px] md:h-[500px] w-full overflow-hidden mb-8 relative rounded-[2rem] shadow-lg group-hover:shadow-2xl transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                            {/* Fixed image URL for Experts */}
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="Experts" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out" />
                            <div className="absolute bottom-0 left-0 p-10 z-20 w-full">
                                <h4 className="text-4xl text-white mb-3 font-semibold group-hover:text-[#0eb59a] transition-colors">Expert Gateway</h4>
                                <p className="text-gray-300 mb-8 text-lg font-light">Discover flexible, high-impact engagements.</p>
                                <button className="bg-white text-[#134e40] px-8 py-3 rounded-full font-bold text-sm group-hover:bg-[#0eb59a] group-hover:text-white transition-colors shadow-lg">
                                    Join as Expert
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            {/* Redesigned Contact Us */}
            <AnimatedSection className="w-full relative py-32 mt-10" id="contact-us">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop" alt="Contact Office" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#2d2d2d]/85"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
                    <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-8 tracking-widest uppercase">CONTACT US</h2>

                    <div className="text-gray-300 mb-16 text-sm md:text-base tracking-widest uppercase font-light leading-loose">
                        ADDRESS: 500 TERRY FRANCOIS STREET SAN FRANCISCO, CA 94158<br />
                        TEL: 123-456-7890 &nbsp;|&nbsp; INFO@CXOCONNECT.COM
                    </div>

                    <div className="w-full max-w-xl">
                        <p className="mb-4 text-white text-lg font-light">Subscribe For Updates and Promotions</p>
                        <form className="flex flex-col gap-4 w-full" onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }}>
                            <div className="flex flex-col text-left">
                                <label className="text-white text-sm mb-2 opacity-80">Enter your email here *</label>
                                <input type="email" required className="w-full bg-white/20 border-b-2 border-white/40 px-4 py-3 text-white placeholder-transparent focus:outline-none focus:border-[#0eb59a] transition-colors focus:bg-white/30 backdrop-blur-sm" />
                            </div>
                            <button type="submit" className="w-full bg-[#0eb59a] text-white px-8 py-4 font-bold hover:bg-teal-400 transition-all duration-300 shadow-lg mt-2 tracking-widest uppercase text-sm hover:tracking-[0.2em]">Get Updates</button>
                        </form>
                    </div>
                </div>
            </AnimatedSection>

            {/* Enlarged Redesigned Dark Footer */}
            <footer className="bg-[#1c1c1c] text-white pt-32 pb-12 px-6 relative border-t-[16px] border-[#0eb59a]">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
                    <div className="max-w-md">
                        <h2 className="text-5xl font-serif font-bold tracking-tight flex items-center gap-2 mb-8 text-white">
                            CXO<span className="text-[#0eb59a]">.</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed font-light mb-10">
                            The premier two-sided marketplace connecting companies with vetted senior professionals. When you need experience, not headcount.
                        </p>
                        <div className="flex gap-8">
                            <motion.div whileHover={{ scale: 1.2, color: '#0eb59a' }} className="cursor-pointer text-gray-400 transition-colors"><Twitter size={28} /></motion.div>
                            <motion.div whileHover={{ scale: 1.2, color: '#0eb59a' }} className="cursor-pointer text-gray-400 transition-colors"><Facebook size={28} /></motion.div>
                            <motion.div whileHover={{ scale: 1.2, color: '#0eb59a' }} className="cursor-pointer text-gray-400 transition-colors"><Instagram size={28} /></motion.div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-16 md:gap-24 lg:gap-32 w-full lg:w-auto">
                        <div className="flex flex-col gap-6">
                            <h4 className="text-white text-2xl font-semibold mb-4">Platform</h4>
                            <a href="#" className="text-gray-400 text-lg hover:text-[#0eb59a] transition-colors font-light">Find Talent</a>
                            <a href="#" className="text-gray-400 text-lg hover:text-[#0eb59a] transition-colors font-light">Find Projects</a>
                            <a href="#membership" className="text-gray-400 text-lg hover:text-[#0eb59a] transition-colors font-light" onClick={(e) => { e.preventDefault(); document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth' }); }}>Membership</a>
                            <button onClick={openModal} className="text-gray-400 text-lg hover:text-[#0eb59a] transition-colors text-left w-fit p-0 bg-transparent border-none font-light">Join the Network</button>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h4 className="text-white text-2xl font-semibold mb-4">Company</h4>
                            <a href="#about-us" className="text-gray-400 text-lg hover:text-[#0eb59a] transition-colors font-light" onClick={(e) => { e.preventDefault(); document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' }); }}>About Us</a>
                            <a href="#contact-us" className="text-gray-400 text-lg hover:text-[#0eb59a] transition-colors font-light" onClick={(e) => { e.preventDefault(); document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' }); }}>Contact</a>
                            <a href="#" className="text-gray-400 text-lg hover:text-[#0eb59a] transition-colors font-light">Resources & Blog</a>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h4 className="text-white text-2xl font-semibold mb-4">Legal</h4>
                            <a href="#" className="text-gray-400 text-lg hover:text-[#0eb59a] transition-colors font-light">Privacy Policy</a>
                            <a href="#" className="text-gray-400 text-lg hover:text-[#0eb59a] transition-colors font-light">Terms of Service</a>
                            <a href="#" className="text-gray-400 text-lg hover:text-[#0eb59a] transition-colors font-light">Cookie Policy</a>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm tracking-widest uppercase">
                    <span>© {new Date().getFullYear()} CXOCONNECT. ALL RIGHTS RESERVED.</span>
                    <span className="mt-4 md:mt-0 font-bold text-[#0eb59a]">Designed for Precision.</span>
                </div>
            </footer>

            {/* Chat Bubble Sleek */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ position: 'fixed', bottom: '30px', right: '30px', backgroundColor: '#0eb59a', color: '#ffffff', padding: '16px 32px', cursor: 'pointer', zIndex: 1000 }}
                className="hover:-translate-y-1 transition-all flex items-center justify-center font-bold tracking-widest text-sm uppercase shadow-2xl rounded-sm"
            >
                CHAT WITH US
            </motion.div>
        </div>
    );
};

export default Home;
