// File: src/controllers/doctorController.js

import * as doctorService from "../services/doctorService.js";

// CREATE DOCTOR
export const createDoctor = async (req, res, next) => {
    try {
        const result = await doctorService.createDoctor({
            ...req.body,
            doctor_image: req.file?.path || null

        });

        return res.status(201).json({

            success: true,

            message: "Doctor created successfully.",

            data: result

        });


    } catch (error) {

        console.error("CREATE DOCTOR ERROR:", error);


        if (error.message === "EMAIL_ALREADY_EXISTS") {

            return res.status(409).json({

                success: false,

                message: "Email already exists."

            });

        }


        next(error);

    }

};




// GET ALL DOCTORS
export const getDoctors = async (req, res, next) => {

    try {

        const doctors = await doctorService.getDoctors();


        return res.status(200).json({

            success: true,

            data: doctors

        });


    } catch (error) {

        next(error);

    }

};

// GET DOCTOR BY ID
export const getDoctorById = async (req, res, next) => {

    try {

        const doctor = await doctorService.getDoctorById(
            req.params.id
        );


        return res.status(200).json({

            success: true,

            data: doctor

        });


    } catch (error) {


        if (error.message === "DOCTOR_NOT_FOUND") {

            return res.status(404).json({

                success: false,

                message: "Doctor not found."

            });

        }


        next(error);

    }

};

// UPDATE DOCTOR
export const updateDoctor = async (req, res, next) => {

    try {

        const doctor = await doctorService.updateDoctor(

            req.params.id,

            {

                ...req.body,

                doctor_image: req.file?.path

            }

        );


        return res.status(200).json({

            success: true,

            message: "Doctor updated successfully.",

            data: doctor

        });


    } catch (error) {


        if (error.message === "DOCTOR_NOT_FOUND") {

            return res.status(404).json({

                success: false,

                message: "Doctor not found."

            });

        }


        next(error);

    }

};

// DELETE DOCTOR
export const deleteDoctor = async (req, res, next) => {

    try {

        await doctorService.deleteDoctor(
            req.params.id
        );


        return res.status(200).json({

            success: true,

            message: "Doctor deleted successfully."

        });


    } catch (error) {


        if (error.message === "DOCTOR_NOT_FOUND") {

            return res.status(404).json({

                success: false,

                message: "Doctor not found."

            });

        }

        if (error.code === "23503") {

    return res.status(400).json({

        success: false,

        message:
            "Cannot delete doctor because appointments exist."

    });

}
        next(error);

    }

};

export const getDoctorsByDepartment = async (req, res, next) => {

    try {

        const doctors =
            await doctorService.getDoctorsByDepartment(
                req.params.departmentId
            );

        return res.status(200).json({

            success: true,
            data: doctors

        });

    } catch (error) {

        next(error);

    }

};