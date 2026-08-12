// File: src/components/dashboard/widgets/QuickActions.jsx

import "./DashboardWidgets.css";

function QuickActions(){

    return(

        <div className="widget-card">

            <h3>Quick Actions</h3>

            <div className="quick-actions">

                <button>
                    ➕ Patient
                </button>

                <button>
                    👨‍⚕️ Doctor
                </button>

                <button>
                    📅 Appointment
                </button>

                <button>
                    💊 Medicine
                </button>

                <button>
                    📄 Report
                </button>

            </div>

        </div>

    );

}

export default QuickActions;