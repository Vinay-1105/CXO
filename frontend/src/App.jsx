// Tailwind test block (uncomment to test, comment out the rest of the file)
// export default function App() {
//   return <div className="bg-blue-500 text-white p-10 text-3xl">Tailwind is working!</div>;
// }

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import JoinCompany from './pages/JoinCompany';
import JoinExpert from './pages/JoinExpert';
import SignIn from './pages/SignIn';
import CompanyDashboard from './pages/CompanyDashboard';
import { AuthModalProvider } from './components/AuthModalContext';
import AuthModal from './components/AuthModal';

function App() {
    return (
        <Router>
            <AuthModalProvider>
                <div className="app-container">
                    <Navbar />
                    <AuthModal />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/join-company" element={<JoinCompany />} />
                            <Route path="/join-expert" element={<JoinExpert />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/company-dashboard" element={<CompanyDashboard />} />
                        </Routes>
                    </main>
                </div>
            </AuthModalProvider>
        </Router>
    );
}

export default App;
