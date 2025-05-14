import React from "react";
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

const ITExecutive = () => {
 return(
    <div>
             <nav
                        className="navbar border-bottom shadow-lg p-2 mb-0 rounded"
                        style={{ backgroundColor: 'black' }}
                    >
                        <div className="container-fluid">
                            <span className="navbar-brand text-white">
                                <LuLayoutDashboard style={styles.icon} />
                                &nbsp;
                                <b>IT EXECUTIVE MANAGEMENT</b>
                            </span>
                        </div>
                    </nav>
        

        <footer className="text-white bg-dark text-center p-2 fixed-bottom">
                    &copy; Associated Meat Packers. All rights reserved.
                </footer>
    </div>
 )
}
export default ITExecutive