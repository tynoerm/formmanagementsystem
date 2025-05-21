import React, { useState, useEffect } from "react";
import { MdDomainDisabled } from "react-icons/md";
import axios from "axios";


const VpnEdit = ({ item, setFormEntries }) => {
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
 
  const [role, setRole] =  useState("")





  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  })

  useEffect(() => {
    if (item) {
      setVpnrequestorname(item.vpnRequestorname || "");
      setDepartment(item.department || "");
      setUsername(item.username || "");
      setVpnrequestorjobtitle(item.vpnRequestorjobtitle || "");
      setVpnrequestoremail(item.vpnRequestoremail || "");
      setHeadofdepartmentname(item.headofdepartmentname || "");
      setHeadofdeptdepartment(item.headofdeptDepartment || "");
      setHeadofdeptjobtitle(item.headofdeptjobtitle || "");
      setHeadofdeptemail(item.headofdeptemail || "");

      setRaccesstocolcomservers(item.raccesstocolcomservers || "");
      setOtherservices(item.otherservices || "");
      setDurationStartdate(item.durationStartdate || "");
      setDurationEnddate(item.durationEnddate || "");

      setComputername(item.computername || "");
      setAssettag(item.assettag || "");
      setModel(item.model || "");
      setOperatingsystem(item.operatingsystem || "");

      setDeptManagerApproval(item.deptManagerApproval || "unapproved");
      setItManagerApproval(item.itManagerApproval || "unapproved");
      setItExecutiveApproval(item.itExecutiveApproval || "unapproved");


      setItauthourisedby(item.itauthourisedby || "");
      setItactionedby(item.itactionedby || "");

    }
  }, [item]);

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
      const response = await axios.put(`http://localhost:3001/vpn/update-vpn/${item._id}`, formData);
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
    <div style={styles.modalBackdrop} >
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h5 className="mb-4">
          <b><MdDomainDisabled /> VPN REQUEST UPDATE FORM</b>
        </h5>

        <form onSubmit={handleSubmit}>
          <h6 className="mt-3"><b>1. Requestor Information</b></h6>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Name</label>
              <input type="text"
               className="form-control"
                value={vpnRequestorname} 
                onChange={(e) => setVpnrequestorname(e.target.value)} 
                disabled
                />
            </div>


            <div className="col-md-6">
              <label>Job Title</label>
              <input type="text" className="form-control" value={vpnRequestorjobtitle} onChange={(e) => setVpnrequestorjobtitle(e.target.value)} disabled />
            </div>
            <div className="col-md-6 mt-2">
              <label>Department</label>
              <input type="text" className="form-control" value={department} onChange={(e) => setDepartment(e.target.value)} disabled />
            </div>
              <div className="col-md-6 mt-2">
              <label>Username</label>
              <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} disabled />
            </div>
            <div className="col-md-6 mt-2">
              <label>Email</label>
              <input type="email" className="form-control" value={vpnRequestoremail} onChange={(e) => setVpnrequestoremail(e.target.value)} disabled/>
            </div>
          </div>

          <h6 className="mt-4"><b>2. Head of Department Information</b></h6>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Name</label>
              <input type="text" className="form-control" value={headofdepartmentname} onChange={(e) => setHeadofdepartmentname(e.target.value)} disabled/>
            </div>
            <div className="col-md-6">
              <label>Job Title</label>
              <input type="text" className="form-control" value={headofdeptjobtitle} onChange={(e) => setHeadofdeptjobtitle(e.target.value)} disabled/>
            </div>
            <div className="col-md-6 mt-2">
              <label>Department</label>
              <input type="text" className="form-control" value={headofdeptDepartment} onChange={(e) => setHeadofdeptdepartment(e.target.value)} disabled/>
            </div>
            <div className="col-md-6 mt-2">
              <label>Email</label>
              <input type="email" className="form-control" value={headofdeptemail} onChange={(e) => setHeadofdeptemail(e.target.value)} disabled/>
            </div>
          </div>

          <h6 className="mt-4"><b>3. Access Request</b></h6>
          <div className="mb-3">
            <label>Access to Colcom Servers</label>
            <input type="text" className="form-control" value={raccesstocolcomservers} onChange={(e) => setRaccesstocolcomservers(e.target.value)} disabled/>
          </div>
          <div className="mb-3">
            <label>Other Services</label>
            <input type="text" className="form-control" value={otherservices} onChange={(e) => setOtherservices(e.target.value)} disabled/>
          </div>

          <h6 className="mt-4"><b>4. Access Duration</b></h6>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Start Date</label>
              <input type="date" className="form-control" value={durationStartdate} onChange={(e) => setDurationStartdate(e.target.value)} disabled/>
            </div>
            <div className="col-md-6">
              <label>End Date</label>
              <input type="date" className="form-control" value={durationEnddate} onChange={(e) => setDurationEnddate(e.target.value)} disabled/>
            </div>
          </div>

          <h6 className="mt-4"><b>5. Requestor Device Information</b></h6>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Computer Name</label>
              <input type="text" className="form-control" value={computername} onChange={(e) => setComputername(e.target.value)} disabled />
            </div>
            <div className="col-md-6">
              <label>Asset Tag</label>
              <input type="text" className="form-control" value={assettag} onChange={(e) => setAssettag(e.target.value)} disabled/>
            </div>
            <div className="col-md-6 mt-2">
              <label>Model</label>
              <input type="text" className="form-control" value={model} onChange={(e) => setModel(e.target.value)} disabled />
            </div>
            <div className="col-md-6 mt-2">
              <label>Operating System</label>
              <input type="text" className="form-control" value={operatingsystem} onChange={(e) => setOperatingsystem(e.target.value)} disabled/>
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
              <select
                className="form-select w-100"
                defaultValue="pending"
                onChange={(e) => setDeptManagerApproval(e.target.value)}
              disabled={role !== "deptmanager"}
              >
                <option value="unapproved"><i>Unapproved</i></option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">
                <b>IT Manager</b>
              </label>
              <select
                className="form-select w-100"
                defaultValue="unapproved"
                onChange={(e) => setItManagerApproval(e.target.value)}
                disabled={role !== "itmanager"}
              >
                <option value="unapproved"><i>Unapproved</i></option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">
                <b>IT Executive</b>
              </label>
              <select
                className="form-select w-100"
                defaultValue="unapproved"
                onChange={(e) => setItExecutiveApproval(e.target.value)}
                disabled={role !== "itexec"}
              >
                <option value="unapproved"><i>Unapproved</i></option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>


          <div className="mt-4">
            <button type="submit" className="btn btn-dark w-100"><b>SUBMIT VPN REQUEST</b></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VpnEdit;
