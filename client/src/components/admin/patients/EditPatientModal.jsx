import AddPatientModal from "./AddPatientModal";

function EditPatientModal({

    patient,

    closeModal,

    addPatient

}) {

    return (

        <AddPatientModal

            editMode={true}

            patientData={patient}

            closeModal={closeModal}

            addPatient={addPatient}

        />

    );

}

export default EditPatientModal;