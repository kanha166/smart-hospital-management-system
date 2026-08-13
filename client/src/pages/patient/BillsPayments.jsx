import { useEffect, useState } from "react";

import {
    getPatientInvoices
} from "../../api/invoiceApi";

import PayNowModal
    from "../../components/patient/PayNowModal";

import PatientViewBillingModal
    from "../../components/patient/PatientViewBillingModal";

import "./PatientPages.css";


export default function BillsPayments() {

    const [bills, setBills] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [selectedBill, setSelectedBill] =
        useState(null);

    const [paymentBill, setPaymentBill] =
        useState(null);


    // ==========================================
    // LOAD PATIENT BILLS
    // ==========================================

    const loadBills = async () => {

        try {

            setLoading(true);

            setError("");


            const profileResponse =
                await fetch(
                    "https://smart-hospital-api-kxep.onrender.com/api/patients/profile",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${localStorage.getItem(
                                    "accessToken"
                                )}`
                        }
                    }
                );


            const profileData =
                await profileResponse.json();


            if (!profileResponse.ok) {

                throw new Error(
                    profileData.message ||
                    "Failed to load patient profile."
                );

            }


            const patientId =
                profileData.data?.id;


            if (!patientId) {

                throw new Error(
                    "Patient profile not found."
                );

            }


            const data =
                await getPatientInvoices(
                    patientId
                );


            setBills(
                Array.isArray(data)
                    ? data
                    : []
            );


        } catch (err) {

            console.error(
                "Failed to load bills:",
                err
            );


            setError(
                err.response?.data?.message ||
                err.message ||
                "Failed to load bills."
            );


        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadBills();

    }, []);


    // ==========================================
    // VIEW BILL
    // ==========================================

    const openViewModal = (bill) => {

        setSelectedBill(bill);

    };


    const closeViewModal = () => {

        setSelectedBill(null);

    };


    // ==========================================
    // PAY BILL
    // ==========================================

    const openPaymentModal = (bill) => {

        setPaymentBill(bill);

    };


    const closePaymentModal = () => {

        setPaymentBill(null);

    };


    // ==========================================
    // PAYMENT SUCCESS
    // ==========================================

    const handlePaymentSuccess = async () => {

        closePaymentModal();

        await loadBills();

    };


    return (

        <div className="patient-page">


            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="appointments-header">

                <div>

                    <h2>
                        Bills & Payments
                    </h2>

                    <p>
                        View your bills, payment history,
                        and pending payments.
                    </p>

                </div>

            </div>


            {/* ==========================================
                LOADING
            ========================================== */}

            {loading && (

                <div className="patient-card">

                    <p>
                        Loading bills...
                    </p>

                </div>

            )}


            {/* ==========================================
                ERROR
            ========================================== */}

            {error && !loading && (

                <div className="patient-card">

                    <p className="validation-error">
                        {error}
                    </p>


                    <button
                        type="button"
                        className="small-btn"
                        onClick={loadBills}
                    >
                        Retry
                    </button>

                </div>

            )}


            {/* ==========================================
                EMPTY
            ========================================== */}

            {!loading &&
                !error &&
                bills.length === 0 && (

                    <div className="patient-card">

                        <p>
                            No bills or payments found.
                        </p>

                    </div>

                )}


            {/* ==========================================
                BILLS TABLE
            ========================================== */}

            {!loading &&
                !error &&
                bills.length > 0 && (

                    <div className="patient-card">

                        <table className="patient-table">

                            <thead>

                                <tr>

                                    <th>
                                        Invoice
                                    </th>

                                    <th>
                                        Amount
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                    <th>
                                        Payment Method
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {bills.map((bill) => {

                                    const status =
                                        bill.payment_status
                                            ?.toLowerCase();


                                    const isPaid =
                                        status === "paid";


                                    return (

                                        <tr
                                            key={bill.id}
                                        >


                                            {/* INVOICE */}

                                            <td>
                                                #{bill.id}
                                            </td>


                                            {/* AMOUNT */}

                                            <td>

                                                ₹
                                                {Number(
                                                    bill.amount || 0
                                                ).toFixed(2)}

                                            </td>


                                            {/* DATE */}

                                            <td>

                                                {bill.created_at
                                                    ? new Date(
                                                        bill.created_at
                                                    ).toLocaleDateString()
                                                    : "-"
                                                }

                                            </td>


                                            {/* PAYMENT METHOD */}

                                            <td>

                                                {bill.payment_method ||
                                                    "-"
                                                }

                                            </td>


                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={
                                                        isPaid
                                                            ? "status completed"
                                                            : "status pending"
                                                    }
                                                >

                                                    {isPaid
                                                        ? "Paid"
                                                        : "Pending"
                                                    }

                                                </span>

                                            </td>


                                            {/* ACTIONS */}

                                            <td>

                                                <button
                                                    type="button"
                                                    className="small-btn"
                                                    onClick={() =>
                                                        openViewModal(
                                                            bill
                                                        )
                                                    }
                                                >
                                                    View
                                                </button>


                                                {!isPaid && (

                                                    <button
                                                        type="button"
                                                        className="small-btn"
                                                        onClick={() =>
                                                            openPaymentModal(
                                                                bill
                                                            )
                                                        }
                                                    >
                                                        Pay Now
                                                    </button>

                                                )}

                                            </td>

                                        </tr>

                                    );

                                })}

                            </tbody>

                        </table>

                    </div>

                )}


            {/* ==========================================
                VIEW BILLING MODAL
            ========================================== */}

            {selectedBill && (

                <PatientViewBillingModal
    invoice={selectedBill}
    closeModal={() =>
        setSelectedBill(null)
    }
/>

            )}


            {/* ==========================================
                PAY NOW MODAL
            ========================================== */}

            {paymentBill && (

                <PayNowModal

                    invoice={paymentBill}

                    closeModal={
                        closePaymentModal
                    }

                    onPaymentSuccess={
                        handlePaymentSuccess
                    }

                />

            )}

        </div>

    );

}