import { useEffect, useState } from "react";

import {
    getMedicines,
    deleteMedicine
} from "../../api/pharmacyApi";

import MedicineSearch from "../../components/admin/pharmacy/MedicineSearch";
import MedicineTable from "../../components/admin/pharmacy/MedicineTable";

import AddMedicineModal from "../../components/admin/pharmacy/AddMedicineModal";
import ViewMedicineModal from "../../components/admin/pharmacy/ViewMedicineModal";
import EditMedicineModal from "../../components/admin/pharmacy/EditMedicineModal";

import "./Pharmacy.css";

function Pharmacy() {

    const [medicines, setMedicines] = useState([]);

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [selectedMedicine, setSelectedMedicine] = useState(null);

    const [editingMedicine, setEditingMedicine] = useState(null);

    const loadMedicines = async () => {

        try {

            const data = await getMedicines();

            setMedicines(data);

        } catch (err) {

            console.error(err);

        }

    };

    useEffect(() => {

        loadMedicines();

    }, []);

    const filteredMedicines = medicines.filter((medicine) =>

        medicine.medicine_name
            ?.toLowerCase()
            .includes(search.toLowerCase())

        ||

        medicine.manufacturer
            ?.toLowerCase()
            .includes(search.toLowerCase())

        ||

        medicine.category
            ?.toLowerCase()
            .includes(search.toLowerCase())

    );

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this medicine?")) return;

        try {

            await deleteMedicine(id);

            loadMedicines();

        } catch (err) {

            console.error(err);

            alert("Delete failed.");

        }

    };

    return (

        <div className="pharmacy-page">

            <div className="pharmacy-header">

                <div>

                    <h2>Pharmacy Management 💊</h2>

                    <p>Manage medicines inventory</p>

                </div>

            </div>

            <MedicineSearch

                search={search}

                setSearch={setSearch}

                setShowModal={setShowModal}

            />

            <MedicineTable

                medicines={filteredMedicines}

                onView={setSelectedMedicine}

                onEdit={setEditingMedicine}

                onDelete={handleDelete}

            />

            {

                showModal &&

                <AddMedicineModal

                    closeModal={() => setShowModal(false)}

                    reloadMedicines={loadMedicines}

                />

            }

            {

                selectedMedicine &&

                <ViewMedicineModal

                    medicine={selectedMedicine}

                    closeModal={() =>

                        setSelectedMedicine(null)

                    }

                />

            }

            {

                editingMedicine &&

                <EditMedicineModal

                    medicine={editingMedicine}

                    closeModal={() =>

                        setEditingMedicine(null)

                    }

                    reloadMedicines={loadMedicines}

                />

            }

        </div>

    );

}

export default Pharmacy;