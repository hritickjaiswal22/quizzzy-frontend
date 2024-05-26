import { setAuth } from "@/slices/authSlice";
import Authform, { FormStateType } from "./Authform";
import { signin } from "@/api/auth";
import { buttonVariants } from "@/features/ui/button";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";

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
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Authform
        desc="Already a user , signin!!!"
        title="Login form"
        submitHandler={submitHandler}
      >
        <div className="flex flex-col items-center gap-4">
          <p>OR</p>
          <a
            href="http://localhost:5000/auths/google"
            className={buttonVariants()}
          >
            <LogIn className="mr-2" />
            Login Via Google
          </a>
        </div>
      </Authform>
    </>
  );
}

export default LoginForm;
