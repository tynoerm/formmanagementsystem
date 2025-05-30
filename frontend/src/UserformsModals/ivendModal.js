import React, { useState, useEffect } from "react";
import { LuFileInput } from "react-icons/lu";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const IvendModal = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [jobtitle, setJobtitle] = useState("");
  const [store, setStore] = useState("");
  const [date, setDate] = useState("");
  const [headofdepartment, setHeadofdepartment] = useState("");
  const [department, setDepartment] = useState("");
  const [deptManagerApproval, setDeptManagerApproval] = useState("unapproved");
  const [itManagerApproval, setItManagerApproval] = useState("unapproved");
  const [rightsArray, setRightsArray] = useState([{ item: "", access: "" }]);

  const [agentname, setAgentname]= useState("");
   const [authorisedby, setAuthorisedby]= useState("");
   const [actionedby, setActionedby]= useState("");
   const [reviewedby, setReviewedby]= useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [showModal, setShowModal] = useState(true);


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

  const roles = [
    "ADMINSTRATION ROLE", "AMP ADMIN", "COST ACCOUNTANT", "STOCK CONTROLLER",
    "STOCKTAKE ADMIN", "STOCK COUNTER", "SUPERVISOR", "REPORTING", "TILL OPERATOR"
  ];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedRoles(prev =>
      checked ? [...prev, value] : prev.filter(role => role !== value)
    );
  };

  const handleIvendSubmit = async (e) => {
    e.preventDefault();
    const formEntry = {
      fullname,
      username,
      jobtitle,
      store,
      date,
      headofdepartmentname: headofdepartment,
      department,
      deptmanagerapproval: deptManagerApproval,
      itmanagerapproval: itManagerApproval,
      rights: rightsArray,
      roles: selectedRoles,
    };

    try {
      await axios.post("http://localhost:3001/ivendusers/create-ivenduser", formEntry, {
        headers: { "Content-Type": "application/json" }
      });
      toast.success("Ivend form submitted successfully!");

      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
      console.error("Submission error:", error);
    }
  };

  if (!showModal) return null;

  const styles = {
    modalBackdrop: {
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
      alignItems: "center", justifyContent: "center", zIndex: 999
    },
    modalContent: {
      backgroundColor: "#fff", padding: "2rem", borderRadius: "10px",
      width: "1000px", maxHeight: "90vh", overflowY: "auto",
      display: "flex", flexDirection: "column", textAlign: "left"
    }
  };

  return (
    <div>
      <ToastContainer />
      <div style={styles.modalBackdrop} onClick={() => setShowModal(false)}>
        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <h5 className="mb-3">
            <b><LuFileInput /> &nbsp;IVEND ACCESS FORM</b>
          </h5>

          <form onSubmit={handleIvendSubmit}>
            <div className="row mb-2">
              <div className="col-md-6">
                <label className="form-label"><b>Fullname</b></label>
                <input type="text" className="form-control" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label className="form-label"><b>Username</b></label>
                <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>

              <div className="col-md-6">
                <label className="form-label"><b>Job Title</b></label>
                <input type="text" className="form-control" value={jobtitle} onChange={(e) => setJobtitle(e.target.value)} required />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-md-6">
                <label className="form-label"><b>Store</b></label>
                <input type="text" className="form-control" value={store} onChange={(e) => setStore(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label className="form-label"><b>Date</b></label>
                <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
            </div>

            <div className="d-flex gap-3 mb-3">
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


              <div className="flex-fill">
                <label className="form-label"><b>H.O.D Name</b></label>
                <input type="text" className="form-control" value={headofdepartment} onChange={(e) => setHeadofdepartment(e.target.value)} required />
              </div>
            </div>

            <div className="text-center mb-2">
              <label className="form-label"><b>ACCESS RIGHTS <i></i></b></label>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
              {roles.map((role, index) => (
                <div key={index} className="form-check">
                  <input type="checkbox" value={role} id={`role-${index}`} onChange={handleCheckboxChange} className="form-check-input"  />
                  <label htmlFor={`role-${index}`} className="form-check-label">{role}</label>
                </div>
              ))}
            </div>

            <hr className="my-3" />

            <div className="row mb-2">
              <div className="col-md-6">
                <label className="form-label"><b>Agent Name</b></label>
                <input type="text" className="form-control" value={agentname} disabled />
              </div>
              <div className="col-md-6">
                <label className="form-label"><b>Authorised By</b></label>
                <input type="text" className="form-control" value={authorisedby} disabled />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-md-6">
                <label className="form-label"><b>Date</b></label>
                <input type="text" className="form-control" value={date} disabled />
              </div>
              <div className="col-md-6">
                <label className="form-label"><b>Actioned By</b></label>
                <input type="text" className="form-control" value={actionedby} disabled />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-md-6">
                <label className="form-label"><b>Date</b></label>
                <input type="text" className="form-control" value={date} disabled />
              </div>
              <div className="col-md-6">
                <label className="form-label"><b>Reviewed By</b></label>
                <input type="text" className="form-control" value={reviewedby} disabled />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-12 text-center mb-3">
                <label className="form-label mb-0"><b>APPROVALS</b></label>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label"><b>Head of Department</b></label>
                <button type="button" className="btn btn-danger w-100" disabled><i>unapproved</i></button>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label"><b>IT Manager</b></label>
                <button type="button" className="btn btn-danger w-100" disabled><i>unapproved</i></button>
              </div>
            </div>

            <button type="submit" className="btn btn-dark w-100"><b>SUBMIT</b></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IvendModal;
