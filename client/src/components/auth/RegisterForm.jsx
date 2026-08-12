// File: src/components/auth/RegisterForm.jsx

import { useState } from "react";
import "./RegisterForm.css";
import { registerUser } from "../../api/authApi";

function RegisterForm({ onSwitch }) {

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [serverMessage, setServerMessage] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {

        const newErrors = {};

        // Name

        if (!formData.name.trim()) {

            newErrors.name = "Full name is required.";

        } else if (formData.name.trim().length < 3) {

            newErrors.name =
                "Full name must be at least 3 characters.";

        }

        // Email

        if (!formData.email.trim()) {

            newErrors.email = "Email is required.";

        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {

            newErrors.email =
                "Enter a valid email address.";

        }

        // Password

        if (!formData.password.trim()) {

            newErrors.password = "Password is required.";

        } else if (formData.password.length < 8) {

            newErrors.password =
                "Password must be at least 8 characters.";

        } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=]).{8,}$/.test(
                formData.password
            )
        ) {

            newErrors.password =
                "Password must contain uppercase, lowercase, number and special character.";

        }

        // Confirm Password

        if (!formData.confirmPassword.trim()) {

            newErrors.confirmPassword =
                "Confirm password is required.";

        } else if (
            formData.password !== formData.confirmPassword
        ) {

            newErrors.confirmPassword =
                "Passwords do not match.";

        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({

            ...prev,

            [name]: value

        }));

        if (errors[name]) {

            setErrors((prev) => ({

                ...prev,

                [name]: ""

            }));

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setServerMessage("");

        if (!validateForm()) return;

        try {

            setLoading(true);

            const response = await registerUser({

                name: formData.name,

                email: formData.email,

                password: formData.password

            });

            setServerMessage(response.message);

            setFormData({

                name: "",

                email: "",

                password: "",

                confirmPassword: ""

            });

            setTimeout(() => {

                onSwitch();

            }, 1500);

        } catch (error) {

            setServerMessage(

                error.response?.data?.message ||

                "Registration failed."

            );

        } finally {

            setLoading(false);

        }

    };

    return (

    <div className="register-form">

        <h2 className="register-title">
            Create Account 🏥
        </h2>

        <p className="register-subtitle">
            Register to continue
        </p>

        <form onSubmit={handleSubmit} noValidate>

            {/* Full Name */}

            <div className="mb-3">

                <label
                    htmlFor="name"
                    className="register-label"
                >
                    Full Name
                </label>

                <input
                    id="name"
                    type="text"
                    name="name"
                    className={`form-control register-input ${errors.name ? "is-invalid" : ""}`}
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                />

                {
                    errors.name &&
                    <small className="validation-error">
                        {errors.name}
                    </small>
                }

            </div>

            {/* Email */}

            <div className="mb-3">

                <label
                    htmlFor="email"
                    className="register-label"
                >
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    name="email"
                    className={`form-control register-input ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                />

                {
                    errors.email &&
                    <small className="validation-error">
                        {errors.email}
                    </small>
                }

            </div>

            {/* Password */}

            <div className="mb-3">

                <label
                    htmlFor="password"
                    className="register-label"
                >
                    Password
                </label>

                <div className="password-wrapper">

                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className={`form-control register-input ${errors.password ? "is-invalid" : ""}`}
                        placeholder="Create password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "🙈" : "👀"}
                    </button>

                </div>

                {
                    errors.password &&
                    <small className="validation-error">
                        {errors.password}
                    </small>
                }

                <small className="password-hint">
                    Password must contain:
                    <br />
                    • Minimum 8 characters
                    <br />
                    • One uppercase letter (A–Z)
                    <br />
                    • One lowercase letter (a–z)
                    <br />
                    • One number (0–9)
                    <br />
                    • One special character (@ # $ % & *)
                </small>

            </div>

            {/* Confirm Password */}

            <div className="mb-3">

                <label
                    htmlFor="confirmPassword"
                    className="register-label"
                >
                    Confirm Password
                </label>

                <div className="password-wrapper">

                    <input
                        id="confirmPassword"
                        type={
                            showConfirmPassword
                                ? "text"
                                : "password"
                        }
                        name="confirmPassword"
                        className={`form-control register-input ${errors.confirmPassword ? "is-invalid" : ""}`}
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />

                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                            setShowConfirmPassword(
                                !showConfirmPassword
                            )
                        }
                    >
                        {showConfirmPassword ? "🙈" : "👀"}
                    </button>

                </div>

                {
                    errors.confirmPassword &&
                    <small className="validation-error">
                        {errors.confirmPassword}
                    </small>
                }

            </div>

        
            {
                serverMessage &&

                <div className="alert alert-info">

                    {serverMessage}

                </div>
            }

            <button
                type="submit"
                className="login-button"
                disabled={loading}
            >
                {
                    loading
                        ? "Creating Account..."
                        : "Create Account"
                }
            </button>

            <p className="text-center text-white mt-4">

                Already have an account?{" "}

                <button
                    type="button"
                    className="register-link bg-transparent border-0"
                    onClick={onSwitch}
                >
                    Login
                </button>

            </p>

        </form>

    </div>

);

}

export default RegisterForm;