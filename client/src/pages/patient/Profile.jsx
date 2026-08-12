import "./PatientPages.css";

import { useEffect, useState } from "react";
import { getMyProfile } from "../../services/patientService";

function Profile() {

    const [patient, setPatient] = useState(null);

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const data = await getMyProfile();

                setPatient(data);

            } catch (error) {

                console.error(error);

            }

        };

        fetchProfile();

    }, []);

    if (!patient) {

        return <div className="patient-page">Loading...</div>;

    }

    const initials = patient.name
        ?.split(" ")
        .map(word => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (

        <div className="patient-page">

            <div className="patient-profile-card">

                {patient.profile_image ? (

                    <img
                        src={patient.profile_image}
                        alt="Patient"
                        className="patient-profile-photo"
                    />

                ) : (

                    <div className="patient-avatar">

                        {initials}

                    </div>

                )}

                <h2>{patient.name}</h2>

                <p className="patient-id">

                    Patient ID : PT-{patient.id}

                </p>

            </div>

            <div className="patient-info-card">

                <h3>Personal Information</h3>

                <div className="info-row">

                    <span>Full Name</span>

                    <strong>{patient.name}</strong>

                </div>

                <div className="info-row">

                    <span>Email</span>

                    <strong>{patient.email}</strong>

                </div>

                <div className="info-row">

                    <span>Phone Number</span>

                    <strong>{patient.phone}</strong>

                </div>

                <div className="info-row">

                    <span>Date of Birth</span>

                    <strong>

                        {patient.date_of_birth
                            ? new Date(patient.date_of_birth).toLocaleDateString(
                                  "en-GB",
                                  {
                                      day: "2-digit",
                                      month: "long",
                                      year: "numeric",
                                  }
                              )
                            : "-"}

                    </strong>

                </div>

                <div className="info-row">

                    <span>Gender</span>

                    <strong>{patient.gender}</strong>

                </div>

                <div className="info-row">

                    <span>Blood Group</span>

                    <strong>{patient.blood_group}</strong>

                </div>

            </div>

            <div className="patient-info-card">

                <h3>Address</h3>

                <p>{patient.address}</p>

            </div>

            <div className="patient-info-card">

                <h3>Emergency Contact</h3>

                <p>{patient.emergency_contact}</p>

            </div>

        </div>

    );

}

export default Profile;