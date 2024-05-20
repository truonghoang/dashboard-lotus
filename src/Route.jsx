import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import * as pages from "@/pages";
import jsCookie from "js-cookie"
const ProtectedRoute = ({ children }) => {
   const user = jsCookie.get("user")
  // let user = "token"
  if (!user) {
    return <Navigate to={"/login"}  />;
  }

  return children ? children : <Outlet />;
};

const Home = pages.HomePage;
const Login = pages.LoginPage;
const User = pages.UserPage
const Report = pages.ReportFormPage
function AppRoute() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute
          >
            <Home />
          </ProtectedRoute>
        }
      />
       <Route
        path="/user/collection"
        element={
          <ProtectedRoute
          >
            <User />
          </ProtectedRoute>
        }
      />
       <Route
        path="/report/form"
        element={
          <ProtectedRoute
          >
            <Report />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoute;
