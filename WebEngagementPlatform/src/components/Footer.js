import React from 'react';
import { HiOutlineArrowCircleRight } from 'react-icons/hi';
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-column">
                    <h3>Products</h3>
                    <ul>
                        <li>Customer Insights</li>
                        <li>Cross-Channel Marketing</li>
                        <li>Web & App Personalization</li>
                        <li>Real-Time Transactional Alerts</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Industry</h3>
                    <ul>
                        <li>Financial Services</li>
                        <li>Media & Entertainment</li>
                        <li>Food & Beverage</li>
                        <li>Travel & Hospitality</li>
                        <li>Retail & E-commerce</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Learn</h3>
                    <ul>
                        <li>Customer Stories</li>
                        <li>Blog</li>
                        <li>Reports</li>
                        <li>Knowledge Base</li>
                        <li>
                            <a href="/">See all Resources</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Role</h3>
                    <ul>
                        <li>For Marketers</li>
                        <li>For Product Owners</li>
                        <li>For Developers</li>
                    </ul>
                </div>
            </div>

            {/* <div className="footer-about">
        <p>
          MoEngage is an insights-led platform trusted by 1,350+ global brands like McAfee, Flipkart, Domino's, Nestle, Deutsche
          Telekom, and more. MoEngage's powerful analytics, personalization, and AI capabilities give a 360-degree view of your
          customers and help you create journeys across digital channels.
        </p>
      </div> */}

            <div className="footer-bottom">
                <div className="footer-content2">
                    <div className="footer-left">
                        <h3>WebEngage</h3>
                        <p>© Copyright 2024 WebEngage. All Rights Reserved.</p>
                    </div>

                    <div className="footer-right">
                        <div className="social-icons">
                            <a href="/" aria-label="LinkedIn">
                                <FaLinkedin />
                            </a>
                            <a href="/" aria-label="Twitter">
                                <FaTwitter />
                            </a>
                            <a href="/" aria-label="YouTube">
                                <FaYoutube />
                            </a>
                            <a href="/" aria-label="Facebook">
                                <FaFacebook />
                            </a>
                        </div>

                        <div className="footer-links">
                            <a href="/">Terms of Use</a> 
                            <a href="/">Privacy Policy</a>
                            <a href="/">Cookie Policy</a>
                            <a href="/">Responsible Disclosure</a>
                            <a href="/">Legal & Privacy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
