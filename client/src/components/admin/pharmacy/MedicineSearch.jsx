import "../../common/SearchBar.css";

function MedicineSearch({

    search,

    setSearch,

    setShowModal

}){

    return(

        <div className="search-bar">

            <input

                type="text"

                placeholder="🔍 Search medicine..."

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

            />

            <button

                onClick={()=>setShowModal(true)}

            >

                + Add Medicine

            </button>

        </div>

    );

}

export default MedicineSearch;