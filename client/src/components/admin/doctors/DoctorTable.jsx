import "./DoctorTable.css";

function DoctorTable({

    doctors,

    onView,

    onEdit,

    onDelete

}){

    return(

        <div className="doctor-table-wrapper">

            <table className="doctor-table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Department</th>

                        <th>Specialization</th>

                        <th>Years of Experience</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        doctors.map((doctor)=>(

                            <tr key={doctor.id}>

                                <td>{doctor.id}</td>

                                <td>{doctor.name}</td>

                                <td>{doctor.department_name}</td>

                                <td>{doctor.specialization}</td>

                                <td>{doctor.experience}</td>

                                <td className="actions">

                                    <button

                                        title="View"

                                        onClick={()=>

                                            onView(doctor)

                                        }

                                    >

                                        👁

                                    </button>

                                    <button

                                        title="Edit"

                                        onClick={()=>

                                            onEdit(doctor)

                                        }

                                    >

                                        ✏️

                                    </button>

                                    <button

                                        title="Delete"

                                        onClick={()=>

                                            onDelete(doctor.id)

                                        }

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

export default DoctorTable;