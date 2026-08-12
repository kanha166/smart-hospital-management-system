import { useEffect, useState } from "react";

import {
    getReports,
    deleteReport
} from "../../api/reportApi";

import ReportSearch from "../../components/admin/reports/ReportSearch";
import ReportTable from "../../components/admin/reports/ReportTable";

import AddReportModal from "../../components/admin/reports/AddReportModal";
import ViewReportModal from "../../components/admin/reports/ViewReportModal";
import EditReportModal from "../../components/admin/reports/EditReportModal";

import "./Reports.css";

function Reports() {

    const [reports, setReports] = useState([]);

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [selectedReport, setSelectedReport] = useState(null);

    const [editingReport, setEditingReport] = useState(null);

    const loadReports = async () => {

        try {

            const data = await getReports();

            setReports(data);

        } catch (err) {

            console.error(err);

        }

    };

    useEffect(() => {

        loadReports();

    }, []);

    const filteredReports = reports.filter((report) =>

        report.patient_name
            ?.toLowerCase()
            .includes(search.toLowerCase())

        ||

        report.test_name
            ?.toLowerCase()
            .includes(search.toLowerCase())

        ||

        report.status
            ?.toLowerCase()
            .includes(search.toLowerCase())

    );

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this report?")) return;

        try {

            await deleteReport(id);

            loadReports();

        } catch (err) {

            console.error(err);

            alert("Delete failed.");

        }

    };

    return (

        <div className="reports-page">

            <div className="reports-header">

                <div>

                    <h2>Reports Management 📊</h2>

                    <p>Manage hospital reports</p>

                </div>

            </div>

            <ReportSearch

                search={search}

                setSearch={setSearch}

                setShowModal={setShowModal}

            />

            <ReportTable

                reports={filteredReports}

                onView={setSelectedReport}

                onEdit={setEditingReport}

                onDelete={handleDelete}

            />

            {

                showModal &&

                <AddReportModal

                    closeModal={() => setShowModal(false)}

                    reloadReports={loadReports}

                />

            }

            {

                selectedReport &&

                <ViewReportModal

                    report={selectedReport}

                    closeModal={() => setSelectedReport(null)}

                />

            }

            {

                editingReport &&

                <EditReportModal

                    report={editingReport}

                    closeModal={() => setEditingReport(null)}

                    reloadReports={loadReports}

                />

            }

        </div>

    );

}

export default Reports;