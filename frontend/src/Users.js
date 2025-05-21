import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image1 from './images/login.png';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        console.log('API response:', response.data);
        setUsers(response.data.data || response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const name = user.fullName ? user.fullName.toLowerCase() : '';
    const username = user.username ? user.username.toLowerCase() : '';
    const term = searchTerm.toLowerCase();

    return name.includes(term) || username.includes(term);
  });

  const handleCreateUser = () => {
    navigate('/UserManagement'); 
  };

  // When clicking a user row, open modal and set selected user
  const handleRowClick = (user) => {
    setSelectedUser(user);
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };

const handleResetPassword = async () => {
  // Validate inputs
  if (newPassword === '' || confirmPassword === '') {
    setError('Both fields are required.');
    return;
  }
  if (newPassword !== confirmPassword) {
    setError('Passwords do not match.');
    return;
  }

  try {
    // Make PUT request to update password endpoint
    await axios.put(`http://localhost:3001/users/update-password/${selectedUser._id}`, {
      password: newPassword,  // or "newPassword" depending on your backend field name
    });

    alert('Password reset successful');
    closeModal();
  } catch (err) {
    console.error('Password reset error:', err);
    setError('Failed to reset password. Try again.');
  }
};



  return (
    <div>
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
            &nbsp;<b> <i>USERS MANAGEMENT MODULE</i></b>
          </span>
        </div>
      </nav>

      <div className="container mt-3 d-flex justify-content-between align-items-center">
        <input
          type="text"
          placeholder="Search by name or username"
          className="form-control"
          style={{ width: '300px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={handleCreateUser}
          style={{ minWidth: '150px' }}
        >
          Create User
        </button>
      </div>

      <table className="table table-striped table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Full Name</th>
            <th>Username</th>
            <th>Role</th>
            <th>Department</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user._id} style={{ cursor: 'pointer' }} onClick={() => handleRowClick(user)}>
                <td>{user.fullName}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>{user.department}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Bootstrap Modal */}
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={closeModal}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={e => e.stopPropagation()} // Prevent modal close on modal content click
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">RESET PASSWORD FOR :<i> {selectedUser.fullName}</i></h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleResetPassword}>Reset Password</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
