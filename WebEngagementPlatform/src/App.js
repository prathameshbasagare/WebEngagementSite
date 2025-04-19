import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedAuthRoute from './components/ProtectedAuthRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import './output.css';
import Dashboard from './pages/Dashboard';
import EmailUploader from './pages/EmailUploader';

const App = () => {
  const [analyticsData, setAnalyticsData] = useState([]); 

  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/email-upload" element={<EmailUploader/>}/>
          
          {/* Protected auth routes - redirect to dashboard if logged in */}
          <Route 
            path="/login" 
            element={
              <ProtectedAuthRoute>
                <Login setAnalyticsData={setAnalyticsData} />
              </ProtectedAuthRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <ProtectedAuthRoute>
                <Register />
              </ProtectedAuthRoute>
            } 
          />

          <Route 
            path="/dashboard/*" 
            element={
              <Dashboard 
                analyticsData={analyticsData} 
                setAnalyticsData={setAnalyticsData} 
              />
            } 
          />
          <Route 
            path="/analytics-dashboard" 
            element={
              <AnalyticsDashboard analyticsData={analyticsData} />
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
