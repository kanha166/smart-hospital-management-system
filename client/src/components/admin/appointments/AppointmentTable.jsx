import "./AppointmentTable.css";

function AppointmentTable({

    appointments,

    onView,

    onEdit,

    onDelete

}) {

    return (

        <div className="appointment-table-wrapper">

            <table className="appointment-table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Patient</th>

                        <th>Doctor</th>

                        <th>Reason</th>

                        <th>Date</th>

                        <th>Time</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        appointments.map((appointment) => (

                            <tr key={appointment.id}>

                                <td>{appointment.id}</td>

                                <td>{appointment.patient_name}</td>

                                <td>{appointment.doctor_name}</td>

                                <td>{appointment.reason || "-"}</td>

                                <td>
                                    {new Date(
                                        appointment.appointment_date
                                    ).toLocaleDateString()}
                                </td>

                                <td>{appointment.appointment_time}</td>

                                <td>

                                    <span
                                        className={`status ${appointment.status.toLowerCase()}`}
                                    >

                                        {appointment.status}

                                    </span>

                                </td>

                                <td className="actions">

                                    <button
                                        title="View"
                                        onClick={() => onView(appointment)}
                                    >
                                        👁
                                    </button>

                                    <button
                                        title="Edit"
                                        onClick={() => onEdit(appointment)}
                                    >
                                        ✏️
                                    </button>

                                    <button
                                        title="Delete"
                                        onClick={() => onDelete(appointment.id)}
                                    >
                                        🗑️
                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default AppointmentTable;