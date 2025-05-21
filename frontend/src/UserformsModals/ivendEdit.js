import React, { useState, useEffect } from "react";
import { LuFileInput } from "react-icons/lu";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IvendEdit = ({ item, setFormEntries }) => {
  const formId = item._id;

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [jobtitle, setJobtitle] = useState("");
  const [store, setStore] = useState("");
  const [date, setDate] = useState("");
  const [headofdepartmentname, setHeadofdepartment] = useState("");
  const [deptmanagerapproval, setDepartmentapproval] = useState("");
  const [itmanagerapproval, setItmanagerapproval] = useState("");
  const [rightsArray, setRightsArray] = useState([{ item: "", access: "" }]);
  const [showModal1, setShowModal1] = useState(true);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const [agentname, setAgentname] = useState("");
  const [authorisedby, setAuthorisedby] = useState("");
  const [actionedby, setActionedby] = useState("");
  const [reviewedby, setReviewedby] = useState("");

  const [role, setRole] = useState("");
    useEffect(() => {
      const storedRole = localStorage.getItem("role");
      if (storedRole) {
        setRole(storedRole);
      }
    })

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const roles = [
    "ADMINSTRATION ROLE",
    "AMP ADMIN",
    "COST ACCOUNTANT",
    "STOCK CONTROLLER",
    "STOCKTAKE ADMIN",
    "STOCK COUNTER",
    "SUPERVISOR",
    "REPORTING",
    "TILL OPERATOR",
  ];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedRoles([...selectedRoles, value]);
    } else {
      setSelectedRoles(selectedRoles.filter((role) => role !== value));
    }
  };

  useEffect(() => {
    if (item) {
      setFullname(item.fullname || "");
      setUsername(item.username || "");
      setJobtitle(item.jobtitle || "");
      setStore(item.store || "");
      setDate(item.date || "");
      setHeadofdepartment(item.headofdepartmentname || "");
      setDepartmentapproval(item.deptmanagerapproval || "");
      setItmanagerapproval(item.itmanagerapproval || "");
      setRightsArray(item.rights || [{ item: "", access: "" }]);
      setSelectedRoles(item.roles || []);
      setAgentname(item.agentname || "");
      setAuthorisedby(item.authorisedby || "");
      setActionedby(item.actionedby || "");
      setReviewedby(item.reviewedby || "");
    }
  }, [item]);

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

  const handleIvendSubmit = async (e) => {
    e.preventDefault();

    const formEntry = {
      fullname,
      username,
      jobtitle,
      store,
      date,
      headofdepartmentname,
      deptmanagerapproval,
      itmanagerapproval,
      rights: rightsArray,
      roles: selectedRoles,
    };

    try {
      const response = await axios.put(
        `http://localhost:3001/ivendusers/update-ivendusers/${formId}`,
        formEntry,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("IVEND form updated successfully!");
      setFormEntries((prev) =>
        prev.map((entry) => (entry._id === formId ? response.data.data : entry))
      );

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Error updating form. Please try again.");
      console.error("Form update error:", error);
    }
  };

  if (!showModal1) return null;

  return (
    <>
      <ToastContainer />
      <div style={styles.modalBackdrop} onClick={() => setShowModal1(false)}>
        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <h5 className="mb-3">
            <b>
              <LuFileInput /> &nbsp;IVEND ACCESS FORM UPDATE
            </b>
          </h5>
          <form onSubmit={handleIvendSubmit}>
            <div className="row mb-2">
              <div className="col-md-6">
                <label className="form-label"><b>Fullname</b></label>
                <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} className="form-control" disabled />
              </div>
              <div className="col-md-6">
                <label className="form-label"><b>Username</b></label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" disabled />
              </div>
              <div className="col-md-6">
                <label className="form-label"><b>Job Title</b></label>
                <input type="text" value={jobtitle} onChange={(e) => setJobtitle(e.target.value)} className="form-control" disabled />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-md-6">
                <label className="form-label"><b>Store</b></label>
                <input type="text" value={store} onChange={(e) => setStore(e.target.value)} className="form-control" disabled />
              </div>
              <div className="col-md-6">
                <label className="form-label"><b>Date</b></label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control" disabled />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label"><b>H.O.D Name</b></label>
              <input type="text" value={headofdepartmentname} onChange={(e) => setHeadofdepartment(e.target.value)} className="form-control mb-2" disabled />

              <div className="text-center mb-2">
                <label className="form-label">
                  <b>ACCESS RIGHTS <i>(Managers Use Only)</i></b>
                </label>
              </div>

              <div className="d-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
                {roles.map((roleItem, index) => (
                  <div key={index} className="form-check" style={{ display: "flex", alignItems: "center" }}>
                    <input type="checkbox" value={roleItem} id={`role-${index}`} onChange={handleCheckboxChange} className="form-check-input" checked={selectedRoles.includes(roleItem)} disabled />
                    <label className="form-check-label" htmlFor={`role-${index}`}>{roleItem}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mb-2">
              <label className="form-label"><b>ICT DEPARTMENT <i>(Use Only)</i></b></label>
            </div>

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
                <select className="form-select w-100" value={deptmanagerapproval} onChange={(e) => setDepartmentapproval(e.target.value)} disabled={role !== "deptmanager"}>
                  <option value="pending"><i>Pending</i></option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label"><b>IT Manager</b></label>
                <select className="form-select w-100" value={itmanagerapproval} onChange={(e) => setItmanagerapproval(e.target.value)} disabled={role !== "itmanager"}>
                  <option value="pending"><i>Pending</i></option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={role !== "deptmanager" && role !== "itmanager"}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default IvendEdit;
