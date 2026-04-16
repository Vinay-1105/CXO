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
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50" onClick={closeModal}>
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl relative flex flex-col md:flex-row" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={closeModal}>
                    <X size={24} />
                </button>
                <div className="flex-1 flex flex-col items-start gap-4 pr-6 border-r border-gray-200">
                    <h3 className="text-lg font-semibold">First time to this website?</h3>
                    <p className="text-gray-600">Create a new account to get started.</p>
                    <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded transition" onClick={() => handleNavigation('/join-company')}>
                        Join as a company
                    </button>
                    <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded transition" onClick={() => handleNavigation('/join-expert')}>
                        Join as an expert
                    </button>
                </div>
                <div className="w-0.5 bg-gray-200 mx-6 hidden md:block" />
                <div className="flex-1 flex flex-col items-start gap-4 pl-6">
                    <h3 className="text-lg font-semibold">Already a member?</h3>
                    <p className="text-gray-600">Welcome back! Please log in.</p>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded transition" onClick={() => handleNavigation('/signin?role=company')}>
                        Already a company
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded transition" onClick={() => handleNavigation('/signin?role=expert')}>
                        Already an expert
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
