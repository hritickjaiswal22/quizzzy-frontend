import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Quiz from "./pages/Quiz";
import PrivateRoutes from "./hocs/ProtectedRoute";
import Navbar from "./features/navbar/Navbar";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <section className="antialiased min-h-screen pt-16">
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Dashboard />} path="/" />
          <Route element={<Quiz />} path="/quiz" />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </section>
  );
}

export default App;
