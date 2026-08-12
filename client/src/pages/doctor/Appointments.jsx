import { useEffect, useState } from "react";
import DoctorSearchBar
    from "../../components/common/DoctorSearchBar";
import "./DoctorPages.css";

import {
    getDoctorAppointments,
    updateDoctorAppointment
} from "../../api/appointmentApi";

export default function DoctorAppointments() {

    const [appointments, setAppointments] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [selectedAppointment, setSelectedAppointment] =
        useState(null);

    const [selectedDate, setSelectedDate] =
        useState("");

    const [selectedTime, setSelectedTime] =
        useState("");

    const [saving, setSaving] =
        useState(false);

    const [actionError, setActionError] =
        useState("");


    // ==========================
    // FORMAT DATE FOR DISPLAY
    // ==========================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        const dateString = String(date);

        if (dateString.includes("T")) {

            const datePart =
                dateString.split("T")[0];

            const parts =
                datePart.split("-");

            if (parts.length === 3) {

                return `${parts[2]}/${parts[1]}/${parts[0]}`;

            }

        }

        return dateString;
    };


    // ==========================
    // GET DATE FOR DATE INPUT
    // ==========================

    const getInputDate = (date) => {

        if (!date) {
            return "";
        }

        return String(date)
            .split("T")[0];
    };


    // ==========================
    // FORMAT TIME
    // ==========================

    const formatTime = (time) => {

        if (!time) {
            return "-";
        }

        return String(time).slice(0, 5);
    };


    // ==========================
    // SORT APPOINTMENTS
    // ==========================

    const sortAppointments = (list) => {

        return [...list].sort((a, b) => {

            const dateA =
                getInputDate(a.appointment_date);

            const dateB =
                getInputDate(b.appointment_date);


            // Latest date first

            if (dateA !== dateB) {

                return dateB.localeCompare(dateA);

            }


            // Same date:
            // Earliest time first

            const timeA =
                String(
                    a.appointment_time || "00:00:00"
                );

            const timeB =
                String(
                    b.appointment_time || "00:00:00"
                );


            return timeA.localeCompare(timeB);

        });

    };


    // ==========================
    // LOAD APPOINTMENTS
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


            setAppointments(
                sortAppointments(data)
            );


        } catch (error) {

            console.error(
                "GET DOCTOR APPOINTMENTS ERROR:",
                error
            );


            setError(
                "Unable to load appointments."
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================
    // VIEW / REVIEW
    // ==========================

    const handleView = (appointment) => {

        setSelectedAppointment(
            appointment
        );


        setSelectedDate(
            getInputDate(
                appointment.appointment_date
            )
        );


        setSelectedTime(
            formatTime(
                appointment.appointment_time
            )
        );


        setActionError("");

    };


    // ==========================
    // CLOSE MODAL
    // ==========================

    const closeModal = () => {

        if (saving) {
            return;
        }


        setSelectedAppointment(null);

        setSelectedDate("");

        setSelectedTime("");

        setActionError("");

    };


    // ==========================
    // UPDATE DOCTOR APPOINTMENT
    // ==========================

    const handleUpdate = async (status) => {

        if (!selectedAppointment) {
            return;
        }


        try {

            setSaving(true);

            setActionError("");


            const response =
                await updateDoctorAppointment(

                    selectedAppointment.id,

                    {
                        appointment_date:
                            selectedDate,

                        appointment_time:
                            selectedTime,

                        status
                    }

                );


            /*
             * appointmentApi.js returns:
             *
             * response.data
             *
             * Backend returns:
             *
             * {
             *     success: true,
             *     message: "...",
             *     data: appointment
             * }
             *
             * Therefore the updated appointment
             * is inside response.data.
             */

            const updatedAppointment =
                response.data;


            setAppointments((previous) => {

                const updatedList =
                    previous.map(
                        (appointment) => {

                            if (
                                appointment.id ===
                                selectedAppointment.id
                            ) {

                                return {
                                    ...appointment,
                                    ...updatedAppointment
                                };

                            }

                            return appointment;

                        }
                    );


                return sortAppointments(
                    updatedList
                );

            });


            setSelectedAppointment(null);

            setSelectedDate("");

            setSelectedTime("");

            setActionError("");


        } catch (error) {

            console.error(
                "UPDATE DOCTOR APPOINTMENT ERROR:",
                error
            );


            setActionError(

                error.response?.data?.message ||
                "Unable to update appointment."

            );

        } finally {

            setSaving(false);

        }

    };


    // ==========================
    // ACCEPT
    // ==========================

    const handleAccept = () => {

        handleUpdate("scheduled");

    };


    // ==========================
    // REJECT
    // ==========================

    const handleReject = () => {

        handleUpdate("rejected");

    };


    // ==========================
    // SAVE CHANGES
    // ==========================

    const handleSaveChanges = () => {

        if (!selectedAppointment) {
            return;
        }


        const status =
            selectedAppointment.status ===
            "pending"

                ? "scheduled"

                : selectedAppointment.status;


        handleUpdate(status);

    };

    // ==========================
// FILTER APPOINTMENTS
// ==========================

const filteredAppointments = appointments.filter((appointment) => {
        const searchValue =
            search.trim().toLowerCase();

        if (!searchValue) {
            return true;
        }

        return (

            String(
                appointment.patient_name || ""
            )
                .toLowerCase()
                .includes(searchValue)

            ||

            String(
                appointment.department_name || ""
            )
                .toLowerCase()
                .includes(searchValue)

            ||

            String(
                appointment.status || ""
            )
                .toLowerCase()
                .includes(searchValue)

            ||

            String(
                appointment.booking_source || ""
            )
                .toLowerCase()
                .includes(searchValue)

            ||

            String(
                appointment.appointment_date || ""
            )
                .toLowerCase()
                .includes(searchValue)

        );

    });

    // ==========================
    // JSX
    // ==========================

    return (

        <div className="doctor-page">

    {/* ==========================
        HEADER
    ========================== */}

    <div className="doctor-header">

        <div>

            <h1>
                Appointments
            </h1>

            <p>
                View and manage your patient appointments.
            </p>

        </div>

    </div>


    {/* ==========================
        SEARCH BAR
    ========================== */}

    <DoctorSearchBar
        search={search}
        setSearch={setSearch}
    />


    {/* ==========================
        TABLE CARD
    ========================== */}

            <div className="doctor-table-card">

                {/* LOADING */}

                {loading && (

                    <p>
                        Loading appointments...
                    </p>

                )}


                {/* ERROR */}

                {error && (

                    <p>
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

                {/* TABLE */}

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
                                        Department
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                    <th>
                                        Time
                                    </th>

                                    <th>
                                        Booking
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

                                            {/* PATIENT */}

                                            <td>
                                                {
                                                    appointment.patient_name
                                                }
                                            </td>


                                            {/* DEPARTMENT */}

                                            <td>
                                                {
                                                    appointment.department_name
                                                }
                                            </td>


                                            {/* DATE */}

                                            <td>
                                                {formatDate(
                                                    appointment.appointment_date
                                                )}
                                            </td>


                                            {/* TIME */}

                                            <td>
                                                {formatTime(
                                                    appointment.appointment_time
                                                )}
                                            </td>


                                            {/* BOOKING */}

                                            <td>

                                                {appointment.booking_source ===
                                                "patient" ? (

                                                    <span className="booking-badge patient-booking">
                                                        Patient Requested
                                                    </span>

                                                ) : (

                                                    <span className="booking-badge admin-booking">
                                                        Admin Scheduled
                                                    </span>

                                                )}

                                            </td>


                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={`status ${appointment.status}`}
                                                >
                                                    {
                                                        appointment.status
                                                    }
                                                </span>

                                            </td>


                                            {/* ACTION */}

                                            <td>

                                                <div className="actions">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleView(
                                                                appointment
                                                            )
                                                        }
                                                    >

                                                        {appointment.booking_source ===
                                                        "patient"

                                                            ? "Review"

                                                            : "View"}

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

            {selectedAppointment && (

                <div className="doctor-modal-overlay">

                    <div className="doctor-modal">


                        {/* MODAL HEADER */}

                        <div className="doctor-modal-header">

                            <h2>

                                {selectedAppointment.booking_source ===
                                "patient"

                                    ? "Review Appointment"

                                    : "Appointment Details"}

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


                        {/* MODAL BODY */}

                        <div className="doctor-modal-body">


                            {/* PATIENT */}

                            <p>

                                <strong>
                                    Patient:
                                </strong>{" "}

                                {
                                    selectedAppointment.patient_name
                                }

                            </p>


                            {/* DEPARTMENT */}

                            <p>

                                <strong>
                                    Department:
                                </strong>{" "}

                                {
                                    selectedAppointment.department_name
                                }

                            </p>


                            {/* REASON */}

                            <p>

                                <strong>
                                    Reason:
                                </strong>{" "}

                                {

                                    selectedAppointment.reason ||

                                    "Not provided"

                                }

                            </p>


                            {/* BOOKING */}

                            <p>

                                <strong>
                                    Booking:
                                </strong>{" "}

                                {

                                    selectedAppointment.booking_source ===
                                    "patient"

                                        ? "Patient Requested"

                                        : "Admin Scheduled"

                                }

                            </p>


                            {/* ==========================
                                PATIENT BOOKED
                            ========================== */}

                            {selectedAppointment.booking_source ===
                            "patient" ? (

                                <>

                                    {/* DATE */}

                                    <div className="doctor-form-group">

                                        <label>
                                            Appointment Date
                                        </label>


                                        <input
                                            type="date"

                                            value={
                                                selectedDate
                                            }

                                            onChange={(
                                                event
                                            ) => {

                                                setSelectedDate(
                                                    event.target.value
                                                );

                                            }}

                                            disabled={
                                                saving
                                            }

                                        />

                                    </div>


                                    {/* TIME */}

                                    <div className="doctor-form-group">

                                        <label>
                                            Appointment Time
                                        </label>


                                        <input
                                            type="time"

                                            value={
                                                selectedTime
                                            }

                                            onChange={(
                                                event
                                            ) => {

                                                setSelectedTime(
                                                    event.target.value
                                                );

                                            }}

                                            disabled={
                                                saving
                                            }

                                        />

                                    </div>


                                    {/* STATUS */}

                                    <p>

                                        <strong>
                                            Current Status:
                                        </strong>{" "}

                                        {
                                            selectedAppointment.status
                                        }

                                    </p>


                                    {/* ERROR */}

                                    {actionError && (

                                        <p className="doctor-error">

                                            {
                                                actionError
                                            }

                                        </p>

                                    )}

                                </>

                            ) : (

                                /* ==========================
                                   ADMIN BOOKED
                                ========================== */

                                <>

                                    {/* DATE */}

                                    <p>

                                        <strong>
                                            Date:
                                        </strong>{" "}

                                        {formatDate(
                                            selectedAppointment.appointment_date
                                        )}

                                    </p>


                                    {/* TIME */}

                                    <p>

                                        <strong>
                                            Time:
                                        </strong>{" "}

                                        {formatTime(
                                            selectedAppointment.appointment_time
                                        )}

                                    </p>


                                    {/* STATUS */}

                                    <p>

                                        <strong>
                                            Status:
                                        </strong>{" "}

                                        {
                                            selectedAppointment.status
                                        }

                                    </p>

                                </>

                            )}

                        </div>


                        {/* ==========================
                            MODAL FOOTER
                        ========================== */}

                        <div className="doctor-modal-footer">


                            {selectedAppointment.booking_source ===
                            "patient" ? (

                                <>

                                    {/* ACCEPT */}

                                    <button
                                        type="button"
                                        className="doctor-small-btn"
                                        onClick={
                                            handleAccept
                                        }
                                        disabled={
                                            saving
                                        }
                                    >

                                        {saving
                                            ? "Saving..."
                                            : "Accept"}

                                    </button>


                                    {/* REJECT */}

                                    <button
                                        type="button"
                                        className="doctor-small-btn"
                                        onClick={
                                            handleReject
                                        }
                                        disabled={
                                            saving
                                        }
                                    >

                                        {saving
                                            ? "Saving..."
                                            : "Reject"}

                                    </button>


                                    {/* SAVE CHANGES */}

                                    <button
                                        type="button"
                                        className="doctor-small-btn"
                                        onClick={
                                            handleSaveChanges
                                        }
                                        disabled={
                                            saving ||
                                            !selectedDate ||
                                            !selectedTime
                                        }
                                    >

                                        {saving
                                            ? "Saving..."
                                            : "Save Changes"}

                                    </button>


                                    {/* CLOSE */}

                                    <button
                                        type="button"
                                        className="doctor-small-btn"
                                        onClick={
                                            closeModal
                                        }
                                        disabled={
                                            saving
                                        }
                                    >

                                        Close

                                    </button>

                                </>

                            ) : (

                                /* ADMIN APPOINTMENT */

                                <button
                                    type="button"
                                    className="doctor-small-btn"
                                    onClick={
                                        closeModal
                                    }
                                >

                                    Close

                                </button>

                            )}

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}