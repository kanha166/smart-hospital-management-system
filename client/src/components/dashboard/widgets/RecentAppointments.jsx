import "./DashboardWidgets.css";

function RecentAppointments({

    appointments = []

}) {

    return (

        <div className="widget-card">

            <h3>Recent Appointments</h3>

            <table className="mini-table">

                <thead>
    <tr>
        <th>Patient</th>
        <th>Date</th>
        <th>Time</th>
    </tr>
</thead>

<tbody>
    {
        appointments.map((item) => (
            <tr key={item.id}>
                <td>{item.patient_name}</td>
                <td>
                    {item.appointment_date
                        ? item.appointment_date.split("T")[0]
                        : "-"}
                </td>
                <td>{item.appointment_time}</td>
            </tr>
        ))
    }
</tbody>
            </table>

        </div>

    );

}

export default RecentAppointments;