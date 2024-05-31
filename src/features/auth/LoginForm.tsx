import { setAuth } from "@/slices/authSlice";
import Authform, { FormStateType } from "./Authform";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { gql, useMutation } from "@apollo/client";

function validateInput(email: string, password: string) {
  return email.length > 0 && password.length > 0;
}

// Define mutation
const SIGNIN = gql`
  # login the user
  mutation Signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      email
      token
      userId
    }
  }
`;

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginUser, { loading }] = useMutation(SIGNIN);

  async function handleFormSubmission(obj: FormStateType) {
    try {
      const { email, password } = obj;
      if (!validateInput(email, password)) {
        toast.error("Invalid input", {
          position: "top-right",
        });
        return;
      }

      const { data } = await loginUser({
        variables: {
          email,
          password,
        },
      });

      const { __typename, ...user } = data.signin;

      dispatch(setAuth(user));
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");

      return __typename;
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "", {
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
        submitHandler={handleFormSubmission}
        isLoading={loading}
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
