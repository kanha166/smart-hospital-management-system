// File: client/src/components/admin/billing/AddBillingModal.jsx

import { useEffect, useState } from "react";

import "./AddBillingModal.css";

function AddBillingModal({
    closeModal,
    addBilling,
    patients = [],
    appointments = []
}) {

    const [patientId, setPatientId] = useState("");
    const [appointmentId, setAppointmentId] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("pending");
    const [paymentMethod, setPaymentMethod] = useState("");

    const [error, setError] = useState("");

    const [filteredAppointments, setFilteredAppointments] =
        useState([]);

    useEffect(() => {

        if (!patientId) {

            setFilteredAppointments([]);

            return;
        }

        const filtered = appointments.filter(
            (appointment) =>
                String(appointment.patient_id) ===
                String(patientId)
        );

        setFilteredAppointments(filtered);

        setAppointmentId("");

    }, [patientId, appointments]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!patientId) {

            setError("Please select a patient.");

            return;
        }

        if (!appointmentId) {

            setError("Please select an appointment.");

            return;
        }

        if (!amount || Number(amount) <= 0) {

            setError("Amount must be greater than zero.");

            return;
        }

        try {

            await addBilling({

                patient_id: Number(patientId),

                appointment_id: Number(appointmentId),

                amount: Number(amount),

                payment_status: paymentStatus,

                payment_method:
                    paymentMethod || null

            });

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                "Failed to create billing."
            );
        }
    };

    return (

        <div
            className="modal-overlay"
            onClick={closeModal}
        >

            <div
                className="billing-modal"
                onClick={(e) => e.stopPropagation()}
            >

                <h2>
                    Add Billing
                </h2>

                {error && (

                    <span className="validation-error">
                        {error}
                    </span>

                )}

                <form onSubmit={handleSubmit}>

                    <div className="billing-form-grid">

                        <div>

                            <label>
                                Patient
                            </label>

                            <select
                                value={patientId}
                                onChange={(e) =>
                                    setPatientId(e.target.value)
                                }
                            >

                                <option value="">
                                    Select Patient
                                </option>

                                {patients.map((patient) => (

                                    <option
                                        key={patient.id}
                                        value={patient.id}
                                    >
                                        {patient.name ||
                                            patient.patient_name ||
                                            `Patient #${patient.id}`}
                                    </option>

                                ))}

                            </select>

                        </div>


                        <div>

                            <label>
                                Appointment
                            </label>

                            <select
                                value={appointmentId}
                                onChange={(e) =>
                                    setAppointmentId(e.target.value)
                                }
                                disabled={!patientId}
                            >

                                <option value="">
                                    {patientId
                                        ? "Select Appointment"
                                        : "Select Patient First"}
                                </option>

                                {filteredAppointments.map(
                                    (appointment) => (

                                        <option
                                            key={appointment.id}
                                            value={appointment.id}
                                        >
                                            Appointment #
                                            {appointment.id}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        <div>

                            <label>
                                Amount
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={amount}
                                onChange={(e) =>
                                    setAmount(e.target.value)
                                }
                                placeholder="Enter amount"
                            />

                        </div>


                        <div>

                            <label>
                                Payment Status
                            </label>

                            <select
                                value={paymentStatus}
                                onChange={(e) =>
                                    setPaymentStatus(e.target.value)
                                }
                            >

                                <option value="pending">
                                    Pending
                                </option>

                                <option value="paid">
                                    Paid
                                </option>

                            </select>

                        </div>


                        <div>

                            <label>
                                Payment Method
                            </label>

                            <select
                                value={paymentMethod}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            >

                                <option value="">
                                    Select Method
                                </option>

                                <option value="cash">
                                    Cash
                                </option>

                                <option value="card">
                                    Card
                                </option>

                                <option value="upi">
                                    UPI
                                </option>

                                <option value="online">
                                    Online
                                </option>

                                <option value="insurance">
                                    Insurance
                                </option>

                            </select>

                        </div>

                    </div>


                    <div className="modal-buttons">

                        <button
                            type="submit"
                            className="save-btn"
                        >
                            Create Bill
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

export default AddBillingModal;