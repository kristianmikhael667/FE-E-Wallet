import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import Profile from "../pages/Profile";
import DetailFood from "../pages/DetailFood";
import Register from "../pages/Register";
import History from "../pages/History";
import TopUp from "../pages/TopUp";
import TransactionPending from "../pages/TransactionPending";
import TopUpStatus from "@/pages/TopUpStatus";
import Checkout from "../pages/Checkout";
import VerifyPin from "../pages/VerifyPin";
import PaymentStatus from "../pages/PaymentStatus";
import ProtectedRoute from "./ProtectedRoute";
import NoPage from "@/pages/NoPage";
import LoginByPin from "../pages/LoginByPin";
import PulsaData from "@/pages/PPOB/PulsaData";

const Routes = () => {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/profile",
              element: <Profile />,
            },
            {
              path: "/PulsaData",
              element: <PulsaData />,
            },
            {
              path: "/product-detail/:id",
              element: <DetailFood />,
            },
            {
              path: "/history",
              element: <History />,
            },
            {
              path: "/top-up",
              element: <TopUp />,
            },
            {
              path: "/top-up-detail",
              element: <TransactionPending />,
            },
            {
              path: "/top-up-status",
              element: <TopUpStatus />,
            },
            {
              path: "/checkout",
              element: <Checkout />,
            },
            {
              path: "/verify-pin",
              element: <VerifyPin />,
            },
            {
              path: "/payment-detail",
              element: <PaymentStatus />,
            },
          ],
        },
        {
          path: "/login",
          element: <LoginByPin />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "*",
      element: <NoPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
