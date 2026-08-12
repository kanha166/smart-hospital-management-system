// File: src/components/dashboard/DoctorSidebar.jsx

import {
    LayoutDashboard,
    CalendarDays,
    Users,
    ClipboardPen,
    Pill,
    HeartPulse,
    LogOut
} from "lucide-react";

import { NavLink } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import "./Sidebar.css";


export default function DoctorSidebar() {

    const { logout } = useAuth();


    const menus = [

        {
            title: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            path: "/doctor/dashboard"
        },

        {
            title: "Appointments",
            icon: <CalendarDays size={20} />,
            path: "/doctor/appointments"
        },

        {
            title: "My Patients",
            icon: <Users size={20} />,
            path: "/doctor/patients"
        },

        {
            title: "Consultation Notes",
            icon: <ClipboardPen size={20} />,
            path: "/doctor/consultations"
        },

        {
            title: "Prescriptions",
            icon: <Pill size={20} />,
            path: "/doctor/prescriptions"
        }

    ];


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

                    {

                        menus.map((menu) => (

                            <NavLink

                                key={menu.path}

                                to={menu.path}

                                className={({ isActive }) =>
                                    isActive
                                        ? "sidebar-item active"
                                        : "sidebar-item"
                                }

                            >

                                {menu.icon}

                                <span>
                                    {menu.title}
                                </span>

                            </NavLink>

                        ))

                    }

                </nav>

            </div>


            <button
                type="button"
                className="sidebar-item logout-btn"
                onClick={logout}
            >

                <LogOut size={20} />

                <span>
                    Logout
                </span>

            </button>


        </aside>

    );

}