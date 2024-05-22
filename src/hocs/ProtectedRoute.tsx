import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const userStr = localStorage.getItem("user");

  console.log(userStr);

  return userStr && JSON.parse(userStr).token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
