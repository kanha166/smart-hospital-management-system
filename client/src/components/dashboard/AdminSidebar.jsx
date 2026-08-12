// File: client/src/components/admin/AdminSidebar.jsx

import { NavLink, useNavigate } from "react-router-dom";

import {
    LayoutDashboard,
    Users,
    UserRound,
    CalendarDays,
    Pill,
    FileText,
    Receipt,
    LogOut,
    HeartPulse
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

import "./Sidebar.css";


function AdminSidebar() {

    const { logout } = useAuth();

    const navigate = useNavigate();


    const handleLogout = () => {

        logout();

        navigate("/login");

    };


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
                        to="/admin/dashboard"
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive ? "active" : ""
                            }`
                        }
                    >

                        <LayoutDashboard size={20} />

                        Dashboard

                    </NavLink>


                    <NavLink
                        to="/admin/patients"
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive ? "active" : ""
                            }`
                        }
                    >

                        <Users size={20} />

                        Patients

                    </NavLink>


                    <NavLink
                        to="/admin/doctors"
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive ? "active" : ""
                            }`
                        }
                    >

                        <UserRound size={20} />

                        Doctors

                    </NavLink>


                    <NavLink
                        to="/admin/appointments"
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive ? "active" : ""
                            }`
                        }
                    >

                        <CalendarDays size={20} />

                        Appointments

                    </NavLink>


                    <NavLink
                        to="/admin/pharmacy"
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive ? "active" : ""
                            }`
                        }
                    >

                        <Pill size={20} />

                        Pharmacy

                    </NavLink>

                        <NavLink
    to="/admin/billing"
    className={({ isActive }) =>
        `sidebar-item ${
            isActive ? "active" : ""
        }`
    }
>

    <Receipt size={20} />

    Billing

</NavLink>

                    <NavLink
                        to="/admin/reports"
                        className={({ isActive }) =>
                            `sidebar-item ${
                                isActive ? "active" : ""
                            }`
                        }
                    >

                        <FileText size={20} />

                        Reports

                    </NavLink>


                </nav>


            </div>


            <button
                type="button"
                className="sidebar-item logout-btn"
                onClick={handleLogout}
            >

                <LogOut size={20} />

                Logout

            </button>


        </aside>

    );

}

export default AdminSidebar;