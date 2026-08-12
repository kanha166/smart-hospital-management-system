// File: src/pages/doctor/Prescriptions.jsx
import DoctorSearchBar from "../../components/common/DoctorSearchBar";
import { useEffect, useState } from "react";

import "./DoctorPages.css";

import {
    getDoctorAppointments
} from "../../api/appointmentApi";

import {
    createPrescription,
    getPrescriptionsByAppointment,
    updatePrescription,
    deletePrescription
} from "../../api/prescriptionApi";


export default function DoctorPrescriptions() {

    const [appointments, setAppointments] = useState([]);

    const [search, setSearch] = useState("");

    const [prescriptions, setPrescriptions] = useState([]);

    const [selectedAppointment, setSelectedAppointment] =
        useState(null);

    const [selectedPrescription, setSelectedPrescription] =
        useState(null);

    const [showModal, setShowModal] =
        useState(false);

    const [viewOnly, setViewOnly] =
        useState(false);

    const [loading, setLoading] =
        useState(true);

    const [loadingPrescriptions, setLoadingPrescriptions] =
        useState(false);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    const [form, setForm] = useState({

        medicine_name: "",
        dosage: "",
        duration: "",
        instructions: ""

    });


    // ==========================
    // LOAD DOCTOR APPOINTMENTS
    // ==========================

    useEffect(() => {

        loadAppointments();

    }, []);


    const loadAppointments = async () => {

        try {

            setLoading(true);

            setError("");

            const data =
                await getDoctorAppointments();

            const appointmentList =
                Array.isArray(data)
                    ? data
                    : data?.data || [];

            setAppointments(appointmentList);

        } catch (error) {

            console.error(
                "LOAD DOCTOR APPOINTMENTS ERROR:",
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


    // ==========================
    // FORMAT DATE
    // ==========================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        const dateString =
            String(date).split("T")[0];

        const parts =
            dateString.split("-");

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

        const value =
            String(time).slice(0, 5);

        const parts =
            value.split(":");

        if (parts.length !== 2) {
            return value;
        }

        let hour =
            parseInt(parts[0], 10);

        const minute =
            parts[1];

        const period =
            hour >= 12 ? "PM" : "AM";

        hour =
            hour % 12 || 12;

        return `${hour}:${minute} ${period}`;

    };


    // ==========================
    // PATIENT NAME
    // ==========================

    const getPatientName = (appointment) => {

        return (
            appointment.patient_name ||
            appointment.patientName ||
            "Unknown Patient"
        );

    };

    const filteredAppointments = appointments.filter(
    (appointment) => {

        const searchText =
            search.trim().toLowerCase();

        if (!searchText) {
            return true;
        }

        const patientName =
            getPatientName(appointment)
                .toLowerCase();

        const patientId =
            String(
                appointment.patient_id || ""
            ).toLowerCase();

        const status =
            String(
                appointment.status || ""
            ).toLowerCase();

        return (
            patientName.includes(searchText) ||
            patientId.includes(searchText) ||
            status.includes(searchText)
        );

    }
);

    // ==========================
    // OPEN CREATE / MANAGE
    // ==========================

    const handleCreate = async (appointment) => {

        setSelectedAppointment(appointment);

        setSelectedPrescription(null);

        setViewOnly(false);

        setForm({

            medicine_name: "",
            dosage: "",
            duration: "",
            instructions: ""

        });

        setPrescriptions([]);

        setShowModal(true);

        await loadPrescriptions(
            appointment.id
        );

    };


    // ==========================
    // OPEN VIEW
    // ==========================

    const handleView = async (appointment) => {

        setSelectedAppointment(appointment);

        setSelectedPrescription(null);

        setViewOnly(true);

        setForm({

            medicine_name: "",
            dosage: "",
            duration: "",
            instructions: ""

        });

        setPrescriptions([]);

        setShowModal(true);

        await loadPrescriptions(
            appointment.id
        );

    };


    // ==========================
    // LOAD PRESCRIPTIONS
    // ==========================

    const loadPrescriptions = async (
        appointmentId
    ) => {

        try {

            setLoadingPrescriptions(true);

            const data =
                await getPrescriptionsByAppointment(
                    appointmentId
                );

            setPrescriptions(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "LOAD PRESCRIPTIONS ERROR:",
                error
            );

            setPrescriptions([]);

        } finally {

            setLoadingPrescriptions(false);

        }

    };


    // ==========================
    // FORM CHANGE
    // ==========================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setForm((previous) => ({

            ...previous,

            [name]: value

        }));

    };


    // ==========================
    // SAVE PRESCRIPTION
    // ==========================

    const handleSave = async () => {

        if (!selectedAppointment) {
            return;
        }

        if (
            !form.medicine_name ||
            !form.dosage ||
            !form.duration
        ) {

            alert(
                "Please complete Medicine, Dosage and Duration."
            );

            return;

        }


        try {

            setSaving(true);


            if (selectedPrescription) {

                await updatePrescription(
                    selectedPrescription.id,
                    {
                        medicine_name:
                            form.medicine_name,

                        dosage:
                            form.dosage,

                        duration:
                            form.duration,

                        instructions:
                            form.instructions
                    }
                );

                alert(
                    "Prescription updated successfully."
                );

            } else {

                await createPrescription({

                    appointment_id:
                        selectedAppointment.id,

                    medicine_name:
                        form.medicine_name,

                    dosage:
                        form.dosage,

                    duration:
                        form.duration,

                    instructions:
                        form.instructions

                });

                alert(
                    "Prescription created successfully."
                );

            }


            setSelectedPrescription(null);

            setForm({

                medicine_name: "",
                dosage: "",
                duration: "",
                instructions: ""

            });


            await loadPrescriptions(
                selectedAppointment.id
            );

        } catch (error) {

            console.error(
                "SAVE PRESCRIPTION ERROR:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to save prescription."
            );

        } finally {

            setSaving(false);

        }

    };


    // ==========================
    // EDIT
    // ==========================

    const handleEdit = (prescription) => {

        setViewOnly(false);

        setSelectedPrescription(
            prescription
        );

        setForm({

            medicine_name:
                prescription.medicine_name || "",

            dosage:
                prescription.dosage || "",

            duration:
                prescription.duration || "",

            instructions:
                prescription.instructions || ""

        });

    };


    // ==========================
    // DELETE
    // ==========================

    const handleDelete = async (
        prescription
    ) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this prescription?"
            );

        if (!confirmed) {
            return;
        }


        try {

            await deletePrescription(
                prescription.id
            );

            alert(
                "Prescription deleted successfully."
            );


            await loadPrescriptions(
                selectedAppointment.id
            );

        } catch (error) {

            console.error(
                "DELETE PRESCRIPTION ERROR:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to delete prescription."
            );

        }

    };


    // ==========================
    // CLOSE MODAL
    // ==========================

    const closeModal = () => {

        setShowModal(false);

        setSelectedAppointment(null);

        setSelectedPrescription(null);

        setPrescriptions([]);

        setViewOnly(false);

        setForm({

            medicine_name: "",
            dosage: "",
            duration: "",
            instructions: ""

        });

    };


    return (

        <div className="doctor-page">

            {/* ==========================
                HEADER
            ========================== */}

            <div className="doctor-header">

                <h1>
                    Prescriptions
                </h1>

                <p>
                    Create and manage prescriptions
                    for your patients.
                </p>

            </div>
                <DoctorSearchBar
    search={search}
    setSearch={setSearch}
/>

            {/* ==========================
                ERROR
            ========================== */}

            {error && (

                <p className="doctor-error">
                    {error}
                </p>

            )}


            {/* ==========================
                APPOINTMENTS TABLE
            ========================== */}

            <div className="doctor-table-card">

                {loading && (

                    <p>
                        Loading appointments...
                    </p>

                )}


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

                {!loading &&
filteredAppointments.length > 0 && (

                    <div className="appointment-table-wrapper">

                        <table className="appointment-table">

                            <thead>

                                <tr>

                                    <th>
                                        Patient
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredAppointments.map(
    (appointment) => (

                                        <tr
                                            key={
                                                appointment.id
                                            }
                                        >

                                            <td>
                                                {
                                                    getPatientName(
                                                        appointment
                                                    )
                                                }
                                            </td>


                                            <td>
                                                {
                                                    formatDate(
                                                        appointment.appointment_date
                                                    )
                                                }
                                            </td>


                                            <td>

                                                <span
                                                    className={`status ${
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

                                            </td>


                                            {/* ACTIONS */}

                                            <td>

                                                <div className="actions">

                                                    {/* VIEW */}

                                                    <button
                                                        type="button"
                                                        title="View Prescriptions"
                                                        onClick={() =>
                                                            handleView(
                                                                appointment
                                                            )
                                                        }
                                                    >

                                                        👁️

                                                    </button>


                                                    {/* CREATE / MANAGE */}

                                                    <button
                                                        type="button"
                                                        title="Create Prescription"
                                                        onClick={() =>
                                                            handleCreate(
                                                                appointment
                                                            )
                                                        }
                                                    >

                                                        ✏️

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


            {/* ==========================
                MODAL
            ========================== */}

            {showModal &&
            selectedAppointment && (

                <div className="doctor-modal-overlay">

                    <div
                        className="doctor-modal"
                        style={{
                            width: "760px",
                            maxWidth: "95vw"
                        }}
                    >

                        {/* HEADER */}

                        <div className="doctor-modal-header">

                            <h2>

                                {viewOnly
                                    ? "View Prescriptions"
                                    : "Prescription"
                                }

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

                            {/* APPOINTMENT INFORMATION */}

                            <div className="appointment-grid">

                                <div>

                                    <strong>
                                        Patient
                                    </strong>

                                    <span>
                                        {
                                            getPatientName(
                                                selectedAppointment
                                            )
                                        }
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Appointment Date
                                    </strong>

                                    <span>
                                        {
                                            formatDate(
                                                selectedAppointment.appointment_date
                                            )
                                        }
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Appointment Time
                                    </strong>

                                    <span>
                                        {
                                            formatTime(
                                                selectedAppointment.appointment_time
                                            )
                                        }
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Status
                                    </strong>

                                    <span>
                                        {
                                            selectedAppointment.status ||
                                            "-"
                                        }
                                    </span>

                                </div>

                            </div>


                            {/* EXISTING PRESCRIPTIONS */}

                            <h3
                                style={{
                                    marginTop: "25px",
                                    marginBottom: "15px"
                                }}
                            >
                                Prescription Details
                            </h3>


                            {loadingPrescriptions && (

                                <p>
                                    Loading prescriptions...
                                </p>

                            )}


                            {!loadingPrescriptions &&
                            prescriptions.length === 0 && (

                                <p>
                                    No prescription has been
                                    created for this appointment.
                                </p>

                            )}


                            {!loadingPrescriptions &&
                            prescriptions.length > 0 && (

                                <div className="appointment-table-wrapper">

                                    <table className="appointment-table">

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

                                                {!viewOnly && (

                                                    <th>
                                                        Actions
                                                    </th>

                                                )}

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {prescriptions.map(
                                                (prescription) => (

                                                    <tr
                                                        key={
                                                            prescription.id
                                                        }
                                                    >

                                                        <td>
                                                            {
                                                                prescription.medicine_name
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                prescription.dosage ||
                                                                "-"
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                prescription.duration ||
                                                                "-"
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                prescription.instructions ||
                                                                "-"
                                                            }
                                                        </td>


                                                        {!viewOnly && (

                                                            <td>

                                                                <div className="actions">

                                                                    <button
                                                                        type="button"
                                                                        title="Edit Prescription"
                                                                        onClick={() =>
                                                                            handleEdit(
                                                                                prescription
                                                                            )
                                                                        }
                                                                    >

                                                                        ✏️

                                                                    </button>


                                                                    <button
                                                                        type="button"
                                                                        className="reject-btn"
                                                                        title="Delete Prescription"
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                prescription
                                                                            )
                                                                        }
                                                                    >

                                                                        🗑️

                                                                    </button>

                                                                </div>

                                                            </td>

                                                        )}

                                                    </tr>

                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            )}


                            {/* CREATE / EDIT FORM */}

                            {!viewOnly && (

                                <>

                                    <h3
                                        style={{
                                            marginTop: "30px",
                                            marginBottom: "15px"
                                        }}
                                    >

                                        {
                                            selectedPrescription
                                                ? "Edit Prescription"
                                                : "Create Prescription"
                                        }

                                    </h3>


                                    {/* MEDICINE */}

                                    <div className="doctor-form-group">

                                        <label>
                                            Medicine
                                        </label>

                                        <select
                                            name="medicine_name"
                                            value={
                                                form.medicine_name
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        >

                                            <option value="">
                                                Select Medicine
                                            </option>

                                            <option value="Paracetamol">
                                                Paracetamol
                                            </option>

                                            <option value="Amoxicillin">
                                                Amoxicillin
                                            </option>

                                            <option value="Azithromycin">
                                                Azithromycin
                                            </option>

                                            <option value="Ibuprofen">
                                                Ibuprofen
                                            </option>

                                            <option value="Cetirizine">
                                                Cetirizine
                                            </option>

                                            <option value="Pantoprazole">
                                                Pantoprazole
                                            </option>

                                            <option value="Omeprazole">
                                                Omeprazole
                                            </option>

                                            <option value="Metformin">
                                                Metformin
                                            </option>

                                        </select>

                                    </div>


                                    {/* DOSAGE + DURATION */}

                                    <div className="doctor-form-row">

                                        <div className="doctor-form-group">

                                            <label>
                                                Dosage
                                            </label>

                                            <select
                                                name="dosage"
                                                value={
                                                    form.dosage
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                            >

                                                <option value="">
                                                    Select Dosage
                                                </option>

                                                <option value="1-0-0">
                                                    1-0-0
                                                </option>

                                                <option value="0-1-0">
                                                    0-1-0
                                                </option>

                                                <option value="0-0-1">
                                                    0-0-1
                                                </option>

                                                <option value="1-0-1">
                                                    1-0-1
                                                </option>

                                                <option value="1-1-0">
                                                    1-1-0
                                                </option>

                                                <option value="0-1-1">
                                                    0-1-1
                                                </option>

                                                <option value="1-1-1">
                                                    1-1-1
                                                </option>

                                                <option value="As directed">
                                                    As directed
                                                </option>

                                            </select>

                                        </div>


                                        <div className="doctor-form-group">

                                            <label>
                                                Duration
                                            </label>

                                            <input
                                                type="text"
                                                name="duration"
                                                placeholder="e.g. 5 days"
                                                value={
                                                    form.duration
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                            />

                                        </div>

                                    </div>


                                    {/* INSTRUCTIONS */}

                                    <div className="doctor-form-group">

                                        <label>
                                            Instructions
                                        </label>

                                        <textarea
                                            name="instructions"
                                            placeholder="Enter instructions for the patient..."
                                            value={
                                                form.instructions
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                    </div>

                                </>

                            )}

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


                            {!viewOnly && (

                                <button
                                    type="button"
                                    className="doctor-small-btn"
                                    onClick={handleSave}
                                    disabled={saving}
                                >

                                    {saving
                                        ? "Saving..."
                                        : selectedPrescription
                                            ? "Update Prescription"
                                            : "Create Prescription"
                                    }

                                </button>

                            )}

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}