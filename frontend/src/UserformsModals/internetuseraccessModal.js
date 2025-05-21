import React, { useState, useEffect } from "react";
import { LuFileInput } from "react-icons/lu";
import { FaInternetExplorer } from "react-icons/fa";

import axios from "axios";

const InternetaccessModal = () => {
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [daterequested, setDaterequested] = useState("");
  const [department, setDepartment] = useState("");
  const [daterequired, setDaterequired] = useState("");
  const [device, setDevice] = useState("");
  const [ipaddress, setIpaddress] = useState("");
  const [macaddress, setMacaddress] = useState("");
  const [businessjustification, setBusinessjustification] = useState("");
 
  const [itmanagerapproval, setItmanagerapproval] = useState("pending");
  const [itexcapproval, setItexecapproval] = useState("pending");

  const [showModal4, setShowModal4] = useState(true);


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

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = {
    firstname,
    surname,
    username,
    daterequested,
    department,
    daterequired,
    device,
    ipaddress,
    macaddress,
    businessjustification,
    itmanagerapproval,
    itexcapproval,
  };

  try {
    const response = await axios.post( "http://localhost:3001/internetaccess/create-internetaccess", formData);
    console.log("Response from server:", response.data);


    window.location.reload();
    // Clear form after successful submission
    setFirstname("");
    setSurname("");
    setDaterequested("");
    setDepartment("");
    setDaterequired("");
    setDevice("");
    setIpaddress("");
    setMacaddress("");
    setBusinessjustification("");
    setItmanagerapproval("");
    setItexecapproval("");
    setShowModal4(false);
  } catch (error) {
    console.error("Error submitting form:", error);
    // Optionally handle error UI here
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

  if (!showModal4) return null;

  return (
    <div style={styles.modalBackdrop} onClick={() => setShowModal4(false)}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h5 className="mb-3">
          <b><FaInternetExplorer /> &nbsp;Internet Access Request</b>
        </h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <b><i>(To be completed by the Applicant)</i></b>
          </div>
          <div className="row mb-2">
            <div className="col-md-6">
              <label><b>First Name</b></label>
              <input type="text" className="form-control" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label><b>Surname</b></label>
              <input type="text" className="form-control" value={surname} onChange={(e) => setSurname(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label><b>Username</b></label>
              <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-6">
              <label><b>Date Requested</b></label>
              <input type="date" className="form-control" value={daterequested} onChange={(e) => setDaterequested(e.target.value)} required />
            </div>
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
          </div>

          <div className="mb-2">
            <label><b>Date Required</b></label>
            <input type="date" className="form-control" value={daterequired} onChange={(e) => setDaterequired(e.target.value)} required />
          </div>

          <div className="mb-3 mt-4">
            <b>ICT DEPARTMENT<i> (Use Only)</i></b>
          </div>
          <div className="row mb-2">
            <div className="col-md-4">
              <label><b>Device</b></label>
              <input type="text" className="form-control" value={device} onChange={(e) => setDevice(e.target.value)}  disabled/>
            </div>
            <div className="col-md-4">
              <label><b>IP Address</b></label>
              <input type="text" className="form-control" value={ipaddress} onChange={(e) => setIpaddress(e.target.value)} disabled />
            </div>
            <div className="col-md-4">
              <label><b>MAC Address</b></label>
              <input type="text" className="form-control" value={macaddress} onChange={(e) => setMacaddress(e.target.value)} disabled />
            </div>
          </div>

          <div className="mb-2">
            <label><b>Business Justification</b></label>
            <textarea className="form-control" rows="3" value={businessjustification} onChange={(e) => setBusinessjustification(e.target.value)} />
          </div>

      
          <div className="row mb-4">
  <div className="col-12 text-center mb-3">
    <label className="form-label mb-0">
      <b>APPROVALS</b>
    </label>
  </div>

  <div className="col-md-6 mb-3">
    <label className="form-label">
      <b>IT Manager</b>
    </label>
    <button type="button" className="btn btn-danger w-100" disabled>
        <i> unapproved</i>
    </button>
  </div>

  <div className="col-md-6 mb-3">
    <label className="form-label">
      <b>IT Executive</b>
    </label>
    <button type="button" className="btn btn-danger w-100" disabled>
     <i> unapproved</i>
    </button>
  </div>
</div>
          <button type="submit" className="btn btn-primary w-100 mt-3">Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default InternetaccessModal;
