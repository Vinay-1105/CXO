import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Twitter, Facebook, Instagram, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import corporateHero from '../assets/corporate_hero.png';
import slideShowImg from '../assets/slide-show.webp';
import careerMeeting from '../assets/career_meeting.png';
import careerProfessionals from '../assets/career_professionals.png';

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

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(3);

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
            <section className="hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${corporateHero})` }}>
                <div className="hero-content">
                    <h1>Experience. Not Headcount.</h1>
                    <p>The premier two-sided marketplace connecting companies with verified senior professionals.</p>
                </div>
            </section>

            {/* About Us Vanguard Style */}
            <section className="vanguard-about" id="about-us">
                <div className="vanguard-container">
                    <div className="vanguard-left">
                        <h2>About us</h2>
                        <p>
                            CXOConnect matches companies with senior professionals for fractional leadership, interim roles, advisory, and transformation projects giving startups, SMEs, and enterprises access to vetted CXOs, Directors, and PMOs without full-time hires.                        </p>
                        <p style={{ marginTop: '20px' }}>
                            We solve the expertise gap for companies needing proven leaders for scaling, fundraising, or short-term projects. Professionals gain trusted access to meaningful gigs through AI matching, verified profiles, and PMO governance ensuring smooth delivery                        </p>
                    </div>
                    <div className="vanguard-right">
                        <div className="vanguard-stat-card">
                            <h3 className="vanguard-stat">Vetted Trust</h3>
                            <p>100% verified profiles and CXOConnect delivers vetted senior talent on-demand.</p>
                        </div>
                        <div className="vanguard-stat-card">
                            <h3 className="vanguard-stat">Trust Governance</h3>
                            <p>Fractional leadership for scalable business transformation.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="jpmorgan-slider">
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
            </section>

            {/* Baker Hughes Careers Pop-out Section */}
            <section className="baker-careers">
                <div className="careers-header">
                    <span className="careers-tag">— JOIN US</span>
                    <h2>Be a part of our story</h2>
                    <p>Check out our Gateway to learn more about how you can be a part of the platform.</p>
                </div>

                <div className="careers-grid">
                    <div className="career-card">
                        <motion.div
                            className="career-img-wrapper"
                            onClick={() => navigate('/join-company')}
                            style={{ cursor: 'pointer', overflow: 'hidden' }}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <img src={careerMeeting} alt="Companies" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </motion.div>
                        <div className="career-card-content">
                            <h4>Enterprise Gateway</h4>
                            <p>Looking for top-tier fractional executives and advisors for your next strategic milestone.</p>
                            <a href="#join-company" onClick={(e) => { e.preventDefault(); navigate('/join-company'); }} className="career-link">JOIN / SIGN IN AS COMPANY <span className="arrow">↗</span></a>
                        </div>
                    </div>

                    <div className="career-card">
                        <motion.div
                            className="career-img-wrapper"
                            onClick={() => navigate('/join-expert')}
                            style={{ cursor: 'pointer', overflow: 'hidden' }}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        >
                            <img src={careerProfessionals} alt="Experts" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </motion.div>
                        <div className="career-card-content">
                            <h4>Expert Gateway</h4>
                            <p>Are you a verified senior professional looking for flexible, high-impact engagements.</p>
                            <a href="#join-expert" onClick={(e) => { e.preventDefault(); navigate('/join-expert'); }} className="career-link">JOIN / SIGN IN AS EXPERT <span className="arrow">↗</span></a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Membership Section */}
            <section className="membership-section" id="membership">
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
                            <a href="/join-expert" className="membership-btn">Join as Expert</a>
                        </div>
                        <div className="membership-card" style={{ borderTop: '4px solid var(--primary-accent)' }}>
                            <h3>Enterprise</h3>
                            <div className="price">Custom<span> / tailored solutions</span></div>
                            <ul className="membership-features">
                                <li><Briefcase size={20} /> Direct access to vetted senior leaders</li>
                                <li><Briefcase size={20} /> Managed delivery & project oversight</li>
                                <li><Briefcase size={20} /> Escrow payment & governance</li>
                            </ul>
                            <a href="/join-company" className="membership-btn" style={{ background: 'var(--primary-accent)', color: '#fff' }}>Join as Company</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Us Section */}
            <section className="contact-section" id="contact-us">
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
            </section>

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
                        <a href="/join-company">Join as Company</a>
                        <a href="/join-expert">Join as Expert</a>
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
