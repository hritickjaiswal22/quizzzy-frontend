import { ErrorObjType } from "@/types/error.type";
import { useNavigate } from "react-router-dom";

function useAuth() {
  const navigate = useNavigate();

  function handleNonAuthUser(error: ErrorObjType) {
    const { status } = error as ErrorObjType;

    if (status === 401) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  }

  return { handleNonAuthUser };
}

export default useAuth;
