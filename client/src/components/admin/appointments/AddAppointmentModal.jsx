import { useState, useEffect } from "react";

import { getAllPatients } from "../../../api/patientApi";
import { getAllDoctors } from "../../../api/doctorApi";
import "./AddAppointmentModal.css";
import {
    createAppointment,
    updateAppointment
} from "../../../api/appointmentApi";

function AddAppointmentModal({

    closeModal,

    addAppointment,

    editMode = false,

    appointmentData = null

}) {

    const [errors, setErrors] = useState({});

    const [patients, setPatients] = useState([]);

    const [doctors, setDoctors] = useState([]);

    const [appointment, setAppointment] = useState(
    appointmentData
        ? {
              id: appointmentData.id,

              patient_id: appointmentData.patient_id || "",
              doctor_id: appointmentData.doctor_id || "",

              appointment_date: appointmentData.appointment_date
                  ? appointmentData.appointment_date.split("T")[0]
                  : "",

              appointment_time: appointmentData.appointment_time || "",

              reason: appointmentData.reason || "",

              status:
    appointmentData.status === "Scheduled"
        ? "scheduled"
        : appointmentData.status === "Completed"
        ? "completed"
        : appointmentData.status === "Cancelled"
        ? "cancelled"
        : appointmentData.status === "Pending"
        ? "pending"
        : appointmentData.status || "pending"
          }
        : {
              patient_id: "",
              doctor_id: "",
              appointment_date: "",
              appointment_time: "",
              reason: "",
              status: "pending"
          }
);
    useEffect(() => {

    const loadData = async () => {

        try {

            const patientData = await getAllPatients();
            const doctorData = await getAllDoctors();
            console.log("Patients:", patientData);
            console.log("Doctors:", doctorData);
            setPatients(patientData);
            setDoctors(doctorData);

        } catch (err) {

            console.error(err);

        }

    };

    loadData();

}, []);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setAppointment({

            ...appointment,

            [name]: value

        });

    };

    const validateForm = () => {

        const newErrors = {};

        if (!appointment.patient_id) {
    newErrors.patient_id = "Select a patient.";
}

if (!appointment.doctor_id) {
    newErrors.doctor_id = "Select a doctor.";
}

if (!appointment.reason.trim()) {
    newErrors.reason = "Reason is required.";
}
       if (!appointment.appointment_date) {

    newErrors.appointment_date =
        "Appointment date is required.";

}

if (!appointment.appointment_time) {

    newErrors.appointment_time =
        "Appointment time is required.";

}

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {

        let response;

        if (editMode) {

            response = await updateAppointment(
                appointment.id,
                appointment
            );

        } else {

            response = await createAppointment(
                appointment
            );

        }

        await addAppointment(response.data);

        closeModal();

    } catch (error) {

        console.error(error);

        alert("Operation failed.");

    }
};

    return (

        <div className="modal-overlay">

            <div className="appointment-modal">

                <h2>

                    {

                        editMode

                            ? "Edit Appointment"

                            : "Add Appointment"

                    }

                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="appointment-form-grid">
                                            <div>

                            <label>Patient Name</label>

                            <select
                                name="patient_id"
                                value={appointment.patient_id}
                                onChange={handleChange}
                            >

                                <option value="">Select Patient</option>

                                {patients.map((patient) => (

                                    <option
                                        key={patient.id}
                                        value={patient.id}
                                    >
                                        {patient.name}
                                    </option>

                                ))}

                            </select>

                            {

                                errors.patient_id &&

                                <small className="validation-error">

                                    {errors.patient_id}

                                </small>

                            }

                        </div>

                        <div>

                            <label>Doctor Name</label>

                            <select
                                    name="doctor_id"
                                    value={appointment.doctor_id}
                                    onChange={handleChange}
                                >

                                    <option value="">Select Doctor</option>

                                    {doctors.map((doctor) => (

                                        <option
                                            key={doctor.id}
                                            value={doctor.id}
                                        >
                                            {doctor.name}
                                        </option>

                                    ))}

                                </select>

                            {

                                errors.doctor_id &&

                                <small className="validation-error">

                                    {errors.doctor_id}

                                </small>

                            }

                        </div>

                        <div>

                            <label>Reason</label>

                            <input
    type="text"
    name="reason"
    placeholder="Reason for appointment"
    value={appointment.reason}
    onChange={handleChange}
/>

                            {

                                errors.reason &&

                                <small className="validation-error">

                                    {errors.reason}

                                </small>

                            }

                        </div>

                        <div>

                        <label>Appointment Date</label>

                        <input
                            type="date"
                            name="appointment_date"
                            value={appointment.appointment_date}
                            onChange={handleChange}
                        />

                        {
                            errors.appointment_date &&
                            <small className="validation-error">
                                {errors.appointment_date}
                            </small>
                        }

                        </div>

                        <div>

                            <label>Appointment Time</label>

                        <input
                            type="time"
                            name="appointment_time"
                            value={appointment.appointment_time}
                            onChange={handleChange}
                        />

                        {
                            errors.appointment_time &&
                            <small className="validation-error">
                                {errors.appointment_time}
                            </small>
                        }

                        </div>

                        <div>

                            <label>Status</label>

                            <select
    name="status"
    value={appointment.status}
    onChange={handleChange}
>
    <option value="pending">Pending</option>
    <option value="scheduled">Scheduled</option>
    <option value="completed">Completed</option>
    <option value="cancelled">Cancelled</option>
</select>
                        </div>

                    </div>

                    <div className="modal-buttons">

                        <button

                            type="submit"

                            className="save-btn"

                        >

                            {

                                editMode

                                    ? "Update Appointment"

                                    : "Save Appointment"

                            }

                        </button>

                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={closeModal}

                        >

                            Cancel

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddAppointmentModal;