// File: src/controllers/pharmacyController.js

import * as pharmacyService from "../services/pharmacyService.js";

// CREATE MEDICINE
export const createMedicine = async (req, res, next) => {

    try {

        const medicine =
            await pharmacyService.createMedicine(req.body);

        return res.status(201).json({
            success: true,
            message: "Medicine added successfully.",
            data: medicine
        });

    } catch (error) {

        next(error);

    }

};

// GET ALL MEDICINES
export const getMedicines = async (req, res, next) => {

    try {

        const medicines =
            await pharmacyService.getMedicines();

        return res.status(200).json({
            success: true,
            data: medicines
        });

    } catch (error) {

        next(error);

    }

};

// GET MEDICINE BY ID
export const getMedicineById = async (req, res, next) => {

    try {

        const medicine =
            await pharmacyService.getMedicineById(req.params.id);

        return res.status(200).json({
            success: true,
            data: medicine
        });

    } catch (error) {

        switch (error.message) {

            case "MEDICINE_NOT_FOUND":
                return res.status(404).json({
                    success: false,
                    message: "Medicine not found."
                });

            default:
                next(error);

        }

    }

};

// UPDATE MEDICINE
export const updateMedicine = async (req, res, next) => {

    try {

        const medicine =
            await pharmacyService.updateMedicine(
                req.params.id,
                req.body
            );

        return res.status(200).json({
            success: true,
            message: "Medicine updated successfully.",
            data: medicine
        });

    } catch (error) {

        switch (error.message) {

            case "MEDICINE_NOT_FOUND":
                return res.status(404).json({
                    success: false,
                    message: "Medicine not found."
                });

            default:
                next(error);

        }

    }

};

// DELETE MEDICINE
export const deleteMedicine = async (req, res, next) => {

    try {

        await pharmacyService.deleteMedicine(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Medicine deleted successfully."
        });

    } catch (error) {

        switch (error.message) {

            case "MEDICINE_NOT_FOUND":
                return res.status(404).json({
                    success: false,
                    message: "Medicine not found."
                });

            default:
                next(error);

        }

    }

};