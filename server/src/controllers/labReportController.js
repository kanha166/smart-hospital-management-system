// File: src/controllers/labReportController.js

import * as labReportService from "../services/labReportService.js";

// CREATE LAB REPORT
export const createLabReport = async (
    req,
    res,
    next
) => {

    try {

        const report =
            await labReportService.createLabReport({

                ...req.body,

                report_file:
                    req.file
                    ? req.file.path
                    : null

            });


        return res.status(201).json({

            success: true,

            message: "Lab report created successfully.",

            data: report

        });


    } catch (error) {

        switch (error.message) {

            case "PATIENT_NOT_FOUND":
                return res.status(404).json({
                    success: false,
                    message: "Patient not found."
                });


            case "TEST_NAME_REQUIRED":
                return res.status(400).json({
                    success: false,
                    message: "Test name is required."
                });


            case "INVALID_STATUS":
                return res.status(400).json({
                    success: false,
                    message: "Status must be either 'pending' or 'completed'."
                });


            default:
                next(error);

        }

    }

};

// GET ALL LAB REPORTS
export const getLabReports = async (
    req,
    res,
    next
) => {

    try {

        const reports =
            await labReportService.getLabReports();


        return res.status(200).json({

            success: true,

            data: reports

        });


    } catch (error) {

        next(error);

    }

};

// GET LAB REPORT BY ID
export const getLabReportById = async (
    req,
    res,
    next
) => {

    try {

        const report =
            await labReportService.getLabReportById(
                req.params.id
            );


        return res.status(200).json({

            success: true,

            data: report

        });


    } catch (error) {


        if (error.message === "LAB_REPORT_NOT_FOUND") {

            return res.status(404).json({

                success: false,

                message: "Lab report not found."

            });

        }


        next(error);

    }

};

// GET LAB REPORTS BY PATIENT
export const getLabReportsByPatient = async (
    req,
    res,
    next
) => {

    try {

        const reports =
            await labReportService.getLabReportsByPatient(
                req.params.patient_id
            );


        return res.status(200).json({

            success: true,

            data: reports

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

// UPDATE LAB REPORT
export const updateLabReport = async (
    req,
    res,
    next
) => {

    try {

        const report =
            await labReportService.updateLabReport(

                req.params.id,

                {

                    ...req.body,

                    report_file:
                        req.file
                        ? req.file.path
                        : null

                }

            );


        return res.status(200).json({

            success: true,

            message: "Lab report updated successfully.",

            data: report

        });


    } catch (error) {


        switch (error.message) {


            case "LAB_REPORT_NOT_FOUND":

                return res.status(404).json({

                    success: false,

                    message: "Lab report not found."

                });



            case "TEST_NAME_REQUIRED":

                return res.status(400).json({

                    success: false,

                    message: "Test name is required."

                });

            case "INVALID_STATUS":

                return res.status(400).json({

                    success: false,

                    message: "Status must be either 'pending' or 'completed'."

                });

            default:

                next(error);

        }

    }

};

// DELETE LAB REPORT
export const deleteLabReport = async (
    req,
    res,
    next
) => {

    try {

        await labReportService.deleteLabReport(
            req.params.id
        );


        return res.status(200).json({

            success: true,

            message: "Lab report deleted successfully."

        });


    } catch (error) {


        if (error.message === "LAB_REPORT_NOT_FOUND") {

            return res.status(404).json({

                success: false,

                message: "Lab report not found."

            });

        }
        next(error);

    }

};

// GET MY LAB REPORTS (PATIENT)
export const getMyLabReports = async (req, res, next) => {

    try {

        const reports =
            await labReportService.getMyLabReports(
                req.user.id
            );

        return res.status(200).json({

            success: true,
            data: reports

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