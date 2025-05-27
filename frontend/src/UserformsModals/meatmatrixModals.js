import React, { useState, useEffect } from "react";
import { LuFileInput } from "react-icons/lu";
import { GiMeatCleaver } from "react-icons/gi";
import axios from "axios";





const MeatmatrixModal = () => {
  const [meatmatrixForm, setMeatmatrixform] = useState([]);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [jobtitle, setJobtitle] = useState("");
  const [store, setStore] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");

  const [headofdepartmentname, setHeadofdepartment] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [authoriseddatabase, setAuthoriseddatabase] = useState("");
  const [datetermination, setDatetermination] = useState("");
  const [time, setTime] = useState("");
  const [terminatedby, setTerminatedby] = useState("");

  const [userCode, setUsercode] = useState("");
  const [userId, setUserid] = useState("");
  const [costCenter, setCostcenter] = useState("");
  const [stationNumber, setStationnumber] = useState("");
  const [processId, setProcessid] = useState("");
  const [authorisedBy, setAuthorisedby] = useState("");
  const [actionedBy, setActionedby] = useState("");
  const [date1, setDate1] = useState("");

  const [deptmanagerapproval, setDepartmentapproval] = useState("pending");
  const [itmanagerapproval, setItmanagerapproval] = useState("pending");
  const [rightsArray, setRightsArray] = useState([{ item: "", access: "" }]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [showModal3, setShowModal3] = useState(true);

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


  const [stockTransferLocations, setStockTransferLocations] = useState([{ from: "", to: "" }]);

  const roles = [
    "PRODUCTION",
    "STOCK BATCHES",
    "RETAIL",
    "FEEDLOT",
    "DESPATCHING",
    "MANAGEMENT",
    "PALETTE STOCK",
    "GRADING",
  ];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedRoles((prev) => [...prev, value]);
    } else {
      setSelectedRoles((prev) => prev.filter((role) => role !== value));
    }
  };

  const handlemeatmatrixSubmit = async (e) => {
    e.preventDefault();

    if (selectedRoles.length === 0) {
      alert("Please select at least one access right.");
      return;
    }

    // Convert from/to strings to numbers (optional, if you want them as numbers)
    const cleanedStockLocations = stockTransferLocations.map(({ from, to }) => ({
      from: Number(from),
      to: Number(to),
    }));

    const formEntry = {
      fullname,
      username,
      jobtitle,
      store,
      department,
      date,
      headofdepartmentname,
      stockTransferLocations: cleanedStockLocations, // <-- send array here
      authoriseddatabase,
      datetermination,
      time,
      terminatedby,
      userCode,
      userId,
      costCenter,
      stationNumber,
      processId,
      authorisedBy,
      actionedBy,
      date1,
      deptmanagerapproval,
      itmanagerapproval,
      rights: selectedRoles,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/meatmatrix/create-meatmatrix",
        formEntry
      );
      console.log("Form submitted successfully", response.data);

      window.location.reload();

      // Reset all fields on successful submit
      setFullname("");
      setUsername("");
      setJobtitle("");
      setStore("");
      setDepartment("");
      setDate("");
      setHeadofdepartment("");
      setStockTransferLocations([{ from: "", to: "" }]); // reset array state
      setAuthoriseddatabase("");
      setDatetermination("");
      setTime("");
      setTerminatedby("");
      setUsercode("");
      setUserid("");
      setCostcenter("");
      setStationnumber("");
      setProcessid("");
      setAuthorisedby("");
      setActionedby("");
      setDate1("");
      setDepartmentapproval("");
      setItmanagerapproval("");
      setRightsArray([{ item: "", access: "" }]);
      setSelectedRoles([]);
      setShowModal3(false);
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Failed to submit form. Please try again later.");
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

  if (!showModal3) return null;

  return (
    <div style={styles.modalBackdrop} onClick={() => setShowModal3(false)}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h5 className="mb-3">
          <b><GiMeatCleaver /> &nbsp;MEAT MATRIX FORM</b>
        </h5>
        <form onSubmit={handlemeatmatrixSubmit}>
          <div className="row mb-2">
            <div className="col-md-4">
              <label><b>Fullname</b></label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-4">
              <label><b>Username</b></label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-4">
              <label><b>Job Title</b></label>
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
              <label><b>Store</b></label>
              <input type="text" value={store} onChange={(e) => setStore(e.target.value)} className="form-control" required />
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
            <div className="col-md-6">
              <label><b>Date</b></label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control" required />
            </div>
          </div>

          <div className="mb-3">
            <label><b>H.O.D Name</b></label>
            <input type="text" value={headofdepartmentname} onChange={(e) => setHeadofdepartment(e.target.value)} className="form-control" />
          </div>

          <label>AUTHORISED STOCK TRANSFER LOCATION</label>
          {stockTransferLocations.map((location, index) => (
            <div className="row mb-2" key={index}>
              <div className="col-md-5">
                <label><b>From</b></label>
                <input
                  type="number"
                  value={location.from}
                  onChange={(e) => {
                    const newLocations = [...stockTransferLocations];
                    newLocations[index].from = e.target.value;
                    setStockTransferLocations(newLocations);
                  }}
                  className="form-control"
                  min={0}  // optionally prevent negative numbers
                  step={1} // integer steps only
                />
              </div>
              <div className="col-md-5">
                <label><b>To</b></label>
                <input
                  type="number"
                  value={location.to}
                  onChange={(e) => {
                    const newLocations = [...stockTransferLocations];
                    newLocations[index].to = e.target.value;
                    setStockTransferLocations(newLocations);
                  }}
                  className="form-control"
                  min={0}
                  step={1}
                />
              </div>
              <div className="col-md-2 d-flex align-items-end">
                {stockTransferLocations.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      const newLocations = stockTransferLocations.filter((_, i) => i !== index);
                      setStockTransferLocations(newLocations);
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-secondary mb-3"
            onClick={() => setStockTransferLocations([...stockTransferLocations, { from: "", to: "" }])}
          >
            Add Location
          </button>





          <div className="row mb-2">
            <div className="col-md-6">
              <label><b>Authorised Database</b></label>
              <input type="text" value={authoriseddatabase} onChange={(e) => setAuthoriseddatabase(e.target.value)} className="form-control" />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-4">
              <label><b>Termination Date</b></label>
              <input type="date" value={datetermination} onChange={(e) => setDatetermination(e.target.value)} className="form-control" disabled />
            </div>
            <div className="col-md-4">
              <label><b>Time</b></label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="form-control" disabled />
            </div>
            <div className="col-md-4">
              <label><b>Terminated By</b></label>
              <input type="text" value={terminatedby} onChange={(e) => setTerminatedby(e.target.value)} className="form-control" disabled />
            </div>
          </div>

          <div className="mb-3 text-center">
            <b>ACCESS RIGHTS</b>
          </div>
          <div className="mb-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
            {roles.map((role, index) => (
              <div key={index} className="form-check" style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  value={role}
                  id={`role-${index}`}
                  onChange={handleCheckboxChange}
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor={`role-${index}`}>{role}</label>
              </div>
            ))}
          </div>

          <div className="mb-2 text-center">
            <b>ICT DEPARTMENT</b>
          </div>
          <div className="row mb-2">
            {[
              ["User Code", userCode, setUsercode],
              ["User ID", userId, setUserid],
              ["Cost Center", costCenter, setCostcenter],
              ["Station Number", stationNumber, setStationnumber],
              ["Process ID", processId, setProcessid],
              ["Authorised By", authorisedBy, setAuthorisedby],
              ["Actioned By", actionedBy, setActionedby],
              ["Date", date1, setDate1],
            ].map(([label, value, setter], idx) => (
              <div key={idx} className="col-md-3 mb-2">
                <label><b>{label}</b></label>
                <input type="text" value={value} onChange={(e) => setter(e.target.value)} className="form-control" disabled />
              </div>
            ))}
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
          <button type="submit" className="btn btn-dark w-100"><b>SUBMIT</b></button>
        </form>
      </div>
    </div>
  );
};

export default MeatmatrixModal;
