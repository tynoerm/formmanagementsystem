// components/LoginComponent.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

import { RiLoginBoxFill } from "react-icons/ri";
import image1 from '../images/login.png';

const ITManager  = () => {
    return (
        <div>
            <nav
                className="navbar border-bottom shadow-lg p-1 mb-0 rounded"
                style={{ backgroundColor: 'black' }}
            >
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    {/* Left side: Image and Title */}
                    <div className="d-flex align-items-center text-white">
                        <img
                            src={image1}
                            alt="Login Icon"
                            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                        />
                        <span className="ms-2 fw-bold">IT MANAGER MANAGEMENT</span>
                    </div>

                    {/* Right side: Welcome message */}
                    <div className="text-white">
                        <h5 className="mb-0"><i>Welcome </i></h5>
                    </div>
                </div>
            </nav>

            <div className="mb-3 d-flex justify-content-end">
                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Enter form name"
                    style={{ fontStyle: 'italic' }}
                />

            </div>


            <table className="table table-striped table-bordered mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>Date</th>
                        <th>Supplier Name</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Buying Price</th>
                        <th>Selling Price</th>
                        <th>Received By</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Insert dynamic rows here */}
                </tbody>
            </table>
        </div>
    );
};

export default ITManager;
