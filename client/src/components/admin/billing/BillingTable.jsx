import "./../appointments/AppointmentTable.css";

function BillingTable({
    invoices,
    onView,
    onEdit,
    onDelete
}) {

    return (

        <div className="appointment-table-wrapper">

            <table className="appointment-table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Patient</th>

                        <th>Amount</th>

                        <th>Status</th>

                        <th>Method</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        invoices.map((invoice) => (

                            <tr key={invoice.id}>

                                <td>
                                    #{invoice.id}
                                </td>

                                <td>
                                    {invoice.patient_name ||
                                        `Patient #${invoice.patient_id}`}
                                </td>

                                <td>
                                    ₹{Number(invoice.amount).toFixed(2)}
                                </td>

                                <td>

                                    <span
                                        className={`status ${
                                            invoice.payment_status?.toLowerCase()
                                        }`}
                                    >

                                        {invoice.payment_status}

                                    </span>

                                </td>

                                <td>
                                    {invoice.payment_method || "-"}
                                </td>

                                <td className="actions">

                                    <button
                                        type="button"
                                        title="View"
                                        onClick={() =>
                                            onView(invoice)
                                        }
                                    >
                                        👁
                                    </button>

                                    <button
                                        type="button"
                                        title="Edit"
                                        onClick={() =>
                                            onEdit(invoice)
                                        }
                                    >
                                        ✏️
                                    </button>

                                    <button
                                        type="button"
                                        title="Delete"
                                        onClick={() =>
                                            onDelete(invoice.id)
                                        }
                                    >
                                        🗑️
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );
}

export default BillingTable;