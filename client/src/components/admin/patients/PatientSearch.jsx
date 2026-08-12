import "../../common/SearchBar.css";

function PatientSearch({

    search,

    setSearch,

    setShowModal

}){

    return(

        <div className="search-bar">

            <input

                type="text"

                placeholder="🔍 Search patient by name, email or phone..."

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

            />

            <button

                onClick={()=>setShowModal(true)}

            >

                + Add Patient

            </button>

        </div>

    );

}

export default PatientSearch;