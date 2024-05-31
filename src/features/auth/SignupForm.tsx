import { setAuth } from "@/slices/authSlice";
import Authform, { FormStateType } from "./Authform";

import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { gql, useMutation } from "@apollo/client";

function validateInput(email: string, password: string) {
  return email.length > 0 && password.length > 0;
}

const SIGNUP = gql`
  # login the user
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      email
      token
      userId
    }
  }
`;

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signupUser, { loading }] = useMutation(SIGNUP);

  async function handleFormSubmission(obj: FormStateType) {
    try {
      const { email, password } = obj;
      if (!validateInput(email, password)) {
        toast.error("Invalid input", {
          position: "top-right",
        });
        return;
      }

      const { data } = await signupUser({
        variables: {
          email,
          password,
        },
      });

      const { __typename, ...user } = data.signup;

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
        desc="Not a user, signup!"
        title="Signup form"
        submitHandler={handleFormSubmission}
        isLoading={loading}
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
