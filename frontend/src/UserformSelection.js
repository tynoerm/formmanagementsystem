import React, { useState } from "react";

import { GrCloudSoftware } from "react-icons/gr";
import { SiBmcsoftware, SiEsotericsoftware } from "react-icons/si";
import { Link } from "react-router-dom";
import { LuFileInput } from "react-icons/lu";

import { FaInternetExplorer, FaWarehouse, FaUserCheck } from "react-icons/fa";

import { IoLaptopSharp } from "react-icons/io5";
import { AiOutlineControl } from "react-icons/ai";

import { TbDeviceIpadHorizontalDown } from "react-icons/tb";

import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineVpnLock } from "react-icons/md";



import IvendModal from "./UserformsModals/ivendModal";
import DomainModal from "./UserformsModals/domainModal.js"



const UserformSelection = () => {
  const [ivendForm, setIvendform] = useState([]);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [department, setDepartment] = useState("");
  const [deptmanagername, setDeptmanagername] = useState("");
  const [deptmanagerapproval, setDepartmentapproval] = useState("");
  const [itmanagerapproval, setItmanagerapproval] = useState("");

  const [rightsArray, setRightsArray] = useState([{ item: "", access: "" }]);
  const [error, setError] = useState("");

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [showModal6, setShowModal6] = useState(false);
  const [showModal7, setShowModal7] = useState(false);
    const [showModal8, setShowModal8] = useState(false);
 

  const addRight = () => {
    setRightsArray([...rightsArray, { item: "", access: "" }]);
  };

  const removeRight = (index) => {
    const newRights = [...rightsArray];
    newRights.splice(index, 1);
    setRightsArray(newRights);
  };

  const handleRightChange = (index, field, value) => {
    const newRights = [...rightsArray];
    newRights[index][field] = value;
    setRightsArray(newRights);
  };

 

  const handleAccountingSubmit = (e) => {

  }

  const handleMeatmatrixSubmit = (e) => {

  }
   
  const styles = {
  dashboardContent: { padding: '2rem' },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    gap: '0.5rem',
  },
  icon: {
    fontSize: '1.5rem',
    color: '#007bff',
  },
  modalBackdrop: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    width: '900px',
    maxHeight: '90vh',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left', // Align content to the left
  },
  closeButton: {
    marginTop: '1rem',
  },
};


  return (
    <div>
      <nav className="navbar border-bottom shadow-lg p-2 mb-0 rounded" style={{ backgroundColor: 'black' }}>
        <div className="container-fluid">
          <span className="navbar-brand text-white">
            <LuLayoutDashboard style={styles.icon} /> &nbsp;
            <b>USER FORM SELECTION</b>
          </span>
        </div>
      </nav>

      <div style={styles.dashboardContent}>
        <div className="row row-cols-1 row-cols-md-4 g-4">

          <div className="col">
            <div className="card shadow-lg rounded" onClick={() => setShowModal1(true)}>
              <div className="card-body">
                <div style={styles.cardHeader}>
                  <GrCloudSoftware style={styles.icon} />
                  <h5 className="card-title">IVEND USER ACCESS </h5>
                </div>
                <p className="card-text">click and fill</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card shadow-lg rounded" onClick={() => setShowModal2(true)}>
              <div className="card-body">
                <div style={styles.cardHeader}>
                  <SiBmcsoftware style={styles.icon} />
                  <h5 className="card-title">DOMAIN USER ACCESS</h5>
                </div>
                <p className="card-text">click and fill</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card shadow-lg rounded" onClick={() => setShowModal3(true)}>
              <div className="card-body">
                <div style={styles.cardHeader}>
                  <SiEsotericsoftware style={styles.icon} />
                  <h5 className="card-title">MEAT MATRIX </h5>
                </div>
                <p className="card-text">click and fill</p>
              </div>
            </div>
          </div>

            {/* Card 2 */}
                    <div className="col">
                        <div className="card shadow-lg rounded" onClick={() => setShowModal4(true)}>
                            <div className="card-body">
                                <div style={styles.cardHeader}>
                                    <FaInternetExplorer style={styles.icon} />
                                    <h5 className="card-title">INTERNET USER ACCESS</h5>
                                </div>
                              <p className="card-text">bring your own device.</p>
                            </div>
                        </div>
                    </div>
                      {/* Card 4 */}
                                <div className="col">
                                    <div className="card shadow-lg rounded" onClick={() => setShowModal5(true)}>
                                        <div className="card-body">
                                            <div style={styles.cardHeader}>
                                                <AiOutlineControl style={styles.icon} />
                                                <h5 className="card-title">CHANGE OF CONTROL </h5>
                                            </div>
                                         <p className="card-text">bring your own device.</p>
                                            
                                        </div>
                                    </div>
                                </div>


                    {/* Card 3 */}
                    <div className="col">
                        <div className="card shadow-lg rounded" onClick={() => setShowModal6(true)}>
                            <div className="card-body">
                                <div style={styles.cardHeader}>
                                    <IoLaptopSharp style={styles.icon} />
                                    <h5 className="card-title">LAPTOP ACCESS</h5>
                                </div>
                                <p className="card-text">bring your own device.</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 5 */}
                    <div className="col">
                        <div className="card shadow-lg rounded" onClick={() => setShowModal7(true)}>
                            <div className="card-body">
                                <div style={styles.cardHeader}>
                                    <TbDeviceIpadHorizontalDown style={styles.icon} />
                                    <h5 className="card-title">(BYOD) FORM</h5>
                                </div>
                                <p className="card-text">bring your own device.</p>
                                
                            </div>
                        </div>
                    </div>


    {/* Card 5 */}
                    <div className="col">
                        <div className="card shadow-lg rounded" onClick={() => setShowModal8(true)}>
                            <div className="card-body">
                                <div style={styles.cardHeader}>
                                    <MdOutlineVpnLock style={styles.icon} />
                                    <h5 className="card-title">VPN REQUEST</h5>
                                </div>
                                <p className="card-text">bring your own device.</p>
                                
                            </div>
                        </div>
                    </div>




        </div>
      </div>

 {/* IVEND MODAL */}
{showModal1 && (

 <IvendModal />

)}


      {/* ACCOUNTING MODAL */}
      {showModal2 && (
      <DomainModal />

)}


      {/* MEAT MATRIX MODAL */}
          {/* ACCOUNTING MODAL */}
      {showModal3 && (
  <div style={styles.modalBackdrop} onClick={() => setShowModal1(false)}>
    <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
      <h5 className="mb-3"><b><LuFileInput />  &nbsp;MEAT MATRIX ACCESS FORM</b></h5>
      <form onSubmit={handleMeatmatrixSubmit}>
        <div className="row mb-2">
          <div className="col-md-6">
            <label className="form-label"><b>Fullname</b></label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label"><b>Username</b></label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label"><b>Dept Manager Name</b></label>
          <input
            type="text"
            value={deptmanagername}
            onChange={(e) => setDeptmanagername(e.target.value)}
            className="form-control mb-2"
            required
          />

          <label className="form-label"><b>Select Department</b></label>
          <select
            className="form-control"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="">-- Select Department --</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
            <option value="Sales">Sales</option>
            <option value="IT Department">IT Department</option>
            <option value="Retail Shops">Retail Shops</option>
          </select>
        </div>

        <div className="row mb-2">
         <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
  <label className="form-label"><b>APPROVALS</b></label>
</div>
          <div className="col-md-6">
            <label className="form-label"><b>Dept Manager</b></label>
            <input
              type="text"
              value={deptmanagerapproval}
              onChange={(e) => setDepartmentapproval(e.target.value)}
              className="form-control"
              disabled
            />
          </div>
          <div className="col-md-6">
            <label className="form-label"><b>IT Manager</b></label>
            <input
              type="text"
              value={itmanagerapproval}
              onChange={(e) => setItmanagerapproval(e.target.value)}
              className="form-control"
              disabled
            />
          </div>
        </div>

        <label className="form-label mt-3"><b>Access Rights</b></label>
        {rightsArray.map((right, idx) => (
          <div key={idx} className="d-flex gap-2 mb-2">
            <input
              type="text"
              value={right.item}
              onChange={(e) => handleRightChange(idx, "item", e.target.value)}
              placeholder="name of the rights"
              className="form-control"
              required
            />
            <input
              type="text"
              value={right.access}
              onChange={(e) => handleRightChange(idx, "access", e.target.value)}
              placeholder="Access Type (e.g. read, write)"
              className="form-control"
              required
            />
            <button type="button" className="btn btn-danger" onClick={() => removeRight(idx)}>X</button>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mb-3" onClick={addRight}>Add Right</button>

        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  </div>
)}

      <footer className="text-white bg-dark text-center p-2 fixed-bottom">
        &copy; Associated Meat Packers. All rights reserved.
      </footer>
    </div>
  );
};

export default UserformSelection;
