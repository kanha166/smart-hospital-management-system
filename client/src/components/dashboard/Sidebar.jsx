// File: src/components/dashboard/Sidebar.jsx

import {
    LayoutDashboard,
    Users,
    UserRound,
    CalendarDays,
    Pill,
    FileText,
    Settings,
    LogOut,
    HeartPulse
} from "lucide-react";

import "./Sidebar.css";

function Sidebar() {

    return (

        <aside className="sidebar">

            <div>

                <div className="sidebar-logo">

                    <HeartPulse
                        size={34}
                        strokeWidth={2.5}
                    />

                    <div>

                        <h3>Smart Hospital</h3>

                        <span>Management System</span>

                    </div>

                </div>

                <nav className="sidebar-menu">

                    <button className="sidebar-item active">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </button>

                    <button className="sidebar-item">
                        <Users size={20} />
                        Patients
                    </button>

                    <button className="sidebar-item">
                        <UserRound size={20} />
                        Doctors
                    </button>

                    <button className="sidebar-item">
                        <CalendarDays size={20} />
                        Appointments
                    </button>

                    <button className="sidebar-item">
                        <Pill size={20} />
                        Pharmacy
                    </button>

                    <button className="sidebar-item">
                        <FileText size={20} />
                        Reports
                    </button>

                    <button className="sidebar-item">
                        <Settings size={20} />
                        Settings
                    </button>

                </nav>

            </div>

            <button className="sidebar-item logout-btn">

                <LogOut size={20} />

                Logout

            </button>

        </aside>

    );

}

export default Sidebar;