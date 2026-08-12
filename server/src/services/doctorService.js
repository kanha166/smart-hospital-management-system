// File: src/services/doctorService.js

import bcrypt from "bcrypt";

import User from "../models/User.js";
import Doctor from "../models/Doctor.js";

// CREATE DOCTOR (Admin)
export const createDoctor = async (doctorData) => {

    const {
        name,
        email,
        password,
        phone,
        gender,
        date_of_birth,
        address,
        emergency_contact,
        department_id,
        specialization,
        qualification,
        doctor_image,
        experience
    } = doctorData;

    const existingUser = await User.findByEmail(email);

    if (existingUser) {
        throw new Error("EMAIL_ALREADY_EXISTS");
    }

    const password_hash = await bcrypt.hash(password, 12);

    const user = await User.create({
        name,
        email,
        password_hash,
        role: "doctor",
        phone,
        gender,
        date_of_birth,
        address,
        emergency_contact
    });

    const doctor = await Doctor.create({
        user_id: user.id,
        department_id,
        specialization,
        qualification,
        doctor_image,
        experience
    });

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        doctor
    };

};

// GET ALL DOCTORS
export const getDoctors = async () => {

    return await Doctor.findAll();

};

// GET DOCTOR BY ID
export const getDoctorById = async (id) => {

    const doctor = await Doctor.findById(id);

    if (!doctor) {
        throw new Error("DOCTOR_NOT_FOUND");
    }

    return doctor;

};

// UPDATE DOCTOR
export const updateDoctor = async (id, data) => {

    const doctor = await Doctor.findById(id);

    if (!doctor) {
        throw new Error("DOCTOR_NOT_FOUND");
    }

    await User.update(doctor.user_id, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        date_of_birth: data.date_of_birth,
        address: data.address,
        emergency_contact: data.emergency_contact
    });

    await Doctor.update(id, {
        department_id: data.department_id,
        specialization: data.specialization,
        qualification: data.qualification,
        doctor_image: data.doctor_image,
        experience: data.experience
    });

    return await Doctor.findById(id);

};

// DELETE DOCTOR
export const deleteDoctor = async (id) => {

    const doctor = await Doctor.findById(id);

    if (!doctor) {
        throw new Error("DOCTOR_NOT_FOUND");
    }

    await Doctor.delete(id);

};

export const getDoctorsByDepartment = async (departmentId) => {

    return await Doctor.findByDepartment(departmentId);

};