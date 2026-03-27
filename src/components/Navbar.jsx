import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuthModal } from './AuthModalContext';

const smoothScrollTo = (targetPosition, duration) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const ease = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    };

    const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
};

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { openModal } = useAuthModal();

    const handleScrollTarget = (e, targetId) => {
        e.preventDefault();
        setIsOpen(false);
        if (location.pathname === '/') {
            const section = document.getElementById(targetId);
            if (section) {
                // Determine absolute position of section and account for navbar height
                const targetPosition = section.getBoundingClientRect().top + window.scrollY - 80; // 80 is navbar height
                smoothScrollTo(targetPosition, 1200); // 1200ms duration for slower, smoother aesthetic
            }
        } else {
            navigate(`/#${targetId}`);
        }
    };

    return (
        <nav className={`navbar ${isOpen ? 'menu-open' : ''}`}>
            <div className="nav-header">
                <Link to="/" className="nav-brand" onClick={() => setIsOpen(false)}>
                    CXO<span>.</span>
                </Link>
                <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                <Link to="/" onClick={() => setIsOpen(false)} className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>
                    <span className="hover-effect">Home</span>
                </Link>
                
                <a href="#membership" onClick={(e) => handleScrollTarget(e, 'membership')} className="nav-link">
                    <span className="hover-effect">Membership</span>
                </a>
                
                <a href="#about-us" onClick={(e) => handleScrollTarget(e, 'about-us')} className="nav-link">
                    <span className="hover-effect">About Us</span>
                </a>
                
                <a href="#contact-us" onClick={(e) => handleScrollTarget(e, 'contact-us')} className="nav-link">
                    <span className="hover-effect">Contact</span>
                </a>

                <button className="nav-join-btn" onClick={() => { setIsOpen(false); openModal(); }}>
                    Join / Sign In
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
