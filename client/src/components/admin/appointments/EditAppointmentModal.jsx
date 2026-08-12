import AddAppointmentModal from "./AddAppointmentModal";

function EditAppointmentModal({

    appointment,

    appointments,

    updateAppointment,

    closeModal

}) {

    return (

        <AddAppointmentModal

            editMode={true}

            appointmentData={appointment}

            appointments={appointments}

            addAppointment={updateAppointment}

            closeModal={closeModal}

        />

    );

}

export default EditAppointmentModal;