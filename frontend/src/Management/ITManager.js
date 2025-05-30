import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image1 from '../images/login.png';
import { useNavigate } from 'react-router-dom';
import { IoLogOutSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";

import DomainEdit from '../UserformsModals/domainEdit';
import IvendEdit from '../UserformsModals/ivendEdit';
import InternetaccessEdit from '../UserformsModals/internetaccessEdit';
import ChangeofcontrolEdit from '../UserformsModals/changecontrolEdit';
import MeatmatrixEdit from '../UserformsModals/meatmatrixEdit';
import VpnEdit from '../UserformsModals/vpnEdit';

const collections = [
  { value: "ivendusers", label: "Ivend Users" },
  { value: "meatmatrix", label: "Meat Matrix" },
  { value: "vpn", label: "VPN" },
  { value: "changeofcontrol", label: "Change of Control" },
  { value: "domainaccess", label: "Domain Access" },
  { value: "internetaccess", label: "Internet Access" }
];

const columnMapping = {
  ivendusers: [
    { key: 'fullname', label: 'Full Name' },
    { key: 'jobtitle', label: 'Job Title' },
    { key: 'store', label: 'Store' },
    { key: 'headofdepartmentname', label: 'Head of Department' },
    { key: 'deptmanagerapproval', label: 'Dept Manager Approval' },
    { key: 'itmanagerapproval', label: 'IT Manager Approval' },
    { key: 'roles', label: 'Roles' }
  ],
  meatmatrix: [
    { key: 'fullname', label: 'Full Name' },
    { key: 'jobtitle', label: 'Job Title' },
    { key: 'date', label: 'Date' },
    { key: 'headofdepartmentname', label: 'Head of Department' },
    { key: 'from', label: 'From' },
    { key: 'to', label: 'To' },
    { key: 'deptmanagerapproval', label: 'Dept Manager Approval' },
    { key: 'itmanagerapproval', label: 'IT Manager Approval' }
  ],
  vpn: [
    { key: 'vpnRequestorname', label: 'VPN Requestor Name' },
    { key: 'vpnRequestordepartment', label: 'Department' },
    { key: 'vpnRequestorjobtitle', label: 'Job Title' },
    { key: 'vpnRequestoremail', label: 'Email' },
    { key: 'deptManagerApproval', label: 'Dept Manager Approval' },
    { key: 'itManagerApproval', label: 'IT Manager Approval' },
    { key: 'itExecutiveApproval', label: 'IT Executive Approval' }
  ],
  changeofcontrol: [
    { key: 'name', label: 'Name' },
    { key: 'division', label: 'Division' },
    { key: 'datesubmitted', label: 'Date Submitted' },
    { key: 'proposedchange', label: 'Proposed Change' },
    { key: 'changesmade', label: 'Changes Made' },
    { key: 'requestor', label: 'Requestor' },
    { key: 'headofdept', label: 'Head of Department' },
    { key: 'headofict', label: 'Head of ICT' }
  ],
  domainaccess: [
    { key: 'fullname', label: 'Full Name' },
    { key: 'jobtitle', label: 'Job Title' },
    { key: 'department', label: 'Department' },
    { key: 'division', label: 'Division' },
    { key: 'managersname', label: 'Manager\'s Name' },
    { key: 'deptmanagerapproval', label: 'Dept Manager Approval' },
    { key: 'itmanagerapproval', label: 'IT Manager Approval' }
  ],
  internetaccess: [
    { key: 'firstname', label: 'First Name' },
    { key: 'surname', label: 'Surname' },
    { key: 'department', label: 'Department' },
    { key: 'device', label: 'Device' },
    { key: 'ipaddress', label: 'IP Address' },
    { key: 'macaddress', label: 'MAC Address' },
    { key: 'itmanagerapproval', label: 'IT Manager Approval' },
    { key: 'itexecapproval', label: 'IT Executive Approval' }
  ],
};

const ITManager = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [collectionSelected, setCollectionSelected] = useState(collections[0].value);
  const [formData, setFormData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [username, setUsername] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  useEffect(() => {
    if (!collectionSelected) return;

    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:3001/${collectionSelected}/`)
      .then((res) => {
        let data = res.data.data || [];

        // Sort by most recent
        data.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.date || a.datesubmitted || 0);
          const dateB = new Date(b.createdAt || b.date || b.datesubmitted || 0);
          return dateB - dateA;
        });

        setFormData(data);
        const mappedColumns = columnMapping[collectionSelected] || [];
        setColumns(mappedColumns);
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

  const filteredData = formData.filter(item =>
    !searchTerm ||
    Object.values(item).some(val =>
      typeof val === 'string' && val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const renderCellContent = (col, value) => {
    const approvalFields = [
      'deptmanagerapproval',
      'itmanagerapproval',
      'itexecapproval',
      'itExecutiveApproval',
      'deptManagerApproval',
      'itManagerApproval',
      'headofict',
      'headofdept'
    ];

    if (approvalFields.includes(col)) {
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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <nav className="navbar border-bottom shadow-lg p-1 mb-0 rounded" style={{ backgroundColor: 'black' }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center text-white">
            <img src={image1} alt="Login Icon" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
            <span className="ms-2 fw-bold">IT MANAGER MANAGEMENT</span>
          </div>
          <div className="text-white">
            <h5 className="mb-0"><i>Welcome {username}</i></h5>
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
                <th key={col.key}>{col.label}</th>
              ))
            ) : (
              <th>No Data</th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, idx) => (
              <tr
                key={idx}
                onClick={() => {
                  setSelectedItem(item);
                  setShowModal(true);
                }}
                style={{ cursor: 'pointer' }}
              >
                {columns.map((col) => {
                  const value = item[col.key];
                  return (
                    <td key={col.key}>
                      {renderCellContent(col.key, value)}
                    </td>
                  );
                })}
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
          {collectionSelected === 'ivendusers' ? (
            <IvendEdit item={selectedItem} onClose={() => setShowModal(false)} collection={collectionSelected} />
          ) : collectionSelected === 'internetaccess' ? (
            <InternetaccessEdit item={selectedItem} onClose={() => setShowModal(false)} collection={collectionSelected} />
          ) : collectionSelected === 'domainaccess' ? (
            <DomainEdit item={selectedItem} onClose={() => setShowModal(false)} collection={collectionSelected} />
          ) : collectionSelected === 'changeofcontrol' ? (
            <ChangeofcontrolEdit item={selectedItem} onClose={() => setShowModal(false)} collection={collectionSelected} />
          ) : collectionSelected === 'meatmatrix' ? (
            <MeatmatrixEdit item={selectedItem} onClose={() => setShowModal(false)} collection={collectionSelected} />
          ) : collectionSelected === 'vpn' ? (
            <VpnEdit item={selectedItem} onClose={() => setShowModal(false)} collection={collectionSelected} />
          ) : null}
        </>
      )}

      <footer className="text-white bg-dark text-center p-2 fixed-bottom">
        &copy; Associated Meat Packers. All rights reserved.
      </footer>
    </div>
  );
};

export default ITManager;
