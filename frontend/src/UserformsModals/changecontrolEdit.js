import React, { useState, useEffect } from "react";
import { MdDomainDisabled } from "react-icons/md";
import { VscSourceControl } from "react-icons/vsc";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangeofcontrolEdit = ({ item, setFormEntries }) => {
  const [name, setName] = useState("");
  const [division, setDivision] = useState("");
  const [department, setDepartment] = useState("");
  const [datesubmitted, setDatesubmitted] = useState("");
  const [workestimatedhours, setWorkestimatedhours] = useState("");
  const [severity, setSeverity] = useState("");
  const [internalserviceorder, setInternalserviceorder] = useState("");
  const [proposedchange, setProposedchange] = useState("");
  const [objectstobechanged, setObjectstobechanged] = useState("");
  const [purposeforchange, setPurposeforchange] = useState("");
  const [changesmade, setChangesmade] = useState("");
  const [changesconsultant, setChangesconsultant] = useState("");
  const [changeddate, setChangeddate] = useState("");
  const [requestor, setRequestor] = useState("");
  const [requstordate, setRequstordate] = useState("");
  const [headofdept, setHeadofdept] = useState("");
  const [dateapprovedhd, setDateapprovedhd] = useState("");
  const [headofict, setHeadofict] = useState("");
  const [dateapprovedict, setDateapprovedict] = useState("");

  useEffect(() => {
    if (item) {
      setName(item.name || "");
      setDivision(item.division || "");
      setDepartment(item.department || "");
      setDatesubmitted(item.datesubmitted || "");
      setWorkestimatedhours(item.workestimatedhours || "");
      setSeverity(item.severity || "");
      setInternalserviceorder(item.internalserviceorder || "");
      setProposedchange(item.proposedchange || "");
      setObjectstobechanged(item.objectstobechanged || "");
      setPurposeforchange(item.purposeforchange || "");
      setChangesmade(item.changesmade || "");
      setChangesconsultant(item.changesconsultant || "");
      setChangeddate(item.changeddate || "");
      setRequestor(item.requestor || "");
      setRequstordate(item.requstordate || "");
      setHeadofdept(item.headofdept || "");
      setDateapprovedhd(item.dateapprovedhd || "");
      setHeadofict(item.headofict || "");
      setDateapprovedict(item.dateapprovedict || "");
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      division,
      department,
      datesubmitted,
      workestimatedhours,
      severity,
      internalserviceorder,
      proposedchange,
      objectstobechanged,
      purposeforchange,
      changesmade,
      changesconsultant,
      changeddate,
      requestor,
      requstordate,
      headofdept,
      dateapprovedhd,
      headofict,
      dateapprovedict,
    };

    try {
      const endpoint = item
        ? `http://localhost:3001/changeofcontrol/update-changeofcontrol/${item._id}`
        : "http://localhost:3001/changeofcontrol/create-changeofcontrol";
      const method = item ? axios.put : axios.post;

      await method(endpoint, data);

      toast.success(`Change of Control ${item ? "updated" : "submitted"} successfully!`, {
        position: "top-center",
        autoClose: 5000,
      });

      setFormEntries(false);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting Change of Control:", error);
      toast.error("Failed to submit form. Please try again.", {
        position: "top-center",
        autoClose: 5000,
      });
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
    },
  };

  return (
    <div style={styles.modalBackdrop}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h5 className="mb-4">
          <b>
            <VscSourceControl /> {item ? "EDIT" : "NEW"} CHANGE OF CONTROL FORM
          </b>
        </h5>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <h6 className="mt-3"><b>1. Request Details</b></h6>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Name</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label>Division</label>
              <input type="text" className="form-control" value={division} onChange={(e) => setDivision(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label>Department</label>
              <select className="form-control" value={department} onChange={(e) => setDepartment(e.target.value)} required>
                <option value="">-- Select Department --</option>
                <option value="finance">Finance</option>
                <option value="operations">Operations</option>
                <option value="sales">Sales</option>
                <option value="itdepartment">IT</option>
                <option value="retailshops">Retail Shops</option>
              </select>
            </div>
            <div className="col-md-6 mt-2">
              <label>Date Submitted</label>
              <input type="date" className="form-control" value={datesubmitted} onChange={(e) => setDatesubmitted(e.target.value)} />
            </div>
            <div className="col-md-6 mt-2">
              <label>Estimated Work Hours</label>
              <input type="text" className="form-control" value={workestimatedhours} onChange={(e) => setWorkestimatedhours(e.target.value)} />
            </div>
          </div>

          <h6 className="mt-3"><b>2. Change Details</b></h6>
          {[
            { label: "Severity", state: severity, setter: setSeverity },
            { label: "Internal Service Order", state: internalserviceorder, setter: setInternalserviceorder },
            { label: "Proposed Change", state: proposedchange, setter: setProposedchange },
            { label: "Objects To Be Changed", state: objectstobechanged, setter: setObjectstobechanged },
            { label: "Purpose For Change", state: purposeforchange, setter: setPurposeforchange },
          ].map(({ label, state, setter }) => (
            <div className="mb-3" key={label}>
              <label>{label}</label>
              <textarea className="form-control" value={state} onChange={(e) => setter(e.target.value)} />
            </div>
          ))}

          <h6 className="mt-3"><b>3. Changes Made</b></h6>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Changes Made</label>
              <textarea className="form-control" value={changesmade} onChange={(e) => setChangesmade(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label>By (Consultant)</label>
              <input type="text" className="form-control" value={changesconsultant} onChange={(e) => setChangesconsultant(e.target.value)} />
            </div>
            <div className="col-md-6 mt-2">
              <label>Change Date</label>
              <input type="date" className="form-control" value={changeddate} onChange={(e) => setChangeddate(e.target.value)} />
            </div>
          </div>

          <h6 className="mt-3"><b>4. Request Closure</b></h6>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Requestor</label>
              <input type="text" className="form-control" value={requestor} onChange={(e) => setRequestor(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label>Date</label>
              <input type="date" className="form-control" value={requstordate} onChange={(e) => setRequstordate(e.target.value)} />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-12 text-center mb-3">
              <label className="form-label mb-0"><b>APPROVALS</b></label>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label"><b>Head of Department</b></label>
              <select className="form-select w-100" value={headofdept} onChange={(e) => setHeadofdept(e.target.value)}>
              <option value="unapproved"><i>Unapproved</i></option>   
                <option value="pending"><i>Pending</i></option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label"><b>IT Manager</b></label>
              <select className="form-select w-100" value={headofict} onChange={(e) => setHeadofict(e.target.value)} disabled>
                <option value="pending"><i>Pending</i></option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <button type="submit" className="btn btn-primary w-100">
              {item ? "Update" : "Submit"} Change of Control
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeofcontrolEdit;
