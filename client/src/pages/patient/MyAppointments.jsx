import { useEffect, useState } from "react";

import "./PatientPages.css";

import BookAppointmentModal from "../../components/patient/BookAppointmentModal";

import {
    getMyAppointments,
    createPatientAppointment
} from "../../api/appointmentApi";

export default function MyAppointments() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {

        fetchAppointments();

    }, []);

    const fetchAppointments = async () => {

        try {

            const data = await getMyAppointments();

            setAppointments(data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleBookAppointment = async (data) => {

    try {

        await createPatientAppointment(data);

        alert("Appointment booked successfully");

        fetchAppointments();

    } catch (error) {

        console.error(error);

        alert("Failed to book appointment");

    }

};

    return (

        <div className="patient-page">

            <div className="appointments-header">

                <div>

                    <h2>My Appointments</h2>

                    <p>View and manage your appointments.</p>

                </div>

                <button
                    className="add-appointment-btn"
                    onClick={() => setIsModalOpen(true)}
                >
                    + Book Appointment
                </button>

            </div>

            <div className="patient-card">

                <h2>Appointment History</h2>

                <table className="patient-table">

                    <thead>

                        <tr>

                            <th>Doctor</th>

                            <th>Department</th>

                            <th>Date</th>

                            <th>Time</th>

                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {appointments.length > 0 ? (

                            appointments.map((appointment) => (

                                <tr key={appointment.id}>

                                    <td>{appointment.doctor_name}</td>

                                    <td>{appointment.department_name}</td>

                                    <td>
                                        {
                                            new Date(
                                                appointment.appointment_date
                                            ).toLocaleDateString(
                                                "en-GB",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric"
                                                }
                                            )
                                        }
                                    </td>

                                    <td>{appointment.appointment_time}</td>

                                    <td>

                                        <span
                                            className={
                                                appointment.status === "Completed"
                                                    ? "status completed"
                                                    : appointment.status === "Scheduled"
                                                    ? "status scheduled"
                                                    : appointment.status === "Cancelled"
                                                    ? "status cancelled"
                                                    : "status pending"
                                            }
                                        >

                                            {appointment.status}

                                        </span>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td colSpan="5">

                                    No appointments found.

                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

            <BookAppointmentModal

    isOpen={isModalOpen}

    onClose={() => setIsModalOpen(false)}

    onBookAppointment={handleBookAppointment}

/>

        </div>

    );

}