// File: client/src/pages/doctor/DashboardHome.jsx

import { useEffect, useMemo, useState } from "react";

import {
    CalendarDays,
    Users,
    ClipboardPen,
    Clock
} from "lucide-react";
import DoctorTopbar from "../../pages/doctor/DoctorTopbar";
import "./DashboardHome.css";

import {
    getDoctorAppointments
} from "../../api/appointmentApi";


export default function DoctorDashboardHome() {

    const [appointments, setAppointments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");


    // =========================================================
    // CURRENT DATE
    // =========================================================

    const currentDate = new Date();

    const formattedDate =
        currentDate.toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    // =========================================================
    // TODAY YYYY-MM-DD
    // =========================================================

    const getToday = () => {

        const today = new Date();

        const year =
            today.getFullYear();

        const month =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                today.getDate()
            ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };


    // =========================================================
    // FORMAT TIME
    // =========================================================

    const formatTime = (time) => {

        if (!time) {
            return "-";
        }

        const parts =
            String(time)
                .slice(0, 5)
                .split(":");

        if (parts.length < 2) {
            return String(time);
        }

        let hours =
            parseInt(parts[0], 10);

        const minutes =
            parts[1];

        const period =
            hours >= 12
                ? "PM"
                : "AM";

        hours =
            hours % 12;

        if (hours === 0) {
            hours = 12;
        }

        return `${String(hours).padStart(2, "0")}:${minutes} ${period}`;
    };


    // =========================================================
    // LOAD DOCTOR APPOINTMENTS
    // =========================================================

    useEffect(() => {

        loadDashboard();

    }, []);


    const loadDashboard = async () => {

        try {

            setLoading(true);

            setError("");

            const data =
                await getDoctorAppointments();


            if (!Array.isArray(data)) {

                setAppointments([]);

                return;
            }


            setAppointments(data);

        } catch (error) {

            console.error(
                "DOCTOR DASHBOARD ERROR:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load dashboard."
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================================================
    // TODAY
    // =========================================================

    const today =
        getToday();


    // =========================================================
    // TODAY'S APPOINTMENTS
    // =========================================================

    const todayAppointments =
        useMemo(() => {

            return appointments
                .filter((appointment) => {

                    if (!appointment.appointment_date) {
                        return false;
                    }

                    const date =
                        String(
                            appointment.appointment_date
                        ).split("T")[0];

                    return date === today;

                })
                .sort((a, b) => {

                    const timeA =
                        String(
                            a.appointment_time ||
                            ""
                        );

                    const timeB =
                        String(
                            b.appointment_time ||
                            ""
                        );

                    return timeA.localeCompare(timeB);

                });

        }, [appointments, today]);


    // =========================================================
    // UNIQUE PATIENTS
    // =========================================================

    const uniquePatients =
        useMemo(() => {

            const map =
                new Map();

            appointments.forEach(
                (appointment) => {

                    const key =
                        appointment.patient_id ||
                        appointment.patient_name;

                    if (!key) {
                        return;
                    }

                    if (!map.has(key)) {

                        map.set(
                            key,
                            appointment
                        );

                    }

                }
            );

            return Array.from(
                map.values()
            );

        }, [appointments]);


    // =========================================================
    // RECENT PATIENTS
    // =========================================================

    const recentPatients =
        uniquePatients.slice(0, 4);


    // =========================================================
    // APPOINTMENT COUNTS
    // =========================================================

    const completedCount =
        todayAppointments.filter(
            (appointment) =>
                String(
                    appointment.status || ""
                ).toLowerCase() ===
                "completed"
        ).length;


    const pendingCount =
        todayAppointments.filter(
            (appointment) =>
                String(
                    appointment.status || ""
                ).toLowerCase() ===
                "pending"
        ).length;


    const cancelledCount =
        todayAppointments.filter(
            (appointment) =>
                String(
                    appointment.status || ""
                ).toLowerCase() ===
                "cancelled"
        ).length;


    // =========================================================
    // COMPLETION PERCENTAGE
    // =========================================================

    const completionPercentage =
        todayAppointments.length > 0

            ? Math.round(
                (
                    completedCount /
                    todayAppointments.length
                ) * 100
            )

            : 0;


    // =========================================================
    // SUMMARY
    // =========================================================

    const summary = [

        {
            title: "Today's Appointments",

            value:
                todayAppointments.length,

            icon:
                <CalendarDays size={26} />

        },

        {
            title: "Total Patients",

            value:
                uniquePatients.length,

            icon:
                <Users size={26} />

        },

        {
            title: "Pending Consultations",

            value:
                pendingCount,

            icon:
                <ClipboardPen size={26} />

        }

    ];


    // =========================================================
    // SEARCHED APPOINTMENTS
    // =========================================================

    const filteredTodayAppointments =
        useMemo(() => {

            const query =
                search
                    .trim()
                    .toLowerCase();

            if (!query) {
                return todayAppointments;
            }

            return todayAppointments.filter(
                (appointment) => {

                    const patientName =
                        String(
                            appointment.patient_name ||
                            ""
                        ).toLowerCase();

                    const department =
                        String(
                            appointment.department_name ||
                            ""
                        ).toLowerCase();

                    const status =
                        String(
                            appointment.status ||
                            ""
                        ).toLowerCase();

                    return (
                        patientName.includes(query) ||
                        department.includes(query) ||
                        status.includes(query)
                    );

                }
            );

        }, [todayAppointments, search]);


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <div className="doctor-dashboard">


            {/* =================================================
                DOCTOR TOPBAR
            ================================================= */}

            <DoctorTopbar
    search={search}
    setSearch={setSearch}
/>

            {/* =================================================
                ERROR
            ================================================= */}

            {!loading && error && (

                <div className="doctor-card">

                    <p className="doctor-error">
                        {error}
                    </p>

                </div>

            )}


            {/* =================================================
                SUMMARY CARDS
            ================================================= */}

            <div className="doctor-summary-grid">

                {summary.map(
                    (item, index) => (

                        <div
                            key={index}
                            className="doctor-summary-card"
                        >

                            <div className="doctor-summary-icon">

                                {item.icon}

                            </div>

                            <h3>
                                {item.title}
                            </h3>

                            <h2>

                                {loading
                                    ? "..."
                                    : item.value
                                }

                            </h2>

                        </div>

                    )
                )}

            </div>


            {/* =================================================
                TODAY'S SCHEDULE
            ================================================= */}

            {!error && (

                <div className="doctor-dashboard-schedule doctor-card">

                    <div className="doctor-section-header">

                        <div>

                            <h2>
                                Today's Schedule
                            </h2>

                            <p>
                                Your appointments for today
                            </p>

                        </div>

                    </div>


                    {loading ? (

                        <div className="doctor-dashboard-empty">

                            <Clock size={22} />

                            <span>
                                Loading today's schedule...
                            </span>

                        </div>

                    ) : filteredTodayAppointments.length === 0 ? (

                        <div className="doctor-dashboard-empty">

                            <CalendarDays size={22} />

                            <span>
                                {search
                                    ? "No appointments match your search."
                                    : "No appointments scheduled for today."
                                }
                            </span>

                        </div>

                    ) : (

                        <div className="doctor-schedule-list">

                            {filteredTodayAppointments
                                .slice(0, 6)
                                .map(
                                    (
                                        appointment,
                                        index
                                    ) => (

                                        <div
                                            className="doctor-schedule-row"
                                            key={
                                                appointment.id ||
                                                index
                                            }
                                        >

                                            <div className="doctor-schedule-time">

                                                <Clock size={17} />

                                                <span>

                                                    {formatTime(
                                                        appointment.appointment_time
                                                    )}

                                                </span>

                                            </div>


                                            <div className="doctor-schedule-patient">

                                                <strong>

                                                    {
                                                        appointment.patient_name ||
                                                        "Unknown Patient"
                                                    }

                                                </strong>

                                            </div>


                                            <div className="doctor-schedule-department">

                                                {
                                                    appointment.department_name ||
                                                    "-"
                                                }

                                            </div>


                                            <div>

                                                <span
                                                    className={`doctor-status ${
                                                        String(
                                                            appointment.status ||
                                                            ""
                                                        ).toLowerCase()
                                                    }`}
                                                >

                                                    {
                                                        appointment.status ||
                                                        "-"
                                                    }

                                                </span>

                                            </div>

                                        </div>

                                    )
                                )}

                        </div>

                    )}

                </div>

            )}


            {/* =================================================
                BOTTOM DASHBOARD
            ================================================= */}

            {!error && (

                <div className="doctor-dashboard-bottom-grid">


                    {/* =================================================
                        RECENT PATIENTS
                    ================================================= */}

                    <div className="doctor-card">

                        <div className="doctor-section-header">

                            <div>

                                <h2>
                                    Recent Patients
                                </h2>

                            </div>

                        </div>


                        {loading ? (

                            <div className="doctor-dashboard-empty">
                                Loading patients...
                            </div>

                        ) : recentPatients.length === 0 ? (

                            <div className="doctor-dashboard-empty">
                                No patients found.
                            </div>

                        ) : (

                            <div className="doctor-recent-patients">

                                {recentPatients.map(
                                    (
                                        patient,
                                        index
                                    ) => (

                                        <div
                                            className="doctor-recent-patient"
                                            key={
                                                patient.patient_id ||
                                                index
                                            }
                                        >

                                            <div className="doctor-patient-avatar">

                                                <Users size={18} />

                                            </div>


                                            <div>

                                                <strong>

                                                    {
                                                        patient.patient_name ||
                                                        "Unknown Patient"
                                                    }

                                                </strong>


                                                <span>

                                                    {
                                                        patient.department_name ||
                                                        "Department"
                                                    }

                                                    {" • Today"}

                                                </span>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        )}

                    </div>


                    {/* =================================================
                        TODAY'S OVERVIEW
                    ================================================= */}

                    <div className="doctor-card">

                        <div className="doctor-section-header">

                            <div>

                                <h2>
                                    Today's Overview
                                </h2>

                            </div>

                        </div>


                        <div className="doctor-overview-list">


                            <div className="doctor-overview-row">

                                <span>
                                    Completed
                                </span>

                                <strong>

                                    {loading
                                        ? "..."
                                        : completedCount
                                    }

                                </strong>

                            </div>


                            <div className="doctor-overview-row">

                                <span>
                                    Pending
                                </span>

                                <strong>

                                    {loading
                                        ? "..."
                                        : pendingCount
                                    }

                                </strong>

                            </div>


                            <div className="doctor-overview-row">

                                <span>
                                    Cancelled
                                </span>

                                <strong>

                                    {loading
                                        ? "..."
                                        : cancelledCount
                                    }

                                </strong>

                            </div>


                            <div className="doctor-overview-divider" />


                            <div className="doctor-completion">

                                <span>
                                    Completion
                                </span>

                                <strong>

                                    {loading
                                        ? "..."
                                        : `${completionPercentage}%`
                                    }

                                </strong>

                            </div>


                            <div className="doctor-progress">

                                <div
                                    className="doctor-progress-bar"
                                    style={{
                                        width:
                                            `${completionPercentage}%`
                                    }}
                                />

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}