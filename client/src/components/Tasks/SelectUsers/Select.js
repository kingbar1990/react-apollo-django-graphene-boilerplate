import React from "react";

const Select = ({ children }) => (
  <select
    id="userId"
    name="status"
    className="browser-default custom-select position-relative form-group"
  >
    {children}
  </select>
);

export default Select;
