import { useState, useEffect } from "react";
import { getAllPatients } from "../../../api/patientApi";
import "./AddReportModal.css";

import {
    createReport,
    updateReport
} from "../../../api/reportApi";

function AddReportModal({

    closeModal,

    reloadReports,

    editMode = false,

    reportData = null

}) {

    const [errors, setErrors] = useState({});
    const [patients, setPatients] = useState([]);

    const [report, setReport] = useState(
    reportData
        ? {
              ...reportData,
              report_date: reportData.report_date
                  ? reportData.report_date.split("T")[0]
                  : ""
          }
        : {
              patient_id: "",
              test_name: "",
              result: "",
              status: "pending",
              report_date: "",
              report_file: null
          }
);

useEffect(() => {

    const loadPatients = async () => {

        try {

            const data = await getAllPatients();
            setPatients(data);

        } catch (err) {

            console.error(err);

        }

    };

    loadPatients();

}, []);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setReport({

            ...report,

            [name]: value

        });

    };

    const handleFileChange = (e) => {

        setReport({

            ...report,

            report_file: e.target.files[0]

        });

    };

    const validate = () => {

        const err = {};

        if (!report.patient_id)
            err.patient_id = "Patient ID required";

        if (!report.test_name.trim())
            err.test_name = "Test name required";

        if (!report.result.trim())
            err.result = "Result required";

        if (!report.report_date)
            err.report_date = "Report date required";

        setErrors(err);

        return Object.keys(err).length === 0;

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) return;

        try {

            const formData = new FormData();

            formData.append(
                "patient_id",
                report.patient_id
            );

            formData.append(
                "test_name",
                report.test_name
            );

            formData.append(
                "result",
                report.result
            );

            formData.append(
                "status",
                report.status
            );

            formData.append(
                "report_date",
                report.report_date
            );

            if (report.report_file instanceof File) {

                formData.append(
                    "report_file",
                    report.report_file
                );

            }

            if (editMode) {

                await updateReport(

                    report.id,

                    formData

                );

            } else {

                await createReport(

                    formData

                );

            }

            await reloadReports();

            closeModal();

        } catch (err) {

            console.error(err);

            alert("Operation failed.");

        }

    };

    return (

        <div className="modal-overlay">

            <div className="report-modal">

                <h2>

                    {

                        editMode

                            ? "Edit Report"

                            : "Add Report"

                    }

                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="report-form-grid">

                        <div>

                            <label>Patient ID</label>

                            <select
    name="patient_id"
    value={report.patient_id}
    onChange={handleChange}
>
    <option value="">Select Patient</option>

    {patients.map((patient) => (

        <option
            key={patient.id}
            value={patient.id}
        >
            {patient.name}
        </option>

    ))}

</select>

                            {

                                errors.patient_id &&

                                <small className="validation-error">

                                    {errors.patient_id}

                                </small>

                            }

                        </div>

                        <div>

                            <label>Test Name</label>

                            <input

                                name="test_name"

                                value={report.test_name}

                                onChange={handleChange}

                            />

                            {

                                errors.test_name &&

                                <small className="validation-error">

                                    {errors.test_name}

                                </small>

                            }

                        </div>

                        <div>

                            <label>Result</label>

                            <textarea

                                name="result"

                                value={report.result}

                                onChange={handleChange}

                            />

                        </div>

                        <div>

                            <label>Status</label>

                            <select

                                name="status"

                                value={report.status}

                                onChange={handleChange}

                            >

                                <option value="pending">

                                    Pending

                                </option>

                                <option value="completed">

                                    Completed

                                </option>

                            </select>

                        </div>

                        <div>

                            <label>Report Date</label>

                            <input

                                type="date"

                                name="report_date"

                                value={report.report_date}

                                onChange={handleChange}

                            />

                        </div>

                        <div>

                            <label>Report File</label>

                            <input

                                type="file"

                                onChange={handleFileChange}

                            />

                        </div>

                    </div>

                    <div className="modal-buttons">

                        <button

                            type="submit"

                            className="save-btn"

                        >

                            {

                                editMode

                                    ? "Update Report"

                                    : "Save Report"

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

export default AddReportModal;