import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import JoinCompany from './pages/JoinCompany';
import JoinExpert from './pages/JoinExpert';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/join-company" element={<JoinCompany />} />
                        <Route path="/join-expert" element={<JoinExpert />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
