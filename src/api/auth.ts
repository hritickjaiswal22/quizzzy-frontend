import { baseURL } from "./axios.config";

import axios from "axios";

interface SigninResponseType {
  email: string;
  token: string;
  userId: string;
}

interface SignupResponseType extends SigninResponseType {}

async function signin(
  email: string,
  password: string
): Promise<SigninResponseType> {
  try {
    const { data } = await axios.post(
      `${baseURL}/auths/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    const { user } = data;

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function signup(
  email: string,
  password: string
): Promise<SignupResponseType> {
  try {
    const { data } = await axios.post(
      `${baseURL}/auths/register`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    const { user } = data;

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { signin, signup };

export type { SigninResponseType, SignupResponseType };
