// File: src/components/admin/patients/AddPatientModal.jsx

import { useState, useEffect } from "react";
import "./AddPatientModal.css";

function AddPatientModal({
    closeModal,
    addPatient,
    editMode = false,
    patientData = null
}) {

    const [showOtherBloodGroup, setShowOtherBloodGroup] = useState(
        patientData?.blood_group === "other"
    );

    const [preview, setPreview] = useState(
        patientData?.profile_image || null
    );

    const [errors, setErrors] = useState({});

    const [patient, setPatient] = useState(

        patientData || {

            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            date_of_birth: "",
            gender: "",
            blood_group: "",
            other_blood_group: "",
            address: "",
            emergency_contact: "",
            profile_image: null

        }

    );

    useEffect(() => {
    if (patientData) {
        setPatient({
            ...patientData,
            date_of_birth: patientData.date_of_birth
                ? patientData.date_of_birth.split("T")[0]
                : "",
            password: "",
            confirmPassword: "",
            other_blood_group: ""
        });

        setPreview(patientData.profile_image || null);

        const groups = [
            "A+","A-","B+","B-",
            "AB+","AB-","O+","O-"
        ];

        if (
            patientData.blood_group &&
            !groups.includes(patientData.blood_group)
        ) {
            setShowOtherBloodGroup(true);
        } else {
            setShowOtherBloodGroup(false);
        }
    }
}, [patientData]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (
            name === "phone" ||
            name === "emergency_contact"
        ) {

            const onlyNumbers = value.replace(/\D/g, "");

            if (onlyNumbers.length > 10) return;

            setPatient({

                ...patient,

                [name]: onlyNumbers

            });

            return;

        }

        if (name === "blood_group") {

            setShowOtherBloodGroup(

                value === "other"

            );

        }

        setPatient({

            ...patient,

            [name]: value

        });

    };

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setPreview(

            URL.createObjectURL(file)

        );

        setPatient({

            ...patient,

            profile_image: file

        });

    };

    const validateForm = () => {

        const newErrors = {};

        if (!patient.name.trim()) {

            newErrors.name = "Full name is required.";

        }

        if (!patient.email.trim()) {

            newErrors.email = "Email is required.";

        }

        else if (

            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patient.email)

        ) {

            newErrors.email = "Invalid email address.";

        }

        if (!editMode) {

    if (!patient.password) {

        newErrors.password = "Password is required.";

    }

    else if (

        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(patient.password)

    ) {

        newErrors.password =
            "Minimum 8 characters with uppercase, lowercase, number & special character.";

    }

    if (patient.confirmPassword !== patient.password) {

        newErrors.confirmPassword =
            "Passwords do not match.";

    }

}
        if (!/^\d{10}$/.test(patient.phone)) {

            newErrors.phone =
                "Phone number must contain exactly 10 digits.";

        }

        if (!patient.date_of_birth) {

            newErrors.date_of_birth =
                "Date of Birth is required.";

        }

        if (!patient.gender) {

            newErrors.gender =
                "Gender is required.";

        }

        if (!patient.blood_group) {

            newErrors.blood_group =
                "Blood Group is required.";

        }

        if (

            patient.blood_group === "other" &&
            !patient.other_blood_group.trim()

        ) {

            newErrors.other_blood_group =
                "Enter Blood Group.";

        }

        if (!patient.address.trim()) {

            newErrors.address =
                "Address is required.";

        }

        if (!/^\d{10}$/.test(patient.emergency_contact)) {

            newErrors.emergency_contact =
                "Emergency Contact must contain exactly 10 digits.";

        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };
        const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    try {

        const formData = new FormData();

        formData.append("name", patient.name);
        formData.append("email", patient.email);

        if (!editMode) {
            formData.append("password", patient.password);
        }

        formData.append("phone", patient.phone);
        formData.append("date_of_birth", patient.date_of_birth);
        formData.append("gender", patient.gender);

        formData.append(
            "blood_group",
            patient.blood_group === "other"
                ? patient.other_blood_group
                : patient.blood_group
        );

        formData.append("address", patient.address);
        formData.append(
            "emergency_contact",
            patient.emergency_contact
        );

        if (patient.profile_image instanceof File) {
            formData.append(
                "profile_image",
                patient.profile_image
            );
        }

        if (editMode) {

    await addPatient(formData);

} else {

    await addPatient(formData);

}

closeModal();
    } catch (error) {

    console.error(error);

    alert(
        error.response?.data?.message ||
        "Operation failed."
    );

}

};

    return (

        <div className="modal-overlay">

            <div className="patient-modal">

                <h2>

                    {

                        editMode

                            ? "Edit Patient"

                            : "Add New Patient"

                    }

                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="patient-form-grid">

                        {/* Full Name */}

                        <div>

                            <label>Full Name</label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter full name"
                                value={patient.name}
                                onChange={handleChange}
                            />

                            {

                                errors.name &&

                                <small className="validation-error">

                                    {errors.name}

                                </small>

                            }

                        </div>

                        {/* Phone */}

                        <div>

                            <label>Phone Number</label>

                            <div className="phone-group">

                                <span>+91</span>

                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="9876543210"
                                    value={patient.phone}
                                    onChange={handleChange}
                                />

                            </div>

                            {

                                errors.phone &&

                                <small className="validation-error">

                                    {errors.phone}

                                </small>

                            }

                        </div>

                        {/* Email */}

                        <div>

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={patient.email}
                                onChange={handleChange}
                            />

                            {

                                errors.email &&

                                <small className="validation-error">

                                    {errors.email}

                                </small>

                            }

                        </div>

                        {/* Date of Birth */}

                        <div>

                            <label>Date of Birth</label>

                            <input
                                type="date"
                                name="date_of_birth"
                                value={patient.date_of_birth}
                                onChange={handleChange}
                                min={`${new Date().getFullYear() - 120}-01-01`}
                                max={new Date().toISOString().split("T")[0]}
                            />

                            {

                                errors.date_of_birth &&

                                <small className="validation-error">

                                    {errors.date_of_birth}

                                </small>

                            }

                        </div>

                        {/* Password */}

                        {

!editMode && (

<div>

    <label>Password</label>

    <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={patient.password}
        onChange={handleChange}
    />

    {

        errors.password &&

        <small className="validation-error">

            {errors.password}

        </small>

    }

</div>

)

}
                        {/* Gender */}

                        <div>

                            <label>Gender</label>

                            <select

                                name="gender"

                                value={patient.gender}

                                onChange={handleChange}

                            >

                                <option value="">

                                    Select Gender

                                </option>

                                <option value="Male">

                                    Male

                                </option>

                                <option value="Female">

                                    Female

                                </option>

                                <option value="Other">

                                    Other

                                </option>

                            </select>

                            {

                                errors.gender &&

                                <small className="validation-error">

                                    {errors.gender}

                                </small>

                            }

                        </div>
                                    {/* Confirm Password */}

                        {

!editMode && (

<div>

    <label>Confirm Password</label>

    <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={patient.confirmPassword}
        onChange={handleChange}
    />

    {

        errors.confirmPassword &&

        <small className="validation-error">

            {errors.confirmPassword}

        </small>

    }

</div>

)

}
                        {/* Blood Group */}

                        <div>

                            <label>Blood Group</label>

                            <select

                                name="blood_group"

                                value={patient.blood_group}

                                onChange={handleChange}

                            >

                                <option value="">Select Blood Group</option>

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

                            {

                                errors.blood_group &&

                                <small className="validation-error">

                                    {errors.blood_group}

                                </small>

                            }

                        </div>

                        {

                            showOtherBloodGroup && (

                                <div>

                                    <label>

                                        Other Blood Group

                                    </label>

                                    <input

                                        type="text"

                                        name="other_blood_group"

                                        placeholder="Enter Blood Group"

                                        value={patient.other_blood_group}

                                        onChange={handleChange}

                                    />

                                    {

                                        errors.other_blood_group &&

                                        <small className="validation-error">

                                            {errors.other_blood_group}

                                        </small>

                                    }

                                </div>

                            )

                        }

                        {/* Address */}

                        <div>

                            <label>Address</label>

                            <textarea

                                name="address"

                                placeholder="Enter Address"

                                value={patient.address}

                                onChange={handleChange}

                            />

                            {

                                errors.address &&

                                <small className="validation-error">

                                    {errors.address}

                                </small>

                            }

                        </div>

                        {/* Emergency Contact */}

                        <div>

                            <label>Emergency Contact</label>

                            <div className="phone-group">

                                <span>+91</span>

                                <input

                                    type="text"

                                    name="emergency_contact"

                                    placeholder="9876543210"

                                    value={patient.emergency_contact}

                                    onChange={handleChange}

                                />

                            </div>

                            {

                                errors.emergency_contact &&

                                <small className="validation-error">

                                    {errors.emergency_contact}

                                </small>

                            }

                        </div>

                        {/* Profile Photo */}

                        <div>

                            <label>

                                Profile Photo

                            </label>

                            <input

                                type="file"

                                accept="image/*"

                                onChange={handleFileChange}

                            />

                        </div>

                        {/* Preview */}

                        <div>

                            <label>

                                Preview

                            </label>

                            {

                                preview ? (

                                    <img

                                        src={preview}

                                        alt="Preview"

                                        className="profile-preview"

                                    />

                                ) : (

                                    <div className="profile-placeholder">

                                        No Image

                                    </div>

                                )

                            }

                        </div>

                                </div>

                    <div className="modal-buttons">

                        <button
                            type="submit"
                            className="save-btn"
                        >

                            {

                                editMode

                                    ? "Update Patient"

                                    : "Save Patient"

                            }

                        </button>

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={closeModal}
                        >

                            Cancel

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddPatientModal;