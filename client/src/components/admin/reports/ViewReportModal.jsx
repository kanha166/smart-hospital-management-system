import "./ViewReportModal.css";

function ViewReportModal({

    report,

    closeModal

}) {

    return (

        <div className="modal-overlay">

            <div className="view-report-modal">

                <h2>

                    Report Details 📊

                </h2>

                <div className="report-grid">

                    <div>

                        <strong>Patient</strong>

                        <span>{report.patient_name}</span>

                    </div>

                    <div>

                        <strong>Report Type</strong>

                        <span>{report.test_name}</span>

                    </div>

                    <div>

                        <strong>Date</strong>

                        <span>{report.report_date?.substring(0, 10)}</span>

                    </div>

                    <div>

                        <strong>Status</strong>

                        <span>{report.status}</span>

                    </div>

                    <div className="full-width">

                        <strong>Result</strong>

                        <span>{report.result}</span>

                    </div>

                    <div className="full-width">

                        <strong>Report File</strong>

                        <span>

                            {

                                report.report_file

                                    ? (

                                        <a

                                            href={`https://smart-hospital-api-kxep.onrender.com/${report.report_file}`}

                                            target="_blank"

                                            rel="noreferrer"

                                        >

                                            View Report

                                        </a>

                                    )

                                    : "No File Uploaded"

                            }

                        </span>

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

export default ViewReportModal;