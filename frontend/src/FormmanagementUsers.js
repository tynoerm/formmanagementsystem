import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image1 from './images/login.png';
import { useNavigate } from 'react-router-dom';

const collections = [
  "ivendusers",
  "meatmatrix",
  "vpn",
  "changeofcontrol",
  "domainaccess",
  "internetaccess"
];

const columnMapping = {
  ivendusers: ['fullname', 'jobtitle', 'store', 'headofdepartmentname', 'deptmanagerapproval', 'itmanagerapproval', 'roles'],
  meatmatrix: ['fullname', 'jobtitle', 'date', 'headofdepartmentname', 'from', 'to', 'deptmanagerapproval', 'itmanagerapproval'],
  vpn: ['vpnRequestorname', 'vpnRequestordepartment', 'vpnRequestorjobtitle', 'vpnRequestoremail', 'deptManagerApproval', 'itManagerApproval', 'itExecutiveApproval'],
  changeofcontrol: ['name', 'division', 'datesubmitted', 'proposedchange', 'changesmade', 'requestor'],
  domainaccess: ['fullname', 'jobtitle', 'department', 'division', 'managersname', 'deptmanagerapproval', 'itmanagerapproval'],
  internetaccess: ['firstname', 'surname', 'department', 'device', 'ipaddress', 'macaddress', 'itmanagerapproval', 'itexecapproval'],
};

const columnLabelMapping = {
  fullname: 'Full Name',
  jobtitle: 'Job Title',
  store: 'Store',
  headofdepartmentname: 'Head of Department',
  deptmanagerapproval: 'Dept Manager Approval',
  itmanagerapproval: 'IT Manager Approval',
  roles: 'Roles',
  date: 'Date',
  from: 'From',
  to: 'To',
  vpnRequestorname: 'Requestor Name',
  vpnRequestordepartment: 'Requestor Department',
  vpnRequestorjobtitle: 'Requestor Job Title',
  vpnRequestoremail: 'Requestor Email',
  deptManagerApproval: 'Dept Manager Approval',
  itManagerApproval: 'IT Manager Approval',
  itExecutiveApproval: 'IT Executive Approval',
  name: 'Name',
  division: 'Division',
  datesubmitted: 'Date Submitted',
  proposedchange: 'Proposed Change',
  changesmade: 'Changes Made',
  requestor: 'Requestor',
  department: 'Department',
  managersname: 'Manager’s Name',
  firstname: 'First Name',
  surname: 'Surname',
  device: 'Device',
  ipaddress: 'IP Address',
  macaddress: 'MAC Address',
  itexecapproval: 'IT Executive Approval'
};

const FormmanagementUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [collectionSelected, setCollectionSelected] = useState(collections[0]);
  const [formData, setFormData] = useState([]);
  const [username, setUsername] = useState('');

  const approvalFields = [
    'deptmanagerapproval',
    'itmanagerapproval',
    'itexecapproval',
    'itManagerApproval',
    'deptManagerApproval',
    'itExecutiveApproval'
  ];

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  useEffect(() => {
    if (!collectionSelected) return;

    setLoading(true);
    setError(null);

    axios.get(`http://localhost:3001/${collectionSelected}/`)
      .then(res => {
        const data = res.data.data || [];
        const filteredData = data.filter(item =>
          item.username === username || item.createdBy === username
        );
        setFormData(filteredData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load data');
        setFormData([]);
        setLoading(false);
      });
  }, [collectionSelected, username]);

  const columns = columnMapping[collectionSelected] || (formData[0] ? Object.keys(formData[0]) : []);

  const formatHeader = (header) => {
    return columnLabelMapping[header] || header
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
      .trim();
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <nav className="navbar border-bottom shadow-lg p-1 mb-0 rounded" style={{ backgroundColor: 'black' }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center text-white">
            <img src={image1} alt="Login Icon" style={{ width: 40, height: 40, objectFit: 'contain' }} />
            <span className="ms-2 fw-bold">USER FORM MANAGEMENT</span>
          </div>
          <div className="text-white">
            <h5 className="mb-0"><i>Welcome {username}</i></h5>
          </div>
        </div>
      </nav>

      <div className="mb-3 d-flex justify-content-between align-items-center">
        <select
          className="form-select w-25"
          value={collectionSelected}
          onChange={(e) => setCollectionSelected(e.target.value)}
        >
          {collections.map(col => (
            <option key={col} value={col}>
              {col.charAt(0).toUpperCase() + col.slice(1)}
            </option>
          ))}
        </select>
        <div className="d-flex gap-2">
          <button onClick={handleBack} className="btn btn-primary">
            &larr; Back
          </button>
          <button className="btn btn-danger" onClick={() => {
            localStorage.clear();
            navigate('/');
          }}>
            Logout
          </button>
        </div>
      </div>

      {loading && <p>Loading data...</p>}
      {error && <p className="text-danger">{error}</p>}

      <table className="table table-striped table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            {columns.length > 0 ? columns.map(col => (
              <th key={col}>{formatHeader(col)}</th>
            )) : (
              <th>No Data</th>
            )}
          </tr>
        </thead>
        <tbody>
          {formData.length > 0 ? formData.map((item, idx) => (
            <tr key={idx}>
              {columns.map(col => {
                let value = item[col];

                if (value && (col.toLowerCase().includes("date") || col.toLowerCase().includes("at"))) {
                  const dateObj = new Date(value);
                  if (!isNaN(dateObj)) {
                    value = dateObj.toLocaleDateString();
                  }
                }

                return (
                  <td key={col}>
                    {approvalFields.includes(col) && value ? (
                      <span className={`badge 
                        ${value.toLowerCase() === 'approved' ? 'bg-success' :
                          value.toLowerCase() === 'rejected' ? 'bg-danger' :
                          value.toLowerCase() === 'pending' ? 'bg-warning text-dark' :
                          'bg-secondary'}`}>
                        {value}
                      </span>
                    ) : (
                      value != null ? value.toString() : ''
                    )}
                  </td>
                );
              })}
            </tr>
          )) : (
            <tr>
              <td colSpan={columns.length || 1} className="text-center">No records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FormmanagementUsers;
