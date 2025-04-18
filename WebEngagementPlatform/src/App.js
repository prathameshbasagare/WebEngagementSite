import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import './output.css';
import Dashboard from './pages/Dashboard';
import EmailUploader from './pages/EmailUploader';

const App = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/email-upload" element={<EmailUploader/>}/>
          
          {/* Login page where user will input credentials */}
          <Route path="/login" element={<Login setAnalyticsData={setAnalyticsData} />} />

          {/* Register page */}
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Conditionally render AnalyticsDashboard if analyticsData exists */}
          
            <Route path="/analytics-dashboard" element={<AnalyticsDashboard analyticsData={analyticsData} />} />
          
          
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
