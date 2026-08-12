import api from "./axios";

// GET APPOINTMENTS FOR LOGGED-IN DOCTOR
export const getMyDoctorAppointments = async () => {

    const response = await api.get(
        "/doctor/appointments"
    );

    return response.data.data;
};


// UPDATE PATIENT-BOOKED APPOINTMENT
export const updateDoctorAppointment = async (
    id,
    data
) => {

    const response = await api.put(
        `/doctor/appointments/${id}`,
        data
    );

    return response.data.data;
};