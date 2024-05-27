import { setAuth } from "@/slices/authSlice";
import Authform, { FormStateType } from "./Authform";
import { signin } from "@/api/auth";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

function validateInput(email: string, password: string) {
  return email.length > 0 && password.length > 0;
}

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function submitHandler(obj: FormStateType) {
    try {
      const { email, password } = obj;

      if (!validateInput(email, password)) return;

      const user = await signin(email, password);

      dispatch(setAuth(user));
      localStorage.setItem("user", JSON.stringify(user));

      console.log(user);

      navigate("/");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message, {
        position: "top-right",
      });
    }
  }

  return (
    <>
      <Toaster />
      <Authform
        desc="Already a user , signin!!!"
        title="Login form"
        submitHandler={submitHandler}
      >
        <Link
          className="text-base font-medium leading-none underline"
          to={`/register`}
        >
          New User ?
        </Link>
      </Authform>
    </>
  );
}

export default LoginForm;
