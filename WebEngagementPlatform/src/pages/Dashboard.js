import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import AnalyticsDashboard from './AnalyticsDashboard';
import { AuthContext } from '../context/AuthContext';
import NavBar from '../components/navbar';

const Dashboard = ({ analyticsData, setAnalyticsData }) => {
    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);

    useEffect(() => {
        if (loading) return; // Wait for AuthContext to finish loading
        if (!user) {
            navigate('/login');
            return;
        }
        const fetchAnalytics = async () => {
            try {
                const res = await fetch(`http://localhost:3001/analytics?userId=${user.companyname}`);
                if (res.ok) {
                    const data = await res.json();
                    setAnalyticsData(data);
                } else {
                    setAnalyticsData([]);
                }
            } catch (err) {
                setAnalyticsData([]);
            }
        };
        fetchAnalytics();
        const interval = setInterval(fetchAnalytics, 10000);
        return () => clearInterval(interval);
    }, [navigate, setAnalyticsData, user, loading]);

    const handleLogout = () => {
        // Clear session data
        localStorage.removeItem('authToken');
        localStorage.clear();
        // Redirect to login
        navigate('/login');
    };

    return (
        <div style={styles.dashboardContainer}>
            <NavBar />
            <main className="bg-white" style={styles.mainContent}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* Pass analyticsData as prop to AnalyticsDashboard */}
                    <Route path="/analytics-dashboard" element={<AnalyticsDashboard analyticsData={analyticsData} />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </main>
        </div>
    );
};

const Home = () => {
    return (
        <>
            <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                margin: "1.5rem 0",
                marginTop: "10rem",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
                border: "1px solid #cbd5e1",
                borderRadius: "0.5rem",
                width: "24rem",
                padding: "1.5rem"
            }} >
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1rem"
                }}>

                    <h5 style={{
                        marginLeft: "0.75rem",
                        color: "#1e293b",
                        fontSize: "1.25rem",
                        fontWeight: 600
                    } }>
                        Download the SDK
                    </h5>
                </div>
                <p style={{
                    color: "#64748b",
                    lineHeight: 1.5,
                    fontWeight: 300,
                    marginBottom: "1rem"
                }}>
                    Download the SDK and Explore more of our Services.
                </p>
                <div>
                    <a  style={{
                        color: "#1e293b",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer"
                    }}
                    target='_blank'
                    href="https://drive.google.com/drive/folders/1Z8ehGYdMnm-lXvOcfLJQv5lYLn83M8xp?usp=sharing" 
                    >
                        Download
                        <svg xmlns="http://www.w3.org/2000/svg" style={{
                            marginLeft: "0.5rem",
                            height: "1rem",
                            width: "1rem"
                        }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>
            </div>

            <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                margin: "1.5rem 0",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
                border: "1px solid #cbd5e1",
                borderRadius: "0.5rem",
                width: "24rem",
                padding: "1.5rem"
            }} >
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1rem"
                }}>

                    <h5 style={{
                        marginLeft: "0.75rem",
                        color: "#1e293b",
                        fontSize: "1.25rem",
                        fontWeight: 600
                    }}>
                        Start Email Campaign
                    </h5>
                </div>
                <p style={{
                    color: "#64748b",
                    lineHeight: 1.5,
                    fontWeight: 300,
                    marginBottom: "1rem"
                }}>
                    Email Campaign lets you to send emails to your users with customizable draft
                </p>
                <div>
                    <a href="#" style={{
                        color: "#1e293b",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer"
                    }}>
                        <Link to="/email-upload">Email Campaign</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{
                            marginLeft: "0.5rem",
                            height: "1rem",
                            width: "1rem"
                        }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>
            </div>

            <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                margin: "1.5rem 0",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
                border: "1px solid #cbd5e1",
                borderRadius: "0.5rem",
                width: "24rem",
                padding: "1.5rem"
            }} >
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1rem"
                }}>

                    <h5 style={{
                        marginLeft: "0.75rem",
                        color: "#1e293b",
                        fontSize: "1.25rem",
                        fontWeight: 600
                    }}>
                        Analytics Dashboard
                    </h5>
                </div>
                <p style={{
                    color: "#64748b",
                    lineHeight: 1.5,
                    fontWeight: 300,
                    marginBottom: "1rem"
                }}>
                    Analytics dashboard give you the graphical data which makes the analysis easier
                </p>
                <div>
                    <a style={{
                        color: "#1e293b",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer"
                    }}>
                        <Link to="/analytics-dashboard">Go to Analytics</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{
                            marginLeft: "0.5rem",
                            height: "1rem",
                            width: "1rem"
                        }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </>
    )
};
const Settings = () => <h2>Settings Page - Customize your preferences here.</h2>;

const styles = {
    dashboardContainer: {
        fontFamily: 'Arial, sans-serif',
        color: '#333',
    },
    mainContent: {
        padding: '20px',
    },
};

export default Dashboard;