// File: src/pages/patient/Prescriptions.jsx

import { useEffect, useState } from "react";

import "./PatientPages.css";

import {
    getPatientPrescriptionsByAppointment
} from "../../api/prescriptionApi";

import {
    getMyAppointments
} from "../../api/appointmentApi";


export default function Prescriptions() {

    const [prescriptions, setPrescriptions] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [selectedPrescription, setSelectedPrescription] =
        useState(null);


    // ==========================
    // FORMAT DATE
    // ==========================

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


    // ==========================
    // FORMAT TIME
    // ==========================

    const formatTime = (time) => {

        if (!time) {
            return "-";
        }

        const value = String(time);

        const parts = value.split(":");

        if (parts.length < 2) {
            return value;
        }

        let hour = Number(parts[0]);

        const minute = parts[1];

        const period = hour >= 12 ? "PM" : "AM";

        hour = hour % 12;

        if (hour === 0) {
            hour = 12;
        }

        return `${hour}:${minute} ${period}`;

    };


    // ==========================
    // LOAD PRESCRIPTIONS
    // ==========================

    useEffect(() => {

        loadPrescriptions();

    }, []);


    const loadPrescriptions = async () => {

        try {

            setLoading(true);

            setError("");


            const appointments =
                await getMyAppointments();


            if (!Array.isArray(appointments)) {

                setPrescriptions([]);

                return;

            }


            const appointmentResults =
                await Promise.all(

                    appointments.map(
                        async (appointment) => {

                            try {

                                const medicines =
    await getPatientPrescriptionsByAppointment(
        appointment.id
    );

                                if (
                                    !Array.isArray(medicines) ||
                                    medicines.length === 0
                                ) {

                                    return null;

                                }


                                return {

                                    appointment_id:
                                        appointment.id,

                                    appointment_date:
                                        appointment.appointment_date,

                                    appointment_time:
                                        appointment.appointment_time,

                                    doctor_name:
                                        appointment.doctor_name ||
                                        "Unknown Doctor",

                                    department_name:
                                        appointment.department_name ||
                                        "-",

                                    status:
                                        appointment.status ||
                                        "-",

                                    medicines

                                };

                            } catch (error) {

                                /*
                                 * A 404 simply means that
                                 * this appointment has no
                                 * prescription.
                                 */

                                if (
                                    error.response?.status === 404
                                ) {

                                    return null;

                                }

                                throw error;

                            }

                        }
                    )

                );


            const validPrescriptions =
                appointmentResults.filter(
                    (item) => item !== null
                );


            // Latest appointment first

            validPrescriptions.sort(
                (a, b) => {

                    const dateA =
                        String(
                            a.appointment_date || ""
                        );

                    const dateB =
                        String(
                            b.appointment_date || ""
                        );


                    if (dateA !== dateB) {

                        return dateB.localeCompare(
                            dateA
                        );

                    }


                    const timeA =
                        String(
                            a.appointment_time ||
                            "00:00:00"
                        );

                    const timeB =
                        String(
                            b.appointment_time ||
                            "00:00:00"
                        );


                    return timeB.localeCompare(
                        timeA
                    );

                }
            );


            setPrescriptions(
                validPrescriptions
            );

        } catch (error) {

            console.error(
                "LOAD PATIENT PRESCRIPTIONS ERROR:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Unable to load prescriptions."
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================
    // VIEW PRESCRIPTION
    // ==========================

    const handleView = (item) => {

        setSelectedPrescription(item);

    };


    // ==========================
    // CLOSE MODAL
    // ==========================

    const closeModal = () => {

        setSelectedPrescription(null);

    };


    return (

        <div className="patient-page">


            {/* ==========================
                HEADER
            ========================== */}

            <div className="appointments-header">

                <div>

                    <h2>
                        Prescriptions
                    </h2>

                    <p>
                        Medicines prescribed during your appointments.
                    </p>

                </div>

            </div>


            {/* ==========================
                MAIN TABLE
            ========================== */}

            <div className="patient-card">

                {loading && (

                    <p>
                        Loading prescriptions...
                    </p>

                )}


                {error && (

                    <p className="text-danger">
                        {error}
                    </p>

                )}


                {!loading &&
                !error &&
                prescriptions.length === 0 && (

                    <p>
                        No prescriptions found.
                    </p>

                )}


                {!loading &&
                !error &&
                prescriptions.length > 0 && (

                    <div className="table-responsive">

                        <table className="patient-table">

                            <thead>

                                <tr>

                                    <th>
                                        Appointment Date
                                    </th>

                                    <th>
                                        Doctor
                                    </th>

                                    <th>
                                        Department
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Medicines
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {prescriptions.map(
                                    (item) => (

                                        <tr
                                            key={
                                                item.appointment_id
                                            }
                                        >

                                            <td>

                                                {formatDate(
                                                    item.appointment_date
                                                )}

                                            </td>


                                            <td>

                                                {item.doctor_name}

                                            </td>


                                            <td>

                                                {
                                                    item.department_name
                                                }

                                            </td>


                                            <td>

                                                <span
                                                    className={
                                                        `status ${String(
                                                            item.status
                                                        ).toLowerCase()}`
                                                    }
                                                >

                                                    {
                                                        item.status
                                                    }

                                                </span>

                                            </td>


                                            <td>

                                                {
                                                    item.medicines.length
                                                }

                                            </td>


                                            <td>

                                                <button
                                                    type="button"
                                                    className="doctor-small-btn"
                                                    onClick={() =>
                                                        handleView(
                                                            item
                                                        )
                                                    }
                                                >

                                                    View

                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


            {/* ==========================
                PRESCRIPTION DETAILS MODAL
            ========================== */}

            {selectedPrescription && (

                <div className="doctor-modal-overlay">

                    <div
                        className="doctor-modal"
                        style={{
                            width: "min(1000px, 94vw)",
                            maxWidth: "1000px"
                        }}
                    >


                        {/* HEADER */}

                        <div className="doctor-modal-header">

                            <h2>
                                Prescription Details
                            </h2>


                            <button
                                type="button"
                                className="doctor-modal-close"
                                onClick={closeModal}
                            >

                                ×

                            </button>

                        </div>


                        {/* BODY */}

                        <div className="doctor-modal-body">


                            {/* ==========================
                                APPOINTMENT DETAILS
                            ========================== */}

                            <h3
                                style={{
                                    marginBottom: "20px"
                                }}
                            >
                                Appointment Details
                            </h3>


                            <div className="appointment-grid">


                                <div>

                                    <strong>
                                        Appointment Date
                                    </strong>

                                    <span>
                                        {
                                            formatDate(
                                                selectedPrescription
                                                    .appointment_date
                                            )
                                        }
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Time
                                    </strong>

                                    <span>
                                        {
                                            formatTime(
                                                selectedPrescription
                                                    .appointment_time
                                            )
                                        }
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Doctor
                                    </strong>

                                    <span>
                                        {
                                            selectedPrescription
                                                .doctor_name
                                        }
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Department
                                    </strong>

                                    <span>
                                        {
                                            selectedPrescription
                                                .department_name
                                        }
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Status
                                    </strong>

                                    <span>
                                        {
                                            selectedPrescription
                                                .status
                                        }
                                    </span>

                                </div>

                            </div>


                            {/* ==========================
                                MEDICINES
                            ========================== */}

                            <h3
                                style={{
                                    marginTop: "30px",
                                    marginBottom: "15px"
                                }}
                            >
                                Prescribed Medicines
                            </h3>


                            <div className="table-responsive">

                                <table className="patient-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                Medicine
                                            </th>

                                            <th>
                                                Dosage
                                            </th>

                                            <th>
                                                Duration
                                            </th>

                                            <th>
                                                Instructions
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {
                                            selectedPrescription
                                                .medicines
                                                .map(
                                                    (
                                                        medicine,
                                                        index
                                                    ) => (

                                                        <tr
                                                            key={
                                                                medicine.id ||
                                                                index
                                                            }
                                                        >

                                                            <td>

                                                                {
                                                                    medicine
                                                                        .medicine_name
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    medicine
                                                                        .dosage ||
                                                                    "-"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    medicine
                                                                        .duration ||
                                                                    "-"
                                                                }

                                                            </td>


                                                            <td>

                                                                {
                                                                    medicine
                                                                        .instructions ||
                                                                    "-"
                                                                }

                                                            </td>

                                                        </tr>

                                                    )
                                                )
                                        }

                                    </tbody>

                                </table>

                            </div>

                        </div>


                        {/* FOOTER */}

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