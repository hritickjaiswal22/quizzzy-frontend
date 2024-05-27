import { setAuth } from "@/slices/authSlice";
import Authform, { FormStateType } from "./Authform";
import { signin, SigninResponseType } from "@/api/auth";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useMutation } from "react-query";

function validateInput(email: string, password: string) {
  return email.length > 0 && password.length > 0;
}

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isLoading } = useMutation(login);

  async function login(obj: FormStateType): Promise<SigninResponseType> {
    try {
      const { email, password } = obj;

      const user = await signin(email, password);

      return user;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  function handleFormSubmission(obj: FormStateType) {
    if (!validateInput(obj.email, obj.password)) return;

    mutate(obj, {
      onSuccess: (user: SigninResponseType) => {
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
        desc="Already a user , signin!!!"
        title="Login form"
        submitHandler={handleFormSubmission}
        isLoading={isLoading}
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
