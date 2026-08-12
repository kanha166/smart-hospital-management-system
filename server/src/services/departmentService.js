// File: src/services/departmentService.js

import Department from "../models/Department.js";


// CREATE
export const createDepartment = async (data) => {

    const existing = await Department.findAll();

    const duplicate = existing.find(
        department =>
            department.name.toLowerCase() === data.name.toLowerCase()
    );

    if (duplicate) {
        throw new Error("DEPARTMENT_ALREADY_EXISTS");
    }

    return await Department.create(data);

};


// GET ALL
export const getDepartments = async () => {

    return await Department.findAll();

};


// GET BY ID
export const getDepartmentById = async (id) => {

    const department = await Department.findById(id);

    if (!department) {
        throw new Error("DEPARTMENT_NOT_FOUND");
    }

    return department;

};


// UPDATE
export const updateDepartment = async (id, data) => {

    const department = await Department.findById(id);

    if (!department) {
        throw new Error("DEPARTMENT_NOT_FOUND");
    }

    return await Department.update(id, data);

};


// DELETE
export const deleteDepartment = async (id) => {

    const department = await Department.findById(id);

    if (!department) {
        throw new Error("DEPARTMENT_NOT_FOUND");
    }

    await Department.delete(id);

};