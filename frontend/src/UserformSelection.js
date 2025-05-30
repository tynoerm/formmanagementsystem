import React, { useState, useEffect } from 'react';
import { IoCreate } from "react-icons/io5";
import { IoLogOutSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";

import { GrCloudSoftware } from "react-icons/gr";
import { SiBmcsoftware, SiEsotericsoftware } from "react-icons/si";
import { LuFileInput } from "react-icons/lu";

import { FaInternetExplorer, FaWarehouse, FaUserCheck } from "react-icons/fa";

import { IoLaptopSharp } from "react-icons/io5";
import { AiOutlineControl } from "react-icons/ai";

import { TbDeviceIpadHorizontalDown } from "react-icons/tb";

import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineVpnLock } from "react-icons/md";
import { MdAccountBalanceWallet } from "react-icons/md";
import { SiFormstack } from "react-icons/si";
import { useNavigate } from 'react-router-dom';


import IvendModal from "./UserformsModals/ivendModal";
import DomainModal from "./UserformsModals/domainModal.js";
import VpnModal from "./UserformsModals/vpnModal.js";
import MeatmatrixModal from "./UserformsModals/meatmatrixModals.js";
import InternetaccessModal from "./UserformsModals/internetuseraccessModal.js";
import ChangeofcontrolModal from "./UserformsModals/changeofcontrolModal.js";
import image1 from './images/login.png';



const UserformSelection = () => {




  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [showModal6, setShowModal6] = useState(false);
  const [showModal7, setShowModal7] = useState(false);
  const [showModal8, setShowModal8] = useState(false);
    const [showModal9, setShowModal9] = useState(false);

      const [username, setUsername] = useState('');


  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);



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
 const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };


  return (
    <div>
        <nav className="navbar border-bottom shadow-lg p-1 mb-0 rounded" style={{ backgroundColor: 'black' }}>
              <div className="container-fluid d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center text-white">
                  <img
                    src={image1}
                    alt="Login Icon"
                    style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                  />
                  <span className="ms-2 fw-bold">USER FORM SELECTION</span>
                </div>
                <div className="text-white">
                  <h5 className="mb-0"><i>Welcome {username}</i></h5>
                </div>
              </div>
            </nav>

             <div className="d-flex justify-content-end">
          <button onClick={handleBack} className="btn btn-primary">
              <b><IoMdArrowRoundBack /> Back</b>
          </button>
          <button className="btn btn-danger" onClick={() => {
            localStorage.clear();
            navigate('/');
          }}>
           <b> <IoLogOutSharp />Logout</b>
          </button>
        </div>

      <div style={styles.dashboardContent}>
        <div className="row row-cols-1 row-cols-md-4 g-4">

         <div className="col">
      <div
        className="card shadow-lg rounded"
        onClick={() => navigate("/FormmanagementUsers")}
        style={{ cursor: 'pointer' }} // Optional: show pointer cursor on hover
      >
        <div className="card-body">
          <div style={styles.cardHeader}>
            <SiFormstack style={styles.icon} />
            <h5 className="card-title">USER FORMS MANAGEMENT</h5>
          </div>
          <p className="card-text">check the status of your form</p>
        </div>
      </div>
    </div>



          <div className="col">
            <div className="card shadow-lg rounded" onClick={() => setShowModal1(true)}>
              <div className="card-body">
                <div style={styles.cardHeader}>
                  <GrCloudSoftware style={styles.icon} />
                  <h5 className="card-title">IVEND USER ACCESS </h5>
                </div>
                <p className="card-text">user access form</p>
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
                <p className="card-text">domain access form</p>
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
                <p className="card-text">meat matrix form </p>
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
                <p className="card-text">internet access form</p>
              </div>
            </div>
          </div>


          <div className="col">
            <div className="card shadow-lg rounded" onClick={() => setShowModal8(true)}>
              <div className="card-body">
                <div style={styles.cardHeader}>
                  <MdOutlineVpnLock style={styles.icon} />
                  <h5 className="card-title">VPN REQUEST</h5>
                </div>
                <p className="card-text">vpn access form</p>

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
                <p className="card-text">change of control form</p>

              </div>
            </div>
          </div>


      <div className="col">
            <div className="card shadow-lg rounded" onClick={() => setShowModal6(true)}>
              <div className="card-body">
                <div style={styles.cardHeader}>
                  <MdAccountBalanceWallet  style={styles.icon} />
                  <h5 className="card-title">PREDICTIV USER FORMS </h5>
                </div>
                <p className="card-text">predictive access form</p>

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
                <p className="card-text">laptop access form</p>
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


      



        </div>
      </div>

      {/* IVEND MODAL */}
      {showModal1 && (

        <IvendModal />

      )}

      {showModal2 && (
        <DomainModal />
      )}

      {/* MEAT MATRIX MODAL */}

      {showModal3 && (
        <MeatmatrixModal />
      )}

      {showModal4 && (
        <InternetaccessModal />
      )}

      {showModal5 && (
        <ChangeofcontrolModal/>
      )}



      {showModal8 && (
        <VpnModal />
      )}



      <footer className="text-white bg-dark text-center p-2 fixed-bottom">
        &copy; Associated Meat Packers. All rights reserved.
      </footer>
    </div>
  );
};

export default UserformSelection;
