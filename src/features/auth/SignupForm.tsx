import { setAuth } from "@/slices/authSlice";
import Authform, { FormStateType } from "./Authform";
import { signup } from "@/api/auth";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function validateInput(email: string, password: string) {
  return email.length > 0 && password.length > 0;
}

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function submitHandler(obj: FormStateType) {
    try {
      const { email, password } = obj;

      if (!validateInput(email, password)) return;

      const user = await signup(email, password);

      dispatch(setAuth(user));
      localStorage.setItem("user", JSON.stringify(user));

      console.log(user);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Authform
      desc="Not a user, signup!"
      title="Signup form"
      submitHandler={submitHandler}
    />
  );
}

export default SignupForm;
