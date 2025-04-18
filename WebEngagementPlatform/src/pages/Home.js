import React, { useState, useEffect, useContext } from 'react';
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { AuthContext } from '../context/AuthContext';
import image1 from "../Images/s1.png";
import image2 from "../Images/s2.png";
import image3 from "../Images/i2.png";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import NavBar from '../components/navbar';
import './Home.css';


const Home = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <NavBar />

      <section className="content-section">
        {/* Left side with text */}
        <div className="content-left">
          <h1>Build Stronger Relationships With Your Customers</h1>
          <h3>
            WebEngage is a cross-channel customer engagement platform built for marketers and product owners
            who value agility over cumbersome complexity. We help consumer brands adapt quickly to evolving
            customer expectations through real-time insights and personalized cross-channel communications.
          </h3>
          <button className="cta-btn flex items-center">
            <HiOutlineArrowCircleRight className="ml-4 inline-block" /> Let's Talk
          </button>

        </div>

        {/* Right side with carousel */}
        <div className="image content-right relative">
          <img className="" src={image3}></img>
        </div>
      </section>

      <div className="section-b">Enterprise-ready, Scale & Reliability</div>

      <div className="icon-container">
        <img src={image1} alt="Icon 1" className="icon-image1" />
        <img src={image2} alt="Icon 2" className="icon-image2" />
      </div>

      {/* Contact section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
