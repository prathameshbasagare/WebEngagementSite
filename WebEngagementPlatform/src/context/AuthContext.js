import React, { createContext, useState } from 'react';

// Create AuthContext
const AuthContext = createContext();

// Provide AuthContext to components
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); // Simulate user login
  };

  const logout = () => {
    setUser(null); // Simulate user logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


// Correct export
export { AuthProvider, AuthContext };
