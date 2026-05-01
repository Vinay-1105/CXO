import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuthModal } from './AuthModalContext';

const smoothScrollTo = (targetPosition, duration) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // easeInOutQuad
    const ease = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        } else {
            window.scrollTo(0, targetPosition);
        }
    };

    requestAnimationFrame(animation);
};

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { openModal } = useAuthModal();

    if (location.pathname === '/company-dashboard') {
        return null;
    }

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
        <nav className={`bg-gray-900 bg-opacity-75 backdrop-blur-md text-white flex justify-between items-center px-16 sticky top-0 z-50 h-20 w-full max-w-full overflow-hidden border-b border-white/10 transition-all duration-300 ${isOpen ? 'h-[380px] flex-col items-start' : ''}`}> 
            <div className="flex justify-between items-center w-auto h-20">
                <Link to="/" className="font-serif text-3xl italic font-bold cursor-pointer text-white no-underline" onClick={() => setIsOpen(false)}>
                    CXO<span className="text-teal-400">.</span>
                </Link>
                <button className="block md:hidden bg-transparent border-none text-white cursor-pointer ml-4" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>
            <div className={`hidden md:flex gap-10 items-center ${isOpen ? 'flex flex-col items-start w-full gap-6 mt-4 pb-8' : ''}`}> 
                <Link to="/" onClick={() => setIsOpen(false)} className={`text-gray-200 no-underline text-base font-normal tracking-wide transition-colors duration-300 relative cursor-pointer ${location.pathname === '/' ? 'text-teal-400' : ''}`}>Home</Link>
                <a href="#membership" onClick={(e) => handleScrollTarget(e, 'membership')} className="text-gray-200 no-underline text-base font-normal tracking-wide transition-colors duration-300 relative cursor-pointer">Membership</a>
                <a href="#about-us" onClick={(e) => handleScrollTarget(e, 'about-us')} className="text-gray-200 no-underline text-base font-normal tracking-wide transition-colors duration-300 relative cursor-pointer">About Us</a>
                <a href="#contact-us" onClick={(e) => handleScrollTarget(e, 'contact-us')} className="text-gray-200 no-underline text-base font-normal tracking-wide transition-colors duration-300 relative cursor-pointer">Contact</a>
                <button className="ml-4 px-6 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-semibold transition-colors duration-300" onClick={() => { setIsOpen(false); openModal(); }}>Join / Sign In</button>
            </div>
        </nav>
    );
};

export default Navbar;
