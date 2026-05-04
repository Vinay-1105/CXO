import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';

const SuccessModal = ({ isOpen, role }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const title = role === 'company' 
        ? "Application Submitted! 🎉" 
        : "Welcome to CXOConnect! 🎉";
        
    const message = role === 'company'
        ? "Your company application has been successfully submitted. You can now sign in to access your dashboard."
        : "Your expert application has been successfully submitted. Sign in to start exploring opportunities.";

    const signinPath = `/signin?role=${role}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300">
            <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 max-w-md w-full animate-in zoom-in-95 duration-500">
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <CheckCircle className="w-8 h-8 text-teal-500" />
                    </div>
                    
                    <h3 className="text-2xl font-extrabold text-gray-800 mb-2">
                        {title}
                    </h3>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {message}
                    </p>
                    
                    <div className="flex flex-col gap-3 w-full">
                        <button 
                            onClick={() => navigate(signinPath)}
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Sign in as {role === 'company' ? 'Company' : 'Expert'}
                            <ArrowRight size={18} />
                        </button>
                        
                        <button 
                            onClick={() => navigate('/')}
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-200 transition-all hover:shadow-sm"
                        >
                            <Home size={18} />
                            Take me to Home Page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
