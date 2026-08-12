import {
    CalendarDays,
    FileText,
    Pill,
    CreditCard
} from "lucide-react";

import "./PatientPages.css";

export default function DashboardHome(){

return(

<div className="patient-page">

<div className="patient-header">

<h1>

Welcome Back

</h1>

<p>

Here's a quick overview of your health information.

</p>

</div>

<div className="patient-summary-grid">

<div className="patient-summary-card">

<CalendarDays size={32}/>

<h3>

Upcoming Appointments

</h3>

<h2>

2

</h2>

</div>

<div className="patient-summary-card">

<FileText size={32}/>

<h3>

Medical Reports

</h3>

<h2>

15

</h2>

</div>

<div className="patient-summary-card">

<Pill size={32}/>

<h3>

Active Prescriptions

</h3>

<h2>

4

</h2>

</div>

<div className="patient-summary-card">

<CreditCard size={32}/>

<h3>

Pending Bills

</h3>

<h2>

₹4,800

</h2>

</div>

</div>

<div className="patient-dashboard-grid">

<div className="patient-card">

<h2>

Upcoming Appointment

</h2>

<div className="patient-info-row">

<span>Doctor</span>

<strong>Dr. Sharma</strong>

</div>

<div className="patient-info-row">

<span>Date</span>

<strong>28 July 2026</strong>

</div>

<div className="patient-info-row">

<span>Time</span>

<strong>10:30 AM</strong>

</div>

<div className="patient-info-row">

<span>Department</span>

<strong>Cardiology</strong>

</div>

</div>

<div className="patient-card">

<h2>

Quick Actions

</h2>

<button className="patient-action-btn">

Book Appointment

</button>

<button className="patient-action-btn">

Download Reports

</button>

<button className="patient-action-btn">

View Prescriptions

</button>

</div>

</div>

<div className="patient-card">

<h2>

Recent Reports

</h2>

<table className="patient-table">

<thead>

<tr>

<th>Report</th>

<th>Date</th>

<th>Status</th>

</tr>

</thead>

<tbody>

<tr>

<td>Blood Test</td>

<td>21 Jul</td>

<td>Completed</td>

</tr>

<tr>

<td>X-Ray</td>

<td>18 Jul</td>

<td>Completed</td>

</tr>

<tr>

<td>ECG</td>

<td>15 Jul</td>

<td>Completed</td>

</tr>

</tbody>

</table>

</div>

</div>

);

}