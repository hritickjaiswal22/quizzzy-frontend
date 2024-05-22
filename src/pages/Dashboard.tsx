import useAuth from "@/hooks/useAuth";

import { useEffect } from "react";
import axios from "@/api/axios.config";

function Dashboard() {
  const { handleNonAuthUser } = useAuth();

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
