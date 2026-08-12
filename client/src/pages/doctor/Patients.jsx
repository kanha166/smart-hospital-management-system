import { useEffect, useState } from "react";

import DoctorSearchBar from "../../components/common/DoctorSearchBar";

import "./DoctorPages.css";

import {
    getDoctorAppointments
} from "../../api/appointmentApi";


export default function DoctorPatients() {


    const [patients, setPatients] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [selectedPatient, setSelectedPatient] =
        useState(null);


    // =========================================================
    // FORMAT DATE
    // DD/MM/YYYY
    // =========================================================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        const dateString = String(date);

        const datePart =
            dateString.split("T")[0];

        const parts =
            datePart.split("-");

        if (parts.length === 3) {

            return `${parts[2]}/${parts[1]}/${parts[0]}`;

        }

        return dateString;

    };


    // =========================================================
    // FORMAT TIME
    // 10:00:00 -> 10:00 AM
    // =========================================================

    const formatTime = (time) => {

        if (!time) {
            return "-";
        }

        const timeString =
            String(time).slice(0, 5);

        const parts =
            timeString.split(":");

        if (parts.length < 2) {
            return timeString;
        }

        let hours =
            parseInt(parts[0], 10);

        const minutes =
            parts[1];

        const period =
            hours >= 12 ? "PM" : "AM";

        hours = hours % 12;

        if (hours === 0) {
            hours = 12;
        }

        return `${String(hours).padStart(2, "0")}:${minutes} ${period}`;

    };


    // =========================================================
    // DATE VALUE FOR SORTING
    // =========================================================

    const getDateValue = (date) => {

        if (!date) {
            return "";
        }

        return String(date).split("T")[0];

    };


    // =========================================================
    // TIME VALUE FOR SORTING
    // =========================================================

    const getTimeValue = (time) => {

        if (!time) {
            return "00:00:00";
        }

        return String(time);

    };


    // =========================================================
    // SORT APPOINTMENTS
    // Latest date first
    // Same date: latest time first
    // =========================================================

    const sortAppointments = (appointments) => {

        return [...appointments].sort((a, b) => {

            const dateA =
                getDateValue(
                    a.appointment_date
                );

            const dateB =
                getDateValue(
                    b.appointment_date
                );


            if (dateA !== dateB) {

                return dateB.localeCompare(
                    dateA
                );

            }


            const timeA =
                getTimeValue(
                    a.appointment_time
                );

            const timeB =
                getTimeValue(
                    b.appointment_time
                );


            return timeB.localeCompare(
                timeA
            );

        });

    };


    // =========================================================
    // LOAD PATIENTS
    // =========================================================

    useEffect(() => {

        loadPatients();

    }, []);


    const loadPatients = async () => {

        try {

            setLoading(true);

            setError("");


            const appointments =
                await getDoctorAppointments();


            if (!Array.isArray(appointments)) {

                setPatients([]);

                return;

            }


            // =================================================
            // GROUP APPOINTMENTS BY PATIENT
            // =================================================

            const patientMap =
                new Map();


            appointments.forEach(
                (appointment) => {

                    const patientKey =
                        appointment.patient_id ||
                        appointment.patient_name;


                    if (!patientKey) {
                        return;
                    }


                    if (!patientMap.has(patientKey)) {

                        patientMap.set(
                            patientKey,
                            {
                                patient_id:
                                    appointment.patient_id ||
                                    "-",

                                patient_name:
                                    appointment.patient_name ||
                                    "Unknown Patient",

                                appointments: []
                            }
                        );

                    }


                    const patient =
                        patientMap.get(
                            patientKey
                        );


                    patient.appointments.push(
                        appointment
                    );

                }
            );


            // =================================================
            // CONVERT MAP TO ARRAY
            // =================================================

            const patientList =
                Array.from(
                    patientMap.values()
                );


            // =================================================
            // SORT EACH PATIENT'S APPOINTMENTS
            // =================================================

            patientList.forEach(
                (patient) => {

                    patient.appointments =
                        sortAppointments(
                            patient.appointments
                        );

                }
            );


            // =================================================
            // SORT PATIENTS
            // Latest appointment first
            // =================================================

            patientList.sort(
                (a, b) => {

                    const latestA =
                        a.appointments[0];

                    const latestB =
                        b.appointments[0];


                    if (!latestA) {
                        return 1;
                    }

                    if (!latestB) {
                        return -1;
                    }


                    const dateA =
                        getDateValue(
                            latestA.appointment_date
                        );

                    const dateB =
                        getDateValue(
                            latestB.appointment_date
                        );


                    if (dateA !== dateB) {

                        return dateB.localeCompare(
                            dateA
                        );

                    }


                    const timeA =
                        getTimeValue(
                            latestA.appointment_time
                        );

                    const timeB =
                        getTimeValue(
                            latestB.appointment_time
                        );


                    return timeB.localeCompare(
                        timeA
                    );

                }
            );


            setPatients(patientList);

        } catch (error) {

            console.error(
                "GET DOCTOR PATIENTS ERROR:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Unable to load patients."
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================================================
    // FILTER PATIENTS
    // Search by patient name or patient ID
    // =========================================================

    const filteredPatients =
        patients.filter((patient) => {

            const searchValue =
                search.trim().toLowerCase();


            if (!searchValue) {
                return true;
            }


            const patientName =
                String(
                    patient.patient_name || ""
                ).toLowerCase();


            const patientId =
                String(
                    patient.patient_id || ""
                ).toLowerCase();


            return (
                patientName.includes(searchValue) ||
                patientId.includes(searchValue)
            );

        });


    // =========================================================
    // VIEW PATIENT
    // =========================================================

    const handleView = (patient) => {

        setSelectedPatient(patient);

    };


    // =========================================================
    // CLOSE MODAL
    // =========================================================

    const closeModal = () => {

        setSelectedPatient(null);

    };


    // =========================================================
    // JSX
    // =========================================================

    return (

        <div className="doctor-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="patients-header">

                <div>

                    <h2>
                        My Patients
                    </h2>

                    <p>
                        View patients who have appointments with you.
                    </p>

                </div>

            </div>


            {/* =================================================
                SEARCH BAR
            ================================================= */}

            <DoctorSearchBar
                search={search}
                setSearch={setSearch}
            />


            {/* =================================================
                PATIENT TABLE
            ================================================= */}

            <div className="doctor-table-card">

                {loading && (

                    <p>
                        Loading patients...
                    </p>

                )}


                {!loading && error && (

                    <p className="doctor-error">
                        {error}
                    </p>

                )}


                {!loading &&
                !error &&
                patients.length === 0 && (

                    <p>
                        No patients found.
                    </p>

                )}


                {!loading &&
                !error &&
                patients.length > 0 &&
                filteredPatients.length === 0 && (

                    <p>
                        No patients match your search.
                    </p>

                )}


                {!loading &&
                !error &&
                filteredPatients.length > 0 && (

                    <div className="appointment-table-wrapper">

                        <table className="appointment-table">

                            <thead>

                                <tr>

                                    <th>
                                        Patient
                                    </th>

                                    <th>
                                        Patient ID
                                    </th>

                                    <th>
                                        Last Appointment
                                    </th>

                                    <th>
                                        Appointments
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredPatients.map(
                                    (patient, index) => (

                                        <tr
                                            key={
                                                patient.patient_id !== "-"
                                                    ? patient.patient_id
                                                    : `${patient.patient_name}-${index}`
                                            }
                                        >

                                            <td>
                                                {
                                                    patient.patient_name
                                                }
                                            </td>


                                            <td>
                                                {
                                                    patient.patient_id
                                                }
                                            </td>


                                            <td>

                                                {
                                                    patient.appointments.length > 0

                                                        ? formatDate(
                                                            patient.appointments[0]
                                                                .appointment_date
                                                        )

                                                        : "-"
                                                }

                                            </td>


                                            <td>

                                                <span className="status scheduled">

                                                    {
                                                        patient.appointments.length
                                                    }

                                                </span>

                                            </td>


                                            <td>

                                                <div className="actions">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleView(
                                                                patient
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


            {/* =================================================
                PATIENT DETAILS MODAL
            ================================================= */}

            {selectedPatient && (

                <div
                    className="doctor-modal-overlay"
                    onClick={(event) => {

                        if (
                            event.target ===
                            event.currentTarget
                        ) {

                            closeModal();

                        }

                    }}
                >

                    <div className="doctor-modal">


                        {/* MODAL HEADER */}

                        <div className="doctor-modal-header">

                            <h2>
                                Patient Details
                            </h2>


                            <button
                                type="button"
                                className="doctor-modal-close"
                                onClick={closeModal}
                            >
                                ×
                            </button>

                        </div>


                        {/* MODAL BODY */}

                        <div className="doctor-modal-body">


                            {/* PATIENT DETAILS */}

                            <div className="appointment-grid">

                                <div>

                                    <strong>
                                        Name
                                    </strong>

                                    <span>
                                        {
                                            selectedPatient.patient_name
                                        }
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Patient ID
                                    </strong>

                                    <span>
                                        {
                                            selectedPatient.patient_id
                                        }
                                    </span>

                                </div>

                            </div>


                            {/* =================================================
                                APPOINTMENT HISTORY
                            ================================================= */}

                            <div
                                style={{
                                    marginTop: "28px"
                                }}
                            >

                                <h3
                                    style={{
                                        color: "#fff",
                                        marginBottom: "16px"
                                    }}
                                >
                                    Appointment History
                                </h3>


                                {selectedPatient.appointments.length === 0 ? (

                                    <p>
                                        No appointment history found.
                                    </p>

                                ) : (

                                    <div className="appointment-table-wrapper">

                                        <table className="appointment-table">

                                            <thead>

                                                <tr>

                                                    <th>
                                                        Date
                                                    </th>

                                                    <th>
                                                        Time
                                                    </th>

                                                    <th>
                                                        Department
                                                    </th>

                                                    <th>
                                                        Status
                                                    </th>

                                                </tr>

                                            </thead>


                                            <tbody>

                                                {selectedPatient.appointments.map(
                                                    (appointment, index) => (

                                                        <tr
                                                            key={
                                                                appointment.id ||
                                                                `${appointment.appointment_date}-${appointment.appointment_time}-${index}`
                                                            }
                                                        >

                                                            <td>

                                                                {formatDate(
                                                                    appointment.appointment_date
                                                                )}

                                                            </td>


                                                            <td>

                                                                {formatTime(
                                                                    appointment.appointment_time
                                                                )}

                                                            </td>


                                                            <td>

                                                                {
                                                                    appointment.department_name ||
                                                                    "-"
                                                                }

                                                            </td>


                                                            <td>

                                                                <span
                                                                    className={`status ${
                                                                        appointment.status ||
                                                                        ""
                                                                    }`}
                                                                >

                                                                    {
                                                                        appointment.status ||
                                                                        "-"
                                                                    }

                                                                </span>

                                                            </td>

                                                        </tr>

                                                    )
                                                )}

                                            </tbody>

                                        </table>

                                    </div>

                                )}

                            </div>

                        </div>


                        {/* MODAL FOOTER */}

                        <div className="doctor-modal-footer">

                            <button
                                type="button"
                                className="doctor-small-btn"
                                onClick={closeModal}
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}