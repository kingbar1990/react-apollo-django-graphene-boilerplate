import React from "react";
import IosAddCircleOutline from "react-ionicons/lib/IosAddCircleOutline";

import './style.css'

const TableHeader = ({ title, modalCreate }) => (
   <div className="table-header">
      <h4>{title}</h4>
      <IosAddCircleOutline
         onClick={modalCreate}
         fontSize="30px"
         color="#007bff"
      />
   </div>
);

export default TableHeader;
