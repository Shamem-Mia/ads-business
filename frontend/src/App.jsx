import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import TaskPage from "./pages/TaskPage";
import GenerateTask from "./components/GenerateTask";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import WithdrawComponent from "./components/WithdrowCoin";
import AdminPage from "./pages/AdminPage";
import DeveloperDescriptionPage from "./pages/DeveloperDescriptionPage";
import GuidelinePage from "./pages/GuidelinePage";
import WebsiteAds from "./pages/WebsiteAds";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"></Loader>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/settings"
          element={authUser ? <SettingsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/task"
          element={authUser ? <TaskPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/website-ads"
          element={authUser ? <WebsiteAds /> : <Navigate to="/login" />}
        />
        <Route
          path="/generate-task"
          element={authUser ? <GenerateTask /> : <Navigate to="/login" />}
        />
        <Route
          path="/withdraw"
          element={authUser ? <WithdrawComponent /> : <Navigate to="/login" />}
        />
        <Route
          path="/developer-description"
          element={
            authUser ? <DeveloperDescriptionPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/guideline-to-earn"
          element={authUser ? <GuidelinePage /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin-dashboard"
          element={
            authUser && authUser.role === "admin" ? (
              <AdminPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
