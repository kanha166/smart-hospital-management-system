import "./MedicineTable.css";

function MedicineTable({

    medicines,

    onView,

    onEdit,

    onDelete

}){

    return(

        <div className="medicine-table-wrapper">

            <table className="medicine-table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Category</th>

                        <th>Price</th>

                        <th>Stock</th>

                        <th>Expiry</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        medicines.map((medicine)=>(

                            <tr key={medicine.id}>

                                <td>{medicine.id}</td>
                                <td>{medicine.medicine_name}</td>
                                <td>{medicine.category}</td>
                                <td>₹{medicine.unit_price}</td>
                                <td>{medicine.stock_quantity}</td>
                                <td>{medicine.expiry_date?.substring(0,10)}</td>

                                <td>
                                    <span className="status active">
                                        Available
                                    </span>
                                </td>
                                <td className="actions">

                                    <button onClick={()=>onView(medicine)}>

                                        👁

                                    </button>

                                    <button onClick={()=>onEdit(medicine)}>

                                        ✏️

                                    </button>

                                    <button onClick={()=>onDelete(medicine.id)}>

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

export default MedicineTable;