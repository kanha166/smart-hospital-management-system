import "./DashboardWidgets.css";

function TopDoctors({ doctors = [] }) {

    return (

        <div className="widget-card">

            <h3>Top Doctors</h3>

            <table className="mini-table">

                <thead>

                    <tr>
                        <th>Doctor</th>
                        <th>Appointments</th>
                    </tr>

                </thead>

                <tbody>

                    {doctors.map((doctor) => (

                        <tr key={doctor.name}>

                            <td>{doctor.name}</td>

                            <td>{doctor.total_appointments}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default TopDoctors;