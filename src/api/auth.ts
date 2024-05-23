import { baseURL } from "./axios.config";

import axios from "axios";

async function signin(email: string, password: string) {
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

export { signin };
