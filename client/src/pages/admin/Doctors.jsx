import { useEffect, useState } from "react";

import {
    getAllDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor as deleteDoctorApi
} from "../../api/doctorApi";

import DoctorSearch from "../../components/admin/doctors/DoctorSearch";
import DoctorTable from "../../components/admin/doctors/DoctorTable";
import AddDoctorModal from "../../components/admin/doctors/AddDoctorModal";
import ViewDoctorModal from "../../components/admin/doctors/ViewDoctorModal";
import EditDoctorModal from "../../components/admin/doctors/EditDoctorModal";

import "./Doctors.css";

function Doctors() {

    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [editingDoctor, setEditingDoctor] = useState(null);

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadDoctors = async () => {

        try {

            const data = await getAllDoctors();

            setDoctors(data);

        } catch (error) {

            console.error(error);

            setDoctors([]);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadDoctors();

    }, []);

    const filteredDoctors = doctors.filter((doctor) => {

        const name = doctor.name || "";
        const department = doctor.department || "";
        const specialization = doctor.specialization || "";
        const phone = doctor.phone || "";

        return (

            name.toLowerCase().includes(search.toLowerCase()) ||

            department.toLowerCase().includes(search.toLowerCase()) ||

            specialization.toLowerCase().includes(search.toLowerCase()) ||

            phone.includes(search)

        );

    });

    const addDoctor = async (formData) => {

        try {

            await createDoctor(formData);

            await loadDoctors();

            setShowModal(false);

        } catch (error) {

            console.error(error);

        }

    };

    const updateDoctorData = async (id, formData) => {

        try {

            await updateDoctor(id, formData);

            await loadDoctors();

            setEditingDoctor(null);

        } catch (error) {

            console.error(error);

        }

    };

    const deleteDoctorData = async (id) => {

        if (!window.confirm("Delete this doctor?")) return;

        try {

            await deleteDoctorApi(id);

            await loadDoctors();

        } catch (error) {

    console.error(error);

    alert(
        error.response?.data?.message ||
        "Delete failed."
    );

}

    };

    if (loading) {

        return (

            <div style={{ color: "white", padding: "30px" }}>

                Loading Doctors...

            </div>

        );

    }

    return (

        <div className="doctors-page">

            <div className="doctors-header">

                <div>

                    <h2>Doctors Management 🩺</h2>

                    <p>Manage hospital doctors</p>

                </div>

            </div>

            <DoctorSearch
                search={search}
                setSearch={setSearch}
                setShowModal={setShowModal}
            />

            <DoctorTable
                doctors={filteredDoctors}
                onView={setSelectedDoctor}
                onEdit={setEditingDoctor}
                onDelete={deleteDoctorData}
            />

            {showModal && (

                <AddDoctorModal
                    closeModal={() => setShowModal(false)}
                    addDoctor={addDoctor}
                />

            )}

            {selectedDoctor && (

                <ViewDoctorModal
                    doctor={selectedDoctor}
                    closeModal={() => setSelectedDoctor(null)}
                />

            )}

            {editingDoctor && (

                <EditDoctorModal
                    doctor={editingDoctor}
                    updateDoctor={(formData) =>
                        updateDoctorData(editingDoctor.id, formData)
                    }
                    closeModal={() => setEditingDoctor(null)}
                />

            )}

        </div>

    );

}

export default Doctors;