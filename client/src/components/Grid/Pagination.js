import React from "react";
import ArrowRight from "react-bootstrap-icons//dist/icons/arrow-right";
import ArrowLeft from "react-bootstrap-icons//dist/icons/arrow-left";
const Pagination = (props) => {
  const onNextPage = () => {
    if (props.page < props.pages) props.setPage(props.page + 1);
  };
  const onPrevPage = () => {
    if (props.page > 1) props.setPage(props.page - 1);
  };
  const handleLimitChange = (e) => {
    props.setLimit(e.target.value);
  };
  return (
    <div>
      {" "}
      <span style={{ color: "grey", marginRight: "2%" }}>
        Page: {props.page}
      </span>
      <span style={{ color: "grey", marginRight: "2%" }}>
        Rows Per Page:{" "}
        <select onChange={handleLimitChange}>
          <option value="5">5</option>
          <option value="10" selected>
            10
          </option>
          <option value="15">15</option>
        </select>
      </span>
      <span style={{ color: "grey" }}> Total Rows: {props.total}</span>
      <button
        className="btn btn-sm btn-secondary"
        style={{ marginLeft: "65%" }}
        onClick={onPrevPage}
      >
        <ArrowLeft />{" "}
      </button>
      <button
        style={{ marginLeft: "1%" }}
        className="btn btn-sm btn-secondary"
        onClick={onNextPage}
      >
        <ArrowRight />{" "}
      </button>
    </div>
  );
};

export default Pagination;
