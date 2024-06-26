import Cookie from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setAuth } from "@/slices/authSlice";

function Redirect() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Cookie.get("token") && Cookie.get("email") && Cookie.get("userId")) {
      const user = {
        email: Cookie.get("email") || "",
        token: Cookie.get("token") || "",
        userId: Cookie.get("userId") || "",
      };

      dispatch(setAuth(user));
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return <></>;
}

export default Redirect;
