// File: src/components/patient/BookAppointmentModal.jsx
import { useEffect, useState } from "react";

import "./BookAppointmentModal.css";

import { getMyProfile } from "../../api/patientApi";
import { getAllDepartments } from "../../api/departmentApi";
import { getDoctorsByDepartment } from "../../api/doctorApi";

export default function BookAppointmentModal({
    isOpen,
    onClose,
    onBookAppointment
}) {

    const [patientName, setPatientName] = useState("");

    const [departments, setDepartments] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const [departmentId, setDepartmentId] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [date, setDate] = useState("");
    const [reason, setReason] = useState("");

    const [loadingDepartments, setLoadingDepartments] =
        useState(false);

    const [loadingDoctors, setLoadingDoctors] =
        useState(false);

    useEffect(() => {

        if (!isOpen) {
            return;
        }

        loadInitialData();

    }, [isOpen]);

    const loadInitialData = async () => {

        try {

            setLoadingDepartments(true);

            const [profile, departmentData] =
                await Promise.all([
                    getMyProfile(),
                    getAllDepartments()
                ]);

            setPatientName(
                profile.data?.name ||
                profile.name ||
                ""
            );

            setDepartments(departmentData);

        } catch (error) {

            console.error(
                "Failed to load appointment data:",
                error
            );

            alert(
                "Failed to load appointment information."
            );

        } finally {

            setLoadingDepartments(false);

        }

    };

    const handleDepartmentChange = async (e) => {

        const selectedDepartmentId =
            e.target.value;

        setDepartmentId(
            selectedDepartmentId
        );

        // Reset doctor whenever department changes
        setDoctorId("");

        setDoctors([]);

        if (!selectedDepartmentId) {
            return;
        }

        try {

            setLoadingDoctors(true);

            const doctorData =
                await getDoctorsByDepartment(
                    selectedDepartmentId
                );

            setDoctors(doctorData);

        } catch (error) {

            console.error(
                "Failed to load doctors:",
                error
            );

            alert(
                "Failed to load doctors."
            );

        } finally {

            setLoadingDoctors(false);

        }

    };

    const handleBookAppointment = async () => {

        if (
            !departmentId ||
            !doctorId ||
            !date ||
            !reason.trim()
        ) {

            alert(
                "Please fill all fields."
            );

            return;
        }

        await onBookAppointment({

            doctor_id: Number(doctorId),

            appointment_date: date,

            // Patient does not choose time.
            // Backend stores this initially.
            appointment_time: "10:00:00",

            reason: reason.trim()

        });

        // Reset form

        setDepartmentId("");
        setDoctorId("");
        setDoctors([]);
        setDate("");
        setReason("");

        onClose();

    };

    if (!isOpen) {
        return null;
    }

    return (

        <div className="modal-overlay">

            <div className="book-modal">

                <div className="book-modal-header">

                    <h2>
                        Book Appointment
                    </h2>

                </div>

                <div className="book-modal-body">

                    {/* Patient Name */}

                    <div className="form-group">

                        <label>
                            Patient Name
                        </label>

                        <input
                            type="text"
                            value={patientName}
                            readOnly
                        />

                    </div>


                    {/* Department + Doctor */}

                    <div className="form-row">

                        <div className="form-group">

                            <label>
                                Department
                            </label>

                            <select
                                value={departmentId}
                                onChange={
                                    handleDepartmentChange
                                }
                                disabled={
                                    loadingDepartments
                                }
                            >

                                <option value="">
                                    {loadingDepartments
                                        ? "Loading Departments..."
                                        : "Select Department"}
                                </option>

                                {departments.map(
                                    (department) => (

                                        <option
                                            key={
                                                department.id
                                            }
                                            value={
                                                department.id
                                            }
                                        >
                                            {department.name}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                Doctor
                            </label>

                            <select
                                value={doctorId}
                                onChange={(e) =>
                                    setDoctorId(
                                        e.target.value
                                    )
                                }
                                disabled={
                                    !departmentId ||
                                    loadingDoctors
                                }
                            >

                                <option value="">

                                    {!departmentId
                                        ? "Select Department First"
                                        : loadingDoctors
                                        ? "Loading Doctors..."
                                        : doctors.length === 0
                                        ? "No Doctors Available"
                                        : "Select Doctor"}

                                </option>

                                {doctors.map(
                                    (doctor) => (

                                        <option
                                            key={
                                                doctor.id
                                            }
                                            value={
                                                doctor.id
                                            }
                                        >
                                            {doctor.name}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>

                    </div>


                    {/* Appointment Date */}

                    <div className="form-group">

                        <label>
                            Appointment Date
                        </label>

                        <input
                            type="date"
                            value={date}
                            min={
                                new Date()
                                    .toISOString()
                                    .split("T")[0]
                            }
                            onChange={(e) =>
                                setDate(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* Reason */}

                    <div className="form-group">

                        <label>
                            Reason
                        </label>

                        <textarea
                            value={reason}
                            onChange={(e) =>
                                setReason(
                                    e.target.value
                                )
                            }
                            placeholder="Write reason for appointment..."
                        />

                    </div>


                    {/* Footer */}

                    <div className="book-modal-footer">

                        <button
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            className="book-btn"
                            onClick={
                                handleBookAppointment
                            }
                        >
                            Book Appointment
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}