import "./DashboardWidgets.css";

function DepartmentStats({ departments = [] }) {

    return (
        <div className="widget-card">

            <h3>Department Statistics</h3>

            <table className="mini-table">

                <thead>

                    <tr>
                        <th>Department</th>
                        <th>Doctors</th>
                    </tr>

                </thead>

                <tbody>

                    {departments.map((dept) => (

                        <tr key={dept.name}>

                            <td>{dept.name}</td>

                            <td>{dept.total_doctors}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );

}

export default DepartmentStats;