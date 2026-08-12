import AddDoctorModal from "./AddDoctorModal";

function EditDoctorModal({

    doctor,

    doctors,

    updateDoctor,

    closeModal

}) {

    return (

        <AddDoctorModal

            editMode={true}

            doctorData={doctor}

            doctors={doctors}

            addDoctor={updateDoctor}

            closeModal={closeModal}

        />

    );

}

export default EditDoctorModal;