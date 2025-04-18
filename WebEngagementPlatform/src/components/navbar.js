import React, { useState } from "react";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import { HiOutlineArrowCircleRight } from "react-icons/hi";

const NavBar = () => {
  // State to control the mobile menu visibility
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to toggle the mobile menu visibility
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <nav className="fixed z-50 w-full bg-green-500">
        <div className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-1 ">
          {/* Logo */}
          <a href="#" className="left-0 text-white text-2xl font-semibold ">WebEngage</a>

          {/* Nav Links */}
          <ul className="hidden md:flex space-x-6 ml-auto">
          <li className="relative group">
              <a href="#" className="text-white text-lg font-medium py-2 px-4  hover:bg-green-700 hover:rounded-full transition">Products</a>
              <ul className="absolute left-0 w-48 bg-green-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible rounded-lg transition-all top-16 shadow-lg">
                <li>
                  <a href="#" className="block text-white py-2 px-4 flex justify-center items-center text-base hover:bg-green-700 hover:rounded-full ">Action SDK</a>
                </li>
                <li>
                  <a href="#" className="block text-white py-2 px-4 flex justify-center items-center text-base hover:bg-green-700 hover:rounded-full">Data Dashboard</a>
                </li>
                <li>
                  <a href="#" className="block text-white py-2 px-4 flex justify-center items-center text-base hover:bg-green-700 rounded-full">EMail Campaign</a>
                </li>
              </ul>
            </li>


            <li>
              <a href="#" className="text-white text-lg font-medium py-2 px-4 rounded hover:bg-green-700 hover:rounded-full transition">Solutions</a>
            </li>
            <li className="relative group">
              <a href="#" className="text-white text-lg font-medium py-2 px-4  hover:bg-green-700 hover:rounded-full transition">Services</a>
              <ul className="absolute left-0 w-48 bg-green-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible rounded-lg transition-all top-16 shadow-lg">
                <li>
                  <a href="#" className="block text-white py-2 px-4 flex justify-center items-center text-base hover:bg-green-700 hover:rounded-full ">User Engagement</a>
                </li>
                <li>
                  <a href="#" className="block text-white py-2 px-4 flex justify-center items-center text-base hover:bg-green-700 hover:rounded-full">Analytics</a>
                </li>
                <li>
                  <a href="#" className="block text-white py-2 px-4 flex justify-center items-center text-base hover:bg-green-700 rounded-full">EMail Campaign</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" className="text-white text-lg font-medium py-2 px-4 rounded hover:bg-green-700 rounded-full transition">Contact</a>
            </li>

            <li>
              <a href="/register" className="text-white text-lg font-medium py-2 px-4 rounded bg-green-700 rounded-full">Register</a>
            </li>

            <li>
              <a href="/login" className="text-white text-lg font-medium py-2 px-4 rounded bg-green-700 rounded-full">Login</a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={toggleMobileMenu}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-gray-900 bg-opacity-50 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          onClick={toggleMobileMenu}
        ></div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-gray-900 bg-opacity-50 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          id="mobile-menu"
        >
          <div className="w-64 bg-gray-900 p-6 flex flex-col space-y-4">
            <a href="#" className="text-white text-xl font-medium">Home</a>
            <a href="#" className="text-white text-xl font-medium">About</a>
            <a href="#" className="text-white text-xl font-medium">Services</a>
            <a href="#" className="text-white text-xl font-medium">Contact</a>
          </div>
        </div>
      </nav>

      {/* <section className="content-section">
        <div className="content-left">
          <h1>Build Stronger Relationships With Your Customers</h1>
          <h3>
            WebEngage is a cross-channel customer engagement platform built for marketers and product owners
            who value agility over cumbersome complexity. We help consumer brands adapt quickly to evolving
            customer expectations through real-time insights and personalized cross-channel communications.
          </h3>
          <button className="cta-btn">Let's Talk <HiOutlineArrowCircleRight /></button>
        </div>

        <div className="content-right">
          <img
            src=""
            alt="Web engagement illustration"
            className="content-image"
          />
        </div>
      </section> */}

      {/* <div className="section-b">Enterprise-ready, Scale & Reliability</div>

      <div className="icon-container">
        <img src="C:\Users\VARAD CHAUDHARI\Desktop\New folder\frontend\src\Images\s1.png" alt="Icon 1" className="icon-image1" />
        <img src="C:\Users\VARAD CHAUDHARI\Desktop\New folder\frontend\src\Images\s2.png" alt="Icon 2" className="icon-image2" />
      </div>


      <ContactSection />

      <Footer /> */}
    </div>
  );
};

export default NavBar;


