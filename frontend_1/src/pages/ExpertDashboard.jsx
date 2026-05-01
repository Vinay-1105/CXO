import React, { useState } from 'react';
import { Search, Home, Briefcase, LayoutDashboard, CreditCard, Bell, Settings, LogOut, ChevronDown, ChevronRight, Edit3, MessageSquare, Star } from 'lucide-react';

const ExpertDashboard = () => {
    const [activeSection, setActiveSection] = useState('My Projects');
    const [expandedSidebar, setExpandedSidebar] = useState({
        findWork: false,
        myProjects: true,
        payments: false,
        profile: false
    });

    const toggleSidebar = (section) => {
        setExpandedSidebar(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleSelectOption = (option) => {
        setActiveSection(option);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Top Navigation */}
            <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 text-white shadow sticky top-0 z-50">
                <div className="text-2xl font-serif italic font-bold">CXO<span className="text-teal-400">.</span></div>
                <div className="flex items-center gap-4">
                    <input type="text" placeholder="Search opportunities..." className="px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none" />
                    <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded font-semibold">I am a Company</button>
                </div>
            </nav>
            
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-72 bg-gray-800 text-white flex flex-col p-6 gap-6 min-h-full">
                    {/* Section 1: Find Work */}
                    <div className="sidebar-section">
                        <div className="section-title cursor-pointer flex justify-between items-center font-semibold text-gray-300 hover:text-white transition-colors" onClick={() => toggleSidebar('findWork')}>
                            <div className="title-left flex items-center gap-2"><Search size={18} /> Find Work</div>
                            {expandedSidebar.findWork ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </div>
                        {expandedSidebar.findWork && (
                            <ul className="section-options mt-2 pl-6 space-y-2 text-sm text-gray-400">
                                <li className="cursor-pointer hover:text-teal-400" onClick={() => handleSelectOption('Recommended Roles')}>Recommended Roles</li>
                                <li className="cursor-pointer hover:text-teal-400" onClick={() => handleSelectOption('Saved Jobs')}>Saved Jobs</li>
                                <li className="cursor-pointer hover:text-teal-400" onClick={() => handleSelectOption('Proposals')}>My Proposals</li>
                            </ul>
                        )}
                    </div>

                    {/* Section 2: My Projects */}
                    <div className="sidebar-section">
                        <div className="section-title cursor-pointer flex justify-between items-center font-semibold text-gray-300 hover:text-white transition-colors" onClick={() => toggleSidebar('myProjects')}>
                            <div className="title-left flex items-center gap-2"><Briefcase size={18} /> My Projects</div>
                            {expandedSidebar.myProjects ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </div>
                        {expandedSidebar.myProjects && (
                            <ul className="section-options mt-2 pl-6 space-y-2 text-sm text-gray-400">
                                <li className={`cursor-pointer hover:text-teal-400 ${activeSection === 'My Projects' ? 'text-teal-400 font-semibold' : ''}`} onClick={() => handleSelectOption('My Projects')}>Active Projects</li>
                                <li className={`cursor-pointer hover:text-teal-400 ${activeSection === 'Completed Projects' ? 'text-teal-400 font-semibold' : ''}`} onClick={() => handleSelectOption('Completed Projects')}>Completed</li>
                            </ul>
                        )}
                    </div>

                    {/* Section 3: Payments */}
                    <div className="sidebar-section">
                        <div className="section-title cursor-pointer flex justify-between items-center font-semibold text-gray-300 hover:text-white transition-colors" onClick={() => toggleSidebar('payments')}>
                            <div className="title-left flex items-center gap-2"><CreditCard size={18} /> Earnings</div>
                            {expandedSidebar.payments ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </div>
                        {expandedSidebar.payments && (
                            <ul className="section-options mt-2 pl-6 space-y-2 text-sm text-gray-400">
                                <li className="cursor-pointer hover:text-teal-400" onClick={() => handleSelectOption('Overview')}>Overview</li>
                                <li className="cursor-pointer hover:text-teal-400" onClick={() => handleSelectOption('Withdrawals')}>Withdrawals</li>
                                <li className="cursor-pointer hover:text-teal-400" onClick={() => handleSelectOption('Invoices')}>Invoices</li>
                            </ul>
                        )}
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 p-8">
                    <header className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">{activeSection}</h2>
                        <p className="text-gray-500">Welcome to your expert dashboard.</p>
                    </header>

                    {activeSection === 'My Projects' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="font-bold text-lg text-gray-800 mb-2">Technical Due Diligence</h3>
                                <p className="text-sm text-gray-600 mb-4">Client: StartupX Inc.</p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                    <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>In Progress</span>
                                    <span>Due in 3 days</span>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {activeSection !== 'My Projects' && (
                        <div className="bg-white p-10 rounded-lg shadow-sm border border-gray-200 text-center">
                            <p className="text-gray-500">Nothing to show here yet.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ExpertDashboard;
