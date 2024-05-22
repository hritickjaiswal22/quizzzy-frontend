import axios from "axios";
import { useNavigate } from "react-router-dom";

function validateInput(email: string, password: string) {
  return email.length > 0 && password.length > 0;
}

function Login() {
  const navigate = useNavigate();

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const target: any = e.target;

    const email = (target[0] as HTMLInputElement).value;
    const password = (target[1] as HTMLInputElement).value;

    if (!validateInput(email, password)) return;

    signin(email, password);
  }

  async function signin(email: string, password: string) {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/auths/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      localStorage.setItem("user", JSON.stringify(data.user));

      console.log(data);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <form onSubmit={submitHandler}>
        <input
          id="email"
          type="email"
          required
          placeholder="Email"
          name="email"
        />
        <label htmlFor="email">Email</label>
        <input
          id="password"
          type="password"
          required
          placeholder="password"
          name="password"
        />
        <label htmlFor="password">Password</label>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default Login;
