// File: src/components/dashboard/PatientSidebar.jsx

import {
    CalendarDays,
    FileText,
    Pill,
    CreditCard,
    User,
    LogOut,
    HeartPulse
} from "lucide-react";

import { NavLink } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import "./Sidebar.css";


function PatientSidebar() {

    const { logout } = useAuth();


    return (

        <aside className="sidebar">

            <div>

                <div className="sidebar-logo">

                    <HeartPulse
                        size={34}
                        strokeWidth={2.5}
                    />

                    <div>

                        <h3>
                            Smart Hospital
                        </h3>

                        <span>
                            Management System
                        </span>

                    </div>

                </div>


                <nav className="sidebar-menu">

                    <NavLink
                        to="/patient/profile"
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-item active"
                                : "sidebar-item"
                        }
                    >
                        <User size={20} />

                        Profile
                    </NavLink>


                    <NavLink
                        to="/patient/appointments"
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-item active"
                                : "sidebar-item"
                        }
                    >
                        <CalendarDays size={20} />

                        My Appointments
                    </NavLink>


                    <NavLink
                        to="/patient/reports"
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-item active"
                                : "sidebar-item"
                        }
                    >
                        <FileText size={20} />

                        Medical Reports
                    </NavLink>


                    <NavLink
                        to="/patient/prescriptions"
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-item active"
                                : "sidebar-item"
                        }
                    >
                        <Pill size={20} />

                        Prescriptions
                    </NavLink>


                    <NavLink
                        to="/patient/bills"
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-item active"
                                : "sidebar-item"
                        }
                    >
                        <CreditCard size={20} />

                        Bills & Payments
                    </NavLink>

                </nav>

            </div>


            <button
                type="button"
                className="sidebar-item logout-btn"
                onClick={logout}
            >

                <LogOut size={20} />

                Logout

            </button>


        </aside>

    );

}


export default PatientSidebar;