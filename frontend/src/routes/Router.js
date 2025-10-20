// src/routes/Router.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/DashboardPage";
import QuizInterfacePage from "../pages/QuizInterface/QuizInterfacePage";
import Home from "../pages/Home/Home";
import AnalysisPage from "../pages/Analysis/AnalysisPage";
import CreateQuizPage from "../pages/createQuiz/CreateQuizPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const Router = () => {

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<AnalysisPage />} />
          <Route path="create" element={<CreateQuizPage />} />
        </Route>
        <Route path="/quiz-interface/:id" element={<QuizInterfacePage />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default Router;
