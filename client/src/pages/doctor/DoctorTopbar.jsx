// File: client/src/pages/doctor/DoctorTopbar.jsx

import useAuth from "../../hooks/useAuth";

import "./DoctorTopbar.css";

function DoctorTopbar() {

    const { user } = useAuth();


    const doctorName =
        user?.name || "Doctor";


    const displayDoctorName =
        doctorName.startsWith("Dr.")
            ? doctorName
            : `Dr. ${doctorName}`;


    const doctorRole =
        user?.role
            ? user.role.charAt(0).toUpperCase() +
              user.role.slice(1)
            : "Doctor";


    const avatarLetter =
        doctorName
            ?.replace(/^Dr\.\s*/i, "")
            ?.charAt(0)
            ?.toUpperCase() || "D";


    return (

        <header className="doctor-topbar">

            <div className="doctor-topbar-left">

                <h2>
                    Dashboard
                </h2>

                <p>

                    Welcome back,

                    <span>
                        {displayDoctorName}
                    </span>

                    👋🏻

                </p>

            </div>


            <div className="doctor-topbar-right">

                <div className="doctor-user-card">

                    <div className="doctor-avatar">

                        {avatarLetter}

                    </div>


                    <div>

                        <h4>
                            {displayDoctorName}
                        </h4>

                        <span>
                            {doctorRole}
                        </span>

                    </div>

                </div>

            </div>

        </header>

    );
}

export default DoctorTopbar;