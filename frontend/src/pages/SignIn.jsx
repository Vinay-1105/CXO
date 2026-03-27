import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [error, setError] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const role = queryParams.get('role') || 'company';

    useEffect(() => {
        setCaptcha(generateCaptcha());
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (captchaInput !== captcha) {
            setError('Invalid Captcha. Please try again.');
            setCaptcha(generateCaptcha());
            setCaptchaInput('');
            return;
        }

        // Handle sign in logic here
        alert('Sign In Successful!');
        navigate('/');
    };

    return (
        <div className="form-container signin-container">
            <div className="form-header">
                <h2>Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
                <p>Enter your credentials to access your account.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email Address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </div>

                <div className="form-group captcha-group">
                    <label>Captcha Validation</label>
                    <div className="captcha-display-container">
                        <div className="captcha-display" onCopy={(e) => e.preventDefault()}>
                            {captcha}
                        </div>
                        <button type="button" className="captcha-refresh" onClick={() => setCaptcha(generateCaptcha())}>
                            ↻
                        </button>
                    </div>
                    <input 
                        type="text" 
                        className="form-control" 
                        required 
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        placeholder="Enter the captcha above"
                    />
                </div>

                {error && <span className="error-text">{error}</span>}

                <div style={{ marginTop: '30px' }}>
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                        SIGN IN
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
