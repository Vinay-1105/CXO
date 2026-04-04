import React, { useState } from 'react';
import { Search, Home, Users, Briefcase, LayoutDashboard, CreditCard, Bell, Settings, LogOut, ChevronDown, ChevronRight, Edit3 } from 'lucide-react';
import './CompanyDashboard.css';

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
        <div className="dashboard-container">
            {/* Top Navigation */}
            <nav className="dash-top-nav">
                <div className="dash-logo">CXO<span>.</span></div>
                <div className="dash-search">
                    <Search className="search-icon" size={18} />
                    <input type="text" placeholder="Search experts, roles, or content..." />
                </div>
                <div className="dash-nav-right">
                    <button className="expert-btn">I am an Expert</button>
                </div>
            </nav>

            <div className="dash-body">
                {/* Sidebar */}
                <aside className="dash-sidebar">
                    <div className="sidebar-menu">
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
                    </div>

                    <div className="sidebar-bottom">
                        <div className="bottom-item" onClick={() => setShowNotifications(!showNotifications)}>
                            <Bell size={20} /> 
                            <span>Notifications</span>
                            <div className="badge">3</div>
                            {showNotifications && (
                                <div className="notifications-popup">
                                    <h4>Notifications</h4>
                                    <ul>
                                        <li>John Doe applied for lead engineer.</li>
                                        <li>Invoice #1029 paid successfully.</li>
                                        <li>New expert matching your needs joined.</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="bottom-item" onClick={() => handleSelectOption('Settings')}>
                            <Settings size={20} />
                            <span>Settings</span>
                        </div>
                        <div className="bottom-item" onClick={() => setShowProfilePopup(!showProfilePopup)} style={{ marginTop: 'auto', paddingTop: '10px' }}>
                            <div className="dash-profile-icon">
                                <img src="https://ui-avatars.com/api/?name=Company+Inc&background=2C2C2C&color=fff" alt="Profile" />
                            </div>
                            <span>Profile</span>

                            {showProfilePopup && (
                                <div className="profile-popup" style={{ top: 'auto', bottom: '60px', left: '10px' }}>
                                    <div className="profile-header">
                                        <img src="https://ui-avatars.com/api/?name=Company+Inc&background=2C2C2C&color=fff" alt="Profile" />
                                        <div className="profile-info">
                                            <h4>Company Inc</h4>
                                            <p>admin@company.com</p>
                                        </div>
                                    </div>
                                    <div className="profile-score">
                                        <span className="score-label">Reputation Score</span>
                                        <span className="score-value">98 / 100</span>
                                    </div>
                                    <div className="profile-actions">
                                        <button className="action-btn"><Edit3 size={16} /> Edit Profile</button>
                                        <button className="action-btn logout"><LogOut size={16} /> Logout</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="dash-main-content">
                    <header className="content-header">
                        <h2>{activeSection}</h2>
                        <p>Welcome back, Company Inc.</p>
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
