import { useEffect, useState } from "react";
import DoctorSearchBar from "../../components/common/DoctorSearchBar";
import "./DoctorPages.css";

import {
    getDoctorAppointments
} from "../../api/appointmentApi";

import api from "../../api/axios";


export default function ConsultationNotes() {

    const [appointments, setAppointments] =
        useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [selectedAppointment, setSelectedAppointment] =
        useState(null);

    const [consultations, setConsultations] =
        useState({});

    const [notes, setNotes] =
        useState("");

    const [diagnosis, setDiagnosis] =
        useState("");

    const [saving, setSaving] =
        useState(false);

    const [actionError, setActionError] =
        useState("");

    const [successMessage, setSuccessMessage] =
        useState("");


    // =========================================================
    // FORMAT DATE
    // =========================================================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        const dateString =
            String(date);

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
    // SORT APPOINTMENTS
    // Latest date first
    // Same date: latest time first
    // =========================================================

    const sortAppointments = (list) => {

        return [...list].sort((a, b) => {

            const dateA =
                String(
                    a.appointment_date || ""
                ).split("T")[0];

            const dateB =
                String(
                    b.appointment_date || ""
                ).split("T")[0];


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

        });

    };


    // =========================================================
    // LOAD DOCTOR APPOINTMENTS
    // =========================================================

    useEffect(() => {

        loadAppointments();

    }, []);


    const loadAppointments = async () => {

        try {

            setLoading(true);

            setError("");


            const data =
                await getDoctorAppointments();


            if (!Array.isArray(data)) {

                setAppointments([]);

                return;

            }


            setAppointments(
                sortAppointments(data)
            );


            // Load consultations for every appointment
            await loadConsultations(data);

        } catch (error) {

            console.error(
                "GET CONSULTATION APPOINTMENTS ERROR:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Unable to load appointments."
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================================================
    // LOAD CONSULTATIONS
    // =========================================================

    const loadConsultations = async (
        appointmentList
    ) => {

        const consultationMap = {};


        await Promise.all(

            appointmentList.map(
                async (appointment) => {

                    try {

    const response =
        await api.get(
            `/consultations/appointment/${appointment.id}`
        );

    consultationMap[
        appointment.id
    ] = response.data.data || null;

} catch (error) {

    if (error.response?.status === 404) {

        consultationMap[
            appointment.id
        ] = null;

    } else {

        console.error(
            "LOAD CONSULTATION ERROR:",
            error
        );

        consultationMap[
            appointment.id
        ] = null;

    }

}
                }
            )

        );


        setConsultations(
            consultationMap
        );

    };

    const filteredAppointments = appointments.filter(
    (appointment) => {

        const searchValue =
            search.trim().toLowerCase();

        if (!searchValue) {
            return true;
        }

        const patientName =
            String(
                appointment.patient_name || ""
            ).toLowerCase();

        const patientId =
            String(
                appointment.patient_id || ""
            ).toLowerCase();

        const department =
            String(
                appointment.department_name || ""
            ).toLowerCase();

        return (
            patientName.includes(searchValue) ||
            patientId.includes(searchValue) ||
            department.includes(searchValue)
        );

    }
);

    // =========================================================
    // OPEN CONSULTATION
    // =========================================================

    const handleOpen = (appointment) => {

        const existingConsultation =
            consultations[appointment.id];


        setSelectedAppointment(
            appointment
        );


        setNotes(
            existingConsultation?.notes || ""
        );


        setDiagnosis(
            existingConsultation?.diagnosis || ""
        );


        setActionError("");

        setSuccessMessage("");

    };


    // =========================================================
    // CLOSE MODAL
    // =========================================================

    const closeModal = () => {

        if (saving) {
            return;
        }


        setSelectedAppointment(
            null
        );

        setNotes("");

        setDiagnosis("");

        setActionError("");

        setSuccessMessage("");

    };


    // =========================================================
    // SAVE CONSULTATION
    // =========================================================

    const handleSave = async () => {

        if (!selectedAppointment) {
            return;
        }


        if (!notes.trim()) {

            setActionError(
                "Please enter consultation notes."
            );

            return;

        }


        if (!diagnosis.trim()) {

            setActionError(
                "Please enter diagnosis."
            );

            return;

        }


        try {

            setSaving(true);

            setActionError("");

            setSuccessMessage("");


            const existingConsultation =
                consultations[
                    selectedAppointment.id
                ];


            let response;


            // =================================================
            // UPDATE EXISTING CONSULTATION
            // =================================================

            if (existingConsultation) {

                response =
                    await api.put(
                        `/consultations/${existingConsultation.id}`,
                        {
                            notes:
                                notes.trim(),

                            diagnosis:
                                diagnosis.trim()
                        }
                    );

            }

            // =================================================
            // CREATE NEW CONSULTATION
            // =================================================

            else {

                response =
                    await api.post(
                        "/consultations",
                        {
                            appointment_id:
                                selectedAppointment.id,

                            notes:
                                notes.trim(),

                            diagnosis:
                                diagnosis.trim()
                        }
                    );

            }


            const savedConsultation =
                response.data.data;


            setConsultations(
                (previous) => ({
                    ...previous,

                    [selectedAppointment.id]:
                        savedConsultation
                })
            );


            setSuccessMessage(
                "Consultation saved successfully."
            );


        } catch (error) {

            console.error(
                "SAVE CONSULTATION ERROR:",
                error
            );


            setActionError(
                error.response?.data?.message ||
                "Unable to save consultation."
            );

        } finally {

            setSaving(false);

        }

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
            Consultation Notes
        </h2>

        <p>
            Create and manage consultation notes for your appointments.
        </p>

    </div>

</div>
                <DoctorSearchBar
    search={search}
    setSearch={setSearch}
/>


            {/* =================================================
                TABLE
            ================================================= */}

            <div className="doctor-table-card">

                {/* LOADING */}

                {loading && (

                    <p>
                        Loading appointments...
                    </p>

                )}


                {/* ERROR */}

                {!loading && error && (

                    <p className="doctor-error">
                        {error}
                    </p>

                )}


                {/* EMPTY */}

                {!loading &&
                !error &&
                appointments.length === 0 && (

                    <p>
                        No appointments found.
                    </p>

                )}

                {!loading &&
!error &&
appointments.length > 0 &&
filteredAppointments.length === 0 && (

    <p>
        No appointments match your search.
    </p>

)}

                {/* APPOINTMENT TABLE */}

                {!loading &&
!error &&
filteredAppointments.length > 0 && (

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
                                        Date
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Consultation
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredAppointments.map(
                                    (appointment, index) => {

                                        const consultation =
                                            consultations[
                                                appointment.id
                                            ];


                                        return (

                                            <tr
                                                key={
                                                    appointment.id ||
                                                    index
                                                }
                                            >

                                                {/* PATIENT */}

                                                <td>

                                                    {
                                                        appointment.patient_name ||
                                                        "-"
                                                    }

                                                </td>


                                                {/* PATIENT ID */}

                                                <td>

                                                    {
                                                        appointment.patient_id ||
                                                        "-"
                                                    }

                                                </td>


                                                {/* DATE */}

                                                <td>

                                                    {formatDate(
                                                        appointment.appointment_date
                                                    )}

                                                </td>

                                                {/* STATUS */}

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


                                                {/* CONSULTATION STATUS */}

                                                <td>

                                                    {consultation ? (

                                                        <span className="status completed">
                                                            Added
                                                        </span>

                                                    ) : (

                                                        <span className="status pending">
                                                            Not Added
                                                        </span>

                                                    )}

                                                </td>


                                                {/* ACTION */}

                                                <td>

                                                    <div className="actions">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleOpen(
                                                                    appointment
                                                                )
                                                            }
                                                        >

                                                            {consultation
                                                                ? "👁️"
                                                                : "✏️"
                                                            }

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        );

                                    }
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


            {/* =================================================
                CONSULTATION MODAL
            ================================================= */}

            {selectedAppointment && (

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


                        {/* =================================================
                            MODAL HEADER
                        ================================================= */}

                        <div className="doctor-modal-header">

                            <h2>

                                {consultations[
                                    selectedAppointment.id
                                ]

                                    ? "Consultation Notes"

                                    : "Add Consultation Note"

                                }

                            </h2>


                            <button
                                type="button"
                                className="doctor-modal-close"
                                onClick={closeModal}
                                disabled={saving}
                            >
                                ×
                            </button>

                        </div>


                        {/* =================================================
                            MODAL BODY
                        ================================================= */}

                        <div className="doctor-modal-body">


                            {/* PATIENT DETAILS */}

                            <div className="appointment-grid">


                                <div>

                                    <strong>
                                        Patient
                                    </strong>

                                    <span>
                                        {
                                            selectedAppointment.patient_name ||
                                            "-"
                                        }
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Patient ID
                                    </strong>

                                    <span>
                                        {
                                            selectedAppointment.patient_id ||
                                            "-"
                                        }
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Date
                                    </strong>

                                    <span>
                                        {formatDate(
                                            selectedAppointment.appointment_date
                                        )}
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Time
                                    </strong>

                                    <span>
                                        {formatTime(
                                            selectedAppointment.appointment_time
                                        )}
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Department
                                    </strong>

                                    <span>
                                        {
                                            selectedAppointment.department_name ||
                                            "-"
                                        }
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Appointment Status
                                    </strong>

                                    <span>
                                        {
                                            selectedAppointment.status ||
                                            "-"
                                        }
                                    </span>

                                </div>


                            </div>


                            {/* =================================================
                                NOTES
                            ================================================= */}

                            <div className="doctor-form-group">

                                <label>
                                    Consultation Notes
                                </label>

                                <textarea
                                    value={notes}
                                    onChange={(event) =>
                                        setNotes(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Enter consultation notes..."
                                    disabled={saving}
                                />

                            </div>


                            {/* =================================================
                                DIAGNOSIS
                            ================================================= */}

                            <div className="doctor-form-group">

                                <label>
                                    Diagnosis
                                </label>

                                <textarea
                                    value={diagnosis}
                                    onChange={(event) =>
                                        setDiagnosis(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Enter diagnosis..."
                                    disabled={saving}
                                />

                            </div>


                            {/* ERROR */}

                            {actionError && (

                                <p className="doctor-error">

                                    {
                                        actionError
                                    }

                                </p>

                            )}


                            {/* SUCCESS */}

                            {successMessage && (

                                <p
                                    style={{
                                        marginTop: "15px",
                                        padding: "10px 12px",
                                        borderRadius: "8px",
                                        background:
                                            "rgba(34, 197, 94, 0.12)",
                                        border:
                                            "1px solid rgba(34, 197, 94, 0.25)",
                                        color: "#4ade80"
                                    }}
                                >

                                    {
                                        successMessage
                                    }

                                </p>

                            )}

                        </div>


                        {/* =================================================
                            FOOTER
                        ================================================= */}

                        <div className="doctor-modal-footer">

                            <button
                                type="button"
                                className="doctor-small-btn"
                                onClick={handleSave}
                                disabled={saving}
                            >

                                {saving
                                    ? "Saving..."
                                    : "Save Consultation"
                                }

                            </button>


                            <button
                                type="button"
                                className="doctor-small-btn"
                                onClick={closeModal}
                                disabled={saving}
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