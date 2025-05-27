import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image1 from '../images/login.png';
import { useNavigate } from 'react-router-dom';

import DomainEdit from '../UserformsModals/domainEdit';
import IvendEdit from '../UserformsModals/ivendEdit';
import InternetaccessEdit from '../UserformsModals/internetaccessEdit';
import ChangeofcontrolEdit from '../UserformsModals/changecontrolEdit';
import MeatmatrixEdit from '../UserformsModals/meatmatrixEdit';
import VpnEdit from '../UserformsModals/vpnEdit';

import { IoLogOutSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";

const collections = [
  { label: "Ivend Users", value: "ivendusers" },
  { label: "Meat Matrix", value: "meatmatrix" },
  { label: "VPN Requests", value: "vpn" },
  { label: "Change of Control", value: "changeofcontrol" },
  { label: "Domain Access", value: "domainaccess" },
  { label: "Internet Access", value: "internetaccess" }
];

// Column mapping for each collection
const columnMapping = {
  ivendusers: ['fullname', 'jobtitle', 'store', 'headofdepartmentname', 'deptmanagerapproval', 'itmanagerapproval', 'roles'],
  meatmatrix: ['fullname', 'jobtitle', 'date', 'department', 'headofdepartmentname', 'from', 'to', 'deptmanagerapproval', 'itmanagerapproval'],
  vpn: ['vpnRequestorname', 'vpnRequestordepartment', 'vpnRequestorjobtitle', 'vpnRequestoremail', 'deptManagerApproval', 'itManagerApproval', 'itExecutiveApproval'],
  changeofcontrol: ['name', 'division', 'department', 'datesubmitted', 'proposedchange', 'headofdept', 'headofict', 'changesmade', 'requestor'],
  domainaccess: ['fullname', 'jobtitle', 'department', 'division', 'managersname', 'deptmanagerapproval', 'itmanagerapproval'],
  internetaccess: ['firstname', 'surname', 'department', 'device', 'ipaddress', 'macaddress', 'itmanagerapproval', 'itexecapproval'],
};

const DepartmentManager = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize collectionSelected as string value, not object
  const [collectionSelected, setCollectionSelected] = useState(collections[0].value);

  const [formData, setFormData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [department, setDepartment] = useState('');
  const [username, setUsername] = useState('');

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedDepartment = localStorage.getItem('department');
    const storedUsername = localStorage.getItem('username');
    if (storedDepartment) setDepartment(storedDepartment);
    if (storedUsername) setUsername(storedUsername);
  }, []);

  useEffect(() => {
    setShowModal(false);
    setSelectedItem(null);

    if (!collectionSelected) return;

    setLoading(true);
    setError(null);

    axios.get(`http://localhost:3001/${collectionSelected}/`)
      .then((res) => {
        const data = res.data.data || [];
        setFormData(data);

        if (columnMapping[collectionSelected]) {
          setColumns(columnMapping[collectionSelected]);
        } else if (data.length > 0) {
          setColumns(Object.keys(data[0]));
        } else {
          setColumns([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load data');
        setFormData([]);
        setColumns([]);
        setLoading(false);
      });
  }, [collectionSelected]);

  // Filter by department - be mindful if item.department may be undefined
  const filteredData = formData.filter(item =>
    item.department?.toLowerCase() === department.toLowerCase()
  );

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const renderCellContent = (col, value) => {
    // all lowercase approval fields to avoid duplication & case mismatch
    const approvalFields = [
      'deptmanagerapproval',
      'itmanagerapproval',
      'itexecapproval',
      'itexecutiveapproval',
      'headofict',
      'headofdept',
      'deptmanagerapproval',
      'itmanagerapproval',
      'itexecutiveapproval'
    ];

    if (approvalFields.includes(col.toLowerCase())) {
      if (value?.toLowerCase() === 'approved') {
        return <span className="badge rounded-pill bg-success">Approved</span>;
      } else if (value?.toLowerCase() === 'rejected') {
        return <span className="badge rounded-pill bg-danger">Rejected</span>;
      } else {
        return <span className="badge rounded-pill bg-secondary">Unapproved</span>;
      }
    }

    if (value && (col.toLowerCase().includes("date") || col.toLowerCase().includes("at"))) {
      try {
        return new Date(value).toLocaleDateString();
      } catch {
        return value;
      }
    }

    return value != null ? value.toString() : "";
  };

  return (
    <div>
      <nav className="navbar border-bottom shadow-lg p-1 mb-0 rounded" style={{ backgroundColor: 'black' }}>
        <div className="container-fluid d-flex align-items-center">

          {/* Left: Logo and title */}
          <div className="d-flex align-items-center text-white me-auto">
            <img
              src={image1}
              alt="Login Icon"
              style={{ width: '40px', height: '40px', objectFit: 'contain' }}
            />
            <span className="ms-2 fw-bold">DEPARTMENT MANAGER MANAGEMENT</span>
          </div>

          {/* Right: Welcome message */}
          <div className="d-flex align-items-center ms-auto text-white">
            <h5 className="mb-0 me-3"><i>Welcome {username || 'User'}</i></h5>
          </div>

        </div>
      </nav>

      <div className="mb-3 d-flex justify-content-between mt-3">
        <select
          className="form-select w-25"
          value={collectionSelected}
          onChange={(e) => setCollectionSelected(e.target.value)}
        >
          {collections.map((col) => (
            <option key={col.value} value={col.value}>
              {col.label}
            </option>
          ))}
        </select>

        <div className="d-flex justify-content-end">
          <button onClick={handleBack} className="btn btn-primary me-2">
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

      {loading && <p>Loading data...</p>}
      {error && <p className="text-danger">{error}</p>}

      <table className="table table-striped table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            {columns.length > 0 ? (
              columns.map((col) => (
                <th key={col}>
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                </th>
              ))
            ) : (
              <th>No Data</th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, idx) => (
              <tr key={idx} onClick={() => handleRowClick(item)} style={{ cursor: 'pointer' }}>
                {columns.map((col) => (
                  <td key={col}>
                    {renderCellContent(col, item[col])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length || 1} className="text-center">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && selectedItem && (
        <>
          {collectionSelected === 'ivendusers' && (
            <IvendEdit
              item={selectedItem}
              onClose={() => setShowModal(false)}
              collection={collectionSelected}
            />
          )}
          {collectionSelected === 'internetaccess' && (
            <InternetaccessEdit
              item={selectedItem}
              onClose={() => setShowModal(false)}
              collection={collectionSelected}
            />
          )}
          {collectionSelected === 'domainaccess' && (
            <DomainEdit
              item={selectedItem}
              onClose={() => setShowModal(false)}
              collection={collectionSelected}
            />
          )}
          {collectionSelected === 'changeofcontrol' && (
            <ChangeofcontrolEdit
              item={selectedItem}
              onClose={() => setShowModal(false)}
              collection={collectionSelected}
            />
          )}
          {collectionSelected === 'meatmatrix' && (
            <MeatmatrixEdit
              item={selectedItem}
              onClose={() => setShowModal(false)}
              collection={collectionSelected}
            />
          )}
          {collectionSelected === 'vpn' && (
            <VpnEdit
              item={selectedItem}
              onClose={() => setShowModal(false)}
              collection={collectionSelected}
            />
          )}
        </>
      )}

      <footer className="text-white bg-dark text-center p-2 fixed-bottom">
        &copy; Associated Meat Packers. All rights reserved.
      </footer>
    </div>
  );
};

export default DepartmentManager;
