import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const OutletRoute = () => {
  return <>{true ? <Outlet /> : <Navigate to="/signin" />}</>;
};

export default OutletRoute;
