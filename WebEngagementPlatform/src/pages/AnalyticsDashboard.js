import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Line, Bar, Pie } from "react-chartjs-2";
import randomColor from "randomcolor";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
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
  ArcElement
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

const AnalyticsDashboard = ({ analyticsData: analyticsDataProp }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [analyticsData, setAnalyticsData] = useState(analyticsDataProp || []);
  const [loading, setLoading] = useState(false);

  // Fetch analytics if empty (e.g. on direct reload)
  useEffect(() => {
    if ((!analyticsDataProp || analyticsDataProp.length === 0) && user) {
      setLoading(true);
      fetch(`http://localhost:3001/analytics?userId=${user.companyname}`)
        .then(res => res.json())
        .then(data => {
          setAnalyticsData(data);
          setLoading(false);
        })
        .catch(() => {
          setAnalyticsData([]);
          setLoading(false);
        });
    } else if (analyticsDataProp && analyticsDataProp.length > 0) {
      setAnalyticsData(analyticsDataProp);
    }
  }, [analyticsDataProp, user]);

  // Poll for updates every 10 seconds for live updates
  useEffect(() => {
    if (!user) return;
    const fetchAnalytics = () => {
      fetch(`http://localhost:3001/analytics?userId=${user.companyname}`)
        .then(res => res.json())
        .then(data => setAnalyticsData(data))
        .catch(() => setAnalyticsData([]));
    };
    const interval = setInterval(fetchAnalytics, 1000);
    return () => clearInterval(interval);
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-green-500 ">
        <p className="text-4xl">Loading analytics...</p>
      </div>
    );
  }

  if (!analyticsData || analyticsData.length === 0) {
    return (
      <div className="flex justify-center items-center bg-green-500 ">
        <p className="text-4xl">No data to show</p>
      </div>
    );
  }

  // Sort analyticsData by timestamp ascending for consistent time order
  const sortedAnalyticsData = [...analyticsData].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  // Use original analyticsData, labels, and lineOptions
  const labels = analyticsData.map((item) => new Date(item.timestamp).toLocaleTimeString());
  const counters = analyticsData.map((item) => item.counter);

  const actionTypes = sortedAnalyticsData.map((item) => item.actionType);
  
  const actionTypeCounts = sortedAnalyticsData.reduce((acc, item) => {
    const action = item.actionType.toLowerCase(); // Normalize action type (optional)
    acc[action] = (acc[action] || 0) + item.counter; // Sum up counters for each action type
    return acc;
  }, {});
  

  const totalActions = sortedAnalyticsData.reduce((sum, item) => sum + item.counter, 0);
  const totalClicks = sortedAnalyticsData
    .filter((item) => item.actionType === "button_click")
    .reduce((sum, item) => sum + item.counter, 0);
  const buttons = new Set(sortedAnalyticsData.map((item) => item.actionType)).size;
  const totalScrolls = sortedAnalyticsData
  .filter((item) => item.actionType === "scroll")
  .reduce((sum, item) => sum + item.counter, 0);

  const pieData = {
    labels: Object.keys(actionTypeCounts),
    datasets: [
      {
        label: "Action Type Distribution",
        data: Object.values(actionTypeCounts),
        backgroundColor: [
          // Use a fixed color palette to disable color changing
          "#4caf50", // green
          "#2196f3", // blue
          "#ff9800", // orange
          "#e91e63", // pink
          "#9c27b0", // purple
          "#607d8b", // blue grey
          "#ffc107", // amber
          "#f44336", // red
        ],
        borderColor: [
          "#388e3c",
          "#1976d2",
          "#f57c00",
          "#ad1457",
          "#6a1b9a",
          "#455a64",
          "#ffa000",
          "#d32f2f",
        ],
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
          return sortedAnalyticsData
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

  // Chart options for professional display and dynamic scaling
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Action Count Over Time', font: { size: 20 } },
      tooltip: { enabled: true, mode: 'index', intersect: false }
    },
    scales: {
      x: {
        title: { display: true, text: 'Time', font: { size: 16 } },
        ticks: { autoSkip: true, maxTicksLimit: 20 }
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Count', font: { size: 16 } },
        ticks: { stepSize: 1 }
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Button Clicks by Action Type', font: { size: 20 } },
      tooltip: { enabled: true }
    },
    scales: {
      x: {
        title: { display: true, text: 'Action Type', font: { size: 16 } }
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Clicks', font: { size: 16 } },
        ticks: { stepSize: 1 }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'right', labels: { font: { size: 14 } } },
      title: { display: true, text: 'Action Type Distribution', font: { size: 20 } },
      tooltip: { enabled: true }
    }
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
            options={lineOptions}
          />
        </div>

        {/* Bar Chart */}
        <div style={{ ...chartStyle, flex: 1, height: "400px" }}>
          <h1>Button Clicks by Action Type</h1>
          <Bar
            data={barData}
            options={barOptions}
          />
        </div>
      </div>

      {/* Pie Chart */}
      <div style={{ ...chartStyle, marginTop: "20px", height: "400px", width: "70%", margin: "20px auto" }}>
        <h1>Action Type Distribution</h1>
        <Pie style={{ paddingBottom: "20px" }}
          data={pieData}
          options={pieOptions}
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