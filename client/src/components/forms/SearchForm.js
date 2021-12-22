import React from "react";

const SearchForm = ({search, setSearch}) => {

    const handleSearch = (e) => {
        e.preventDefault()
        setSearch(e.target.value.toLowerCase());
      }

    return (
        <div>
            <input type="search" placeholder="Search" value={search} onChange={handleSearch} className="form-control mt-3" />
        </div>
    )
}

export default SearchForm

 