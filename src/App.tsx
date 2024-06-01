import "./App.css";
import PrivateRoutes from "./hocs/ProtectedRoute";
import Navbar from "./features/navbar/Navbar";
import PageFallback from "./features/ui/PageFallback";

import { Route, Routes } from "react-router-dom";
import React from "react";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Quiz = React.lazy(() => import("./pages/Quiz"));
const Result = React.lazy(() => import("./pages/Results"));
const History = React.lazy(() => import("./pages/History"));
const Redirect = React.lazy(() => import("./pages/Redirect"));

function App() {
  return (
    <section className="antialiased min-h-screen pt-16">
      <Navbar />
      <React.Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Dashboard />} path="/" />
            <Route element={<Quiz />} path="/quiz" />
            <Route element={<History />} path="/history" />
            <Route element={<Result />} path="/results/:examId" />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/redirect" element={<Redirect />} />
        </Routes>
      </React.Suspense>
    </section>
  );
}

export default App;
