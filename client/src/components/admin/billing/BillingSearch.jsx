// File: client/src/components/admin/billing/BillingSearch.jsx

import "../../common/SearchBar.css";


function BillingSearch({
    search,
    setSearch,
    setShowModal
}) {

    return (

        <div className="search-bar">

            <input
                type="text"
                placeholder="Search billing..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <button
                type="button"
                onClick={() =>
                    setShowModal(true)
                }
            >

                + Add Billing

            </button>

        </div>

    );

}


export default BillingSearch;