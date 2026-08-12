// File: server/src/app.js

import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import { globalErrorHandler } from "./middleware/errorHandler.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import consultationRoutes from "./routes/consultationRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import labReportRoutes from "./routes/labReportRoutes.js";
import medicalRecordRoutes from "./routes/medicalRecordRoutes.js";
import pharmacyRoutes from "./routes/pharmacyRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import path from "path";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// Health check
app.get("/", (req, res) => {
    res.json({
        message: "Smart Hospital API Running"
    });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/lab-reports", labReportRoutes);
app.use("/api/medical-records", medicalRecordRoutes);
app.use("/api/pharmacy", pharmacyRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use(
    "/uploads",
    express.static(
        path.join(process.cwd(), "uploads")
    )
);

// Global error handler (must be last)
app.use(globalErrorHandler);

export default app;