import { useEffect, useState } from "react";

import AppointmentSearch from "../../components/admin/appointments/AppointmentSearch";
import AppointmentTable from "../../components/admin/appointments/AppointmentTable";

import AddAppointmentModal from "../../components/admin/appointments/AddAppointmentModal";
import ViewAppointmentModal from "../../components/admin/appointments/ViewAppointmentModal";
import EditAppointmentModal from "../../components/admin/appointments/EditAppointmentModal";

import {
    getAllAppointments,
    deleteAppointment as deleteAppointmentApi
} from "../../api/appointmentApi";

import "./Appointments.css";

function Appointments() {

    const [appointments, setAppointments] = useState([]);

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const [editingAppointment, setEditingAppointment] = useState(null);

    const loadAppointments = async () => {

        try {

            const data = await getAllAppointments();

            setAppointments(data);

        } catch (err) {

            console.error(err);

        }

    };

    useEffect(() => {

        loadAppointments();

    }, []);

    const filteredAppointments = appointments.filter((appointment) => {

        return (

            appointment.patient_name?.toLowerCase().includes(search.toLowerCase()) ||

            appointment.doctor_name?.toLowerCase().includes(search.toLowerCase()) ||

            appointment.reason?.toLowerCase().includes(search.toLowerCase()) ||

            appointment.status?.toLowerCase().includes(search.toLowerCase())

        );

    });

    const deleteAppointment = async (id) => {

        if (!window.confirm("Delete appointment?")) return;

        await deleteAppointmentApi(id);

        loadAppointments();

    };

    return (

        <div className="appointments-page">

            <div className="appointments-header">

                <div>

                    <h2>Appointments Management 📅</h2>

                    <p>Manage hospital appointments</p>

                </div>

            </div>

            <AppointmentSearch
                search={search}
                setSearch={setSearch}
                setShowModal={setShowModal}
            />

            <AppointmentTable
                appointments={filteredAppointments}
                onView={setSelectedAppointment}
                onEdit={setEditingAppointment}
                onDelete={deleteAppointment}
            />

            {showModal && (

                <AddAppointmentModal
                    closeModal={() => setShowModal(false)}
                    addAppointment={loadAppointments}
                />

            )}

            {selectedAppointment && (

                <ViewAppointmentModal
                    appointment={selectedAppointment}
                    closeModal={() => setSelectedAppointment(null)}
                />

            )}

            {editingAppointment && (

                <EditAppointmentModal
                    appointment={editingAppointment}
                    updateAppointment={loadAppointments}
                    closeModal={() => setEditingAppointment(null)}
                />

            )}

        </div>

    );

}

export default Appointments;