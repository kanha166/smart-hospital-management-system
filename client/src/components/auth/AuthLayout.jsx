// File: src/components/auth/AuthLayout.jsx

import "./AuthLayout.css";

import hospitalBg from "../../assets/images/hospital-bg.png";

function AuthLayout({ children }) {
    return (

        <div
            className="auth-layout"
            style={{
                backgroundImage: `url(${hospitalBg})`
            }}
        >

            <div className="auth-overlay">

                <div className="auth-card">

                    {children}

                </div>

            </div>

        </div>

    );
}

export default AuthLayout;