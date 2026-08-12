import "./ReportTable.css";

function ReportTable({

    reports,

    onView,

    onEdit,

    onDelete

}){

    return(

        <div className="report-table-wrapper">

            <table className="report-table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Patient</th>

                        <th>Report</th>

                        <th>Date</th>

                        <th>Result</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

{

reports.map((report)=>(

<tr key={report.id}>

<td>{report.id}</td>

<td>{report.patient_name}</td>

<td>{report.test_name}</td>

<td>{report.report_date?.substring(0,10)}</td>

<td>

<span className={`result ${report.status}`}>

{report.status}

</span>

</td>

<td className="actions">

<button onClick={()=>onView(report)}>

👁

</button>

<button onClick={()=>onEdit(report)}>

✏️

</button>

<button onClick={()=>onDelete(report.id)}>

🗑️

</button>

</td>

</tr>

))

}

</tbody>

            </table>

        </div>

    );

}

export default ReportTable;