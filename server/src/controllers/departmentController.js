// File: src/controllers/departmentController.js

import * as departmentService from "../services/departmentService.js";


// CREATE
export const createDepartment = async (req, res, next) => {

    try {

        const result = await departmentService.createDepartment(req.body);

        return res.status(201).json({
            success: true,
            message: "Department created successfully.",
            data: result
        });

    } catch (error) {

        if (error.message === "DEPARTMENT_ALREADY_EXISTS") {

            return res.status(409).json({
                success: false,
                message: "Department already exists."
            });

        }

        next(error);

    }

};


// GET ALL
export const getDepartments = async (req, res, next) => {

    try {

        const result = await departmentService.getDepartments();

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        next(error);

    }

};


// GET BY ID
export const getDepartmentById = async (req, res, next) => {

    try {

        const result = await departmentService.getDepartmentById(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        if (error.message === "DEPARTMENT_NOT_FOUND") {

            return res.status(404).json({
                success: false,
                message: "Department not found."
            });

        }

        next(error);

    }

};


// UPDATE
export const updateDepartment = async (req, res, next) => {

    try {

        const result = await departmentService.updateDepartment(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Department updated successfully.",
            data: result
        });

    } catch (error) {

        if (error.message === "DEPARTMENT_NOT_FOUND") {

            return res.status(404).json({
                success: false,
                message: "Department not found."
            });

        }

        next(error);

    }

};


// DELETE
export const deleteDepartment = async (req, res, next) => {

    try {

        await departmentService.deleteDepartment(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "Department deleted successfully."
        });

    } catch (error) {

        if (error.message === "DEPARTMENT_NOT_FOUND") {

            return res.status(404).json({
                success: false,
                message: "Department not found."
            });

        }

        next(error);

    }

};