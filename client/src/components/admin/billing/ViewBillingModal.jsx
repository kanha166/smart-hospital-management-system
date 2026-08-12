// File: client/src/components/admin/billing/ViewBillingModal.jsx

import "./ViewBillingModal.css";

function ViewBillingModal({
    invoice,
    closeModal
}) {

    return (

        <div
            className="modal-overlay"
            onClick={closeModal}
        >

            <div
                className="view-billing-modal"
                onClick={(e) =>
                    e.stopPropagation()
                }
            >

                <div className="view-billing-header">

                    <div>

                        <h2>
                            Billing Details
                        </h2>

                        <p>
                            Invoice #{invoice.id}
                        </p>

                    </div>

                    <button
                        type="button"
                        className="view-billing-close"
                        onClick={closeModal}
                    >
                        ×
                    </button>

                </div>


                <div className="billing-details-grid">

                    <div>

                        <span>
                            Invoice ID
                        </span>

                        <strong>
                            #{invoice.id}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Patient
                        </span>

                        <strong>
                            {invoice.patient_name ||
                                `Patient #${invoice.patient_id}`}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Doctor
                        </span>

                        <strong>
                            {invoice.doctor_name ||
                                invoice.doctor ||
                                "N/A"}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Appointment ID
                        </span>

                        <strong>
                            #{invoice.appointment_id}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Amount
                        </span>

                        <strong className="billing-total">
                            ₹{Number(
                                invoice.amount || 0
                            ).toFixed(2)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Payment Method
                        </span>

                        <strong>
                            {invoice.payment_method
                                ? invoice.payment_method.toUpperCase()
                                : "N/A"}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Payment Status
                        </span>

                        <strong
                            className={`billing-status ${
                                invoice.payment_status || "pending"
                            }`}
                        >
                            {invoice.payment_status
                                ? invoice.payment_status
                                    .charAt(0)
                                    .toUpperCase() +
                                  invoice.payment_status
                                    .slice(1)
                                : "Pending"}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Created At
                        </span>

                        <strong>
                            {invoice.created_at
                                ? new Date(
                                    invoice.created_at
                                ).toLocaleString()
                                : "N/A"}
                        </strong>

                    </div>

                </div>


                <div className="view-billing-footer">

                    <button
                        type="button"
                        onClick={closeModal}
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ViewBillingModal;