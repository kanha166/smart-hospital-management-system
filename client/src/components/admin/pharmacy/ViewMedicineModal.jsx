import "./AddMedicineModal.css";

function ViewMedicineModal({

    medicine,

    closeModal

}){

    return(

        <div className="modal-overlay">

            <div className="view-medicine-modal">

                <h2>

                    Medicine Details

                </h2>

                <div className="medicine-grid">

                    <div>

                        <strong>Name</strong>

                        <span>{medicine.medicine_name}</span>

                    </div>

                    <div>

                        <strong>Category</strong>

                        <span>{medicine.category}</span>

                    </div>

                    <div>

                        <strong>Manufacturer</strong>

                        <span>{medicine.manufacturer}</span>

                    </div>

                    <div>

                        <strong>Price</strong>

                        <span>₹{medicine.unit_price}</span>

                    </div>

                    <div>

                        <strong>Stock</strong>

                        <span>{medicine.stock_quantity}</span>

                    </div>

                    <div>

                        <strong>Expiry</strong>

                        <span>{medicine.expiry_date?.substring(0,10)}</span>

                    </div>

                </div>

                <button

                    className="close-btn"

                    onClick={closeModal}

                >

                    Close

                </button>

            </div>

        </div>

    );

}

export default ViewMedicineModal;