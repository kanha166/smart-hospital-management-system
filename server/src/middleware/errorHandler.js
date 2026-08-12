// File: src/middleware/errorHandler.js

export const globalErrorHandler = (error, req, res, next) => {

    console.error(error);


    // PostgreSQL duplicate key error
    if (error.code === "23505") {

        return res.status(409).json({
            success: false,
            message: "Duplicate record already exists."
        });

    }


    // PostgreSQL foreign key violation
    if (error.code === "23503") {

        return res.status(400).json({
            success: false,
            message: "Invalid reference data provided."
        });

    }


    // PostgreSQL invalid data error
    if (error.code === "22P02") {

        return res.status(400).json({
            success: false,
            message: "Invalid data format."
        });

    }


    // Validation errors
    if (error.name === "ValidationError") {

        return res.status(422).json({
            success: false,
            message: "Validation failed.",
            errors: error.errors || []
        });

    }


    // Custom application errors
    if (error.statusCode) {

        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        });

    }


    // Default server error
    return res.status(500).json({
        success: false,
        message: "Internal server error."
    });

};