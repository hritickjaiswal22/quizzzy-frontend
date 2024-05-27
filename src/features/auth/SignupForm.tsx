import { setAuth } from "@/slices/authSlice";
import Authform, { FormStateType } from "./Authform";
import { signup, SignupResponseType } from "@/api/auth";

import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useMutation } from "react-query";

function validateInput(email: string, password: string) {
  return email.length > 0 && password.length > 0;
}

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isLoading } = useMutation(register);

  async function register(obj: FormStateType): Promise<SignupResponseType> {
    try {
      const { email, password } = obj;

      const user = await signup(email, password);

      return user;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  function handleFormSubmission(obj: FormStateType) {
    if (!validateInput(obj.email, obj.password)) return;

    mutate(obj, {
      onSuccess: (user: SignupResponseType) => {
        dispatch(setAuth(user));
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/");
      },
      onError: (error: any) => {
        console.error(error);
        toast.error(error?.response?.data?.message, {
          position: "top-right",
        });
      },
    });
  }

  return (
    <>
      <Toaster />
      <Authform
        desc="Not a user, signup!"
        title="Signup form"
        submitHandler={handleFormSubmission}
        isLoading={isLoading}
      >
        <Link
          className="text-base font-medium leading-none underline"
          to={`/login`}
        >
          Already a user ?
        </Link>
      </Authform>
    </>
  );
}

export default SignupForm;
