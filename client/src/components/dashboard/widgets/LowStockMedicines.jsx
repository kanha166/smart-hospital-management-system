import "./DashboardWidgets.css";

function LowStockMedicines({ medicines = [] }) {

    return (

        <div className="widget-card">

            <h3>Low Stock Medicines</h3>

            <table className="mini-table">

                <thead>

                    <tr>
                        <th>Medicine</th>
                        <th>Stock</th>
                    </tr>

                </thead>

                <tbody>

                    {medicines.map((medicine) => (

                        <tr key={medicine.medicine_name}>

                            <td>{medicine.medicine_name}</td>

                            <td>{medicine.stock_quantity}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default LowStockMedicines;