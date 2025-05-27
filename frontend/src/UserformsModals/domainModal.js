import React, { useState, useEffect } from 'react';
import { MdDomainDisabled } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DomainModal = () => {
  const [fullname, setFullname] = useState("");
  const [jobtitle, setJobtitle] = useState("");
  const [department, setDepartment] = useState("");
  const [division, setDivision] = useState("");
  const [managersname, setManagername] = useState("");
  const [date, setDate] = useState("");
  const [username, setUsername] = useState("");
  const [domain, setDomain] = useState("");
  const [computername, setComputername] = useState("");
  const [authorisedby, setAuthorisedby] = useState("");
  const [date1, setDate1] = useState("");
  const [headofdepartmentname, setHeadofdepartmentname] = useState("");
  const [deptmanagerapproval, setDepartmentapproval] = useState("pending");
  const [itmanagerapproval, setItmanagerapproval] = useState("pending");
  const [formEntries, setFormEntries] = useState([]);
  const [memberships, setMemberships] = useState([""]);


    useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

    useEffect(() => {
    const storedDepartment = localStorage.getItem("department");
    if (storedDepartment) {
      setDepartment(storedDepartment);
    }
  }, []);
  // Handle input change for memberships
  const handleChange = (index, value) => {
    const updated = [...memberships];
    updated[index] = value;
    setMemberships(updated);
  };

  // Add new membership input field
  const handleAdd = () => {
    setMemberships([...memberships, ""]);
  };

  // Remove membership input field
  const handleRemove = (index) => {
    const updated = memberships.filter((_, i) => i !== index);
    setMemberships(updated);
  };

    
  const handledomainSubmit = async (e) => {
    e.preventDefault();

    const formEntry = {
      fullname,
      jobtitle,
      department,
      division,
      managersname,
      date,
      username,
      domain,
      computername,
      authorisedby,
      date1,
      headofdepartmentname,
      deptmanagerapproval,
      itmanagerapproval,
      memberships,
    };

    try {
      await axios.post(
        "http://localhost:3001/domainaccess/create-domainaccess",
        formEntry
      );

      toast.success("Form submitted successfully!");
      setFormEntries([...formEntries, formEntry]);
      // You might want to close modal here instead of reload
       window.location.reload();
    } catch (error) {
      if (error.response) {
        console.error("Submission error:", error.response.data);
        toast.error(
          `Submission failed: ${error.response.data.message || "Server error"}`
        );
      } else {
        console.error("Network error:", error);
        toast.error("Network error occurred. Please try again.");
      }
    }
  };

  const styles = {
    modalBackdrop: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999,
    },
    modalContent: {
      backgroundColor: "#fff",
      padding: "2rem",
      borderRadius: "10px",
      width: "1000px",
      maxHeight: "90vh",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
    },
  };

  return (

    
    <div style={styles.modalBackdrop}>

      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h5 className="mb-3">
          <b>
            <MdDomainDisabled /> &nbsp;DOMAIN USER ACCESS
          </b>
        </h5>
        <form onSubmit={handledomainSubmit}>
          <div className="row mb-2">
            <div className="col-md-6">
              <label className="form-label">
                <b>Fullname</b>
              </label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                <b>Job Title</b>
              </label>
              <input
                type="text"
                value={jobtitle}
                onChange={(e) => setJobtitle(e.target.value)}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-6">
              <label className="form-label">
                <b>Department</b>
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="form-control"
                required
              >
                <option value="">-- Select Department --</option>
                <option value="finance">Finance</option>
                <option value="operations">Operations</option>
                <option value="sales">Sales</option>
                <option value="itdepartment">IT</option>
                <option value="retailshops">Retail Shops</option>
              </select>
            </div>

            
            <div className="col-md-6">
              <label className="form-label">
                <b>Division</b>
              </label>
              <input
                type="text"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-6">
              <label className="form-label">
                <b>Manager's Name</b>
              </label>
              <input
                type="text"
                value={managersname}
                onChange={(e) => setManagername(e.target.value)}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-6">
              <label className="form-label">
                <b>Date</b>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <label className="form-label">
                <b>
                  MEMBER OF <i>(ICT DEPARTMENT USE ONLY)</i>
                </b>
              </label>
            </div>

            {/* Checkboxes below IT Department */}
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="Domain Users"
                      id="domainUsers"
                      disabled
                    />
                    <label className="form-check-label" htmlFor="domainUsers">
                      Domain Users
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="Enterprise Admins"
                      id="enterpriseAdmins"
                      disabled
                    />
                    <label
                      className="form-check-label"
                      htmlFor="enterpriseAdmins"
                    >
                      Enterprise Admins
                    </label>
                  </div>
                </div>

                <div className="col-6">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="Domain Admins"
                      id="domainAdmins"
                      disabled
                    />
                    <label className="form-check-label" htmlFor="domainAdmins">
                      Domain Admins
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="Backup Operators"
                      id="backupOperators"
                      disabled
                    />
                    <label
                      className="form-check-label"
                      htmlFor="backupOperators"
                    >
                      Backup Operators
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* State other Distribution or Group Memberships */}
          <div className="mb-3">
            <label className="form-label fw-bold">
              State other Distribution or Group Memberships
            </label>
            {memberships.map((value, index) => (
              <div key={index} className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Membership or group ${index + 1}`}
                  value={value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  disabled
                />
                {memberships.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => handleRemove(index)}
                    disabled
                  >
                    <b>
                      <i>X</i>
                    </b>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleAdd}
              disabled
            >
              Add Another
            </button>
          </div>

          <div className="row mb-2">
            <div
              style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}
            >
              <label className="form-label">
                <b>ICT DEPARTMENT <i>(Use Only)</i></b>
              </label>
            </div>
            <div className="col-md-6">
              <label className="form-label">
                <b>Username</b>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                disabled
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                <b>Organisation Unit <i>(OU)</i></b>
              </label>
              <input
                type="text"
                value={itmanagerapproval}
                onChange={(e) => setItmanagerapproval(e.target.value)}
                className="form-control"
                disabled
              />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-6">
              <label className="form-label">
                <b>Domain</b>
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="form-control"
                disabled
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                <b>Computer Name</b>
              </label>
              <input
                type="text"
                value={computername}
                onChange={(e) => setComputername(e.target.value)}
                className="form-control"
                disabled
              />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-6">
              <label className="form-label">
                <b>Authorised By</b>
              </label>
              <input
                type="text"
                value={authorisedby}
                onChange={(e) => setAuthorisedby(e.target.value)}
                className="form-control"
                disabled
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                <b>Date</b>
              </label>
              <input
                type="date"
                value={date1}
                onChange={(e) => setDate1(e.target.value)}
                className="form-control"
                disabled
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-12 text-center mb-3">
              <label className="form-label mb-0">
                <b>APPROVALS</b>
              </label>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                <b>Head of Department</b>
              </label>
              <button type="button" className="btn btn-danger w-100" disabled>
                <i> unapproved</i>
              </button>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                <b>IT Manager</b>
              </label>
              <button type="button" className="btn btn-danger w-100" disabled>
                <i> unapproved</i>
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-dark w-100">
            <b>SUBMIT</b>
          </button>
        </form>
      </div>

      
    </div>



  );
};

export default DomainModal;
