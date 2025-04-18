import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Line, Bar, Pie } from "react-chartjs-2";
import randomColor from "randomcolor";
import {Link} from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    // Retrieve analytics data from localStorage
    const storedData = localStorage.getItem("analyticsData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setAnalyticsData(parsedData);
    } else {
      // If no data, populate with mock data and save to localStorage
      const mockData = [
        { timestamp: Date.now(), counter: 10, actionType: "click" },
        { timestamp: Date.now() + 1000, counter: 15, actionType: "view" },
        { timestamp: Date.now() + 2000, counter: 5, actionType: "submit" },
      ];
      localStorage.setItem("analyticsData", JSON.stringify(mockData));
      setAnalyticsData(mockData);
    }
  }, [navigate]);

  if (!analyticsData || analyticsData.length === 0) {
    return (
      <div className="flex justify-center items-center bg-green-500 ">
        <p className="text-4xl">No data to show</p>
      </div>
    );
  }

  const labels = analyticsData.map((item) =>
    new Date(item.timestamp).toLocaleTimeString()
  );
  const counters = analyticsData.map((item) => item.counter);

  const actionTypes = analyticsData.map((item) => item.actionType);
  
  const actionTypeCounts = analyticsData.reduce((acc, item) => {
    const action = item.actionType.toLowerCase(); // Normalize action type (optional)
    acc[action] = (acc[action] || 0) + item.counter; // Sum up counters for each action type
    return acc;
  }, {});
  

  const totalActions = analyticsData.reduce((sum, item) => sum + item.counter, 0);
  const totalClicks = analyticsData
    .filter((item) => item.actionType === "button_click")
    .reduce((sum, item) => sum + item.counter, 0);
  const buttons = new Set(analyticsData.map((item) => item.actionType)).size;
  const totalScrolls = analyticsData
  .filter((item) => item.actionType === "scroll")
  .reduce((sum, item) => sum + item.counter, 0);

  const pieData = {
    labels: Object.keys(actionTypeCounts),
    datasets: [
      {
        label: "Action Type Distribution",
        data: Object.values(actionTypeCounts),
        backgroundColor: randomColor({
          count: Object.keys(actionTypeCounts).length,
          hue: "random",
          luminosity: "light",
        }),
        borderColor: randomColor({
          count: Object.keys(actionTypeCounts).length,
          hue: "random",
          luminosity: "dark",
        }),
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: Object.keys(actionTypeCounts),
    datasets: [
      {
        label: "Button Clicks by Action Type",
        data: Object.keys(actionTypeCounts).map((actionType) => {
          return analyticsData
            .filter((item) => item.actionType === actionType)
            .reduce((sum, item) => sum + item.counter, 0);
        }),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: labels,
    datasets: [
      {
        label: "Action Count",
        data: counters,
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  const chartStyle = {
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "20px",
    backgroundColor: "#fff",
  };

  const boxStyle = {
    flex: 1,
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f5f5f5",
    border: "1px solid #ddd",
    borderRadius: "8px",
    margin: "0 10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div
      // style={{
      //   width: "90%",
      //   maxWidth: "1200px",
      //   margin: "0 auto",
      //   padding: "20px 20px 20px 20px",
      // }}
    >
      <h1
        style={{
          backgroundColor: "lightgreen",
          display:"flex",
          width: "100vw",
          height:"60px",
          color: "white",
          textAlign: "center",
          justifyContent:"center",
          alignItems:"center",
          fontWeight: "bold",
          paddingBottom: "auto",
          marginBottom:"20px",
          margin: "0",
          fontSize:"24px"
        }}
      >
        Analytics Dashboard
        <Link  to="/dashboard" style={{marginLeft:"900px", fontSize:"20px"}}>Back</Link>
      </h1>
      

      <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
        {/* Line Chart */}
        <div style={{ ...chartStyle, flex: 1, height: "400px" }}>
          <h1>Action Count Over Time</h1>
          <Line
            data={lineData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>

        {/* Bar Chart */}
        <div style={{ ...chartStyle, flex: 1, height: "400px" }}>
          <h1>Button Clicks by Action Type</h1>
          <Bar
            data={barData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>

      {/* Pie Chart */}
      <div style={{ ...chartStyle, marginTop: "20px", height: "400px", width: "70%", margin: "20px auto" }}>
        <h1>Action Type Distribution</h1>
        <Pie style={{ paddingBottom: "20px" }}
          data={pieData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", margin: "20px 10px" }}>
        <div className="justify-center items-center" style={boxStyle}>
          <h2>Total Actions</h2>
          <p>{totalActions}</p>
        </div>
        <div style={boxStyle}>
          <h2>Total Clicks</h2>
          <p>{totalClicks}</p>
        </div>
        <div className="justify-center items-center" style={boxStyle}>
          <h2>Unique Actions</h2>
          <p>{buttons}</p>
        </div>
        <div style={boxStyle}>
          <h2>Scrolls</h2>
          <p>{totalScrolls}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;