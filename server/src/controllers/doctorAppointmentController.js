import * as doctorAppointmentService
    from "../services/doctorAppointmentService.js";


// GET MY APPOINTMENTS

export const getMyDoctorAppointments = async (
    req,
    res,
    next
) => {

    try {

        const appointments =
            await doctorAppointmentService
                .getMyDoctorAppointments(
                    req.user.id
                );

        return res.status(200).json({

            success: true,

            data: appointments

        });

    } catch (error) {

        next(error);

    }

};


// UPDATE PATIENT-BOOKED APPOINTMENT

export const updateDoctorAppointment = async (
    req,
    res,
    next
) => {

    try {

        const appointment =
            await doctorAppointmentService
                .updateDoctorAppointment(

                    req.user.id,

                    req.params.id,

                    req.body

                );

        return res.status(200).json({

            success: true,

            message:
                "Appointment updated successfully.",

            data: appointment

        });

    } catch (error) {

        if (
            error.message ===
            "APPOINTMENT_NOT_FOUND"
        ) {

            return res.status(404).json({

                success: false,

                message: "Appointment not found."

            });

        }


        if (
            error.message ===
            "APPOINTMENT_UPDATE_NOT_ALLOWED"
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "This appointment cannot be modified."

            });

        }


        next(error);

    }

};