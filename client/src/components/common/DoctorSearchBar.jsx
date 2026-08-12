// File: client/src/components/common/DoctorSearchBar.jsx

import "./DoctorSearchBar.css";

export default function DoctorSearchBar({
    search,
    setSearch
}) {

    return (

        <div className="doctor-search-bar">

            <input
                type="text"
                placeholder="🔍 Search patient, department, status..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

        </div>

    );

}