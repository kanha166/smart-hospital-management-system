import { useState } from "react";
import "./AddMedicineModal.css";
import {
    createMedicine,
    updateMedicine
} from "../../../api/pharmacyApi";

function AddMedicineModal({

    closeModal,

    reloadMedicines,

    editMode = false,

    medicineData = null

}) {

    const [errors, setErrors] = useState({});

    const [medicine, setMedicine] = useState(
    medicineData
        ? {
              ...medicineData,
              expiry_date: medicineData.expiry_date
                  ? medicineData.expiry_date.split("T")[0]
                  : ""
          }
        : {
              medicine_name: "",
              manufacturer: "",
              category: "",
              stock_quantity: "",
              unit_price: "",
              expiry_date: ""
          }
);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setMedicine({

            ...medicine,

            [name]: value

        });

    };

    const validate = () => {

        const newErrors = {};

        if (!medicine.medicine_name.trim())
            newErrors.medicine_name = "Medicine name is required.";

        if (!medicine.category)
            newErrors.category = "Category is required.";

        if (!medicine.manufacturer.trim())
            newErrors.manufacturer = "Manufacturer is required.";

        if (!medicine.unit_price || Number(medicine.unit_price) <= 0)
            newErrors.unit_price = "Enter valid price.";

        if (!medicine.stock_quantity || Number(medicine.stock_quantity) < 0)
            newErrors.stock_quantity = "Enter valid stock.";

        if (!medicine.expiry_date)
            newErrors.expiry_date = "Expiry date required.";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    try {

        if (editMode) {

            await updateMedicine(
                medicine.id,
                medicine
            );

        } else {

            await createMedicine(
                medicine
            );

        }

        await reloadMedicines();

closeModal();

    } catch (err) {

        console.error(err);

        alert("Operation failed.");

    }

};

    return (

        <div className="modal-overlay">

            <div className="medicine-modal">

                <h2>

                    {

                        editMode

                            ? "Edit Medicine"

                            : "Add Medicine"

                    }

                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="medicine-form-grid">
                                                <div>

                            <label>Medicine Name</label>

                            <input
                                type="text"
                                name="medicine_name"
                                value={medicine.medicine_name}
                                onChange={handleChange}
                            />

                            {errors.medicine_name &&
                                <small className="validation-error">
                                    {errors.medicine_name}
                                </small>
                            }

                        </div>

                        <div>

                            <label>Category</label>

                            <select
                                name="category"
                                value={medicine.category}
                                onChange={handleChange}
                            >

                                <option value="">Select</option>

                                <option>Tablet</option>
                                <option>Capsule</option>
                                <option>Syrup</option>
                                <option>Injection</option>
                                <option>Ointment</option>

                            </select>

                            {errors.category &&
                                <small className="validation-error">
                                    {errors.category}
                                </small>
                            }

                        </div>

                        <div>

                            <label>Manufacturer</label>

                            <input
                                type="text"
                                name="manufacturer"
                                value={medicine.manufacturer}
                                onChange={handleChange}
                            />

                            {errors.manufacturer &&
                                <small className="validation-error">
                                    {errors.manufacturer}
                                </small>
                            }

                        </div>

                        <div>

                            <label>Price (₹)</label>

                            <input
                                type="number"
                                name="unit_price"
                                value={medicine.unit_price}
                                onChange={handleChange}
                            />

                            {errors.unit_price &&
                                <small className="validation-error">
                                    {errors.unit_price}
                                </small>
                            }

                        </div>

                        <div>

                            <label>Stock</label>

                            <input
                                type="number"
                                name="stock_quantity"
                                value={medicine.stock_quantity}
                                onChange={handleChange}
                            />

                            {errors.stock_quantity &&
                                <small className="validation-error">
                                    {errors.stock_quantity}
                                </small>
                            }

                        </div>

                        <div>

                            <label>Expiry Date</label>

                            <input
                                type="date"
                                name="expiry_date"
                                value={medicine.expiry_date}
                                onChange={handleChange}
                            />

                            {errors.expiry_date &&
                                <small className="validation-error">
                                    {errors.expiry_date}
                                </small>
                            }

                        </div>

                    </div>

                    <div className="modal-buttons">

                        <button
                            type="submit"
                            className="save-btn"
                        >

                            {

                                editMode

                                    ? "Update Medicine"

                                    : "Save Medicine"

                            }

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

export default AddMedicineModal;