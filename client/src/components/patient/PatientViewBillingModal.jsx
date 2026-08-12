import "./PatientViewBillingModal.css";

function ViewBillingModal({
    invoice,
    closeModal
}) {

    return (

        <div
            className="patient-modal-overlay"
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
                            Invoice information
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
                            Appointment
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

                            ₹
                            {Number(
                                invoice.amount
                            ).toFixed(2)}

                        </strong>

                    </div>


                    <div>

                        <span>
                            Payment Method
                        </span>

                        <strong>
                            {invoice.payment_method || "-"}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Status
                        </span>

                        <strong>

                            <span
                                className={`billing-status ${
                                    invoice.payment_status?.toLowerCase()
                                }`}
                            >

                                {invoice.payment_status}

                            </span>

                        </strong>

                    </div>


                    <div>

                        <span>
                            Date
                        </span>

                        <strong>

                            {invoice.created_at
                                ? new Date(
                                    invoice.created_at
                                ).toLocaleDateString()
                                : "-"
                            }

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