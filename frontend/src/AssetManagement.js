import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image1 from './images/login.png';

const AssetManagement = () => {
  const [username, setUsername] = useState('');
  const [department, setDepartment] = useState('');
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    serialNumber: '',
    department: '',
    status: 'Available',
    condition: 'Good',
    purchaseDate: '',
    maintenanceDate: '',
  });

  useEffect(() => {
    const storedDepartment = localStorage.getItem('department');
    const storedUsername = localStorage.getItem('username');
    if (storedDepartment) setDepartment(storedDepartment);
    if (storedUsername) setUsername(storedUsername);
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const res = await axios.get('/api/assets');
      setAssets(res.data);
    } catch (err) {
      console.error('Failed to fetch assets', err);
    }
  };

  const handleEdit = (asset) => {
    setSelectedAsset(asset);
    setFormData(asset);
    setShowEditModal(true);
  };

  const handleViewDetails = (asset) => {
    setSelectedAsset(asset);
    setShowDetailsModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      try {
        await axios.delete(`/api/assets/${id}`);
        fetchAssets();
      } catch (err) {
        console.error('Failed to delete asset', err);
      }
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/assets', formData);
      fetchAssets();
      setShowAddModal(false);
      resetForm();
    } catch (err) {
      console.error('Error adding asset', err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/assets/${selectedAsset._id}`, formData);
      fetchAssets();
      setShowEditModal(false);
    } catch (err) {
      console.error('Error updating asset', err);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      serialNumber: '',
      department: '',
      status: 'Available',
      condition: 'Good',
      purchaseDate: '',
      maintenanceDate: '',
    });
  };

  const renderFormInputs = () => (
    <div className="row g-3">
      {['name', 'category', 'serialNumber', 'department'].map(field => (
        <div className="col-md-6" key={field}>
          <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input
            type="text"
            className="form-control"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <div className="col-md-6">
        <label className="form-label">Status</label>
        <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
          <option>Available</option>
          <option>In Use</option>
          <option>Maintenance</option>
        </select>
      </div>
      <div className="col-md-6">
        <label className="form-label">Condition</label>
        <select className="form-select" name="condition" value={formData.condition} onChange={handleChange}>
          <option>Good</option>
          <option>Fair</option>
          <option>Broken</option>
        </select>
      </div>
      <div className="col-md-6">
        <label className="form-label">Purchase Date</label>
        <input type="date" className="form-control" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} />
      </div>
      <div className="col-md-6">
        <label className="form-label">Maintenance Date</label>
        <input type="date" className="form-control" name="maintenanceDate" value={formData.maintenanceDate} onChange={handleChange} />
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8f9fa' }}>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark px-4">
        <div className="d-flex align-items-center">
          <img src={image1} alt="Login Icon" style={{ width: '40px', height: '40px' }} />
          <span className="ms-3 h5 mb-0 text-white">ASSET MANAGEMENT DASHBOARD</span>
        </div>
        <span className="text-light">Welcome {username || 'User'}</span>
      </nav>

      {/* Content */}
      <div className="container-fluid flex-fill py-3">
        {/* Summary Cards */}
        <div className="row mb-3">
          <div className="col-md-3"><div className="card bg-success text-white"><div className="card-body"><h6>Total Assets</h6><p className="fs-5">{assets.length}</p></div></div></div>
          <div className="col-md-3"><div className="card bg-primary text-white"><div className="card-body"><h6>Available</h6><p className="fs-5">{assets.filter(a => a.status === 'Available').length}</p></div></div></div>
          <div className="col-md-3"><div className="card bg-warning text-white"><div className="card-body"><h6>In Maintenance</h6><p className="fs-5">{assets.filter(a => a.status === 'Maintenance').length}</p></div></div></div>
          <div className="col-md-3"><div className="card bg-danger text-white"><div className="card-body"><h6>Broken</h6><p className="fs-5">{assets.filter(a => a.condition === 'Broken').length}</p></div></div></div>
        </div>

        {/* Table and Actions */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Asset List</h4>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>Add Asset</button>
        </div>

        {/* Table */}
        <div className="table-responsive" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Serial Number</th>
                <th>Department</th>
                <th>Status</th>
                <th>Condition</th>
                <th>Purchase Date</th>
                <th>Maintenance Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map(asset => (
                <tr key={asset._id}>
                  <td>{asset.name}</td>
                  <td>{asset.category}</td>
                  <td>{asset.serialNumber}</td>
                  <td>{asset.department}</td>
                  <td>{asset.status}</td>
                  <td>{asset.condition}</td>
                  <td>{asset.purchaseDate?.split('T')[0]}</td>
                  <td>{asset.maintenanceDate?.split('T')[0]}</td>
                  <td>
                    <button className="btn btn-info btn-sm me-1" onClick={() => handleViewDetails(asset)}>View</button>
                    <button className="btn btn-warning btn-sm me-1" onClick={() => handleEdit(asset)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(asset._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={showAddModal ? handleAddSubmit : handleEditSubmit}>
                <div className="modal-header bg-secondary text-white">
                  <h5 className="modal-title">{showAddModal ? 'Add Asset' : 'Edit Asset'}</h5>
                  <button type="button" className="btn-close" onClick={() => { setShowAddModal(false); setShowEditModal(false); }}></button>
                </div>
                <div className="modal-body">{renderFormInputs()}</div>
                <div className="modal-footer">
                  <button type="submit" className={`btn ${showAddModal ? 'btn-success' : 'btn-warning'}`}>
                    {showAddModal ? 'Save' : 'Update'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                  }}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showDetailsModal && selectedAsset && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title">Asset Details</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowDetailsModal(false)}></button>
              </div>
              <div className="modal-body">
                {Object.entries(selectedAsset).map(([key, value]) => (
                  ['_id', '__v'].includes(key) ? null : (
                    <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {String(value).split('T')[0]}</p>
                  )
                ))}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowDetailsModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetManagement;
