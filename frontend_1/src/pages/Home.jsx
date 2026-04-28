import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Twitter, Facebook, Instagram, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import corporateHero from '../assets/corporate_hero.png';
import slideShowImg from '../assets/slide-show.webp';
import careerMeeting from '../assets/career_meeting.png';
import careerProfessionals from '../assets/career_professionals.png';
import { useAuthModal } from '../components/AuthModalContext';

const slides = [
    {
        title: "The Problem for Companies",
        content: "Organizations struggle to find experienced CXOs or Advisors quickly. Traditional hiring processes are slow, costly, and inflexible, delaying critical business needs."
    },
    {
        title: "The Problem for Professionals",
        content: "Experienced leaders face limited visibility into flexible, meaningful project opportunities and lack a trusted ecosystem to leverage their expertise."
    },
    {
        title: "The Market Gap",
        content: "Current solutions fail to connect demand with verified senior talent. Job portals lack project-based roles, while top firms are rigid and expensive."
    },
    {
        title: "Our Solution",
        content: "CXOConnect is a verified marketplace connecting companies with professionals quickly and securely via AI matching and robust governance."
    }
];

// Reusable scroll animation wrapper
const AnimatedSection = ({ children, className, id, style }) => (
    <motion.section 
        className={className} 
        id={id} 
        style={style}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
    >
        {children}
    </motion.section>
);

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(3);
    const { openModal } = useAuthModal();

    useEffect(() => {
        const updateCardsPerView = () => {
            if (window.innerWidth <= 768) setCardsPerView(1);
            else if (window.innerWidth <= 992) setCardsPerView(2);
            else setCardsPerView(3);
        };
        updateCardsPerView();
        window.addEventListener('resize', updateCardsPerView);
        return () => window.removeEventListener('resize', updateCardsPerView);
    }, []);

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
            window.scrollTo(0, 0); // scroll to top when landing cleanly
        }
    }, [location]);

    const maxSlide = Math.max(0, slides.length - cardsPerView);

    const nextSlide = () => {
        setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
    };

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="relative h-[80vh] bg-cover bg-center flex items-center justify-center text-center text-white" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${corporateHero})` }}>
                <motion.div 
                    className="hero-content"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold uppercase max-w-3xl leading-tight mb-5">Experience. Not Headcount.</h1>
                    <p className="text-lg md:text-2xl font-light tracking-wider mb-10">The premier two-sided marketplace connecting companies with verified senior professionals.</p>
                </motion.div>
            </section>

            {/* About Us Vanguard Style */}
            <AnimatedSection className="bg-gray-900 text-white py-24 w-full" id="about-us">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 px-4">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-4">About us</h2>
                        <p>
                            CXOConnect matches companies with senior professionals for fractional leadership, interim roles, advisory, and transformation projects giving startups, SMEs, and enterprises access to vetted CXOs, Directors, and PMOs without full-time hires.
                        </p>
                        <p className="mt-5">
                            We solve the expertise gap for companies needing proven leaders for scaling, fundraising, or short-term projects. Professionals gain trusted access to meaningful gigs through AI matching, verified profiles, and PMO governance ensuring smooth delivery.
                        </p>
                    </div>
                    <div className="flex-1 flex flex-col gap-6">
                        <div className="bg-gray-800 rounded-xl p-6 shadow">
                            <h3 className="text-xl font-semibold mb-2">Vetted Trust</h3>
                            <p>100% verified profiles and CXOConnect delivers vetted senior talent on-demand.</p>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-6 shadow">
                            <h3 className="text-xl font-semibold mb-2">Trust Governance</h3>
                            <p>Fractional leadership for scalable business transformation.</p>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            <AnimatedSection className="bg-white py-20 w-full overflow-hidden">
                <div className="max-w-[1500px] mx-auto flex flex-col xl:flex-row items-center gap-10 px-5 relative">
                    <div className="flex-[0_0_100%] xl:flex-[0_0_58%] relative z-10 w-full">
                        <h2 className="text-left text-4xl md:text-5xl text-gray-800 mb-10 font-light pl-5">What problem can we <span className="text-[var(--primary-accent)]">solve together?</span></h2>

                        <div className="relative flex items-center px-5">
                            <button className="absolute left-0 z-10 bg-white border-2 border-[var(--primary-accent)] text-[var(--primary-accent)] rounded-full w-11 h-11 flex items-center justify-center cursor-pointer transition-all hover:bg-[var(--primary-accent)] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 flex-shrink-0" onClick={prevSlide} disabled={currentSlide === 0}><ChevronLeft size={24} /></button>

                            <div className="overflow-hidden w-full py-3">
                                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(calc(-100% / ${cardsPerView} * ${currentSlide}))` }}>
                                    {slides.map((slide, idx) => (
                                        <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4 min-h-[380px] flex" key={idx}>
                                            <div className="bg-gray-50 p-10 w-full rounded hover:bg-white hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col group">
                                                <div className="text-[var(--primary-accent)] mb-6"><Briefcase size={32} /></div>
                                                <h3 className="text-2xl text-gray-800 mb-5 font-light">{slide.title}</h3>
                                                <p className="text-gray-600 leading-relaxed text-[0.95rem]">{slide.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className="absolute right-0 z-10 bg-white border-2 border-[var(--primary-accent)] text-[var(--primary-accent)] rounded-full w-11 h-11 flex items-center justify-center cursor-pointer transition-all hover:bg-[var(--primary-accent)] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 flex-shrink-0" onClick={nextSlide} disabled={currentSlide === maxSlide}><ChevronRight size={24} /></button>
                        </div>

                        <div className="flex gap-3 justify-center mt-10">
                            {Array.from({ length: maxSlide + 1 }).map((_, i) => (
                                <span key={i} className={`w-2.5 h-2.5 rounded-full border-2 border-[var(--primary-accent)] cursor-pointer transition-all ${i === currentSlide ? 'bg-[var(--primary-accent)] scale-125' : 'bg-transparent'}`} onClick={() => setCurrentSlide(i)}></span>
                            ))}
                        </div>
                    </div>

                    <div className="flex-[0_0_100%] xl:flex-[0_0_40%] h-[400px] xl:h-[650px] w-full mt-5 xl:mt-0 rounded-lg overflow-hidden">
                        <img src={slideShowImg} alt="Business Environment" className="w-full h-full object-cover" />
                    </div>
                </div>
            </AnimatedSection>

            {/* Baker Hughes Careers Pop-out Section */}
            <AnimatedSection className="bg-white py-24 px-5 md:px-10 max-w-7xl mx-auto">
                <div className="mb-14 text-center md:text-left">
                    <span className="text-[#1c7c64] font-semibold text-sm tracking-[2px] block mb-4">— JOIN US</span>
                    <h2 className="text-4xl md:text-5xl text-[#0b4a3a] mb-4 font-bold">Be a part of our story</h2>
                    <p className="text-gray-600 text-lg">Check out our Gateway to learn more about how you can be a part of the platform.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col">
                        <div className="h-[300px] md:h-[400px] w-full overflow-hidden mb-6 relative cursor-pointer rounded shadow-sm hover:shadow-lg transition-shadow" onClick={openModal}>
                            <img src={careerMeeting} alt="Companies" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-2xl text-[#0b4a3a] mb-4 font-semibold">Enterprise Gateway</h4>
                            <p className="text-gray-600 mb-5 leading-relaxed">Looking for top-tier fractional executives and advisors for your next strategic milestone.</p>
                            <button onClick={openModal} className="text-[#1c7c64] font-semibold text-sm tracking-wide inline-flex items-center hover:text-[#0b4a3a] transition-colors group w-fit">JOIN / SIGN IN AS COMPANY <span className="ml-1.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span></button>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="h-[300px] md:h-[400px] w-full overflow-hidden mb-6 relative cursor-pointer rounded shadow-sm hover:shadow-lg transition-shadow" onClick={openModal}>
                            <img src={careerProfessionals} alt="Experts" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-2xl text-[#0b4a3a] mb-4 font-semibold">Expert Gateway</h4>
                            <p className="text-gray-600 mb-5 leading-relaxed">Are you a verified senior professional looking for flexible, high-impact engagements.</p>
                            <button onClick={openModal} className="text-[#1c7c64] font-semibold text-sm tracking-wide inline-flex items-center hover:text-[#0b4a3a] transition-colors group w-fit">JOIN / SIGN IN AS EXPERT <span className="ml-1.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span></button>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            {/* Membership Section */}
            <AnimatedSection className="bg-gray-50 py-24 px-5" id="membership">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl text-gray-800 mb-6 font-bold">Membership Plans</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">Choose the right plan to accelerate your strategic goals with top-tier talent or find your next executive role.</p>
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row gap-6 w-full">
                        <div className="bg-white p-8 rounded-lg shadow-md flex-1 border-t-4 border-transparent hover:-translate-y-2 transition-transform duration-300">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Emerging</h3>
                            <div className="text-3xl font-bold text-[var(--primary-accent)] mb-6">Free<span className="text-sm text-gray-500 font-normal"> / for verified experts</span></div>
                            <ul className="space-y-4 mb-8 text-gray-600">
                                <li className="flex items-start gap-3"><Briefcase size={20} className="text-[var(--primary-accent)] flex-shrink-0" /> Base platform access and profile listing</li>
                                <li className="flex items-start gap-3"><Briefcase size={20} className="text-[var(--primary-accent)] flex-shrink-0" /> Access to fractional role applications</li>
                                <li className="flex items-start gap-3"><Briefcase size={20} className="text-[var(--primary-accent)] flex-shrink-0" /> Community forums and networking</li>
                            </ul>
                            <button onClick={openModal} className="w-full py-3 rounded border border-[var(--primary-accent)] text-[var(--primary-accent)] font-semibold hover:bg-[var(--primary-accent)] hover:text-white transition-colors">Join as Expert</button>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg flex-1 border-t-4 border-[var(--primary-accent)] hover:-translate-y-2 transition-transform duration-300">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Enterprise</h3>
                            <div className="text-3xl font-bold text-[var(--primary-accent)] mb-6">Custom<span className="text-sm text-gray-500 font-normal"> / tailored solutions</span></div>
                            <ul className="space-y-4 mb-8 text-gray-600">
                                <li className="flex items-start gap-3"><Briefcase size={20} className="text-[var(--primary-accent)] flex-shrink-0" /> Direct access to vetted senior leaders</li>
                                <li className="flex items-start gap-3"><Briefcase size={20} className="text-[var(--primary-accent)] flex-shrink-0" /> Managed delivery & project oversight</li>
                                <li className="flex items-start gap-3"><Briefcase size={20} className="text-[var(--primary-accent)] flex-shrink-0" /> Escrow payment & governance</li>
                            </ul>
                            <button onClick={openModal} className="w-full py-3 rounded bg-[var(--primary-accent)] text-white font-semibold hover:bg-[#2d9e90] transition-colors shadow-md">Join as Company</button>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            {/* Contact Us Section */}
            <AnimatedSection className="bg-[#1c1c1c] text-white py-24 px-5 text-center" id="contact-us">
                <h2 className="text-3xl md:text-4xl font-bold tracking-widest mb-10">CONTACT US</h2>
                <div className="text-gray-300 mb-14 leading-relaxed tracking-wider text-sm md:text-base">
                    ADDRESS: Pune, Maharashtra, India<br />
                    TEL: +91-9876543210 | INFO@MYCOMPANY.IN
                </div>

                <div className="max-w-xl mx-auto">
                    <p className="mb-6 text-gray-300">Subscribe For Updates and Promotions</p>
                    <form className="flex flex-col sm:flex-row gap-0" onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }}>
                        <input type="email" required placeholder="Enter your email here *" className="flex-1 px-5 py-3 bg-transparent border border-gray-600 text-white focus:outline-none focus:border-[var(--primary-accent)] rounded-none sm:rounded-l-md" />
                        <button type="submit" className="bg-[var(--primary-accent)] text-white px-8 py-3 font-semibold hover:bg-[#32a898] transition-colors rounded-none sm:rounded-r-md mt-4 sm:mt-0">Get Updates</button>
                    </form>
                </div>
            </AnimatedSection>

            {/* Enhanced Footer */}
            <footer className="bg-black text-white pt-16 pb-6 px-5 border-t border-gray-800">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                    <div className="md:col-span-2">
                        <h2 className="text-3xl font-bold italic mb-4">CXO<span className="text-[var(--primary-accent)]">.</span></h2>
                        <p className="text-gray-400 leading-relaxed pr-10">The premier two-sided marketplace connecting companies with vetted senior professionals. When you need experience, not headcount.</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="text-lg font-semibold mb-2">Explore</h4>
                        <a href="#about-us" className="text-gray-400 hover:text-[var(--primary-accent)] transition-colors" onClick={(e) => { e.preventDefault(); document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' }); }}>About Us</a>
                        <button onClick={openModal} className="text-gray-400 hover:text-[var(--primary-accent)] transition-colors text-left w-fit p-0 bg-transparent border-none">Join as Company / Expert</button>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="text-lg font-semibold mb-2">Legal</h4>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
                
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-800 text-gray-500 text-sm">
                    <div className="flex gap-4 mb-4 md:mb-0 text-white">
                        <Twitter className="cursor-pointer hover:text-[var(--primary-accent)] transition-colors" size={20} />
                        <Facebook className="cursor-pointer hover:text-[var(--primary-accent)] transition-colors" size={20} />
                        <Instagram className="cursor-pointer hover:text-[var(--primary-accent)] transition-colors" size={20} />
                    </div>
                    <span>© {new Date().getFullYear()} by CXOConnect. Built for precision.</span>
                </div>
            </footer>

            {/* Chat Bubble Simulation */}
            <div style={{ position: 'fixed', bottom: '30px', right: '30px', backgroundColor: 'var(--primary-accent)', color: 'white', padding: '15px 25px', borderRadius: '30px', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', cursor: 'pointer', zIndex: 1000 }}>
                CHAT WITH US
            </div>
        </div>
    );
};

export default Home;
