// File: src/middleware/uploadMiddleware.js

import multer from "multer";
import path from "path";


// Storage configuration

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(
            null,
            "uploads/"
        );

    },


    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            file.originalname;

        cb(
            null,
            uniqueName
        );

    }

});



// File filter

const fileFilter = (req, file, cb) => {


    const allowedTypes = [

        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf"

    ];


    if (
        allowedTypes.includes(file.mimetype)
    ) {

        cb(null, true);

    } else {

        cb(
            new Error(
                "Only JPG, PNG and PDF files are allowed."
            ),
            false
        );

    }

};



// Upload middleware

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: 5 * 1024 * 1024

    }

});


export default upload;