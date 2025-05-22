import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { GrUserNew } from 'react-icons/gr';
import { FcManager } from 'react-icons/fc';
import { SiGoogletagmanager, SiNginxproxymanager } from 'react-icons/si';
import { FaUserCheck } from 'react-icons/fa';
import { LuLayoutDashboard } from 'react-icons/lu';
import { IoCreate } from "react-icons/io5";
import { IoLogOutSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";





import image1 from './images/login.png';

const cards = {
  client: [
    {
      id: 1,
      title: "NEW USER FORMS",
      icon: GrUserNew,
      text: "for all new user forms.",
      link: "/UserformSelection",
    },
  ],
  itmanagement: [
    {
      id: 2,
      title: "IT MANAGEMENT",
      icon: FaUserCheck,
      text: "User management, form management.",
      link: "/ITManagement",
    }  ,
    {
    id: 6,
    title: "USERS MODULE ",
    icon: SiGoogletagmanager,
    text: "user forms approvals",
    link: "/Users",
  },
  ],
  itmanager: [
  {
    id: 3,
    title: "IT MANAGER ",
    icon: SiGoogletagmanager,
    text: "user forms approvals",
    link: "/ITManager",
  },

],

  deptmanager: [
    {
      id: 4,
      title: "DEPARTMENT MANAGER",
      icon: FcManager,
      text: "deparment forms management.",
      link: "/DepartmentManager",
    },
  ],
  itexec: [
    {
      id: 5,
      title: "IT EXECUTIVE MANAGEMENT",
      icon: SiNginxproxymanager,
      text: "Nature of expenses incurred, amount used.",
      link: "/ITExecutive",
    },
  ],
  
};

const styles = {
  dashboardContent: {
    padding: '2rem',
  },
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
};

const MainDashboard = () => {
  // Read role and username from localStorage and normalize role to lowercase
  const role = (localStorage.getItem('role') || '').toLowerCase();
  const username = localStorage.getItem('username') || 'Guest';

  // For debugging - see role in console
  console.log('Role from localStorage:', role);

  // Select cards based on role, fallback to empty array
  const cardsToShow = cards[role] || [];

const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };





  return (
    <div>
   <nav className="navbar border-bottom shadow-lg p-1 mb-0 rounded" style={{ backgroundColor: 'black' }}>
  <div className="container-fluid d-flex justify-content-between align-items-center">
    <span className="navbar-brand text-white d-flex align-items-center">
      <img
        src={image1}
        alt="Login Icon"
        style={{ width: '40px', height: '40px', objectFit: 'contain' }}
      />
      &nbsp;
      <b>ASSOCIATED MEAT PACKERS</b>
    </span>
    <div className="d-flex gap-2">
      <button onClick={handleBack} className="btn btn-primary">
        <b><IoMdArrowRoundBack /> Back</b>
      </button>
      <button
        className="btn btn-danger"
        onClick={() => {
          localStorage.clear();
          navigate('/');
        }}
      >
         <b> <IoLogOutSharp />Logout</b>
      </button>
    </div>
  </div>
</nav>


   
      <div style={styles.dashboardContent}>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {cardsToShow.length > 0 ? (
            cardsToShow.map(({ id, title, icon: Icon, text, link }) => (
              <div key={id} className="col">
                <div className="card shadow-lg rounded">
                  <div className="card-body">
                    <div style={styles.cardHeader}>
                      <Icon style={styles.icon} />
                      <h5 className="card-title">{title}</h5>
                    </div>
                    <p className="card-text">{text}</p>
                    <Link to={link} className="btn btn-primary">
                      Next
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col">
              <p>No cards available for your role.</p>
              <p>Please check if your role is correctly saved in localStorage as one of these:</p>
              <ul>
                {Object.keys(cards).map((key) => (
                  <li key={key}>
                    <code>{key}</code>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <footer className="text-white bg-dark text-center p-2 fixed-bottom">
        &copy; Associated Meat Packers. All rights reserved.
      </footer>
    </div>
  );
};

export default MainDashboard;
