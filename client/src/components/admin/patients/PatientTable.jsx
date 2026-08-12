import "./PatientTable.css";

function PatientTable({
    patients,
    onView,
    onEdit,
    onDelete
}) {
    return (
        <div className="patient-table-wrapper">
            <table className="patient-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th>Blood Group</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.id}</td>
                            <td>{patient.name}</td>
                            <td>{patient.gender}</td>
                            <td>{patient.phone}</td>
                            <td>{patient.blood_group}</td>

                            <td className="actions">
                                <button
                                    title="View"
                                    onClick={() => onView(patient)}
                                >
                                    👁
                                </button>

                                <button
                                    title="Edit"
                                    onClick={() => onEdit(patient)}
                                >
                                    ✏️
                                </button>

                                <button
                                    title="Delete"
                                    onClick={() => onDelete(patient.id)}
                                >
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PatientTable;