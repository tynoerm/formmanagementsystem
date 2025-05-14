// components/LoginComponent.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

import { RiLoginBoxFill } from "react-icons/ri";

import image1 from './images/login.png'

function UserManagement(setLoggedIn, login) {

    const [department, setDepartment] = useState('');


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3001/api/login', {
                username,
                password,
            });

            const { role, department } = response.data;

            if (response.status === 200 && role) {
                setLoggedIn(true);
                login(role);
                toast.success('Login successful');
                navigate('/MainDashboard', { state: { role, dep: department } });
            } else {
                toast.error('Invalid credentials');
            }

        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
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
            <nav
                className="navbar border-bottom shadow-lg p-1 mb-0 rounded"
                style={{ backgroundColor: 'black' }}
            >
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
                style={{ height: 'calc(100vh - 70px)' }} // subtract navbar height (adjust if needed)
            >
                <div className="card p-3 shadow" style={{
                    width: '400px',

                }}>
                    <ToastContainer />
                   
                    <h5 className="text-center mb-3"><b><RiLoginBoxFill /> ADD A NEW USER</b></h5>


                    <form onSubmit={handleSubmit}>
                        <label>Full Name:</label>
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
                            <label>Username:</label>
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
                            <label>Password:</label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label>Department:</label>
                            <select
                                className="form-control"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                required
                            >
                                <option value="">-- Select Department --</option>
                                <option value="Finance">Finance</option>
                                <option value="Operations">Operations</option>
                                <option value="Sales">Sales</option>
                                <option value="IT Department">IT Department</option>
                                <option value="Retail Shops">Retail Shops</option>
                            </select>
                        </div>



                        <button
                            type="submit"
                            className="btn btn-dark w-100"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'CREATE'}
                        </button>
                        
                    </form>
                </div>

                <footer className="text-white bg-dark text-center p-2 fixed-bottom">
                    &copy; Associated Meat Packers. All rights reserved.
                </footer>
            </div>
        </>
    );
}

export default UserManagement;
