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

            <AnimatedSection className="jpmorgan-slider">
                <div className="slider-layout">
                    <div className="slider-left-content">
                        <h2 className="slider-title">What problem can we <span>solve together?</span></h2>

                        <div className="slider-wrapper">
                            <button className="slider-btn prev-btn" onClick={prevSlide} disabled={currentSlide === 0}><ChevronLeft size={24} /></button>

                            <div className="slider-card-container-wrapper">
                                <div className="slider-card-container" style={{ '--current-slide': currentSlide, '--cards-per-view': cardsPerView }}>
                                    {slides.map((slide, idx) => (
                                        <div className="slider-card" key={idx}>
                                            <div className="slider-card-inner">
                                                <div className="card-icon"><Briefcase size={32} /></div>
                                                <h3>{slide.title}</h3>
                                                <p>{slide.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className="slider-btn next-btn" onClick={nextSlide} disabled={currentSlide === maxSlide}><ChevronRight size={24} /></button>
                        </div>

                        <div className="slider-dots">
                            {Array.from({ length: maxSlide + 1 }).map((_, i) => (
                                <span key={i} className={`dot ${i === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(i)}></span>
                            ))}
                        </div>
                    </div>

                    <div className="slider-right-bg">
                        <img src={slideShowImg} alt="Business Environment" />
                    </div>
                </div>
            </AnimatedSection>

            {/* Baker Hughes Careers Pop-out Section */}
            <AnimatedSection className="baker-careers">
                <div className="careers-header">
                    <span className="careers-tag">— JOIN US</span>
                    <h2>Be a part of our story</h2>
                    <p>Check out our Gateway to learn more about how you can be a part of the platform.</p>
                </div>

                <div className="careers-grid">
                    <div className="career-card">
                        <div className="career-img-wrapper" onClick={openModal} style={{ cursor: 'pointer' }}>
                            <img src={careerMeeting} alt="Companies" className="gateway-image" />
                        </div>
                        <div className="career-card-content">
                            <h4>Enterprise Gateway</h4>
                            <p>Looking for top-tier fractional executives and advisors for your next strategic milestone.</p>
                            <button onClick={openModal} className="career-link" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>JOIN / SIGN IN AS COMPANY <span className="arrow">↗</span></button>
                        </div>
                    </div>

                    <div className="career-card">
                        <div className="career-img-wrapper" onClick={openModal} style={{ cursor: 'pointer' }}>
                            <img src={careerProfessionals} alt="Experts" className="gateway-image" />
                        </div>
                        <div className="career-card-content">
                            <h4>Expert Gateway</h4>
                            <p>Are you a verified senior professional looking for flexible, high-impact engagements.</p>
                            <button onClick={openModal} className="career-link" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>JOIN / SIGN IN AS EXPERT <span className="arrow">↗</span></button>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            {/* Membership Section */}
            <AnimatedSection className="membership-section" id="membership">
                <div className="membership-container">
                    <div className="membership-header">
                        <h2>Membership Plans</h2>
                        <p>Choose the right plan to accelerate your strategic goals with top-tier talent or find your next executive role.</p>
                    </div>
                    <div className="membership-cards">
                        <div className="membership-card">
                            <h3>Emerging</h3>
                            <div className="price">Free<span> / for verified experts</span></div>
                            <ul className="membership-features">
                                <li><Briefcase size={20} /> Base platform access and profile listing</li>
                                <li><Briefcase size={20} /> Access to fractional role applications</li>
                                <li><Briefcase size={20} /> Community forums and networking</li>
                            </ul>
                            <button onClick={openModal} className="membership-btn" style={{ background: 'transparent', border: '1px solid var(--primary-accent)', color: 'var(--primary-accent)', cursor: 'pointer', fontFamily: 'inherit' }}>Join as Expert</button>
                        </div>
                        <div className="membership-card" style={{ borderTop: '4px solid var(--primary-accent)' }}>
                            <h3>Enterprise</h3>
                            <div className="price">Custom<span> / tailored solutions</span></div>
                            <ul className="membership-features">
                                <li><Briefcase size={20} /> Direct access to vetted senior leaders</li>
                                <li><Briefcase size={20} /> Managed delivery & project oversight</li>
                                <li><Briefcase size={20} /> Escrow payment & governance</li>
                            </ul>
                            <button onClick={openModal} className="membership-btn" style={{ background: 'var(--primary-accent)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Join as Company</button>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            {/* Contact Us Section */}
            <AnimatedSection className="contact-section" id="contact-us">
                <h2>CONTACT US</h2>
                <div className="contact-details">
                    ADDRESS: Pune, Maharashtra, India<br />
                    TEL: +91-9876543210 | INFO@MYCOMPANY.IN
                </div>

                <div className="subscribe-form">
                    <p>Subscribe For Updates and Promotions</p>
                    <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }}>
                        <input type="email" required placeholder="Enter your email here *" className="subscribe-input" />
                        <button type="submit" className="subscribe-btn">Get Updates</button>
                    </form>
                </div>
            </AnimatedSection>

            {/* Enhanced Footer */}
            <footer className="site-footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h2 className="nav-brand" style={{ color: 'white', textDecoration: 'none', fontStyle: 'italic' }}>CXO<span style={{ color: 'var(--primary-accent)' }}>.</span></h2>
                        <p>The premier two-sided marketplace connecting companies with vetted senior professionals. When you need experience, not headcount.</p>
                    </div>
                    <div className="footer-links">
                        <h4>Explore</h4>
                        <a href="#about-us" onClick={(e) => { e.preventDefault(); document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' }); }}>About Us</a>
                        <button onClick={openModal} style={{ background: 'none', border: 'none', padding: 0, color: '#aaa', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', fontSize: '0.9rem', marginBottom: '12px' }}>Join as Company / Expert</button>
                    </div>
                    <div className="footer-legal">
                        <h4>Legal</h4>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookie Policy</a>
                    </div>
                    <div className="footer-social">
                        <h4>Follow Us</h4>
                        <div className="social-icons">
                            <Twitter />
                            <Facebook />
                            <Instagram />
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
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
