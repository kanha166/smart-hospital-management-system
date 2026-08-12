// File: src/components/admin/appointments/ViewAppointmentModal.jsx

import "./ViewAppointmentModal.css";

function ViewAppointmentModal({

    appointment,

    closeModal

}) {

    return (

        <div className="modal-overlay">

            <div className="view-appointment-modal">

                <h2>

                    Appointment Details 📅

                </h2>

                <div className="appointment-grid">

                    <div>

                        <strong>Patient</strong>

                        <span>{appointment.patient_name}</span>

                    </div>

                    <div>

                        <strong>Doctor</strong>

                        <span>{appointment.doctor_name}</span>

                    </div>

                    <div>

                        <strong>Reason</strong>

                        <span>{appointment.reason}</span>

                    </div>

                    <div>

                        <strong>Appointment Date</strong>

                        <span>{new Date(appointment.appointment_date).toLocaleDateString()}</span>

                    </div>

                    <div>

                        <strong>Appointment Time</strong>

                        <span>{appointment.appointment_time}</span>

                    </div>

                    <div>

                        <strong>Status</strong>

                        <span>{appointment.status}</span>

                    </div>

                </div>

                <button

                    className="close-btn"

                    onClick={closeModal}

                >

                    Close

                </button>

            </div>

        </div>

    );

}

export default ViewAppointmentModal;