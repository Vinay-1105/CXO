import React, { useState } from 'react';
import { Search, Home, Users, Briefcase, LayoutDashboard, CreditCard, Bell, Settings, LogOut, ChevronDown, ChevronRight, Edit3 } from 'lucide-react';

const CompanyDashboard = () => {
    const [activeSection, setActiveSection] = useState('Active Projects');
    const [expandedSidebar, setExpandedSidebar] = useState({
        searchExperts: false,
        postRole: false,
        dashboard: true,
        payments: false
    });
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

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
                    <input type="text" placeholder="Search experts, roles, or content..." className="px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none" />
                    <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded font-semibold">I am an Expert</button>
                </div>
            </nav>
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-72 bg-gray-800 text-white flex flex-col p-6 gap-6 min-h-full">
                    {/* Section 1: Search Experts */}
                    <div className="sidebar-section">
                        <div className="section-title" onClick={() => toggleSidebar('searchExperts')}>
                            <div className="title-left"><Users size={18} /> Search Experts</div>
                            {expandedSidebar.searchExperts ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </div>
                        {expandedSidebar.searchExperts && (
                            <ul className="section-options">
                                <li onClick={() => handleSelectOption('Home')}>Home</li>
                                <li onClick={() => handleSelectOption('Recommended Experts')}>Recommended Experts</li>
                                <li onClick={() => handleSelectOption('Previous Experts')}>Previous Experts</li>
                                <li onClick={() => handleSelectOption('Filter Experts')}>Filter Experts</li>
                            </ul>
                        )}
                    </div>

                    {/* Section 2: Post Role */}
                    <div className="sidebar-section">
                        <div className="section-title" onClick={() => toggleSidebar('postRole')}>
                            <div className="title-left"><Briefcase size={18} /> Post Role</div>
                            {expandedSidebar.postRole ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </div>
                        {expandedSidebar.postRole && (
                            <ul className="section-options">
                                <li onClick={() => handleSelectOption('Add New Role')}>Add New Role</li>
                                <li onClick={() => handleSelectOption('Previous Roles')}>Previous Roles</li>
                                <li onClick={() => handleSelectOption('Current Roles')}>Current Roles</li>
                            </ul>
                        )}
                    </div>

                    {/* Section 3: Dashboard */}
                    <div className="sidebar-section">
                        <div className="section-title" onClick={() => toggleSidebar('dashboard')}>
                            <div className="title-left"><LayoutDashboard size={18} /> Dashboard</div>
                            {expandedSidebar.dashboard ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </div>
                        {expandedSidebar.dashboard && (
                            <ul className="section-options">
                                <li className={activeSection === 'Pending Actions' ? 'active' : ''} onClick={() => handleSelectOption('Pending Actions')}>Pending Actions</li>
                                <li className={activeSection === 'Active Projects' ? 'active' : ''} onClick={() => handleSelectOption('Active Projects')}>Active Projects</li>
                            </ul>
                        )}
                    </div>

                    {/* Section 4: Payments */}
                    <div className="sidebar-section">
                        <div className="section-title" onClick={() => toggleSidebar('payments')}>
                            <div className="title-left"><CreditCard size={18} /> Payments</div>
                            {expandedSidebar.payments ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </div>
                        {expandedSidebar.payments && (
                            <ul className="section-options">
                                <li onClick={() => handleSelectOption('Payment History')}>Payment History</li>
                                <li onClick={() => handleSelectOption('Pending Payments')}>Pending Payments</li>
                                <li onClick={() => handleSelectOption('Active Contracts')}>Active Contracts</li>
                                <li onClick={() => handleSelectOption('Invoice Management')}>Invoice Management</li>
                            </ul>
                        )}
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 p-8">
                    <header className="mb-8">
                        <h2 className="text-2xl font-bold">{activeSection}</h2>
                        <p className="text-gray-600">Welcome back, Company Inc.</p>
                    </header>

                    {activeSection === 'Active Projects' && (
                        <div className="projects-grid">
                            <div className="project-card">
                                <h3>Website Redesign</h3>
                                <p className="expert-assigned">Expert: Jane Smith</p>
                                <div className="progress-bar-container">
                                    <div className="progress-bar" style={{ width: '70%' }}></div>
                                </div>
                                <div className="project-footer">
                                    <span className="status">In Progress</span>
                                    <span className="timeline">Due in 2 weeks</span>
                                </div>
                            </div>

                            <div className="project-card">
                                <h3>Cloud Migration</h3>
                                <p className="expert-assigned">Expert: Alex Dev</p>
                                <div className="progress-bar-container">
                                    <div className="progress-bar" style={{ width: '40%' }}></div>
                                </div>
                                <div className="project-footer">
                                    <span className="status">In Progress</span>
                                    <span className="timeline">Due in 1 month</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'Settings' && (
                        <div className="settings-section">
                            <div className="setting-card">Company Profile Settings</div>
                            <div className="setting-card">Security & Authentication</div>
                            <div className="setting-card">Email Preferences</div>
                            <div className="setting-card">Notification Preferences</div>
                            <div className="setting-card">Billing Settings</div>
                        </div>
                    )}
                    
                    {activeSection === 'Pending Actions' && (
                        <div className="empty-state">
                            <p>No pending actions right now.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default CompanyDashboard;
