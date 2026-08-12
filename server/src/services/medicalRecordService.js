// File: src/services/medicalRecordService.js

import MedicalRecord from "../models/MedicalRecord.js";
import Patient from "../models/Patient.js";
import Consultation from "../models/Consultation.js";



// CREATE MEDICAL RECORD
export const createMedicalRecord = async (data) => {

    const {
        patient_id,
        consultation_id
    } = data;


    // Check patient exists
    const patient = await Patient.findById(patient_id);

    if (!patient) {
        throw new Error("PATIENT_NOT_FOUND");
    }


    // Consultation is optional
    if (consultation_id) {

        const consultation =
            await Consultation.findById(consultation_id);

        if (!consultation) {
            throw new Error("CONSULTATION_NOT_FOUND");
        }

    }


    return await MedicalRecord.create(data);

};




// GET ALL MEDICAL RECORDS
export const getMedicalRecords = async () => {

    return await MedicalRecord.findAll();

};




// GET MEDICAL RECORD BY ID
export const getMedicalRecordById = async (id) => {

    const record =
        await MedicalRecord.findById(id);

    if (!record) {
        throw new Error("MEDICAL_RECORD_NOT_FOUND");
    }

    return record;

};




// GET MEDICAL RECORDS BY PATIENT
export const getMedicalRecordsByPatient = async (patient_id) => {

    const patient =
        await Patient.findById(patient_id);

    if (!patient) {
        throw new Error("PATIENT_NOT_FOUND");
    }

    return await MedicalRecord.findByPatientId(patient_id);

};




// UPDATE MEDICAL RECORD
export const updateMedicalRecord = async (
    id,
    data
) => {

    const record =
        await MedicalRecord.findById(id);

    if (!record) {
        throw new Error("MEDICAL_RECORD_NOT_FOUND");
    }


    if (data.consultation_id) {

        const consultation =
            await Consultation.findById(
                data.consultation_id
            );

        if (!consultation) {
            throw new Error("CONSULTATION_NOT_FOUND");
        }

    }


    return await MedicalRecord.update(
        id,
        data
    );

};




// DELETE MEDICAL RECORD
export const deleteMedicalRecord = async (id) => {

    const record =
        await MedicalRecord.findById(id);

    if (!record) {
        throw new Error("MEDICAL_RECORD_NOT_FOUND");
    }

    await MedicalRecord.delete(id);

};