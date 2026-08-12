import "../../common/SearchBar.css";

function AppointmentSearch({

    search,

    setSearch,

    setShowModal

}){

    return(

        <div className="search-bar">

            <input

                type="text"

                placeholder="🔍 Search patient, doctor or department..."

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

            />

            <button

                onClick={()=>setShowModal(true)}

            >

                + Add Appointment

            </button>

        </div>

    );

}

export default AppointmentSearch;