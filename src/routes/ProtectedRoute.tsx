import { useToken } from "@/utils/contexts/useToken";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { pathname } = useLocation();
  const { token } = useToken();

  const authProtected = ["/login", "/register"];
  const protectedByToken = [
    "/",
    "/profile",
    "/PulsaData",
    /^\/product-detail\/\d+$/,
    "/history",
    "/top-up",
    "/top-up-detail",
    "/top-up-status",
    "/checkout",
    "/verify-pin",
    "/payment-detail",
    "/merchant",
    "/merchant/products",
    "/merchant/product/create",
    "/merchant/product/edit",
    "/merchant/transactions",
    "/merchant/profile",
    /^\/merchant\/product\/edit\/\d+$/,
  ];

  const userProtected = [
    "/",
    "/profile",
    "/PulsaData",
    /^\/product-detail\/\d+$/,
    "/history",
    "/top-up",
    "/top-up-detail",
    "/top-up-status",
    "/checkout",
    "/verify-pin",
    "/payment-detail",
  ];

  const isRouteProtected = (routes: any[], pathname: string) => {
    return routes.some((route) => {
      if (typeof route === "string") {
        return route === pathname;
      } else if (route instanceof RegExp) {
        return route.test(pathname);
      }
      return false;
    });
  };

  const isProtectedByToken = isRouteProtected(protectedByToken, pathname);

  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/" />;
  }

  if (isProtectedByToken) {
    if (!token) return <Navigate to="/login" />;

    if (!isRouteProtected(userProtected, pathname)) {
      return <Navigate to="/" />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
