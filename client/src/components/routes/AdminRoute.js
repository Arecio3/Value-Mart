import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import Spinner from "../spinner/Spinner";
import RedirectAdmin from "./RedirectAdmin";
import { currentAdmin } from '../../functions/auth';
import AdminDash from '../../pages/admin/AdminDash';
import { toast } from 'react-toastify';

const AdminRoute = ({ theme }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if (user && user.token) {
        currentAdmin(user.token)
        .then(res => {
            console.log("Current Admin: ", res)
            setGranted(true);
        })
        .catch(err => {
            console.log(err)
            toast.error(err)
            setGranted(false);
        })
    }
  },[user])

  return granted ? (
    <>
      <AdminDash theme={theme}/>
    </>
  ) : (
    <>
      <Spinner /> <RedirectAdmin />
    </>
  );
};

export default AdminRoute;