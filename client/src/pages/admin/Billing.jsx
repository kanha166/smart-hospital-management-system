// File: client/src/pages/admin/Billing.jsx

import { useEffect, useState } from "react";

import BillingSearch
    from "../../components/admin/billing/BillingSearch";

import BillingTable
    from "../../components/admin/billing/BillingTable";

import AddBillingModal
    from "../../components/admin/billing/AddBillingModal";

import ViewBillingModal
    from "../../components/admin/billing/ViewBillingModal";

import EditBillingModal
    from "../../components/admin/billing/EditBillingModal";

import {
    getAllInvoices,
    createInvoice,
    updateInvoice,
    deleteInvoice as deleteInvoiceApi
} from "../../api/invoiceApi";

import {
    getAllPatients
} from "../../api/patientApi";

import {
    getAllAppointments
} from "../../api/appointmentApi";

import "./Billing.css";


function Billing() {

    const [invoices, setInvoices] = useState([]);

    const [patients, setPatients] = useState([]);

    const [appointments, setAppointments] = useState([]);

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [selectedInvoice, setSelectedInvoice] =
        useState(null);

    const [editingInvoice, setEditingInvoice] =
        useState(null);


    // ================================
    // LOAD INVOICES
    // ================================

    const loadInvoices = async () => {

        try {

            const data = await getAllInvoices();

            setInvoices(data || []);

        } catch (error) {

            console.error(
                "Failed to load invoices:",
                error
            );

        }

    };


    // ================================
    // LOAD PATIENTS
    // ================================

    const loadPatients = async () => {

        try {

            const data = await getAllPatients();

            setPatients(data || []);

        } catch (error) {

            console.error(
                "Failed to load patients:",
                error
            );

        }

    };


    // ================================
    // LOAD APPOINTMENTS
    // ================================

    const loadAppointments = async () => {

        try {

            const data = await getAllAppointments();

            setAppointments(data || []);

        } catch (error) {

            console.error(
                "Failed to load appointments:",
                error
            );

        }

    };


    // ================================
    // CREATE BILLING
    // ================================

    const addBilling = async (data) => {

        try {

            await createInvoice(data);

            setShowModal(false);

            await loadInvoices();

        } catch (error) {

            console.error(
                "Failed to create invoice:",
                error
            );

            throw error;

        }

    };


    // ================================
    // UPDATE BILLING
    // ================================

    const editBilling = async (id, data) => {

        try {

            await updateInvoice(id, data);

            setEditingInvoice(null);

            await loadInvoices();

        } catch (error) {

            console.error(
                "Failed to update invoice:",
                error
            );

            throw error;

        }

    };


    // ================================
    // INITIAL LOAD
    // ================================

    useEffect(() => {

        loadInvoices();

        loadPatients();

        loadAppointments();

    }, []);


    // ================================
    // SEARCH
    // ================================

    const filteredInvoices = invoices.filter(
        (invoice) => {

            const searchText =
                search.toLowerCase();

            return (

                String(invoice.id || "")
                    .toLowerCase()
                    .includes(searchText)

                ||

                invoice.patient_name
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                invoice.doctor_name
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                String(invoice.amount || "")
                    .toLowerCase()
                    .includes(searchText)

                ||

                invoice.payment_status
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                invoice.payment_method
                    ?.toLowerCase()
                    .includes(searchText)

            );

        }
    );


    // ================================
    // DELETE BILLING
    // ================================

    const deleteInvoice = async (id) => {

        const confirmed =
            window.confirm(
                "Delete this billing record?"
            );

        if (!confirmed) return;


        try {

            await deleteInvoiceApi(id);

            await loadInvoices();

        } catch (error) {

            console.error(
                "Failed to delete invoice:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete billing record."
            );

        }

    };


    // ================================
    // RENDER
    // ================================

    return (

        <div className="billing-page">


            {/* HEADER */}

            <div className="billing-header">

                <div>

                    <h2>
                        Billing & Payments 💳
                    </h2>

                    <p>
                        Manage hospital billing and payments
                    </p>

                </div>

            </div>


            {/* SEARCH */}

            <BillingSearch

                search={search}

                setSearch={setSearch}

                setShowModal={setShowModal}

            />


            {/* TABLE */}

            <BillingTable

                invoices={filteredInvoices}

                onView={setSelectedInvoice}

                onEdit={setEditingInvoice}

                onDelete={deleteInvoice}

            />


            {/* ADD BILLING */}

            {showModal && (

                <AddBillingModal

                    closeModal={() =>
                        setShowModal(false)
                    }

                    addBilling={addBilling}

                    patients={patients}

                    appointments={appointments}

                />

            )}


            {/* VIEW BILLING */}

            {selectedInvoice && (

                <ViewBillingModal

                    invoice={selectedInvoice}

                    closeModal={() =>
                        setSelectedInvoice(null)
                    }

                />

            )}


            {/* EDIT BILLING */}

            {editingInvoice && (

                <EditBillingModal

                    invoice={editingInvoice}

                    updateBilling={editBilling}

                    closeModal={() =>
                        setEditingInvoice(null)
                    }

                />

            )}


        </div>

    );

}


export default Billing;