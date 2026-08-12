// File: src/controllers/medicalRecordController.js

import * as medicalRecordService from "../services/medicalRecordService.js";



// CREATE
export const createMedicalRecord = async (req, res, next) => {

    try {

        const record =
            await medicalRecordService.createMedicalRecord(req.body);

        return res.status(201).json({
            success: true,
            message: "Medical record created successfully.",
            data: record
        });

    } catch (error) {

        switch (error.message) {

            case "PATIENT_NOT_FOUND":
                return res.status(404).json({
                    success: false,
                    message: "Patient not found."
                });

            case "CONSULTATION_NOT_FOUND":
                return res.status(404).json({
                    success: false,
                    message: "Consultation not found."
                });

            default:
                next(error);

        }

    }

};




// GET ALL
export const getMedicalRecords = async (req, res, next) => {

    try {

        const records =
            await medicalRecordService.getMedicalRecords();

        return res.status(200).json({
            success: true,
            data: records
        });

    } catch (error) {

        next(error);

    }

};




// GET BY ID
export const getMedicalRecordById = async (req, res, next) => {

    try {

        const record =
            await medicalRecordService.getMedicalRecordById(
                req.params.id
            );

        return res.status(200).json({
            success: true,
            data: record
        });

    } catch (error) {

        switch (error.message) {

            case "MEDICAL_RECORD_NOT_FOUND":
                return res.status(404).json({
                    success: false,
                    message: "Medical record not found."
                });

            default:
                next(error);

        }

    }

};




// GET BY PATIENT
export const getMedicalRecordsByPatient = async (req, res, next) => {

    try {

        const records =
            await medicalRecordService.getMedicalRecordsByPatient(
                req.params.patient_id
            );

        return res.status(200).json({
            success: true,
            data: records
        });

    } catch (error) {

        switch (error.message) {

            case "PATIENT_NOT_FOUND":
                return res.status(404).json({
                    success: false,
                    message: "Patient not found."
                });

            default:
                next(error);

        }

    }

};




// UPDATE
export const updateMedicalRecord = async (req, res, next) => {

    try {

        const record =
            await medicalRecordService.updateMedicalRecord(
                req.params.id,
                req.body
            );

        return res.status(200).json({
            success: true,
            message: "Medical record updated successfully.",
            data: record
        });

    } catch (error) {

        switch (error.message) {

            case "MEDICAL_RECORD_NOT_FOUND":
                return res.status(404).json({
                    success: false,
                    message: "Medical record not found."
                });

            case "CONSULTATION_NOT_FOUND":
                return res.status(404).json({
                    success: false,
                    message: "Consultation not found."
                });

            default:
                next(error);

        }

    }

};




// DELETE
export const deleteMedicalRecord = async (req, res, next) => {

    try {

        await medicalRecordService.deleteMedicalRecord(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "Medical record deleted successfully."
        });

    } catch (error) {

        switch (error.message) {

            case "MEDICAL_RECORD_NOT_FOUND":
                return res.status(404).json({
                    success: false,
                    message: "Medical record not found."
                });

            default:
                next(error);

        }

    }

};