import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiLoginBoxFill } from 'react-icons/ri';
import image1 from './images/login.png';

function Login({ setLoggedIn, login }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/users/login', {
        username,
        password,
      });

      console.log('Login response:', response.data);

      const { role, department, division, username: returnedUsername } = response.data.user;

      if (response.status === 200 && role) {
        // Clear previous session
        localStorage.clear();

        setLoggedIn(true);
        login(role);

        localStorage.setItem('role', role.toLowerCase());
        localStorage.setItem('username', returnedUsername);
        localStorage.setItem('department', department);
        localStorage.setItem('division', division);

        toast.success('Login successful');
        navigate('/MainDashboard', { state: { role, dep: department, division } });
      } else {
        toast.error('Invalid credentials');
      }
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="navbar border-bottom shadow-lg p-1 mb-0 rounded" style={{ backgroundColor: 'black' }}>
        <div className="container-fluid">
          <span className="navbar-brand text-white">
            <img
              src={image1}
              alt="Login Icon"
              style={{ width: '40px', height: '40px', objectFit: 'contain' }}
            />
            &nbsp;
            <b>ASSOCIATED MEAT PACKERS</b>
          </span>
        </div>
      </nav>

      <div
        className="d-flex justify-content-center align-items-center bg-light"
        style={{ height: 'calc(100vh - 70px)' }}
      >
        <div className="card p-3 shadow" style={{ width: '400px' }}>
          <ToastContainer />
          <RiLoginBoxFill />
          <h2 className="text-center mb-4">LOGIN</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-dark w-100" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <div className="text-center mt-2">
              <Link to="/register"><i>Create an account</i></Link>
            </div>
          </form>
        </div>

        <footer className="text-white bg-dark text-center p-2 fixed-bottom">
          &copy; Associated Meat Packers. All rights reserved.
        </footer>
      </div>
    </>
  );
}

export default Login;
