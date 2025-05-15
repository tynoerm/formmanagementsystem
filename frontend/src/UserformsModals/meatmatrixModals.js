import React, { useState } from "react";
import { LuFileInput } from "react-icons/lu";
import { GiMeatCleaver } from "react-icons/gi";

const MeatmatrixModal = () => {
  const [meatmatrixForm, setMeatmatrixform] = useState([]);
  const [fullname, setFullname] = useState("");
  const [jobtitle, setJobtitle] = useState("");
  const [store, setStore] = useState("");
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

  const [deptmanagerapproval, setDepartmentapproval] = useState("");
  const [itmanagerapproval, setItmanagerapproval] = useState("");
  const [rightsArray, setRightsArray] = useState([{ item: "", access: "" }]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [showModal3, setShowModal3] = useState(true);

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

  const handlemeatmatrixSubmit = (e) => {
    e.preventDefault();
    if (selectedRoles.length === 0) {
      alert("Please select at least one access right.");
      return;
    }

    const formEntry = {
      fullname,
      jobtitle,
      store,
      date,
      headofdepartmentname,
      from,
      to,
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

    setMeatmatrixform([...meatmatrixForm, formEntry]);

    // Reset all fields
    setFullname("");
    setJobtitle("");
    setStore("");
    setDate("");
    setHeadofdepartment("");
    setFrom("");
    setTo("");
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
            <div className="col-md-6">
              <label><b>Fullname</b></label>
              <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} className="form-control" required />
            </div>
            <div className="col-md-6">
              <label><b>Job Title</b></label>
              <input type="text" value={jobtitle} onChange={(e) => setJobtitle(e.target.value)} className="form-control" required />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-6">
              <label><b>Store</b></label>
              <input type="text" value={store} onChange={(e) => setStore(e.target.value)} className="form-control" required />
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

          <div className="row mb-2">
            <div className="col-md-6">
              <label><b>From</b></label>
              <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} className="form-control" />
            </div>
            <div className="col-md-6">
              <label><b>To</b></label>
              <input type="text" value={to} onChange={(e) => setTo(e.target.value)} className="form-control" />
            </div>
          </div>

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
              <input type="text" value={terminatedby} onChange={(e) => setTerminatedby(e.target.value)} className="form-control" disabled/>
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

          <div className="row mb-2">
            <div className="col-md-6">
              <label><b>Head of Department Approval</b></label>
              <input type="text" value={deptmanagerapproval} onChange={(e) => setDepartmentapproval(e.target.value)} className="form-control" disabled />
            </div>
            <div className="col-md-6">
              <label><b>IT Manager Approval</b></label>
              <input type="text" value={itmanagerapproval} onChange={(e) => setItmanagerapproval(e.target.value)} className="form-control" disabled />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default MeatmatrixModal;
