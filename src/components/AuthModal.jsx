import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthModal } from './AuthModalContext';
import { X } from 'lucide-react';

const AuthModal = () => {
    const { isMenuOpen, closeModal } = useAuthModal();
    const navigate = useNavigate();

    if (!isMenuOpen) return null;

    const handleNavigation = (path) => {
        closeModal();
        navigate(path);
    };

    return (
        <div className="auth-modal-overlay" onClick={closeModal}>
            <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="auth-modal-close" onClick={closeModal}>
                    <X size={24} />
                </button>
                <div className="auth-modal-grid">
                    <div className="auth-modal-col left-col">
                        <h3>First time to this website?</h3>
                        <p>Create a new account to get started.</p>
                        <button className="modal-btn new-btn" onClick={() => handleNavigation('/join-company')}>
                            Join as a company
                        </button>
                        <button className="modal-btn new-btn" onClick={() => handleNavigation('/join-expert')}>
                            Join as an expert
                        </button>
                    </div>
                    
                    <div className="auth-modal-divider"></div>

                    <div className="auth-modal-col right-col">
                        <h3>Already a member?</h3>
                        <p>Welcome back! Please log in.</p>
                        <button className="modal-btn login-btn" onClick={() => handleNavigation('/signin?role=company')}>
                            Already a company
                        </button>
                        <button className="modal-btn login-btn" onClick={() => handleNavigation('/signin?role=expert')}>
                            Already an expert
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
