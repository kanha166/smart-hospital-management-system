import "./TodaySchedule.css";
import "./DashboardWidgets.css";

function TodaySchedule({

    schedule = []

}) {

    return (

        <div className="today-card">

            <h3>Today's Schedule</h3>

            <div className="today-list">

                {

                    schedule.map((item, index) => (

                        <div
                            key={index}
                            className="today-item"
                        >

                            <div className="today-time">

                                {item.appointment_time}

                            </div>

                            <div className="today-info">

                                <h4>

                                    {item.patient_name}

                                </h4>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default TodaySchedule;