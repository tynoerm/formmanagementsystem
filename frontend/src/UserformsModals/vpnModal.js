import React, { useState, useEffect } from "react";
import { MdDomainDisabled } from "react-icons/md";
import axios from "axios";


const VpnModal = ({ showModal, setShowModal }) => {
  const [vpnRequestorname, setVpnrequestorname] = useState("");
  const [department, setDepartment] = useState("");
  const [username, setUsername] = useState("");
  const [vpnRequestorjobtitle, setVpnrequestorjobtitle] = useState("");
  const [vpnRequestoremail, setVpnrequestoremail] = useState("");

  const [headofdepartmentname, setHeadofdepartmentname] = useState("");
  const [headofdeptDepartment, setHeadofdeptdepartment] = useState("");
  const [headofdeptjobtitle, setHeadofdeptjobtitle] = useState("");
  const [headofdeptemail, setHeadofdeptemail] = useState("");

  const [raccesstocolcomservers, setRaccesstocolcomservers] = useState("");
  const [otherservices, setOtherservices] = useState("");
  const [durationStartdate, setDurationStartdate] = useState("");
  const [durationEnddate, setDurationEnddate] = useState("");

  const [computername, setComputername] = useState("");
  const [assettag, setAssettag] = useState("");
  const [model, setModel] = useState("");
  const [operatingsystem, setOperatingsystem] = useState("");

  const [deptManagerApproval, setDeptManagerApproval] = useState("unapproved");
const [itManagerApproval, setItManagerApproval] = useState("unapproved");
const [itExecutiveApproval, setItExecutiveApproval] = useState("unapproved");


  const [itauthourisedby, setItauthourisedby] = useState("");
  const [itactionedby, setItactionedby] = useState("");

const [showModal8, setShowModal8] = useState(true);

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
    vpnRequestorname,
    department,
    username,
    vpnRequestorjobtitle,
    vpnRequestoremail,

    headofdepartmentname,
    headofdeptDepartment,
    headofdeptjobtitle,
    headofdeptemail,

    raccesstocolcomservers,
    otherservices,
    durationStartdate,
    durationEnddate,

    computername,
    assettag,
    model,
    operatingsystem,

    deptManagerApproval,
    itManagerApproval,
    itExecutiveApproval,

    itauthourisedby,
    itactionedby,
  };

  try {
    const response = await axios.post("http://localhost:3001/vpn/create-vpn", formData);
    console.log("VPN Request submitted successfully:", response.data);

    // Clear all fields after successful submission
    setVpnrequestorname("");
    setDepartment("");
    setVpnrequestorjobtitle("");
    setVpnrequestoremail("");

    setHeadofdepartmentname("");
    setHeadofdeptdepartment("");
    setHeadofdeptjobtitle("");
    setHeadofdeptemail("");

    setRaccesstocolcomservers("");
    setOtherservices("");
    setDurationStartdate("");
    setDurationEnddate("");

    setComputername("");
    setAssettag("");
    setModel("");
    setOperatingsystem("");

    setDeptManagerApproval("unapproved");
    setItManagerApproval("unapproved");
    setItExecutiveApproval("unapproved");

    setItauthourisedby("");
    setItactionedby("");

    setShowModal(false);  // Close the modal
  } catch (error) {
    console.error("Failed to submit VPN Request:", error);
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
   <div style={styles.modalBackdrop} onClick={() => setShowModal8(false)}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h5 className="mb-4">
          <b><MdDomainDisabled /> VPN REQUEST FORM</b>
        </h5>

        <form onSubmit={handleSubmit}>
          <h6 className="col-12 text-center mb-3"><b>REQUESTOR INFORMATION</b></h6>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Name</label>
              <input type="text" className="form-control" value={vpnRequestorname} onChange={(e) => setVpnrequestorname(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label>Job Title</label>
              <input type="text" className="form-control" value={vpnRequestorjobtitle} onChange={(e) => setVpnrequestorjobtitle(e.target.value)} />
            </div>
            <div className="col-md-6 mt-2">
              <label>Department</label>
              <input type="text" className="form-control" value={department} onChange={(e) => setDepartment(e.target.value)} />
            </div>
            <div className="col-md-6 mt-2">
              <label>Username</label>
              <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="col-md-6 mt-2">
              <label>Email</label>
              <input type="email" className="form-control" value={vpnRequestoremail} onChange={(e) => setVpnrequestoremail(e.target.value)} />
            </div>
          </div>

          <h6 className="mt-4"><b>HEAD OF DEPARTMENT INFORMATION</b></h6>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Name</label>
              <input type="text"
               className="form-control" 
               value={headofdepartmentname} 
               onChange={(e) => setHeadofdepartmentname(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label>Job Title</label>
              <input type="text"
               className="form-control" 
               value={headofdeptjobtitle}
                onChange={(e) => setHeadofdeptjobtitle(e.target.value)} />
            </div>


            <div className="col-md-6 mt-2">
              <label>Department</label>
              <input type="text" 
              className="form-control"
               value={headofdeptDepartment} 
               onChange={(e) => setHeadofdeptdepartment(e.target.value)} />
            </div>
            <div className="col-md-6 mt-2">
              <label>Email</label>
              <input type="email"
               className="form-control" 
               value={headofdeptemail} 
               onChange={(e) => setHeadofdeptemail(e.target.value)} />
            </div>
          </div>

          <h6 className="mt-4"><b>ACCESS REQUEST</b></h6>
          <div className="mb-3">
            <label>Access to Colcom Servers</label>
            <input type="text" className="form-control" value={raccesstocolcomservers} onChange={(e) => setRaccesstocolcomservers(e.target.value)} />
          </div>
          <div className="mb-3">
            <label>Other Services</label>
            <input type="text" className="form-control" value={otherservices} onChange={(e) => setOtherservices(e.target.value)} />
          </div>

          <h6 className="mt-4"><b> ACCESS DURATION</b></h6>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Start Date</label>
              <input type="date" className="form-control" value={durationStartdate} onChange={(e) => setDurationStartdate(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label>End Date</label>
              <input type="date" className="form-control" value={durationEnddate} onChange={(e) => setDurationEnddate(e.target.value)} />
            </div>
          </div>

          <h6 className="mt-4"><b>REQUESTOR DEVICE INFORMATION</b></h6>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Computer Name</label>
              <input type="text" className="form-control" value={computername} onChange={(e) => setComputername(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label>Asset Tag</label>
              <input type="text" className="form-control" value={assettag} onChange={(e) => setAssettag(e.target.value)} />
            </div>
            <div className="col-md-6 mt-2">
              <label>Model</label>
              <input type="text" className="form-control" value={model} onChange={(e) => setModel(e.target.value)} />
            </div>
            <div className="col-md-6 mt-2">
              <label>Operating System</label>
              <input type="text" className="form-control" value={operatingsystem} onChange={(e) => setOperatingsystem(e.target.value)} />
            </div>
          </div>

<div className="row mb-4">
  <div className="col-12 text-center mb-3">
    <label className="form-label mb-0">
      <b>APPROVALS</b>
    </label>
  </div>

  <div className="col-md-4 mb-3">
    <label className="form-label">
      <b>Department Manager</b>
    </label>
    <button type="button" className="btn btn-danger w-100" disabled>
      <i> unapproved</i>
    </button>
  </div>

  <div className="col-md-4 mb-3">
    <label className="form-label">
      <b>IT Manager</b>
    </label>
    <button type="button" className="btn btn-danger w-100" disabled>
      <i> unapproved</i>
    </button>
  </div>

  <div className="col-md-4 mb-3">
    <label className="form-label">
      <b>IT Executive</b>
    </label>
    <button type="button" className="btn btn-danger w-100" disabled>
      <i> unapproved</i>
    </button>
  </div>
</div>


          <div className="mt-4">
            <button type="submit" className="btn btn-primary w-100">Submit VPN Request</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VpnModal;
