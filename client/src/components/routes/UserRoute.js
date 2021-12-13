import React from "react";
import { useSelector } from "react-redux";
import History from "../../pages/user/History";
import Spinner from "../spinner/Spinner";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
    <>
      <History />
    </>
  ) : (
    <>
      <Spinner /> <LoadingToRedirect />
    </>
  );
};

export default UserRoute;
