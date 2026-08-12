// File: src/services/labReportService.js

import LabReport from "../models/LabReport.js";
import Patient from "../models/Patient.js";

// CREATE LAB REPORT
export const createLabReport = async (data) => {

    const {
        patient_id,
        test_name,
        status
    } = data;

    // Check patient exists
    const patient = await Patient.findById(
        patient_id
    );

    if (!patient) {
        throw new Error(
            "PATIENT_NOT_FOUND"
        );
    }

    // Test name validation
    if (
        !test_name ||
        !test_name.trim()
    ) {
        throw new Error(
            "TEST_NAME_REQUIRED"
        );
    }

    // Status validation
    if (
        !["pending", "completed"].includes(
            status
        )
    ) {
        throw new Error(
            "INVALID_STATUS"
        );
    }


    return await LabReport.create(data);

};

// GET ALL LAB REPORTS
export const getLabReports = async () => {

    return await LabReport.findAll();

};

// GET LAB REPORT BY ID
export const getLabReportById = async (id) => {

    const report =
        await LabReport.findById(id);

    if (!report) {
        throw new Error(
            "LAB_REPORT_NOT_FOUND"
        );
    }

    return report;

};

// GET LAB REPORTS BY PATIENT
export const getLabReportsByPatient =
async (patient_id) => {

    const patient =
        await Patient.findById(
            patient_id
        );

    if (!patient) {
        throw new Error(
            "PATIENT_NOT_FOUND"
        );
    }

    return await LabReport.findByPatientId(
        patient_id
    );

};

// UPDATE LAB REPORT
export const updateLabReport =
async (id, data) => {

    const report =
        await LabReport.findById(id);

    if (!report) {
        throw new Error(
            "LAB_REPORT_NOT_FOUND"
        );
    }

    if (
        !data.test_name ||
        !data.test_name.trim()
    ) {
        throw new Error(
            "TEST_NAME_REQUIRED"
        );
    }

    if (
        !["pending", "completed"].includes(
            data.status
        )
    ) {
        throw new Error(
            "INVALID_STATUS"
        );
    }

    return await LabReport.update(
        id,
        data
    );

};

// DELETE LAB REPORT
export const deleteLabReport =
async (id) => {

    const report =
        await LabReport.findById(id);

    if (!report) {
        throw new Error(
            "LAB_REPORT_NOT_FOUND"
        );
    }

    await LabReport.delete(id);

};

// GET MY LAB REPORTS (PATIENT)
export const getMyLabReports = async (userId) => {

    const patient =
        await Patient.findByUserId(userId);

    if (!patient) {

        throw new Error(
            "PATIENT_NOT_FOUND"
        );

    }

    return await LabReport.findByPatientId(
        patient.id
    );

};