import "./ViewDoctorModal.css";

function ViewdoctorModal({ doctor, closeModal }) {

    if (!doctor) return null;

    return (

        <div className="modal-overlay">

            <div className="view-doctor-modal">

                <h2>Doctor Details 👤</h2>

                <div className="doctor-info">

                    {doctor.profile_image && (

                        <div className="doctor-photo">

                            <img
                                src={doctor.profile_image}
                                alt={doctor.name}
                            />

                        </div>

                    )}

                    <div className="doctor-grid">

                        <div>
                            <strong>Full Name</strong>
                            <span>{doctor.name}</span>
                        </div>

                        <div>
                            <strong>Email</strong>
                            <span>{doctor.email}</span>
                        </div>

                        <div>
                            <strong>Phone</strong>
                            <span>+91 {doctor.phone}</span>
                        </div>

                        <div>
                            <strong>Date of Birth</strong>
                            <span>{new Date(doctor.date_of_birth).toLocaleDateString()}</span>
                        </div>

                        <div>
                            <strong>Gender</strong>
                            <span>{doctor.gender}</span>
                        </div>

                        <div>

    <strong>Department</strong>

    <p>{doctor.department_name}</p>

</div>

<div>

    <strong>Specialization</strong>

    <p>{doctor.specialization}</p>

</div>

<div>

    <strong>Qualification</strong>

    <p>{doctor.qualification}</p>

</div>

<div>

    <strong>Experience</strong>

    <p>{doctor.experience}</p>

</div>
                        <div>
                            <strong>Emergency Contact</strong>
                            <span>+91 {doctor.emergency_contact}</span>
                        </div>

                        <div className="full-width">

                            <strong>Address</strong>

                            <span>{doctor.address}</span>

                        </div>

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

export default ViewdoctorModal;