import { ErrorObjType } from "@/types/error.type";
import { setAuth } from "@/slices/authSlice";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function useAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleNonAuthUser(error: ErrorObjType) {
    const { status } = error as ErrorObjType;

    if (status === 401) {
      dispatch(setAuth(null));
      localStorage.removeItem("user");
      navigate("/login");
    }
  }

  return { handleNonAuthUser };
}

export default useAuth;
