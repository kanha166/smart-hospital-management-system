// File: src/controllers/patientController.js

import * as patientService from "../services/patientService.js";

export const getMyAppointments = async (req, res, next) => {

    try {

        const appointments =
    await patientService.getMyAppointments(req.user.id);

        res.status(200).json({
            success: true,
            data: appointments,
        });

    } catch (error) {

        next(error);

    }

};

// CREATE PATIENT
export const createPatient = async (req, res, next) => {

    try {

        const result =
            await patientService.createPatient({

                ...req.body,

                profile_image:
                    req.file
                    ? req.file.path
                    : null

            });


        return res.status(201).json({

            success: true,

            message: "Patient created successfully.",

            data: result

        });


    } catch (error) {


        console.error(
            "CREATE PATIENT ERROR:",
            error
        );


        if (error.message === "EMAIL_ALREADY_EXISTS") {

            return res.status(409).json({

                success: false,

                message: "Email already exists."

            });

        }


        next(error);

    }

};




// GET ALL PATIENTS
export const getPatients = async (req, res, next) => {

    try {

        const patients =
            await patientService.getPatients();


        return res.status(200).json({

            success: true,

            data: patients

        });


    } catch (error) {

        next(error);

    }

};




// GET PATIENT BY ID
export const getPatientById = async (req, res, next) => {

    try {

        const patient =
            await patientService.getPatientById(
                req.params.id
            );


        return res.status(200).json({

            success: true,

            data: patient

        });


    } catch (error) {


        if (error.message === "PATIENT_NOT_FOUND") {

            return res.status(404).json({

                success: false,

                message: "Patient not found."

            });

        }


        next(error);

    }

};

// ==========================
// GET MY PROFILE (Patient)
// ==========================

export const getMyProfile = async (req, res, next) => {

    try {

        const patient =
            await patientService.getMyProfile(
                req.user.id
            );

        const profileCompleted = Boolean(

            patient.phone &&
            patient.date_of_birth &&
            patient.gender &&
            patient.blood_group &&
            patient.address &&
            patient.emergency_contact

        );

        return res.status(200).json({

            success: true,

            data: {

                ...patient,

                profileCompleted

            }

        });

    } catch (error) {

        if (error.message === "PATIENT_NOT_FOUND") {

            return res.status(404).json({

                success: false,

                message: "Patient profile not found."

            });

        }

        next(error);

    }

};

// ==========================
// UPDATE MY PROFILE (Patient)
// ==========================

export const updateMyProfile = async (req, res, next) => {

    try {

        const patient =
            await patientService.updateMyProfile(

                req.user.id,

                {

                    ...req.body,

                    profile_image:
                        req.file
                            ? req.file.path
                            : null

                }

            );

        return res.status(200).json({

            success: true,

            message: "Profile updated successfully.",

            data: patient

        });

    } catch (error) {

        if (error.message === "PATIENT_NOT_FOUND") {

            return res.status(404).json({

                success: false,

                message: "Patient profile not found."

            });

        }

        next(error);

    }

};


// UPDATE PATIENT
export const updatePatient = async (req, res, next) => {

    try {


        const patient =
            await patientService.updatePatient(

                req.params.id,

                {

                    ...req.body,

                    profile_image:
                        req.file
                        ? req.file.path
                        : null

                }

            );


        return res.status(200).json({

            success: true,

            message: "Patient updated successfully.",

            data: patient

        });


    } catch (error) {


        if (error.message === "PATIENT_NOT_FOUND") {


            return res.status(404).json({

                success: false,

                message: "Patient not found."

            });

        }


        next(error);

    }

};




// DELETE PATIENT
export const deletePatient = async (req, res, next) => {

    try {


        await patientService.deletePatient(
            req.params.id
        );


        return res.status(200).json({

            success: true,

            message: "Patient deleted successfully."

        });


    } catch (error) {


        if (error.message === "PATIENT_NOT_FOUND") {


            return res.status(404).json({

                success: false,

                message: "Patient not found."

            });

        }


        next(error);

    }

};