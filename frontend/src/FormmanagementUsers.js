import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image1 from './images/login.png';

const collections = [
  "ivendusers",
  "meatmatrix",
  "vpn",
  "changeofcontrol",
  "domainaccess",
  "internetaccess"
];

// Use this mapping to display fixed columns per collection
const columnMapping = {
  ivendusers: ['fullName', 'jobtitle', 'store', 'headofdepartmentname', 'deptmanagerapproval', 'itmanagerapproval', 'rights', 'roles'],
  meatmatrix: ['fullName', 'jobtitle', 'date', 'headofdepartmentname', 'from', 'to', 'deptmanagerapproval', 'itmanagerapproval'],
  vpn: ['vpnRequestorname', 'vpnRequestordepartment', 'vpnRequestorjobtitle', 'vpnRequestoremail', 'deptManagerApproval', 'itManagerApproval', 'itExecutiveApproval'],
  changeofcontrol: ['name', 'division', 'datesubmitted', 'proposedchange', 'changesmade', 'requestor'],
  domainaccess: ['fullName', 'jobtitle', 'department', 'division', 'managersname', 'deptmanagerapproval', 'itmanagerapproval'],
  internetaccess: ['firstname', 'surname', 'department', 'device', 'ipaddress', 'macaddress', 'itmanagerapproval', 'itexecapproval'],
};

const FormmanagementUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [collectionSelected, setCollectionSelected] = useState(collections[0]);
  const [formData, setFormData] = useState([]);
  const [username, setUsername] = useState('');

  // Load username from localStorage once on mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  // Fetch data for selected collection filtered by current user
  useEffect(() => {
    if (!collectionSelected) return;

    setLoading(true);
    setError(null);

    axios.get(`http://localhost:3001/${collectionSelected}/`)
      .then(res => {
        const data = res.data.data || [];

        // Filter data where username or createdBy matches current username
        const filteredByUser = data.filter(item =>
          item.username === username || item.createdBy === username
        );

        setFormData(filteredByUser);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load data');
        setFormData([]);
        setLoading(false);
      });
  }, [collectionSelected, username]);

  // Columns to show - use mapping or fallback to dynamic keys
  const columns = columnMapping[collectionSelected] || (formData[0] ? Object.keys(formData[0]) : []);

  // Filter data based on search term (case insensitive, string fields only)
  const filteredData = formData.filter(item => {
    if (!searchTerm) return true;
    return columns.some(col => {
      const val = item[col];
      return typeof val === 'string' && val.toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  // Format column headers nicely (e.g. camelCase or snake_case to Title Case)
  const formatHeader = (header) => {
    return header
      .replace(/([A-Z])/g, ' $1')        // Add space before capital letters
      .replace(/_/g, ' ')                // Replace underscores with spaces
      .replace(/\b\w/g, c => c.toUpperCase()) // Capitalize first letter of each word
      .trim();
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

      <div className="mb-3 d-flex justify-content-between">
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

        <input
          type="text"
          className="form-control w-25"
          placeholder="Search..."
          style={{ fontStyle: 'italic' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
          {filteredData.length > 0 ? filteredData.map((item, idx) => (
            <tr key={idx}>
              {columns.map(col => {
                let value = item[col];

                // Format dates nicely
                if (value && (col.toLowerCase().includes("date") || col.toLowerCase().includes("at"))) {
                  const dateObj = new Date(value);
                  if (!isNaN(dateObj)) {
                    value = dateObj.toLocaleDateString();
                  }
                }

                return <td key={col}>{value != null ? value.toString() : ''}</td>;
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
