import "./ViewPatientModal.css";

function ViewPatientModal({ patient, closeModal }) {

    if (!patient) return null;

    return (

        <div className="modal-overlay">

            <div className="view-patient-modal">

                <h2>Patient Details 👤</h2>

                <div className="patient-info">

                    {patient.profile_image && (

                        <div className="patient-photo">

                            <img
                                src={patient.profile_image}
                                alt={patient.name}
                            />

                        </div>

                    )}

                    <div className="patient-grid">

                        <div>
                            <strong>Full Name</strong>
                            <span>{patient.name}</span>
                        </div>

                        <div>
                            <strong>Email</strong>
                            <span>{patient.email}</span>
                        </div>

                        <div>
                            <strong>Phone</strong>
                            <span>+91 {patient.phone}</span>
                        </div>

                        <div>
                            <strong>Date of Birth</strong>
                            <span>{new Date(patient.date_of_birth).toLocaleDateString()}</span>
                        </div>

                        <div>
                            <strong>Gender</strong>
                            <span>{patient.gender}</span>
                        </div>

                        <div>
                            <strong>Blood Group</strong>
                            <span>{patient.blood_group}</span>
                        </div>

                        <div>
                            <strong>Emergency Contact</strong>
                            <span>+91 {patient.emergency_contact}</span>
                        </div>

                        <div className="full-width">

                            <strong>Address</strong>

                            <span>{patient.address}</span>

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

export default ViewPatientModal;