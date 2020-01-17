import React from "react";

import i18n from "../../../../i18n";
import "./style.css";

const Pagination = ({ fetchData, page, pages }) => (
  <div className="pagination ">
    <div className="previous">
      <button onClick={() => fetchData("prev")} disabled={page <= 1}>
        {i18n.t("Previous")}
      </button>
    </div>
    <div className="center">
      <p>
        {i18n.t("Page")} {page} of {pages}
      </p>
    </div>
    <div className="next">
      <button onClick={() => fetchData("next")} disabled={page === pages}>
        {i18n.t("Next")}
      </button>
    </div>
  </div>
);

export default Pagination;
