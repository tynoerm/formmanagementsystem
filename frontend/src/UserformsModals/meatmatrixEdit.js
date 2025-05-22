import React, { useState, useEffect } from "react";
import { LuFileInput } from "react-icons/lu";
import { GiMeatCleaver } from "react-icons/gi";
import axios from "axios";





const MeatmatrixEdit = ({ item, setFormEntries }) => {
  const [meatmatrixForm, setMeatmatrixform] = useState([]);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
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

  const [deptmanagerapproval, setDepartmentapproval] = useState("pending");
  const [itmanagerapproval, setItmanagerapproval] = useState("pending");
  const [rightsArray, setRightsArray] = useState([{ item: "", access: "" }]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [showModal3, setShowModal3] = useState(true);


  const [stockTransferLocations, setStockTransferLocations] = useState([{ from: "", to: "" }]);


  const [role, setRole] = useState("")



  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  })


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

  useEffect(() => {
    if (item) {
      setFullname(item.fullname || "");
      setUsername(item.username || "");
      setJobtitle(item.jobtitle || "");
      setStore(item.store || "");
      setDate(item.date || "");
      setHeadofdepartment(item.headofdepartmentname || "");
      setFrom(item.from || "");
      setTo(item.to || "");
      setAuthoriseddatabase(item.authoriseddatabase || "");
      setDatetermination(item.datetermination || "");
      setTime(item.time || "");
      setTerminatedby(item.terminatedby || "");

      setUsercode(item.userCode || "");
      setUserid(item.userId || "");
      setCostcenter(item.costCenter || "");
      setStationnumber(item.stationNumber || "");
      setProcessid(item.processId || "");
      setAuthorisedby(item.authorisedBy || "");
      setActionedby(item.actionedBy || "");
      setDate1(item.date1 || "");

      setDepartmentapproval(item.deptmanagerapproval || "pending");
      setItmanagerapproval(item.itmanagerapproval || "pending");
      setRightsArray(item.rightsArray || [{ item: "", access: "" }]);
      setSelectedRoles(item.selectedRoles || []);
      setStockTransferLocations(item.stockTransferLocations || [{ from: "", to: "" }]);
    }
  }, [item]);



  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedRoles((prev) => [...prev, value]);
    } else {
      setSelectedRoles((prev) => prev.filter((role) => role !== value));
    }
  };

  const cleanedStockLocations = stockTransferLocations.map(({ from, to }) => ({
    from: Number(from),
    to: Number(to),
  }));


  const handlemeatmatrixSubmit = async (e) => {
    e.preventDefault();

    const formEntry = {
      fullname,
      username,
      jobtitle,
      store,
      date,
      headofdepartmentname,
      stockTransferLocations: cleanedStockLocations,
      authoriseddatabase,
      datetermination,
      time,
      terminatedby,
      userCode,
      userId, // important for identifying the record
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
      const response = await axios.put(
        `http://localhost:3001/meatmatrix/update-meatmatrix/${item._id}`, // or item._id or whatever your id field is
        formEntry
      );

      console.log("Form updated successfully", response.data);

      window.location.reload();

      // Reset form
      setFullname("");
      setUsername("");
      setJobtitle("");
      setStore("");
      setDate("");
      setHeadofdepartment("");
      setStockTransferLocations([{ from: "", to: "" }]);
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
      setDepartmentapproval("pending");
      setItmanagerapproval("pending");
      setRightsArray([{ item: "", access: "" }]);
      setSelectedRoles([]);
      setShowModal3(false);
    } catch (error) {
      console.error("Error updating form", error);
      alert("Failed to update form. Please try again later.");
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
    <div style={styles.modalBackdrop} >
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h5 className="mb-3">
          <b><GiMeatCleaver /> &nbsp;MEAT MATRIX FORM UPDATE</b>
        </h5>
        <form onSubmit={handlemeatmatrixSubmit}>
          <div className="row mb-2">
            <div className="col-md-6">
              <label><b>Fullname</b></label>
              <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} className="form-control" disabled />
            </div>

            <div className="col-md-6">
              <label><b>Fullname</b></label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" disabled />
            </div>
            <div className="col-md-6">
              <label><b>Job Title</b></label>
              <input type="text" value={jobtitle} onChange={(e) => setJobtitle(e.target.value)} className="form-control" disabled />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-6">
              <label><b>Store</b></label>
              <input type="text" value={store} onChange={(e) => setStore(e.target.value)} className="form-control" disabled />
            </div>
            <div className="col-md-6">
              <label><b>Date</b></label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control" disabled />
            </div>
          </div>

          <div className="mb-3">
            <label><b>H.O.D Name</b></label>
            <input type="text" value={headofdepartmentname} onChange={(e) => setHeadofdepartment(e.target.value)} className="form-control" disabled />
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
                  disabled
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
                  disabled
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
                    disabled
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
            disabled
          >
            Add Location
          </button>

          <div className="row mb-2">
            <div className="col-md-6">
              <label><b>Authorised Database</b></label>
              <input type="text" value={authoriseddatabase} onChange={(e) => setAuthoriseddatabase(e.target.value)} className="form-control" disabled />
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
              ["Date", date, setDate1], // <-- use date as value, setDate1 as setter
            ].map(([label, value, setter], idx) => (
              <div key={idx} className="col-md-3 mb-2">
                <label><b>{label}</b></label>
                <input
                  type={label === "Date" ? "date" : "text"}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="form-control"
                  disabled={role !== "itmanagement"}
                />
              </div>
            ))}
          </div>



          <div className="row mb-4">
            <div className="col-12 text-center mb-3">
              <label className="form-label mb-0"><b>APPROVALS</b></label>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label"><b>Head of Department</b></label>
              <select
                className="form-select w-100"
                defaultValue="pending"
                onChange={(e) => setDepartmentapproval(e.target.value)}
                disabled={role !== "deptmanager"}
              >
                <option value="pending"><i>Pending</i></option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label"><b>IT Manager</b></label>
              <select className="form-select w-100" defaultValue="pending"
                onChange={(e) => setItmanagerapproval(e.target.value)}
                disabled={role !== "itmanager"} >
                <option value="pending"><i>Pending</i></option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default MeatmatrixEdit;
