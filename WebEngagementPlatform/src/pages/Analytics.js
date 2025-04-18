import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';  // Assuming you have AuthContext to access user data

const Analytics = () => {
  const { user } = useContext(AuthContext);  // Getting the user data from context (company name)
  const [analyticsData, setAnalyticsData] = useState(null);

  const fetchCompanyAnalytics = async (companyName) => {
    try {
      const response = await fetch(`http://localhost:3001/analytics?companyName=${companyName}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`,  // Pass token for authentication if needed
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data);  // Set the analytics data to state
      } else {
        console.error("Failed to fetch analytics data");
      }
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  useEffect(() => {
    if (user && user.companyName) {
      fetchCompanyAnalytics(user.companyName);  // Fetch analytics data using company name
    }
  }, [user]);  // Re-run effect if user or companyName changes

  return (
    <div>
      <h1>Company Analytics</h1>
      {analyticsData ? (
        <div>
          <p>Total Button Clicks: {analyticsData.totalButtonClicks}</p>
          <p>Total Page Scrolls: {analyticsData.totalPageScrolls}</p>
          {/* You can add more data and charts/graphs here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Analytics;
