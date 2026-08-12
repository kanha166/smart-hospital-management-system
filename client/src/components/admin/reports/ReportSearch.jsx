import "../../common/SearchBar.css";

function ReportSearch({

    search,

    setSearch,

    setShowModal

}){

    return(

        <div className="search-bar">

            <input

                type="text"

                placeholder="🔍 Search report..."

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

            />

            <button

                onClick={()=>setShowModal(true)}

            >

                + Add Report

            </button>

        </div>

    );

}

export default ReportSearch;