import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./page/home";
import Login from "./page/loginPage";
import Register from "./page/registerPage";
import UserDashboard from "./page/userDashboard";
import ReadDocument from "./page/readDocument";
import About from "./page/about";
import Services from "./page/serviceTeam";
import Team from "./page/team";
import Blog from "./page/blog";
import Contact from "./page/contact";
import ScrollToTop from "./components/ScrollToTop";
import LoadingAnimation from "./components/loadingAnimation";

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
      element: (<><Login /><ScrollToTop /></>),
    },
    {
      path: "/register",
      element: (<><Register /><ScrollToTop /></>),
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
          path: "/team",
          element: <Team />,
        },
        {
          path: "/blog",
          element: <Blog />,
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
