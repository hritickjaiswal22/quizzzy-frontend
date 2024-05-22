import type { RootState } from "@/store";

import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return user && user.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
