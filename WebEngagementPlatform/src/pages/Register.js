import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use navigate for redirecting after registration
import './register.css'; // Import the styles

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyname, setCompanyname] = useState(''); // Track companyname only
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.className = 'register-body';
    return () => {
      document.body.className = ''; // Cleanup
    };
  }, []);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setError('');

    try {
      const userData = await registerUser({ email, password, companyname });
      console.log('User registered:', userData);

      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Registration failed. Please try again.');
    }
  };

  const registerUser = async (userData) => {
    const response = await fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error response from backend:', data);
      throw new Error(data.error || 'Registration failed');
    }

    return data;
  };

  return (
    <div className="register-body">
      <div className='wrapper'>
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          {error && <p className="error">{error}</p>}
          <div className='input-box'>
            <input
              type="email"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="bx bxs-user"></i>
          </div>

          <div className='input-box'>
            <input
              type="text"
              placeholder='Company Name'
              value={companyname}
              onChange={(e) => setCompanyname(e.target.value)}
              required
            />
            <i className="bx bxs-user"></i>
          </div>

          <div className='input-box'>
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="bx bxs-user"></i>
          </div>

          <div className='input-box'>
            <input
              type="password"
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <i className="bx bxs-user"></i>
          </div>

          <button type="submit" className='btn'>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
