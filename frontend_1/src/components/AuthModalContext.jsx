import React, { createContext, useState, useContext } from 'react';

const AuthModalContext = createContext();

export const useAuthModal = () => useContext(AuthModalContext);

export const AuthModalProvider = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openModal = () => setIsMenuOpen(true);
    const closeModal = () => setIsMenuOpen(false);

    return (
        <AuthModalContext.Provider value={{ isMenuOpen, openModal, closeModal }}>
            {children}
        </AuthModalContext.Provider>
    );
};
