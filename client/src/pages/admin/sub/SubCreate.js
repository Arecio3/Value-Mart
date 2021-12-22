import React from "react";
import { useSelector } from "react-redux";
import AdminNav from '../../../components/nav/AdminNav';
import '../../../styles/adminDark.css';

const SubCreate = ({ theme }) => {
    const { user } = useSelector((state) => ({ ...state }));

    return user?.role === "admin" ?  (
    <div className="container-fluid adminDash">
      <div className="row">
        <div className="col-md-2">
          <AdminNav theme={theme} />
        </div>
        <div className="col-md-10">Sub Category create page</div>
      </div>
    </div>
  ): (<></>)
};

export default SubCreate;
