// File: client/src/components/admin/billing/EditBillingModal.jsx

import { useState } from "react";

import "./EditBillingModal.css";

function EditBillingModal({
    invoice,
    updateBilling,
    closeModal
}) {

    const [amount, setAmount] = useState(
        invoice.amount || ""
    );

    const [paymentStatus, setPaymentStatus] =
        useState(
            invoice.payment_status || "pending"
        );

    const [paymentMethod, setPaymentMethod] =
        useState(
            invoice.payment_method || ""
        );

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!amount || Number(amount) <= 0) {

            setError(
                "Amount must be greater than zero."
            );

            return;
        }

        try {

            await updateBilling(
                invoice.id,
                {
                    amount: Number(amount),
                    payment_status: paymentStatus,
                    payment_method:
                        paymentMethod || null
                }
            );

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                "Failed to update billing."
            );

        }

    };

    return (

        <div
            className="modal-overlay"
            onClick={closeModal}
        >

            <div
                className="edit-billing-modal"
                onClick={(e) =>
                    e.stopPropagation()
                }
            >

                <h2>
                    Edit Billing
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

                            <input
                                type="text"
                                value={
                                    invoice.patient_name ||
                                    `Patient #${invoice.patient_id}`
                                }
                                disabled
                            />

                        </div>


                        <div>

                            <label>
                                Doctor
                            </label>

                            <input
                                type="text"
                                value={
                                    invoice.doctor_name ||
                                    "N/A"
                                }
                                disabled
                            />

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
                                    setAmount(
                                        e.target.value
                                    )
                                }
                            />

                        </div>


                        <div>

                            <label>
                                Payment Status
                            </label>

                            <select
                                value={paymentStatus}
                                onChange={(e) =>
                                    setPaymentStatus(
                                        e.target.value
                                    )
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
                                    setPaymentMethod(
                                        e.target.value
                                    )
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
                            Update Bill
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

export default EditBillingModal;