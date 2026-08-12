// File: src/pages/patient/CompleteProfile.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import "./CompleteProfile.css";
import { updateMyProfile } from "../../api/patientApi";

function CompleteProfile() {

    const navigate = useNavigate();

    const [preview, setPreview] = useState(null);

    const [showOtherBloodGroup, setShowOtherBloodGroup] =
        useState(false);

    const [formData, setFormData] = useState({

        phone: "",

        date_of_birth: "",

        gender: "",

        blood_group: "",

        other_blood_group: "",

        address: "",

        emergency_contact: "",

        profile_image: null

    });

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (
            name === "phone" ||
            name === "emergency_contact"
        ) {

            const numbers = value.replace(/\D/g, "");

            if (numbers.length > 10) return;

            setFormData({

                ...formData,

                [name]: numbers

            });

            return;

        }

        if (name === "blood_group") {

            setShowOtherBloodGroup(
                value === "other"
            );

        }

        setFormData({

            ...formData,

            [name]: value

        });

    };

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setPreview(URL.createObjectURL(file));

        setFormData({

            ...formData,

            profile_image: file

        });

    };

    const validateForm = () => {

        const newErrors = {};

        if (!formData.phone.trim()) {

            newErrors.phone =
                "Phone number is required.";

        } else if (!/^\d{10}$/.test(formData.phone)) {

            newErrors.phone =
                "Phone number must contain exactly 10 digits.";

        }

        if (!formData.date_of_birth) {

            newErrors.date_of_birth =
                "Date of birth is required.";

        }

        if (!formData.gender) {

            newErrors.gender =
                "Please select gender.";

        }

        if (!formData.blood_group) {

            newErrors.blood_group =
                "Please select blood group.";

        }

        if (

            formData.blood_group === "other" &&
            !formData.other_blood_group.trim()

        ) {

            newErrors.other_blood_group =
                "Please enter your blood group.";

        }

        if (!formData.address.trim()) {

            newErrors.address =
                "Address is required.";

        }

        if (!formData.emergency_contact.trim()) {

            newErrors.emergency_contact =
                "Emergency contact is required.";

        } else if (
            !/^\d{10}$/.test(formData.emergency_contact)
        ) {

            newErrors.emergency_contact =
                "Emergency contact must contain exactly 10 digits.";

        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validateForm()) {

            return;

        }

        try {

            setLoading(true);

            const data = new FormData();

            data.append(
                "phone",
                formData.phone
            );

            data.append(
                "date_of_birth",
                formData.date_of_birth
            );

            data.append(
                "gender",
                formData.gender
            );

            data.append(
                "blood_group",
                formData.blood_group === "other"
                    ? formData.other_blood_group
                    : formData.blood_group
            );

            data.append(
                "address",
                formData.address
            );

            data.append(
                "emergency_contact",
                formData.emergency_contact
            );
            if (formData.profile_image) {

                data.append(
                    "profile_image",
                    formData.profile_image
                );

            }

            await updateMyProfile(data);

            setMessage(
                "Profile completed successfully."
            );

            setTimeout(() => {

                navigate("/patient/profile");

            }, 1000);

        } catch (error) {

            setMessage(

                error.response?.data?.message ||

                "Failed to update profile."

            );

        } finally {

            setLoading(false);

        }

    };

    return (

       <div className="auth-page">

            <div className="complete-profile-card">

                <h2>
                    Complete Patient Profile 🏥
                </h2>

                <p>
                    Add your personal information
                </p>

                <form onSubmit={handleSubmit}>

                    {/* Phone */}

                    <label className="profile-label">
                        Phone Number
                    </label>

                    <div className="phone-group">

                        <span className="country-code">
                            +91
                        </span>

                        <input
                            type="text"
                            name="phone"
                            placeholder="9876543210"
                            value={formData.phone}
                            onChange={handleChange}
                        />

                    </div>

                    {errors.phone && (

                        <small className="validation-error">

                            {errors.phone}

                        </small>

                    )}

                    {/* DOB */}

                    <label className="profile-label">
                        Date of Birth
                    </label>

                    <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        min={`${new Date().getFullYear() - 120}-01-01`}
                        max={new Date().toISOString().split("T")[0]}
                    />

                    {errors.date_of_birth && (

                        <small className="validation-error">

                            {errors.date_of_birth}

                        </small>

                    )}

                    {/* Gender */}

                    <label className="profile-label">
                        Gender
                    </label>

                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Gender
                        </option>

                        <option value="male">
                            Male
                        </option>

                        <option value="female">
                            Female
                        </option>

                        <option value="other">
                            Other
                        </option>

                    </select>

                    {errors.gender && (

                        <small className="validation-error">

                            {errors.gender}

                        </small>

                    )}

                    {/* Blood Group */}

                    <label className="profile-label">
                        Blood Group
                    </label>

                    <select
                        name="blood_group"
                        value={formData.blood_group}
                        onChange={handleChange}
                    >
                        <option value="">
                            Select Blood Group
                        </option>

                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>

                        <option value="other">
                            Other
                        </option>
                    </select>

                    {errors.blood_group && (
                        <small className="validation-error">
                            {errors.blood_group}
                        </small>
                    )}

                    {showOtherBloodGroup && (
                        <>
                            <input
                                type="text"
                                name="other_blood_group"
                                placeholder="Enter Blood Group"
                                value={formData.other_blood_group}
                                onChange={handleChange}
                            />

                            {errors.other_blood_group && (
                                <small className="validation-error">
                                    {errors.other_blood_group}
                                </small>
                            )}
                        </>
                    )}

                    {/* Address */}

                    <label className="profile-label">
                        Address
                    </label>

                    <textarea
                        name="address"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleChange}
                    />

                    {errors.address && (
                        <small className="validation-error">
                            {errors.address}
                        </small>
                    )}

                    {/* Emergency Contact */}

                    <label className="profile-label">
                        Emergency Contact
                    </label>

                    <div className="phone-group">

                        <span className="country-code">
                            +91
                        </span>

                        <input
                            type="text"
                            name="emergency_contact"
                            placeholder="9876543210"
                            value={formData.emergency_contact}
                            onChange={handleChange}
                        />

                    </div>

                    {errors.emergency_contact && (
                        <small className="validation-error">
                            {errors.emergency_contact}
                        </small>
                    )}

                    {/* Profile Photo */}

                    <label className="profile-label">
                        Profile Photo
                    </label>

                    <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        onChange={handleFileChange}
                    />

                    {preview && (
                        <div className="profile-preview">
                            <img
                                src={preview}
                                alt="Profile Preview"
                            />
                        </div>
                    )}

                    {message && (
                        <div className="profile-message">
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Profile"}
                    </button>

                </form>

            </div>

        </div>

    );

}

export default CompleteProfile;