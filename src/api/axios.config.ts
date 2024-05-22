import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:5000", //replace with your BaseURL
  headers: {
    "Content-Type": "application/json", // change according header type accordingly
  },
});

axiosConfig.interceptors.request.use(
  (config) => {
    const userStr = localStorage.getItem("user"); // get stored access token
    if (userStr) {
      const { token } = JSON.parse(userStr);
      config.headers.Authorization = `Bearer ${token}`; // set in header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      localStorage.removeItem("user");
    }

    return Promise.reject({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
);

export default axiosConfig;
