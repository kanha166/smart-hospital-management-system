import "../../common/SearchBar.css";

function DoctorSearch({

    search,

    setSearch,

    setShowModal

}){

    return(

        <div className="search-bar">

            <input

                type="text"

                placeholder="🔍 Search doctor by name, department, specialization or phone..."

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

            />

            <button

                onClick={()=>setShowModal(true)}

            >

                + Add Doctor

            </button>

        </div>

    );

}

export default DoctorSearch;