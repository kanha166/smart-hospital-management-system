// File: src/components/admin/doctors/AdddoctorModal.jsx

import { useState, useEffect } from "react";
import "./AddDoctorModal.css";

function AddDoctorModal({
    closeModal,
    addDoctor,
    editMode = false,
    doctorData = null
}) {
    const [preview, setPreview] = useState(
        doctorData?.profile_image || null
    );

    const [errors, setErrors] = useState({});

    const [doctor, setDoctor] = useState(
    doctorData
        ? {
              ...doctorData,
              department_id: doctorData.department_id || ""
          }
        : {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            date_of_birth: "",
            gender: "",
            department_id: "",
            specialization: "",
            qualification: "",
            experience: "",
            address: "",
            emergency_contact: "",
            profile_image: null
        }
);

useEffect(() => {
    if (doctorData) {
        setDoctor({
            ...doctorData,
            date_of_birth: doctorData.date_of_birth
                ? doctorData.date_of_birth.split("T")[0]
                : "",
            department_id: doctorData.department_id || "",
            experience: doctorData.experience ?? ""
        });

        setPreview(doctorData.doctor_image || null);
    }
}, [doctorData]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (
            name === "phone" ||
            name === "emergency_contact"
        ) {

            const onlyNumbers = value.replace(/\D/g, "");

            if (onlyNumbers.length > 10) return;

            setDoctor({

                ...doctor,

                [name]: onlyNumbers

            });

            return;
        }

        setDoctor({

            ...doctor,

            [name]: value

        });

    };

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setPreview(

            URL.createObjectURL(file)

        );

        setDoctor({

            ...doctor,

            profile_image: file

        });

    };

    const validateForm = () => {

        const newErrors = {};

        if (!doctor.name.trim()) {

            newErrors.name = "Full name is required.";

        }

        if (!doctor.email.trim()) {

            newErrors.email = "Email is required.";

        }

        else if (

            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(doctor.email)

        ) {

            newErrors.email = "Invalid email address.";

        }

        if (!editMode) {

    if (!doctor.password) {

        newErrors.password = "Password is required.";

    }

    else if (

        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(doctor.password)

    ) {

        newErrors.password =
            "Minimum 8 characters with uppercase, lowercase, number & special character.";

    }

    if (doctor.confirmPassword !== doctor.password) {

        newErrors.confirmPassword =
            "Passwords do not match.";

    }

}
        if (!/^\d{10}$/.test(doctor.phone)) {

            newErrors.phone =
                "Phone number must contain exactly 10 digits.";

        }

        if (!doctor.date_of_birth) {

            newErrors.date_of_birth =
                "Date of Birth is required.";

        }

        if (!doctor.gender) {

            newErrors.gender =
                "Gender is required.";

        }

        if(!doctor.department_id)
newErrors.department="Department is required.";

if(!doctor.specialization.trim())
newErrors.specialization="Specialization is required.";

if(!doctor.qualification.trim())
newErrors.qualification="Qualification is required.";

if (doctor.experience === "") 
newErrors.experience="Experience is required.";

        if (!doctor.address.trim()) {

            newErrors.address =
                "Address is required.";

        }

        if (!/^\d{10}$/.test(doctor.emergency_contact)) {

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

        formData.append("name", doctor.name);
        formData.append("email", doctor.email);

        if (!editMode) {
            formData.append("password", doctor.password);
        }

        formData.append("phone", doctor.phone);
        formData.append("date_of_birth", doctor.date_of_birth);
        formData.append("gender", doctor.gender);

        formData.append("department_id", doctor.department_id);
        formData.append("specialization", doctor.specialization);
        formData.append("qualification", doctor.qualification);
        formData.append("experience", doctor.experience);

        formData.append("address", doctor.address);
        formData.append("emergency_contact", doctor.emergency_contact);

        if (doctor.profile_image instanceof File) {
            formData.append("doctor_image", doctor.profile_image);
        }

        await addDoctor(formData);

closeModal();
    }
    catch (error) {

    console.error(error);

    alert(
        error.response?.data?.message ||
        "Operation failed."
    );

}

};

    console.log("department_id:", doctorData?.department_id);
console.log("department_name:", doctorData?.department_name);
console.log(doctorData);

    return (

        <div className="modal-overlay">

            <div className="doctor-modal">

                <h2>

                    {

                        editMode

                            ? "Edit doctor"

                            : "Add New doctor"

                    }

                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="doctor-form-grid">

                        {/* Full Name */}

                        <div>

                            <label>Full Name</label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter full name"
                                value={doctor.name}
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
                                    value={doctor.phone}
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
                                value={doctor.email}
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
                                value={doctor.date_of_birth}
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
        value={doctor.password}
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

                                value={doctor.gender}

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
        value={doctor.confirmPassword}
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
                    {/* Department */}

<div>

<label>Department</label>

<select
    name="department_id"
    value={String(doctor.department_id || "")}
    onChange={handleChange}
>
    <option value="">Select Department</option>
    <option value="1">Cardiology</option>
    <option value="2">General Medicine</option>
    <option value="3">Pediatrics</option>
</select>

{errors.department && (
<small className="validation-error">
{errors.department}
</small>
)}

</div>

{/* Specialization */}

<div>

<label>Specialization</label>

<input
type="text"
name="specialization"
placeholder="Enter Specialization"
value={doctor.specialization}
onChange={handleChange}
/>

{errors.specialization && (
<small className="validation-error">
{errors.specialization}
</small>
)}

</div>

{/* Qualification */}

<div>

<label>Qualification</label>

<input
type="text"
name="qualification"
placeholder="Enter Qualification"
value={doctor.qualification}
onChange={handleChange}
/>

{errors.qualification && (
<small className="validation-error">
{errors.qualification}
</small>
)}

</div>

{/* Experience */}

<div>

<label>Experience (in years)</label>

<input
type="number"
name="experience"
placeholder="Ex : 10"
value={doctor.experience}
onChange={handleChange}
min="0"
/>

{errors.experience && (
<small className="validation-error">
{errors.experience}
</small>
)}

</div>
                        {/* Address */}

                        <div>

                            <label>Address</label>

                            <textarea

                                name="address"

                                placeholder="Enter Address"

                                value={doctor.address}

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

                                    value={doctor.emergency_contact}

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

                                    ? "Update doctor"

                                    : "Save doctor"

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

export default AddDoctorModal;