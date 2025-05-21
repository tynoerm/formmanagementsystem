// components/ITManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image1 from '../images/login.png';


import DomainEdit from '../UserformsModals/domainEdit';
import IvendEdit from '../UserformsModals/ivendEdit';
import InternetaccessEdit from '../UserformsModals/internetaccessEdit';
import ChangeofcontrolEdit from '../UserformsModals/changecontrolEdit';
import MeatmatrixEdit from '../UserformsModals/meatmatrixEdit';
import VpnEdit from '../UserformsModals/vpnEdit';


const collections = [
  'ivendusers',
  'meatmatrix',
  'vpn',
  'changeofcontrol',
  'domainaccess',
  'internetaccess',
];

const columnMapping = {
  ivendusers: ['fullName', 'jobtitle', 'store', 'headofdepartmentname', 'deptmanagerapproval', 'itmanagerapproval', 'rights', 'roles'],
  meatmatrix: ['fullName', 'jobtitle', 'date', 'headofdepartmentname', 'from', 'to', 'deptmanagerapproval', 'itmanagerapproval'],
  vpn: ['vpnRequestorname', 'vpnRequestordepartment', 'vpnRequestorjobtitle', 'vpnRequestoremail', 'deptManagerApproval', 'itManagerApproval', 'itExecutiveApproval'],
  changeofcontrol: ['name', 'division', 'datesubmitted', 'proposedchange', 'changesmade', 'requestor'],
  domainaccess: ['fullName', 'jobtitle', 'department', 'division', 'managersname', 'deptmanagerapproval', 'itmanagerapproval'],
  internetaccess: ['firstname', 'surname', 'department', 'device', 'ipaddress', 'macaddress', 'itmanagerapproval', 'itexecapproval'],
};

const ITManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [collectionSelected, setCollectionSelected] = useState(collections[0]);
  const [formData, setFormData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [username, setUsername] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
        const data = res.data.data || [];
        setFormData(data);
        setColumns(columnMapping[collectionSelected] || []);
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

  return (
    <div>
      <nav className="navbar border-bottom shadow-lg p-1 mb-0 rounded" style={{ backgroundColor: 'black' }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center text-white">
            <img src={image1} alt="Login Icon" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
            <span className="ms-2 fw-bold">IT MANAGEMENT</span>
          </div>
          <div className="text-white">
            <h5 className="mb-0"><i>Welcome {username}</i></h5>
          </div>
        </div>
      </nav>

      <div className="mb-3 d-flex justify-content-between mt-3">
        <select className="form-select w-25" value={collectionSelected} onChange={(e) => setCollectionSelected(e.target.value)}>
          {collections.map((col) => (
            <option key={col} value={col}>
              {col.charAt(0).toUpperCase() + col.slice(1)}
            </option>
          ))}
        </select>

       
      </div>

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
                {columns.map((col) => {
                  let value = item[col];
                  if (value && (col.toLowerCase().includes("date") || col.toLowerCase().includes("at"))) {
                    try {
                      value = new Date(value).toLocaleDateString();
                    } catch {
                      // Keep original value if date parsing fails
                    }
                  }
                  return <td key={col}>{value != null ? value.toString() : ""}</td>;
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
          {collectionSelected === 'ivendusers' && (
            <IvendEdit item={selectedItem} onClose={() => setShowModal(false)} collection={collectionSelected} />
          )}
          {collectionSelected === 'internetaccess' && (
            <InternetaccessEdit item={selectedItem} onClose={() => setShowModal(false)} collection={collectionSelected} />
          )}
          {collectionSelected === 'domainaccess' && (
            <DomainEdit item={selectedItem} onClose={() => setShowModal(false)} collection={collectionSelected} />
          )}
          {collectionSelected === 'changeofcontrol' && (
            <ChangeofcontrolEdit item={selectedItem} onClose={() => setShowModal(false)} collection={collectionSelected} />
          )}
          {collectionSelected === 'meatmatrix' && (
            <MeatmatrixEdit item={selectedItem} onClose={() => setShowModal(false)} collection={collectionSelected} />
          )}
          {collectionSelected === 'vpn' && (
            <VpnEdit item={selectedItem} onClose={() => setShowModal(false)} collection={collectionSelected} />
          )}
        </>
      )}

      <footer className="text-white bg-dark text-center p-2 fixed-bottom">
        &copy; Associated Meat Packers. All rights reserved.
      </footer>
    </div>
  );
};

export default ITManagement;
