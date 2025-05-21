import React, { useEffect, useState } from "react";
import { FaInternetExplorer } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify"; // Add if using toast for feedback

const InternetaccessEdit = ({ item, setFormEntries }) => {
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
   const [username, setUsername] = useState("");
  const [daterequested, setDaterequested] = useState("");
  const [department, setDepartment] = useState("");
  const [daterequired, setDaterequired] = useState("");
  const [device, setDevice] = useState("");
  const [ipaddress, setIpaddress] = useState("");
  const [macaddress, setMacaddress] = useState("");
  const [businessjustification, setBusinessjustification] = useState("");
  const [itmanagerapproval, setItmanagerapproval] = useState("pending");
  const [itexcapproval, setItexecapproval] = useState("pending");
  const [showModal4, setShowModal4] = useState(true);


  const [role, setRole] = useState("")
  
    useEffect(() => {
      const storedRole = localStorage.getItem("role");
      if (storedRole) {
        setRole(storedRole);
      }
    })
  // Populate form fields on mount or item change
  useEffect(() => {
    if (item) {
      setFirstname(item.firstname || "");
      setSurname(item.surname || "");
      setUsername(item.username || "");
      setDaterequested(item.daterequested || "");
      setDepartment(item.department || "");
      setDaterequired(item.daterequired || "");
      setDevice(item.device || "");
      setIpaddress(item.ipaddress || "");
      setMacaddress(item.macaddress || "");
      setBusinessjustification(item.businessjustification || "");
      setItmanagerapproval(item.itmanagerapproval || "pending");
      setItexecapproval(item.itexecapproval || "pending"); // corrected key
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstname,
      surname,
      username,
      daterequested,
      department,
      daterequired,
      device,
      ipaddress,
      macaddress,
      businessjustification,
      itmanagerapproval,
      itexecapproval: itexcapproval, // corrected key
    };

    try {
      let response;
      if (item && item._id) {
        // Update mode
        response = await axios.put(
          `http://localhost:3001/internetaccess/update-internetaccess/${item._id}`,
          formData
        );
        toast.success("Request updated successfully!");
      } else {
        // Create mode (fallback)
        response = await axios.post(
          "http://localhost:3001/internetaccess/create-internetaccess",
          formData
        );
        toast.success("Form submitted successfully!");
        setFormEntries((prev) => [...prev, response.data]);
      }

      window.location.reload();
      setShowModal4(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form.");
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

  if (!showModal4) return null;

  return (
    <div style={styles.modalBackdrop}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h5 className="mb-3">
          <b><FaInternetExplorer /> &nbsp;Internet Access Request</b>
        </h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <b><i>(To be completed by the Applicant)</i></b>
          </div>

          {/* APPLICANT SECTION */}
          <div className="row mb-2">
            <div className="col-md-6">
              <label><b>First Name</b></label>
              <input type="text" className="form-control" value={firstname} onChange={(e) => setFirstname(e.target.value)} disabled />
            </div>
            <div className="col-md-6">
              <label><b>Surname</b></label>
              <input type="text" className="form-control" value={surname} onChange={(e) => setSurname(e.target.value)} disabled />
            </div>
                 <div className="col-md-6">
              <label><b>Username</b></label>
              <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} disabled />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-6">
              <label><b>Date Requested</b></label>
              <input type="date" className="form-control" value={daterequested} onChange={(e) => setDaterequested(e.target.value)} disabled />
            </div>
      <div className="col-md-6">
              <label className="form-label">
                <b>Department</b>
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="form-control"
                disabled
              >
                <option value="">-- Select Department --</option>
                <option value="finance">Finance</option>
                <option value="operations">Operations</option>
                <option value="sales">Sales</option>
                <option value="itdepartment">IT</option>
                <option value="retailshops">Retail Shops</option>
              </select>
            </div>
          </div>

          <div className="mb-2">
            <label><b>Date Required</b></label>
            <input type="date" className="form-control" value={daterequired} onChange={(e) => setDaterequired(e.target.value)} disabled />
          </div>

          {/* ICT SECTION */}
          <div className="mb-3 mt-4">
            <b>ICT DEPARTMENT<i> (Use Only)</i></b>
          </div>
          <div className="row mb-2">
            <div className="col-md-4">
              <label><b>Device</b></label>
              <input type="text" className="form-control" value={device} onChange={(e) => setDevice(e.target.value)} disabled />
            </div>
            <div className="col-md-4">
              <label><b>IP Address</b></label>
              <input type="text" className="form-control" value={ipaddress} onChange={(e) => setIpaddress(e.target.value)} disabled />
            </div>
            <div className="col-md-4">
              <label><b>MAC Address</b></label>
              <input type="text" className="form-control" value={macaddress} onChange={(e) => setMacaddress(e.target.value)} disabled />
            </div>
          </div>

          <div className="mb-2">
            <label><b>Business Justification</b></label>
            <textarea className="form-control" rows="3" value={businessjustification} onChange={(e) => setBusinessjustification(e.target.value)} />
          </div>

          {/* APPROVAL SECTION */}
          <div className="row mb-4">
            <div className="col-12 text-center mb-3">
              <label className="form-label mb-0"><b>APPROVALS</b></label>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label"><b>IT Manager</b></label>
              <select className="form-select w-100" 
              value={itmanagerapproval}
               onChange={(e) => setItmanagerapproval(e.target.value)} 
              disabled = {role !== "itmanager"}
              >
                <option value="pending"><i>Pending</i></option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label"><b>IT Executive</b></label>
              <select className="form-select w-100" value={itexcapproval} onChange={(e) => setItexecapproval(e.target.value)} disabled = {role !== "itexec"}>
               
                <option value="pending"><i>Pending</i></option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            {item?._id ? "Update Request" : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InternetaccessEdit;
