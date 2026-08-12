// File: src/layouts/DashboardLayout.jsx

import AdminSidebar from "../components/dashboard/AdminSidebar";
import DoctorSidebar from "../components/dashboard/DoctorSidebar";
import PatientSidebar from "../components/dashboard/PatientSidebar";
import { useLocation } from "react-router-dom";
import Topbar from "../components/dashboard/Topbar";

import useAuth from "../hooks/useAuth";

import "./DashboardLayout.css";


function DashboardLayout({ children }) {

    const { user } = useAuth();
    const location = useLocation();

const hideTopbarRoutes = [

    "/admin/patients",

    "/admin/doctors",

    "/admin/appointments",

    "/admin/pharmacy",

    "/admin/billing",

    "/admin/reports",

    "/admin/settings"

];
const hideTopbar =
    user?.role !== "admin" ||
    hideTopbarRoutes.includes(location.pathname);

    const renderSidebar = () => {

        switch (user?.role) {

            case "admin":

                return <AdminSidebar />;


            case "doctor":

                return <DoctorSidebar />;


            case "patient":

                return <PatientSidebar />;


            default:

                return null;

        }

    };


    return (

        <div className="dashboard-layout">

            <div className="dashboard-overlay">


                {renderSidebar()}


                <div className="dashboard-content">
                    {
    !hideTopbar && <Topbar />
}
                    <main className="dashboard-main">

                        {children}

                    </main>


                </div>


            </div>


        </div>

    );

}


export default DashboardLayout;