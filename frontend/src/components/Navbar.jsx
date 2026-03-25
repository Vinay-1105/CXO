import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleScrollTarget = (e, targetId) => {
        e.preventDefault();
        setIsOpen(false);
        if (location.pathname === '/') {
            const section = document.getElementById(targetId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Navigate to home with the target hash so the effect can pick it up
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
                <Link to="/" onClick={() => setIsOpen(false)} className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>Home</Link>
                <Link to="/join-company" onClick={() => setIsOpen(false)} className={location.pathname === '/join-company' ? 'nav-link active' : 'nav-link'}>Company</Link>
                <Link to="/join-expert" onClick={() => setIsOpen(false)} className={location.pathname === '/join-expert' ? 'nav-link active' : 'nav-link'}>Expert</Link>
                <a href="#membership" onClick={(e) => handleScrollTarget(e, 'membership')} className="nav-link">Membership</a>
                <a href="#about-us" onClick={(e) => handleScrollTarget(e, 'about-us')} className="nav-link">About Us</a>
                <a href="#contact-us" onClick={(e) => handleScrollTarget(e, 'contact-us')} className="nav-link">Contact</a>
            </div>
        </nav>
    );
};

export default Navbar;
