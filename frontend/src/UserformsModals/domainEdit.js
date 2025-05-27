import React, { useState, useEffect } from "react";
import { MdDomainDisabled } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DomainEdit = ({ item, setFormEntries }) => {
  const [fullname, setFullname] = useState("");
  const [jobtitle, setJobtitle] = useState("");
  const [department, setDepartment] = useState("");
  const [division, setDivision] = useState("");
  const [managersname, setManagername] = useState("");
  const [date, setDate] = useState("");
  const [username, setUsername] = useState("");
  const [domain, setDomain] = useState("");
  const [organisationunit, setOrgnaisationunit] = useState("");
  const [computername, setComputername] = useState("");
  const [authorisedby, setAuthorisedby] = useState("");
  const [date1, setDate1] = useState("");
  const [headofdepartmentname, setHeadofdepartmentname] = useState("");
  const [deptmanagerapproval, setDepartmentapproval] = useState("pending");
  const [itmanagerapproval, setItmanagerapproval] = useState("pending");
  const [memberships, setMemberships] = useState([""]);
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

    useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    if (item) {
      setFullname(item.fullName || "");
      setJobtitle(item.jobtitle || "");
      setDepartment(item.department || "");
      setDivision(item.division || "");
      setManagername(item.managersname || "");
      setDate(item.date ? item.date.split("T")[0] : "");
      setUsername(item.username || "");
      setDomain(item.domain || "");
      setOrgnaisationunit(item.organisationunit || "");
      setComputername(item.computername || "");
      setAuthorisedby(item.authorisedby || "");
      setDate1(item.date1 ? item.date1.split("T")[0] : "");
      setHeadofdepartmentname(item.headofdepartmentname || "");
      setDepartmentapproval(item.deptmanagerapproval || "pending");
      setItmanagerapproval(item.itmanagerapproval || "pending");
      setMemberships(item.memberships || [""]);
    }
  }, [item]);

  const handleChange = (index, value) => {
    const updated = [...memberships];
    updated[index] = value;
    setMemberships(updated);
  };

  const handleAdd = () => {
    setMemberships([...memberships, ""]);
  };

  const handleRemove = (index) => {
    const updated = memberships.filter((_, i) => i !== index);
    setMemberships(updated);
  };

  const handleCheckboxChange = (value) => {
    if (memberships.includes(value)) {
      setMemberships(memberships.filter((item) => item !== value));
    } else {
      setMemberships([...memberships, value]);
    }
  };

  const checkboxGroups = [
    "Domain Users",
    "Enterprise Admins",
    "Domain Admins",
    "Backup Operators",
  ];

  const handledomainSubmit = async (e) => {
    e.preventDefault();

    const formEntry = {
      fullName: fullname,
      jobtitle,
      department,
      division,
      managersname,
      date,
      username,
      organisationunit,
      domain,
      computername,
      authorisedby,
      date1,
      headofdepartmentname,
      deptmanagerapproval,
      itmanagerapproval,
      memberships,
    };

    try {
      await axios.put(
        `http://localhost:3001/domainaccess/update-domainaccess/${item._id}`,
        formEntry
      );

      toast.success("Form Submitted Successfully!");
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.error("Submission error:", error.response.data);
        toast.error(
          `Submission failed: ${error.response.data.message || "Server error"}`
        );
      } else {
        console.error("Network error:", error);
        toast.error("Network error occurred. Please try again.");
      }
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
    <div style={styles.modalBackdrop}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h5 className="mb-3">
          <b>
            <MdDomainDisabled /> &nbsp;DOMAIN APPROVALS EDIT
          </b>
        </h5>
        <form onSubmit={handledomainSubmit}>
          {/* Basic Info */}
          <div className="row mb-2">
            <div className="col-md-6">
              <label className="form-label">
                <b>Fullname</b>
              </label>
              <input type="text" value={fullname} className="form-control" disabled />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                <b>Job Title</b>
              </label>
              <input type="text" value={jobtitle} className="form-control" disabled />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-6">
              <label className="form-label"><b>Department</b></label>
              <select value={department} className="form-control" disabled>
                <option value="">-- Select Department --</option>
                <option value="finance">Finance</option>
                <option value="operations">Operations</option>
                <option value="sales">Sales</option>
                <option value="itdepartment">IT</option>
                <option value="retailshops">Retail Shops</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label"><b>Division</b></label>
              <input type="text" value={division} className="form-control" disabled />
            </div>
          </div>

          {/* Manager Info */}
          <div className="row mb-2">
            <div className="col-md-6">
              <label className="form-label"><b>Manager's Name</b></label>
              <input type="text" value={managersname} className="form-control" disabled />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-6">
              <label className="form-label"><b>Date</b></label>
              <input type="date" value={date} className="form-control" disabled />
            </div>
          </div>

          {/* IT Department Section */}
          <div className="mb-3">
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
              <label className="form-label">
                <b>MEMBER OF <i>(ICT DEPARTMENT USE ONLY)</i></b>
              </label>
            </div>
            <div className="container">
              <div className="row">
                {checkboxGroups.map((group, index) => (
                  <div className="col-6" key={index}>
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={group}
                        id={group.replace(/\s/g, "")}
                        checked={memberships.includes(group)}
                        onChange={() => handleCheckboxChange(group)}
                        disabled={role !== "itmanagement"}
                      />
                      <label className="form-check-label" htmlFor={group.replace(/\s/g, "")}>
                        {group}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Memberships */}
          <div className="mb-3">
            <label className="form-label fw-bold">State other Distribution or Group Memberships</label>
            {memberships
              .filter((val) => !checkboxGroups.includes(val))
              .map((value, index) => (
                <div key={index} className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    value={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    disabled={role !== "itmanagement"}
                  />
                  {memberships.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => handleRemove(index)}
                      disabled={role !== "itmanagement"}
                    >
                      <b><i>X</i></b>
                    </button>
                  )}
                </div>
              ))}
            <button type="button" className="btn btn-outline-primary" onClick={handleAdd} disabled={role !== "itmanagement"}>
              Add Another
            </button>
          </div>

          {/* Domain Details */}
          <div className="row mb-2">
            <div className="col-md-6">
              <label className="form-label"><b>Username</b></label>
              <input type="text" value={username} className="form-control" disabled={role !== "itmanagement"} />
            </div>
            <div className="col-md-6">
              <label className="form-label"><b>Organisation Unit <i>(OU)</i></b></label>
              <input type="text" value={organisationunit} className="form-control"
              onChange={(e) => setOrgnaisationunit(e.target.value)}
              disabled={role !== "itmanagement"} />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-6">
              <label className="form-label"><b>Domain</b></label>
              <input type="text" value={domain} className="form-control" 
              onChange={(e) => setDomain(e.target.value)}
              disabled={role !== "itmanagement"} />
            </div>
            <div className="col-md-6">
              <label className="form-label"><b>Computer Name</b></label>
              <input type="text" value={computername} className="form-control"
              onChange={(e) => setComputername(e.target.value)}
              disabled={role !== "itmanagement"} />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-6">
              <label className="form-label"><b>Authorised By</b></label>
              <input type="text" value={authorisedby} className="form-control"
              onChange={(e) => setAuthorisedby(e.target.value)}
              disabled={role !== "itmanagement"} />
            </div>
            <div className="col-md-6">
              <label className="form-label"><b>Date</b></label>
              <input type="date" value={date} className="form-control"
              onChange={(e) => setDate(e.target.value)}
              disabled={role !== "itmanagement"} />
            </div>
          </div>

          {/* Approvals */}
          <div className="row mb-4">
            <div className="col-12 text-center mb-3">
              <label className="form-label mb-0"><b>APPROVALS</b></label>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label"><b>Head of Department</b></label>
              <select
                className="form-select w-100"
                value={deptmanagerapproval}
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
              <select
                className="form-select w-100"
                value={itmanagerapproval}
                onChange={(e) => setItmanagerapproval(e.target.value)}
                disabled={role !== "itmanager"}
              >
                <option value="pending"><i>Pending</i></option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-dark w-100"><b>SUBMIT</b></button>
        </form>
      </div>
    </div>
  );
};

export default DomainEdit;
