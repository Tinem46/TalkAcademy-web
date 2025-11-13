import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./page/home";
import Login from "./page/loginPage";
import Register from "./page/registerPage";
import ForgotPassword from "./page/forgotPassword/index.jsx";
import ResetPassword from "./page/resetPassword/index.jsx";
import UserDashboard from "./page/userDashboard";
import ReadDocument from "./page/readDocument";
import About from "./page/about";
import Services from "./page/serviceTeam";
import Team from "./page/team";
import Blog from "./page/blog";
import Contact from "./page/contact";
import Profile from "./page/profile";
import ScrollToTop from "./components/ScrollToTop";
import LoadingAnimation from "./components/loadingAnimation";
import Dashboard from "./components/dashboard";
import AccountManagement from "./page/admin/accountManagement";
import ReadingPassageManagement from "./page/admin/readingPassageManagement";
import CategoryManagement from "./page/admin/categoryManagement";
import PackageManagement from "./page/admin/packageManagement";
import RevenueManagement from "./page/admin/revenue";
import UserSurveys from "./page/admin/userSurveys";
import DownloadPage from "./page/downloadPage";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const router = createBrowserRouter([
    // Auth routes (without header/footer)
    {
      path: "/login",
      element: (
        <>
          <Login />
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
          <Register />
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <>
          <ForgotPassword />
          <ScrollToTop />
        </>
      ),
    },
    {
      path: "/reset-password",
      element: (
        <>
          <ResetPassword />
          <ScrollToTop />
        </>
      ),
    },
    // Main app routes (with header/footer)
    {
      path: "/",
      element: (
        <>
          <ScrollToTop />
          <Layout />
        </>
      ),
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/services",
          element: <Services />,
        },

        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/dashboard",
          element: <UserDashboard />,
        },
        {
          path: "/read/:documentId",
          element: <ReadDocument />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/download",
          element: <DownloadPage />,
        },
      ],
    },

    {
      path: "/admin",
      element: <Dashboard />,
      children: [
        {
          path: "accounts",
          element: <AccountManagement />,
        },
        {
          path: "user-surveys",
          element: <UserSurveys />,
        },
        {
          path: "revenue",
          element: <RevenueManagement />,
        },
        {
          path: "reading-passages",
          element: <ReadingPassageManagement />,
        },
        {
          path: "categories",
          element: <CategoryManagement />,
        },
        {
          path: "packages",
          element: <PackageManagement />,
        },
      ],
    },
  ]);

  return (
    <>
      <LoadingAnimation isLoading={isLoading}>
        <RouterProvider router={router} />
      </LoadingAnimation>
    </>
  );
}

export default App;
