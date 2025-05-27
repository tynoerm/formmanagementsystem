import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import image1 from '../images/login.png';
import DomainEdit from '../UserformsModals/domainEdit';
import IvendEdit from '../UserformsModals/ivendEdit';
import InternetaccessEdit from '../UserformsModals/internetaccessEdit';
import ChangeofcontrolEdit from '../UserformsModals/changecontrolEdit';
import MeatmatrixEdit from '../UserformsModals/meatmatrixEdit';
import VpnEdit from '../UserformsModals/vpnEdit';
import { IoLogOutSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";

const collections = [
  { label: "VPN Requests", value: "vpn" },
  { label: "Change of Control", value: "changeofcontrol" },
  { label: "Internet Access", value: "internetaccess" }
];

const columnMapping = {
  ivendusers: ['fullname', 'jobtitle', 'store', 'headofdepartmentname', 'deptmanagerapproval', 'itmanagerapproval', 'roles'],
  meatmatrix: ['fullname', 'jobtitle', 'date', 'headofdepartmentname', 'from', 'to', 'deptmanagerapproval', 'itmanagerapproval'],
  vpn: ['vpnRequestorname', 'vpnRequestordepartment', 'vpnRequestorjobtitle', 'vpnRequestoremail', 'deptManagerApproval', 'itManagerApproval', 'itExecutiveApproval'],
  changeofcontrol: ['name', 'division', 'datesubmitted', 'proposedchange', 'changesmade', 'requestor', 'headofdept', 'headofict'],
  domainaccess: ['fullname', 'jobtitle', 'department', 'division', 'managersname', 'deptmanagerapproval', 'itmanagerapproval'],
  internetaccess: ['firstname', 'surname', 'department', 'device', 'ipaddress', 'macaddress', 'itmanagerapproval', 'itexcapproval'], // ✅ Fixed here
};

const ITExecutive = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [collectionSelected, setCollectionSelected] = useState('vpn');
  const [formData, setFormData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [username, setUsername] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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
        const data = res.data.data || res.data || [];
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

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const renderCellContent = (col, value) => {
    const approvalFields = [
      'deptmanagerapproval', 'itmanagerapproval', 'itexcapproval',
      'itexecutiveapproval', 'headofict', 'headofdept'
    ];

    const normalizedCol = col.toLowerCase();
    const normalizedValue = (value || '').toString().toLowerCase();

    if (approvalFields.includes(normalizedCol)) {
      if (normalizedValue === 'approved') {
        return <span className="badge rounded-pill bg-success">Approved</span>;
      } else if (normalizedValue === 'rejected') {
        return <span className="badge rounded-pill bg-danger">Rejected</span>;
      } else {
        return <span className="badge rounded-pill bg-secondary">Unapproved</span>;
      }
    }

    if (value && (normalizedCol.includes("date") || normalizedCol.includes("at"))) {
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
      {/* Navbar */}
      <nav className="navbar border-bottom shadow-lg p-1 mb-0 rounded" style={{ backgroundColor: 'black' }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center text-white">
            <img src={image1} alt="Login Icon" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
            <span className="ms-2 fw-bold">IT EXECUTIVE MANAGEMENT</span>
          </div>
          <div className="text-white">
            <h5 className="mb-0"><i>Welcome {username}</i></h5>
          </div>
        </div>
      </nav>

      {/* Top Controls */}
      <div className="mb-3 d-flex justify-content-between mt-3">
        <select
          className="form-select w-25"
          value={collectionSelected}
          onChange={(e) => setCollectionSelected(e.target.value)}
        >
          {collections.map((col) => (
            <option key={col.value} value={col.value}>{col.label}</option>
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

      {/* Table */}
      {loading && <p>Loading data...</p>}
      {error && <p className="text-danger">{error}</p>}

      <table className="table table-striped table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            {columns.length > 0 ? (
              columns.map((col) => (
                <th key={col}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
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
                  <td key={col}>{renderCellContent(col, item[col])}</td>
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

      {/* Modals */}
      {showModal && selectedItem && (
        <>
          {collectionSelected === 'internetaccess' && (
            <InternetaccessEdit item={selectedItem} onClose={() => setShowModal(false)} collection={collectionSelected} />
          )}
          {collectionSelected === 'changeofcontrol' && (
            <ChangeofcontrolEdit item={selectedItem} onClose={() => setShowModal(false)} collection={collectionSelected} />
          )}
          {collectionSelected === 'vpn' && (
            <VpnEdit item={selectedItem} onClose={() => setShowModal(false)} collection={collectionSelected} />
          )}
        </>
      )}

      {/* Footer */}
      <footer className="text-white bg-dark text-center p-2 fixed-bottom">
        &copy; Associated Meat Packers. All rights reserved.
      </footer>
    </div>
  );
};

export default ITExecutive;
