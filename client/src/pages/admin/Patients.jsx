// File: client/src/pages/admin/Patients.jsx

import { useEffect, useState } from "react";

import PatientSearch from "../../components/admin/patients/PatientSearch";
import PatientTable from "../../components/admin/patients/PatientTable";
import AddPatientModal from "../../components/admin/patients/AddPatientModal";
import ViewPatientModal from "../../components/admin/patients/ViewPatientModal";
import EditPatientModal from "../../components/admin/patients/EditPatientModal";

import {
    getAllPatients,
    createPatient,
    updatePatient,
    deletePatient as deletePatientApi
} from "../../api/patientApi";

import "./Patients.css";

function Patients() {

    const [search, setSearch] = useState("");
    const [patients, setPatients] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [editingPatient, setEditingPatient] = useState(null);

    const loadPatients = async () => {
    try {

        const patientsData = await getAllPatients();

        setPatients(patientsData);

    } catch (error) {

        console.error("Failed to load patients", error);

        setPatients([]);

    } finally {

        setLoading(false);

    }
};

useEffect(() => {
    (async () => {
        await loadPatients();
    })();
}, []);

    const filteredPatients = patients.filter((patient) => {

        const name = patient.name || "";
        const phone = patient.phone || "";

        return (

            name.toLowerCase().includes(search.toLowerCase()) ||

            phone.includes(search)

        );

    });

   const addPatient = async (formData) => {

    try {

        await createPatient(formData);

        await loadPatients();

        setShowModal(false);

    } catch (error) {

        console.error(error);

    }

};

    const updatePatientData = async (id, formData) => {
    try {

        console.log("Updating patient:", id);

        const response = await updatePatient(id, formData);

        console.log(response);

        await loadPatients();

        setEditingPatient(null);

    } catch (error) {

        console.error(error.response?.data || error);

    }
};

    const deletePatientData = async (id) => {

    if (!window.confirm("Delete this patient?")) return;

    try {

        await deletePatientApi(id);

        await loadPatients();

    } catch (error) {

        console.error(error);

    }

};

    if (loading) {

        return (

            <div
                style={{
                    color: "white",
                    padding: "30px"
                }}
            >

                Loading Patients...

            </div>

        );

    }

    return (

        <div className="patients-page">

            <div className="patients-header">

                <div>

                    <h2>
                        Patients Management 👥
                    </h2>

                    <p>
                        Manage hospital patients
                    </p>

                </div>

            </div>

            <PatientSearch

                search={search}

                setSearch={setSearch}

                setShowModal={setShowModal}

            />

            <PatientTable

                patients={filteredPatients}

                onView={setSelectedPatient}

                onEdit={setEditingPatient}

                onDelete={deletePatientData}

            />

            {

                showModal && (

                    <AddPatientModal

                        closeModal={() => setShowModal(false)}

                        addPatient={addPatient}

                    />

                )

            }

            {

                selectedPatient && (

                    <ViewPatientModal

                        patient={selectedPatient}

                        closeModal={() =>

                            setSelectedPatient(null)

                        }

                    />

                )

            }

            {

                editingPatient && (

                    <EditPatientModal

                        patient={editingPatient}
                        addPatient={async (formData) =>
                            updatePatientData(editingPatient.id, formData)
}
                        closeModal={() => setEditingPatient(null)

                        }

                    />

                )

            }

        </div>

    );

}

export default Patients;