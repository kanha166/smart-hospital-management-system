import { useState } from "react";

import "./PayNowModal.css";

function PayNowModal({
    invoice,
    closeModal,
    onPaymentSuccess
}) {

    const [paymentMethod, setPaymentMethod] =
        useState("");

    const [processing, setProcessing] =
        useState(false);

    const [error, setError] =
        useState("");


    const handlePayment = async (e) => {

        e.preventDefault();

        setError("");

        if (!paymentMethod) {

            setError(
                "Please select a payment method."
            );

            return;
        }


        try {

            setProcessing(true);

            /*
             * Payment gateway integration
             * will be connected here.
             *
             * For now this only prepares
             * the payment flow.
             */

            await onPaymentSuccess(
                invoice,
                paymentMethod
            );

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                "Payment failed. Please try again."
            );

        } finally {

            setProcessing(false);

        }

    };


    return (

        <div
            className="patient-modal-overlay"
            onClick={closeModal}
        >

            <div
                className="pay-now-modal"
                onClick={(e) =>
                    e.stopPropagation()
                }
            >

                <div className="pay-now-header">

                    <div>

                        <h2>
                            Pay Bill
                        </h2>

                        <p>
                            Complete your payment
                        </p>

                    </div>

                    <button
                        type="button"
                        className="pay-now-close"
                        onClick={closeModal}
                    >
                        ×
                    </button>

                </div>


                <div className="payment-summary">

                    <div>

                        <span>
                            Invoice
                        </span>

                        <strong>
                            #{invoice.id}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Amount
                        </span>

                        <strong className="payment-amount">

                            ₹
                            {Number(
                                invoice.amount
                            ).toFixed(2)}

                        </strong>

                    </div>

                </div>


                {error && (

                    <div className="payment-error">

                        {error}

                    </div>

                )}


                <form
                    onSubmit={handlePayment}
                    className="payment-form"
                >

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
                            Select Payment Method
                        </option>

                        <option value="upi">
                            UPI
                        </option>

                        <option value="card">
                            Credit / Debit Card
                        </option>

                        <option value="netbanking">
                            Net Banking
                        </option>

                    </select>


                    <div className="payment-info">

                        <span>
                            🔒
                        </span>

                        <p>
                            Your payment will be processed
                            securely.
                        </p>

                    </div>


                    <div className="payment-modal-buttons">

                        <button
                            type="button"
                            className="payment-cancel-btn"
                            onClick={closeModal}
                            disabled={processing}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="payment-submit-btn"
                            disabled={processing}
                        >

                            {processing
                                ? "Processing..."
                                : `Pay ₹${Number(
                                    invoice.amount
                                ).toFixed(2)}`
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default PayNowModal;