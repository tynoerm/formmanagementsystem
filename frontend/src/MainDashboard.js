import React from "react";
import { Link } from "react-router-dom";

import { SiGoogletagmanager } from "react-icons/si";
import { FaInternetExplorer, FaWarehouse, FaUserCheck } from "react-icons/fa";
import { GrUserNew } from "react-icons/gr";
import { IoLaptopSharp } from "react-icons/io5";
import { AiOutlineControl } from "react-icons/ai";
import { SiNginxproxymanager } from "react-icons/si";
import { TbDeviceIpadHorizontalDown } from "react-icons/tb";
import { FcManager } from "react-icons/fc";
import { LuLayoutDashboard } from "react-icons/lu";


const styles = {
    dashboardContent: {
        padding: '2rem',
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
        gap: '0.5rem'
    },
    icon: {
        fontSize: '1.5rem',
        color: '#007bff',
    }
};

const MainDashboard = () => {
    return (
        <div>
            <nav
                className="navbar border-bottom shadow-lg p-2 mb-0 rounded"
                style={{ backgroundColor: 'black' }}
            >
                <div className="container-fluid">
                    <span className="navbar-brand text-white">
                        <LuLayoutDashboard style={styles.icon} />
                        &nbsp;
                        <b>MAIN DASHBOARD</b>
                    </span>
                </div>
            </nav>

            <div style={styles.dashboardContent}>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {/* Card 1 */}
                    <div className="col">
                        <div className="card shadow-lg rounded">
                            <div className="card-body">
                                <div style={styles.cardHeader}>
                                    <GrUserNew style={styles.icon} />
                                    <h5 className="card-title">NEW USER FORMS</h5>
                                </div>
                                <p className="card-text">Sales, invoicing, quotations.</p>
                                <Link to="/UserformSelection" className="btn btn-primary">Next</Link>
                            </div>
                        </div>
                    </div>

        

          

                    {/* Card 6 */}
                    <div className="col">
                        <div className="card shadow-lg rounded">
                            <div className="card-body">
                                <div style={styles.cardHeader}>
                                    <FcManager style={styles.icon} />
                                    <h5 className="card-title">DEPARTMENT MANAGER</h5>
                                </div>
                                <p className="card-text">Nature of expenses incurred, amount used.</p>
                                <Link to="/Expenses" className="btn btn-primary">Next</Link>
                            </div>
                        </div>
                    </div>



                    {/* Card 7 */}
                    <div className="col">
                        <div className="card shadow-lg rounded">
                            <div className="card-body">
                                <div style={styles.cardHeader}>
                                    <SiGoogletagmanager style={styles.icon} />
                                    <h5 className="card-title">IT MANAGER MANAGEMENT</h5>
                                </div>
                                <p className="card-text">Nature of expenses incurred, amount used.</p>
                                <Link to="/Expenses" className="btn btn-primary">Next</Link>
                            </div>
                        </div>
                    </div>

                    {/* Card 8 */}
                    <div className="col">
                        <div className="card shadow-lg rounded">
                            <div className="card-body">
                                <div style={styles.cardHeader}>
                                    <SiNginxproxymanager style={styles.icon} />
                                    <h5 className="card-title">IT EXECUTIVE MANAGEMENT</h5>
                                </div>
                                <p className="card-text">Nature of expenses incurred, amount used.</p>
                                <Link to="/Expenses" className="btn btn-primary">Next</Link>
                            </div>
                        </div>
                    </div>


                             {/* Card 8 */}
                    <div className="col">
                        <div className="card shadow-lg rounded">
                            <div className="card-body">
                                <div style={styles.cardHeader}>
                                    <FaUserCheck style={styles.icon} />
                                    <h5 className="card-title">IT MANAGEMENT</h5>
                                </div>
                                <p className="card-text">user management,form management.</p>
                                <Link to="/Expenses" className="btn btn-primary">Next</Link>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <footer className="text-white bg-dark text-center p-2 fixed-bottom">
                &copy; Associated Meat Packers. All rights reserved.
            </footer>
        </div>
    );
};

export default MainDashboard;
