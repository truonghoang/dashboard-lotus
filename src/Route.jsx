import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import * as pages from "@/pages";
import jsCookie from "js-cookie"
const ProtectedRoute = ({ children }) => {
    const user = jsCookie.get("user")
//  let user = "token"
  if (!user) {
    return <Navigate to={"/login"}  />;
  }

  return children ? children : <Outlet />;
};

const Home = pages.HomePage;
const Login = pages.LoginPage;
const User = pages.UserPage
const UserBanned = pages.UserBanPage
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
        path="/user/banned"
        element={
          <ProtectedRoute
          >
            <UserBanned />
          </ProtectedRoute>
        }
      />
       <Route
        path="/report/user/:id"
        element={
          <ProtectedRoute
          >
            <User />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoute;
