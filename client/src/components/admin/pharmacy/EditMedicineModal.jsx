import AddMedicineModal from "./AddMedicineModal";

function EditMedicineModal({
    medicine,
    closeModal,
    reloadMedicines
}) {
    return (
        <AddMedicineModal
            editMode={true}
            medicineData={medicine}
            closeModal={closeModal}
            reloadMedicines={reloadMedicines}
        />
    );
}

export default EditMedicineModal;