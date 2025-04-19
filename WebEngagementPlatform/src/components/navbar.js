import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import './Navbar.css';

const NavBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Function to toggle the mobile menu visibility
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle logout and redirect
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Determine which links to show based on route and auth
  const isAuthPage = ["/login", "/register"].includes(location.pathname);
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isAnalytics = location.pathname.startsWith("/analytics-dashboard");
  const isEmailUpload = location.pathname.startsWith("/email-upload");

  // Main nav links logic
  let navLinks = [];
  if (!user) {
    // Not logged in
    if (!isAuthPage) {
      navLinks = [
        { to: "/", label: "Home" },
        { to: "/login", label: "Login" },
        { to: "/register", label: "Register" },
      ];
    }
  } else {
    // Logged in
    navLinks = [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/analytics-dashboard", label: "Analytics" },
      { to: "/email-upload", label: "Email Campaign" },
      { to: "#", label: "Logout", onClick: handleLogout },
    ];
    // Hide nav on login/register
    if (isAuthPage) navLinks = [];
    // Hide dashboard link if already on dashboard
    if (isDashboard) navLinks = navLinks.filter(l => l.to !== "/dashboard");
    // Hide analytics link if already on analytics
    if (isAnalytics) navLinks = navLinks.filter(l => l.to !== "/analytics-dashboard");
    // Hide email-upload link if already on email-upload
    if (isEmailUpload) navLinks = navLinks.filter(l => l.to !== "/email-upload");
  }

  return (
    <nav className="fixed z-50 w-full bg-green-500">
      <div className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-1 ">
        {/* Logo */}
        <Link to="/" className="left-0 text-white text-2xl font-semibold ">WebEngage</Link>
        {/* Nav Links */}
        <ul className="hidden md:flex space-x-6 ml-auto items-center">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              {link.onClick ? (
                <button
                  onClick={link.onClick}
                  className="logout-btn"
                >
                  {link.label}
                </button>
              ) : (
                <Link to={link.to} className="text-white text-lg font-medium py-2 px-4 rounded hover:bg-green-700 transition" style={{ padding: '9px 15px', fontWeight: 500, fontSize: '18px', borderRadius: '5px' }}>{link.label}</Link>
              )}
            </li>
          ))}
        </ul>
        {/* Mobile Menu Button */}
        <button className="md:hidden text-white text-2xl" onClick={toggleMobileMenu}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 ${isMobileMenuOpen ? 'block' : 'hidden'}`} onClick={toggleMobileMenu}></div>
      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="w-64 bg-gray-900 p-6 flex flex-col space-y-4">
          {navLinks.map((link, idx) => (
            <div key={idx}>
              {link.onClick ? (
                <button onClick={() => { link.onClick(); toggleMobileMenu(); }} className="text-white text-xl font-medium w-full text-left">{link.label}</button>
              ) : (
                <Link to={link.to} className="text-white text-xl font-medium" onClick={toggleMobileMenu}>{link.label}</Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;


