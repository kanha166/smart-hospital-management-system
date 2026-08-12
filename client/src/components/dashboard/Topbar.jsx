// File: client/src/components/dashboard/Topbar.jsx

import useAuth from "../../hooks/useAuth";

import "./Topbar.css";

function Topbar() {

    const { user } = useAuth();

    return (

        <header className="topbar">

            <div className="topbar-left">

                <h2>
                    Dashboard
                </h2>

                <p>

                    Welcome back,

                    <span>
                        {user?.name || "User"}
                    </span>

                    👋🏻

                </p>

            </div>


            <div className="topbar-right">


                <div className="user-card">

                    <div className="avatar">

                        {
                            user?.name
                                ?.charAt(0)
                                .toUpperCase() || "U"
                        }

                    </div>


                    <div>

                        <h4>
                            {user?.name || "User"}
                        </h4>

                        <span>

                            {
                                user?.role
                                    ? user.role.charAt(0).toUpperCase() +
                                      user.role.slice(1)
                                    : "User"
                            }

                        </span>

                    </div>

                </div>

            </div>

        </header>

    );
}

export default Topbar;