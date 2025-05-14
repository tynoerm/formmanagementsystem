import React, { useState, useEffect } from "react";
import { LuFileInput } from "react-icons/lu"; // Ensure this icon is installed

const IvendModal = () => {
  const [ivendForm, setIvendform] = useState([]);
  const [fullname, setFullname] = useState("");
  const [jobtitle, setJobtitle] = useState("");
  const [store, setStore] = useState("");
  const [date, setDate] = useState("");
  const [headofdepartmentname, setHeadofdepartment] = useState("");
  const [deptmanagerapproval, setDepartmentapproval] = useState("");
  const [itmanagerapproval, setItmanagerapproval] = useState("");
  const [rightsArray, setRightsArray] = useState([{ item: "", access: "" }]);
  const [error, setError] = useState("");
  const [showModal1, setShowModal1] = useState(true); // Show modal by default for now

  const [selectedRoles, setSelectedRoles] = useState([]);

  // Array of roles options
  const roles = [
    "ADMINSTRATION ROLE",
    "AMP ADMIN",
    "COST ACCOUNTANT",
    "STOCK CONTROLLER",
    "STOCKTAKE ADMIN",
    "STOCK COUNTER",
    "SUPERVISOR",
    "REPORTING",
    "TILL OPERATOR"
  ];

  // Handle checkbox changes
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedRoles([...selectedRoles, value]);
    } else {
      setSelectedRoles(selectedRoles.filter(role => role !== value));
    }
  };

  useEffect(() => {
    // Placeholder for any logic when component mounts or updates
  }, []);

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

  const handleRightChange = (index, field, value) => {
    const updatedRights = [...rightsArray];
    updatedRights[index][field] = value;
    setRightsArray(updatedRights);
  };

  const addRight = () => {
    setRightsArray([...rightsArray, { item: "", access: "" }]);
  };

  const removeRight = (index) => {
    const updatedRights = rightsArray.filter((_, idx) => idx !== index);
    setRightsArray(updatedRights);
  };

  const handleIvendSubmit = (e) => {
    e.preventDefault();
    const formEntry = {
      fullname,
      jobtitle,
      store,
      date,
      headofdepartmentname,
      deptmanagerapproval,
      itmanagerapproval,
      rights: rightsArray,
    };
    setIvendform([...ivendForm, formEntry]);

    // Reset fields
    setFullname("");
    setJobtitle("");
    setStore("");
    setDate("");
    setHeadofdepartment("");
    setDepartmentapproval("");
    setItmanagerapproval("");
    setRightsArray([{ item: "", access: "" }]);
    setShowModal1(false);
  };

  if (!showModal1) return null;

  return (
    <div style={styles.modalBackdrop} onClick={() => setShowModal1(false)}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h5 className="mb-3">
          <b>
            <LuFileInput /> &nbsp;IVEND ACCESS FORM
          </b>
        </h5>
        <form onSubmit={handleIvendSubmit}>
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
                <b>Store</b>
              </label>
              <input
                type="text"
                value={store}
                onChange={(e) => setStore(e.target.value)}
                className="form-control"
                required
              />
            </div>
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
            <label className="form-label">
              <b>H.O.D Name</b>
            </label>
            <input
              type="text"
              value={headofdepartmentname}
              onChange={(e) => setHeadofdepartment(e.target.value)}
              className="form-control mb-2"
              required
            />

            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
              <label className="form-label">
                <b>ACCESS RIGHTS <i> (Managers Use Only)</i></b>
              </label>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)", // 3 equal-width columns
                gap: "15px", // Space between columns
              }}
            >
              {roles.map((role, index) => (
                <div key={index} className="form-check" style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    value={role}
                    id={`role-${index}`}
                    onChange={handleCheckboxChange}
                    className="form-check-input"
                    disabled
                  />
                  <label className="form-check-label" htmlFor={`role-${index}`}>
                    {role}
                  </label>
                </div>
              ))}
            </div>
          </div>

            <div className="row mb-2">
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
              <label className="form-label">
                <b>ICT DEPARTMENT <i>(Use Only)</i></b>
              </label>
            </div>
            <div className="col-md-6">
              <label className="form-label">
                <b>Agent Name</b>
              </label>
              <input
                type="text"
                value={deptmanagerapproval}
                onChange={(e) => setDepartmentapproval(e.target.value)}
                className="form-control"
                disabled
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                <b>Authorised By</b>
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
                <b>Date</b>
              </label>
              <input
                type="text"
                value={deptmanagerapproval}
                onChange={(e) => setDepartmentapproval(e.target.value)}
                className="form-control"
                disabled
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                <b>Actioned By</b>
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
                <b>Date</b>
              </label>
              <input
                type="text"
                value={deptmanagerapproval}
                onChange={(e) => setDepartmentapproval(e.target.value)}
                className="form-control"
                disabled
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                <b>Reviewed By</b>
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
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
              <label className="form-label">
                <b>APPROVALS</b>
              </label>
            </div>
            <div className="col-md-6">
              <label className="form-label">
                <b>Head of Department</b>
              </label>
              <input
                type="text"
                value={deptmanagerapproval}
                onChange={(e) => setDepartmentapproval(e.target.value)}
                className="form-control"
                disabled
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                <b>IT Manager</b>
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

      

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default IvendModal;
