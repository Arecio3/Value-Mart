import React from "react";
import AdminNav from "../../../components/nav/AdminNav";
import '../../../styles/adminDash.css'

const CategoryCreate = ({theme}) => {
  return (
    <div className={theme === "dark" ? "adminDash container-fluid" : "container-fluid"}>
      <div className="row">
        <div className="col-md-2">
          <AdminNav theme={theme}/>
        </div>
        <div className="col">Create Category</div>
      </div>
    </div>
  );
};

export default CategoryCreate;