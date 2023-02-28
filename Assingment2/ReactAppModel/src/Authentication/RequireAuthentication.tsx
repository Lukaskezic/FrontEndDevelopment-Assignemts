import { useLocation, Navigate, Outlet } from "react-router-dom";
import UseAuthentication from "./UseAuthentication";
import JwtParser from "../APIs/jwtParse";
import React from "react";

const RequireAuthentication = (
  {
    allowedRoles
  }:
  {
    allowedRoles: any
  }) =>
{
  const { auth } = UseAuthentication();
  const location = useLocation();
  const roles = JwtParser(localStorage.getItem("token") as string)[
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  ];
  return allowedRoles?.includes(roles) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/notauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuthentication;
