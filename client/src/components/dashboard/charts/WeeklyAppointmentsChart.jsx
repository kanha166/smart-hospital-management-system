import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

import "./WeeklyAppointmentsChart.css";

function WeeklyAppointmentsChart({ data = [] }) {

    return (

        <div className="chart-card">

            <h3>Weekly Appointments</h3>

            <ResponsiveContainer width="100%" height={300}>

                <AreaChart data={data}>

                    <defs>

                        <linearGradient
                            id="appointments"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >

                            <stop
                                offset="5%"
                                stopColor="#3b82f6"
                                stopOpacity={0.8}
                            />

                            <stop
                                offset="95%"
                                stopColor="#3b82f6"
                                stopOpacity={0}
                            />

                        </linearGradient>

                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,.08)"
                    />

                    <XAxis
                        dataKey="day"
                        stroke="#cbd5e1"
                    />

                    <YAxis
                        stroke="#cbd5e1"
                    />

                    <Tooltip />

                    <Area
                        type="monotone"
                        dataKey="appointments"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        fill="url(#appointments)"
                    />

                </AreaChart>

            </ResponsiveContainer>

        </div>

    );

}

export default WeeklyAppointmentsChart;