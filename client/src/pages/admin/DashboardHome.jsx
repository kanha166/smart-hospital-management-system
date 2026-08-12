// File: src/pages/admin/DashboardHome.jsx

import { useEffect, useState } from "react";
import {
    Users,
    UserRound,
    CalendarDays,
} from "lucide-react";

import StatCard from "../../components/dashboard/cards/StatCard";
import WeeklyAppointmentsChart from "../../components/dashboard/charts/WeeklyAppointmentsChart";
import TodaySchedule from "../../components/dashboard/widgets/TodaySchedule";
import RecentAppointments from "../../components/dashboard/widgets/RecentAppointments";
import DepartmentStats from "../../components/dashboard/widgets/DepartmentStats";
import TopDoctors from "../../components/dashboard/widgets/TopDoctors";
import LowStockMedicines from "../../components/dashboard/widgets/LowStockMedicines";

import { getAdminDashboard } from "../../services/dashboardService";

import "./DashboardHome.css";

export default function DashboardHome() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

    const fetchDashboard = async () => {

        try {

            const data = await getAdminDashboard();

            setDashboard(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    fetchDashboard();

}, []);
    if (loading) {
        return (
            <div style={{ color: "white", padding: "30px" }}>
                Loading Dashboard...
            </div>
        );
    }

    if (!dashboard) {
        return (
            <div style={{ color: "white", padding: "30px" }}>
                Failed to load dashboard.
            </div>
        );
    }

    const cards = [
        {
            title: "Patients",
            value: dashboard.totalPatients,
            icon: <Users size={34} />,
            color: "#3b82f6",
        },
        {
            title: "Doctors",
            value: dashboard.totalDoctors,
            icon: <UserRound size={34} />,
            color: "#06b6d4",
        },
        {
            title: "Appointments",
            value: dashboard.totalAppointments,
            icon: <CalendarDays size={34} />,
            color: "#22c55e",
        },
    ];
    return (
        <>
            <div className="dashboard-cards">
                {cards.map((card, index) => (
                    <StatCard
                        key={index}
                        title={card.title}
                        value={card.value}
                        icon={card.icon}
                        color={card.color}
                        progress={80 - index * 10}
                        change={
                            index === 3
                                ? "-3%"
                                : `+${12 - index}%`
                        }
                    />
                ))}
            </div>

            <div className="dashboard-grid">
                <WeeklyAppointmentsChart
    data={dashboard.weeklyAppointments}
/>
                <TodaySchedule
    schedule={dashboard.todaySchedule}
/>
            </div>

            <div className="dashboard-bottom">
                <RecentAppointments
    appointments={dashboard.recentAppointments}
/>
            </div>

            <div className="dashboard-last">
                <DepartmentStats 
                    departments={dashboard.departmentStats}
                />
                <TopDoctors 
                    doctors={dashboard.topDoctors}
                />
                <LowStockMedicines
    medicines={dashboard.lowStockMedicines}
/>
            </div>
        </>
    );
}