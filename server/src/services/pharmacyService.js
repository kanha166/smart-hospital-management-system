// File: src/services/pharmacyService.js

import Pharmacy from "../models/Pharmacy.js";

// CREATE MEDICINE
export const createMedicine = async (data) => {

    const medicine = await Pharmacy.create(data);

    return medicine;

};

// GET ALL MEDICINES
export const getMedicines = async () => {

    return await Pharmacy.findAll();

};

// GET MEDICINE BY ID
export const getMedicineById = async (id) => {

    const medicine = await Pharmacy.findById(id);

    if (!medicine) {
        throw new Error("MEDICINE_NOT_FOUND");
    }

    return medicine;

};

// UPDATE MEDICINE
export const updateMedicine = async (
    id,
    data
) => {

    const medicine = await Pharmacy.findById(id);

    if (!medicine) {
        throw new Error("MEDICINE_NOT_FOUND");
    }

    return await Pharmacy.update(id, data);

};

// DELETE MEDICINE
export const deleteMedicine = async (id) => {

    const medicine = await Pharmacy.findById(id);

    if (!medicine) {
        throw new Error("MEDICINE_NOT_FOUND");
    }

    await Pharmacy.delete(id);

};