import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoutes from "./hocs/ProtectedRoute";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Dashboard />} path="/" />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
    </Routes>
  );
}

export default App;
