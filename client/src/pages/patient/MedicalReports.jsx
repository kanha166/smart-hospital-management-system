import { useEffect, useState } from "react";
import "./PatientPages.css";
import { getMyReports } from "../../api/reportApi";

export default function MedicalReports() {

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadReports = async () => {

            try {

                const data = await getMyReports();

                setReports(data);

            } catch (error) {

                console.error(
                    "GET MY REPORTS ERROR:",
                    error
                );

                setError(
                    "Unable to load medical reports."
                );

            } finally {

                setLoading(false);

            }

        };

        loadReports();

    }, []);

    const handleDownload = (file) => {

        if (!file) {
            alert("Report file is not available.");
            return;
        }

        window.open(file, "_blank");

    };

    return (

        <div className="patient-page">

            <div className="appointments-header">

                <div>

                    <h2>Medical Reports</h2>

                    <p>
                        View and download all your reports.
                    </p>

                </div>

            </div>

            <div className="patient-card">

                {loading && (
                    <p>Loading medical reports...</p>
                )}

                {error && (
                    <p>{error}</p>
                )}

                {!loading && !error && reports.length === 0 && (

                    <p>
                        No medical reports available.
                    </p>

                )}

                {!loading && !error && reports.length > 0 && (

                    <table className="patient-table">

                        <thead>

                            <tr>

                                <th>Report</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {reports.map((report) => (

                                <tr key={report.id}>

                                    <td>
                                        {report.test_name}
                                    </td>

                                    <td>
                                        {report.report_date
                                            ? new Date(
                                                report.report_date
                                            ).toLocaleDateString(
                                                "en-GB",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric"
                                                }
                                            )
                                            : "-"
                                        }
                                    </td>

                                    <td>

                                        <span
                                            className={
                                                report.status === "completed"
                                                    ? "status completed"
                                                    : "status pending"
                                            }
                                        >
                                            {report.status}
                                        </span>

                                    </td>

                                    <td>

                                        <button
                                            className="small-btn"
                                            onClick={() =>
                                                handleDownload(
                                                    report.report_file
                                                )
                                            }
                                        >
                                            Download
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

        </div>

    );

}