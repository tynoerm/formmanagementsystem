import React, { useState } from "react";
import { MdDomainDisabled } from "react-icons/md";
import { VscSourceControl } from "react-icons/vsc";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const ChangeofcontrolModal = ({ showModal, setShowModal }) => {
  const [changeofcontrolForm, setChangeofcontrolForm] = useState([]);
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
  const [changeddate, setChangeddate] = useState("");  // fixed setter name
  const [requestor, setRequestor] = useState("");
  const [requstordate, setRequestordate] = useState("");
  const [headofdept, setHeadofdept] = useState("unapproved");
  const [dateapprovedhd, setdateapprovedhd] = useState("");
  const [headofict, setHeadofict] = useState("unapproved");
  const [dateapprovedict, setDateapprovedict] = useState("");



  const [showModal5, setShowModal5] = useState(true);
const handleSubmit = async (e) => {
  e.preventDefault();

  const newRequest = {
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

    // convert empty strings to undefined for enum fields
    headofdept: headofdept === "" ? undefined : headofdept,
    dateapprovedhd: dateapprovedhd === "" ? undefined : dateapprovedhd,
    headofict: headofict === "" ? undefined : headofict,
    dateapprovedict: dateapprovedict === "" ? undefined : dateapprovedict,
  };

  try {
    const response = await axios.post(
      "http://localhost:3001/changeofcontrol/create-changeofcontrol",
      newRequest
    );

    setChangeofcontrolForm([...changeofcontrolForm, response.data]);

    // Clear form after successful submission
    setName("");
    setDepartment("");
    setDivision("");
    setDatesubmitted("");
    setWorkestimatedhours("");
    setSeverity("");
    setInternalserviceorder("");
    setProposedchange("");
    setObjectstobechanged("");
    setPurposeforchange("");
    setChangesmade("");
    setChangesconsultant("");
    setChangeddate("");
    setRequestor("");
    setRequestordate("");
    setHeadofdept("");
    setdateapprovedhd("");
    setHeadofict("");
    setDateapprovedict("");

    setShowModal5(false);

   toast.success("Change of Control submitted successfully!", {
  position: "center-center",  // <-- changed here
  autoClose: 5000,
  pauseOnHover: true,
  draggable: true,
});

  } catch (error) {
    console.error("Error submitting Change of Control:", error);

    toast.error("Failed to submit form. Please try again.", {
      position: "center-center",
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
    });
    setShowModal5(false)
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
    <div style={styles.modalBackdrop} onClick={() => setShowModal5(false)}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h5 className="mb-4">
          <b>
            <VscSourceControl /> CHANGE OF CONTROL FORM
          </b>
        </h5>
  <ToastContainer />
        <form onSubmit={handleSubmit}>
          <h6 className="mt-3">
            <b>1. Request Details</b>
          </h6>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label>Division</label>
              <input
                type="text"
                className="form-control"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
              />
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

            <div className="col-md-6 mt-2">
              <label>Date Submitted</label>
              <input
                type="date"
                className="form-control"
                value={datesubmitted}
                onChange={(e) => setDatesubmitted(e.target.value)}
              />
            </div>
            <div className="col-md-6 mt-2">
              <label>Estimated Work Hours</label>
              <input
                type="text"
                className="form-control"
                value={workestimatedhours}
                onChange={(e) => setWorkestimatedhours(e.target.value)}
              />
            </div>
          </div>

          <h6 className="mt-3">
            <b>2. Change Details</b>
          </h6>
          <div className="mb-3">
            <label>Severity</label>
            <input
              type="text"
              className="form-control"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Internal Service Order</label>
            <input
              type="text"
              className="form-control"
              value={internalserviceorder}
              onChange={(e) => setInternalserviceorder(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Proposed Change</label>
            <textarea
              className="form-control"
              value={proposedchange}
              onChange={(e) => setProposedchange(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Objects To Be Changed</label>
            <textarea
              className="form-control"
              value={objectstobechanged}
              onChange={(e) => setObjectstobechanged(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Purpose for Change</label>
            <textarea
              className="form-control"
              value={purposeforchange}
              onChange={(e) => setPurposeforchange(e.target.value)}
            />
          </div>

          <h6 className="mt-3">
            <b>3. Changes Made</b>
          </h6>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Changes Made</label>
              <textarea
                className="form-control"
                value={changesmade}
                onChange={(e) => setChangesmade(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label>By (Consultant)</label>
              <input
                type="text"
                className="form-control"
                value={changesconsultant}
                onChange={(e) => setChangesconsultant(e.target.value)}
              />
            </div>
            <div className="col-md-6 mt-2">
              <label>Change Date</label>
              <input
                type="date"
                className="form-control"
                value={changeddate}
                onChange={(e) => setChangeddate(e.target.value)}
              />
            </div>
          </div>

          <h6 className="mt-3">
            <b>4. Request Closure</b>
          </h6>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Requestor</label>
              <input
                type="text"
                className="form-control"
                value={requestor}
                onChange={(e) => setRequestor(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label>Date</label>
              <input
                type="date"
                className="form-control"
                value={requstordate}
                onChange={(e) => setRequestordate(e.target.value)}
              />
            </div>
          </div>

          <h6 className="mt-3">
            <b>5. Approvals</b>
          </h6>
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label>Head of Department</label>
              <button type="button" className="btn btn-danger w-100" disabled>
                <i>{headofdept && headofdept !== "unapproved" ? headofdept : "unapproved"}</i>
              </button>
            </div>
            <div className="col-md-6 mb-3">
              <label>Date Approved (HOD)</label>
              <button type="button" className="btn btn-danger w-100" disabled>
                <i>{dateapprovedhd ? new Date(dateapprovedhd).toLocaleDateString() : "unapproved"}</i>
              </button>
            </div>
            <div className="col-md-6 mb-3">
              <label>Head of ICT</label>
              <button type="button" className="btn btn-danger w-100" disabled>
                <i>{headofict && headofict !== "unapproved" ? headofict : "unapproved"}</i>
              </button>
            </div>
            <div className="col-md-6 mb-3">
              <label>Date Approved (ICT)</label>
              <button type="button" className="btn btn-danger w-100" disabled>
                <i>{dateapprovedict ? new Date(dateapprovedict).toLocaleDateString() : "unapproved"}</i>
              </button>
            </div>
          </div>

          <div className="mt-4">
            <button type="submit" className="btn btn-primary w-100">
              Submit Change of Control
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeofcontrolModal;
