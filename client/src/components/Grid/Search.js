import React from "react";

const Search = (props) => {
  return (
    <div style={{ marginBottom: "1%" }} className="col-2">
      <input
        type="text"
        placeholder="Search Doctor"
        className="form-control"
        value={props.searchDoc}
        onChange={(e) => props.setSearchDoc(e.target.value)}
      />
    </div>
  );
};

export default Search;
