// File: src/services/dashboardService.js

import pool from "../config/database.js";


// ADMIN DASHBOARD DATA
export const getAdminDashboard = async () => {

    const [
        patients,
        doctors,
        departments,
        appointments,
        completedAppointments,
        consultations,
        invoices,
        revenue,
        pendingPayments,
        medicines,
        lowStock,
        pendingReports
    ] = await Promise.all([


        pool.query(
            `SELECT COUNT(*) 
             FROM patients`
        ),


        pool.query(
            `SELECT COUNT(*) 
             FROM doctors`
        ),


        pool.query(
            `SELECT COUNT(*) 
             FROM departments`
        ),


        pool.query(
            `SELECT COUNT(*) 
             FROM appointments`
        ),


        pool.query(
            `SELECT COUNT(*) 
             FROM appointments
             WHERE status='completed'`
        ),


        pool.query(
            `SELECT COUNT(*) 
             FROM consultations`
        ),


        pool.query(
            `SELECT COUNT(*) 
             FROM invoices`
        ),


        pool.query(
            `SELECT COALESCE(SUM(amount),0)
             FROM invoices
             WHERE payment_status='paid'`
        ),


        pool.query(
            `SELECT COUNT(*)
             FROM invoices
             WHERE payment_status='pending'`
        ),


        pool.query(
            `SELECT COUNT(*)
             FROM pharmacy`
        ),


        pool.query(
            `SELECT COUNT(*)
             FROM pharmacy
             WHERE stock_quantity < 50`
        ),


        pool.query(
            `SELECT COUNT(*)
             FROM lab_reports
             WHERE status='pending'`
        )

    ]);

    const weeklyAppointments = await pool.query(`
SELECT
TO_CHAR(appointment_date,'Dy') AS day,
COUNT(*)::int AS appointments
FROM appointments
GROUP BY appointment_date
ORDER BY appointment_date
LIMIT 7;
`);

const todaySchedule = await pool.query(`
SELECT
a.appointment_time,
u.name AS patient_name
FROM appointments a
JOIN patients p ON a.patient_id=p.id
JOIN users u ON p.user_id=u.id
WHERE appointment_date=CURRENT_DATE
ORDER BY appointment_time;
`);

const recentAppointments = await pool.query(`
SELECT
a.id,
u.name AS patient_name,
a.appointment_date,
a.appointment_time
FROM appointments a
JOIN patients p ON a.patient_id=p.id
JOIN users u ON p.user_id=u.id
ORDER BY a.created_at DESC
LIMIT 5;
`);

const departmentStats = await pool.query(`
SELECT
d.name,
COUNT(doc.id)::int AS total_doctors
FROM departments d
LEFT JOIN doctors doc
ON d.id = doc.department_id
GROUP BY d.id
ORDER BY total_doctors DESC;
`);

const topDoctors = await pool.query(`
SELECT
u.name,
COUNT(a.id)::int AS total_appointments
FROM doctors d
JOIN users u
ON d.user_id=u.id
LEFT JOIN appointments a
ON d.id=a.doctor_id
GROUP BY u.name
ORDER BY total_appointments DESC
LIMIT 5;
`);

const lowStockMedicines = await pool.query(`
SELECT
medicine_name,
stock_quantity
FROM pharmacy_inventory
ORDER BY stock_quantity ASC
limit 10;
`);
    console.log(lowStockMedicines.rows);
    return {

    totalPatients: Number(patients.rows[0].count),

    totalDoctors: Number(doctors.rows[0].count),

    totalDepartments: Number(departments.rows[0].count),

    totalAppointments: Number(appointments.rows[0].count),

    completedAppointments: Number(completedAppointments.rows[0].count),

    totalConsultations: Number(consultations.rows[0].count),

    totalInvoices: Number(invoices.rows[0].count),

    totalRevenue: Number(revenue.rows[0].coalesce),

    pendingPayments: Number(pendingPayments.rows[0].count),

    totalMedicines: Number(medicines.rows[0].count),

    lowStockMedicines: Number(lowStock.rows[0].count),

    pendingLabReports: Number(pendingReports.rows[0].count),

    weeklyAppointments: weeklyAppointments.rows,

    todaySchedule: todaySchedule.rows,

    recentAppointments: recentAppointments.rows,

    departmentStats: departmentStats.rows,

    topDoctors: topDoctors.rows,

    lowStockMedicines: lowStockMedicines.rows,
};

};