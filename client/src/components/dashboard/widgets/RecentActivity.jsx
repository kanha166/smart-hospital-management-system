// File: src/components/dashboard/widgets/RecentActivity.jsx

import "./DashboardWidgets.css";
function RecentActivity(){

    return(

        <div className="widget-card">

            <h3>Recent Activity</h3>

            <ul className="activity-list">

                <li>🩺 New Appointment Booked</li>

                <li>💊 Medicine Stock Updated</li>

                <li>👨‍⚕️ Doctor Added</li>

                <li>📄 Lab Report Uploaded</li>

                <li>💰 Payment Received</li>

            </ul>

        </div>

    );

}

export default RecentActivity;