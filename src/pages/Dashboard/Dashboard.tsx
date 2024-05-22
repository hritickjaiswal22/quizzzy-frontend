import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "@/api/axios.config";
import { ErrorObjType } from "@/types/error.type";

function Dashboard() {
  const navigate = useNavigate();

  function handleNonAuthUser(error: ErrorObjType) {
    const { status } = error as ErrorObjType;

    if (status === 401) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  }

  async function test() {
    try {
      const { data } = await axios.get(`/users`);

      console.log(data);
    } catch (error) {
      handleNonAuthUser(error as any);
    }
  }

  useEffect(() => {
    test();
  });

  return <h1>Dashboard</h1>;
}

export default Dashboard;
