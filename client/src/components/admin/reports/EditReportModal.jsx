import AddReportModal from "./AddReportModal";

function EditReportModal({

    report,

    closeModal,

    reloadReports

}) {

    return (

        <AddReportModal

            editMode={true}

            reportData={report}

            closeModal={closeModal}

            reloadReports={reloadReports}

        />

    );

}

export default EditReportModal;