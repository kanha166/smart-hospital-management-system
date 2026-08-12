// File: src/components/dashboard/cards/StatCard.jsx

import "./StatCard.css";

function StatCard({

    title,

    value,

    icon,

    color,

    progress,

    change

}) {

    return (

        <div className="stat-card">

            <div className="stat-header">

                <div
                    className="stat-icon"
                    style={{
                        background: color
                    }}
                >
                    {icon}
                </div>

                <span
                    className={`stat-change ${
                        change.startsWith("+")
                            ? "positive"
                            : "negative"
                    }`}
                >
                    {change}
                </span>

            </div>

            <h4>{title}</h4>

            <h2>{value}</h2>

            <div className="progress-container">

                <div
                    className="progress-fill"
                    style={{
                        width: `${progress}%`,
                        background: color
                    }}
                />

            </div>

            <small>

                {progress}% this month

            </small>

        </div>

    );

}

export default StatCard;