// File: src/routes/AppRoutes.jsx

import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";

import ProtectedRoute from "../components/common/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import AdminDashboardHome from "../pages/admin/DashboardHome";
import DoctorDashboardHome from "../pages/doctor/DashboardHome";
import CompleteProfile from "../pages/patient/CompleteProfile";

import Patients from "../pages/admin/Patients";
import Doctors from "../pages/admin/Doctors";
import Appointments from "../pages/admin/Appointments";
import Pharmacy from "../pages/admin/Pharmacy";
import Billing from "../pages/admin/Billing";
import Reports from "../pages/admin/Reports";
import Settings from "../pages/admin/Settings";

import MyAppointments from "../pages/patient/MyAppointments";
import MedicalReports from "../pages/patient/MedicalReports";
import Prescriptions from "../pages/patient/Prescriptions";
import BillsPayments from "../pages/patient/BillsPayments";
import Profile from "../pages/patient/Profile";

import DoctorAppointments from "../pages/doctor/Appointments";
import DoctorPatients from "../pages/doctor/Patients";
import ConsultationNotes from "../pages/doctor/ConsultationNotes";
import DoctorPrescriptions from "../pages/doctor/Prescriptions";

function NotFound() {

    return (

        <div className="container text-center mt-5">

            <h2>404 - Page Not Found</h2>

        </div>

    );

}

export default function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            {/* ========================= ADMIN ========================= */}

            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <DashboardLayout>
                            <AdminDashboardHome />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/patients"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <DashboardLayout>
                            <Patients />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />

        <Route
    path="/admin/doctors"
    element={
        <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout>
                <Doctors />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>

<Route
    path="/admin/billing"
    element={
        <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout>
                <Billing />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>

<Route
    path="/admin/appointments"
    element={
        <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout>
                <Appointments />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>


<Route
    path="/admin/pharmacy"
    element={
        <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout>
                <Pharmacy />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>


<Route
    path="/admin/reports"
    element={
        <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout>
                <Reports />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>


<Route
    path="/admin/settings"
    element={
        <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout>
                <Settings />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>

            {/* ========================= DOCTOR ========================= */}

<Route
    path="/doctor/dashboard"
    element={
        <ProtectedRoute allowedRoles={["doctor"]}>
            <DashboardLayout>
                <DoctorDashboardHome />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>

<Route
    path="/doctor/appointments"
    element={
        <ProtectedRoute allowedRoles={["doctor"]}>
            <DashboardLayout>
                <DoctorAppointments />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>

<Route
    path="/doctor/patients"
    element={
        <ProtectedRoute allowedRoles={["doctor"]}>
            <DashboardLayout>
                <DoctorPatients />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>

<Route
    path="/doctor/consultations"
    element={
        <ProtectedRoute allowedRoles={["doctor"]}>
            <DashboardLayout>
                <ConsultationNotes />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>

<Route
    path="/doctor/prescriptions"
    element={
        <ProtectedRoute allowedRoles={["doctor"]}>
            <DashboardLayout>
                <DoctorPrescriptions />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>

            {/* ========================= PATIENT ========================= */}

<Route
    path="/patient/complete-profile"
    element={
        <ProtectedRoute allowedRoles={["patient"]}>
            <CompleteProfile />
        </ProtectedRoute>
    }
/>

<Route
    path="/patient/appointments"
    element={
        <ProtectedRoute allowedRoles={["patient"]}>
            <DashboardLayout>
                <MyAppointments />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>

<Route
    path="/patient/reports"
    element={
        <ProtectedRoute allowedRoles={["patient"]}>
            <DashboardLayout>
                <MedicalReports />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>

<Route
    path="/patient/prescriptions"
    element={
        <ProtectedRoute allowedRoles={["patient"]}>
            <DashboardLayout>
                <Prescriptions />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>

<Route
    path="/patient/bills"
    element={
        <ProtectedRoute allowedRoles={["patient"]}>
            <DashboardLayout>
                <BillsPayments />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>

<Route
    path="/patient/profile"
    element={
        <ProtectedRoute allowedRoles={["patient"]}>
            <DashboardLayout>
                <Profile />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>
            {/* ========================= 404 ========================= */}

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );

}