import React from "react";
import "./ContactSection.css"; // Import your CSS file
import { HiOutlineArrowCircleRight } from "react-icons/hi";

const ContactSection = () => {
    return (
        <div className="contact-section">
            <div className="left-side">
                <h1>WebEngage Lets You...</h1>
                <ul className="list">
                    <li>
                        <HiOutlineArrowCircleRight />
                        Build unified reporting, analyze customer behavior
                        and act on it instantly
                    </li>
                    <li>
                        <HiOutlineArrowCircleRight />Create personalized and engaging customer experiences
                    </li>
                    <li>
                        <HiOutlineArrowCircleRight />Predict and prevent customer churn
                    </li>
                    <li>
                        <HiOutlineArrowCircleRight />Improve customer engagement and drive LTV
                    </li>
                </ul>

                <h3 className="bold-text">Learn how MoEngage can help you succeed. Talk to one of our experts today!</h3>
            </div>

            <div className="right-side">
                {/* <h2>Request a Demo</h2> */}
                <form>
                    <div className="form-group">
                        <label>First Name*</label>
                        <input type="text" placeholder="First Name" required />
                    </div>
                    <div className="form-group">
                        <label>Last Name*</label>
                        <input type="text" placeholder="Last Name" required />
                    </div>
                    <div className="form-group">
                        <label>Work Email*</label>
                        <input type="email" placeholder="Work Email" required />
                    </div>
                    <div className="form-group">
                        <label>Company Name*</label>
                        <input type="text" placeholder="Company Name" required />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" placeholder="Phone Number" />
                    </div>
                    <div className="form-group">
                        <label>Country*</label>
                        <select required>
                            <option value="">Select Country</option>
                            <option value="USA">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="UK">United Kingdom</option>
                            <option value="India">India</option>
                            <option value="Australia">Australia</option>
                        </select>
                    </div>
                    <div className="form-checkbox">
                        <label>
                            <input type="checkbox" required /> I agree to MoEngage's Terms of Service and Privacy Policy*
                        </label>
                    </div>
                    <button type="submit">Request Demo</button>
                </form>
            </div>
        </div>
    );
};

export default ContactSection;
