
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './UserContext.js';

import DepartmentManager from './Management/DepartmentManager.js';
import ITManager from './Management/ITManager.js';
import ITExecutive from './Management/ITExecutive.js';
import UserformSelection from './UserformSelection.js';


import NotFound from './NotFound';
import Login from './Login.js'
import MainDashboard from './MainDashboard.js'
import UserManagement from './UserManagement.js';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = (role) => {
    setLoggedIn(true);
    setUserRole(role);
    setError('');
  };

  const logout = () => {
    setLoggedIn(false);
    setUserRole('');
    setUsername('');
    setPassword('');
  };

  return (
    <Router>
      <UserProvider>
        <Routes>
          {/* Login Route */}
          <Route
            path="/"
            element={<Login setLoggedIn={setLoggedIn} login={login} />}
          />

          <Route path="MainDashboard" element={<MainDashboard />} />
          <Route path="ITManager" element={<ITManager />} />
           <Route path="ITExecutive" element={<ITExecutive />} />
              <Route path="UserformSelection" element={<UserformSelection />} />
       
       
 <Route path="UserManagement" element={<UserManagement />} />


          {/* Fallback 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
