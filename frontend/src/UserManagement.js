import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiLoginBoxFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import image1 from './images/login.png';


import { IoCreate } from "react-icons/io5";
import { IoLogOutSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";

function UserManagement() {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3001/users/create-user', {
                fullName,
                username,
                password,
                role,
                department,
            });

            if (response.status === 201 || response.status === 200) {
                toast.success('User registered successfully');

                // Prepare user data to send on navigation
                const userData = {
                    fullName,
                    username,
                    password,
                    role,
                    department,
                };

                // Clear form inputs
                setFullName('');
                setUsername('');
                setPassword('');
                setRole('');
                setDepartment('');

                // Navigate to '/users' and pass user data
                navigate('/users', { state: { newUser: userData } });
            } else {
                toast.error('Registration failed');
            }
        } catch (err) {
            if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error('Something went wrong');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
    navigate(-1);
  };

    return (
        <>
            <nav className="navbar border-bottom shadow-lg p-1 mb-0 rounded" style={{ backgroundColor: 'black' }}>
  <div className="container-fluid d-flex justify-content-between align-items-center">
    <span className="navbar-brand text-white d-flex align-items-center">
      <img
        src={image1}
        alt="Login Icon"
        style={{ width: '40px', height: '40px', objectFit: 'contain' }}
      />
      &nbsp;<b>ASSOCIATED MEAT PACKERS</b>
    </span>

    <div className="d-flex gap-2">
      <button onClick={handleBack} className="btn btn-primary">
        <b><IoMdArrowRoundBack /> Back</b>
      </button>
      <button className="btn btn-danger" onClick={() => {
        localStorage.clear();
        navigate('/');
      }}>
        <b><IoLogOutSharp /> Logout</b>
      </button>
    </div>
  </div>
</nav>

        


            <div className="d-flex justify-content-center align-items-center bg-light" style={{ height: 'calc(100vh - 70px)' }}>
                <div className="card p-3 shadow" style={{ width: '400px' }}>
                    <ToastContainer />
                    <h5 className="text-center mb-3">
                        <b><RiLoginBoxFill /> ADD A NEW USER</b>
                    </h5>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label>Full Name:</label>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="form-control"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
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
                            <label>Role:</label>
                            <select
                                className="form-control"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="">-- Select Role --</option>
                                <option value="client">Client</option>
                                <option value="retail">Retail Shops</option>
                                <option value="deptmanager">Department Manager</option>
                                <option value="itmanagement">IT Management</option>
                                <option value="itmanager">IT Manager</option>
                                <option value="itexec">IT Executive</option>
                            </select>
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
                                <option value="finance">Finance</option>
                                <option value="operations">Operations</option>
                                <option value="sales">Sales</option>
                                <option value="itdepartment">IT Department </option>
                                <option value="retailshops">Retail Shops</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-dark w-100"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'CREATE'}
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
