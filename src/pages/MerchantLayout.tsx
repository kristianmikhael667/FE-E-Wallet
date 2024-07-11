import { useState, useRef, useEffect, useCallback } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../assets/style/merchant.css";
import {
  DashboardIcon,
  LogoutIcon,
  ProductIcon,
  ProfileIcon,
  TransactionIcon,
  WalletIcon,
} from "../components/icons/Index";

import { LogoIcon } from "@/assets/logo";
import { ImageUser } from "@/assets/image";
import { atom, useAtom } from "jotai";
import { userWallet } from "@/utils/api/wallet";
import { numberWithCommas } from "@/utils/hooks/usePrice";
import { useToken } from "@/utils/contexts/useToken";
import { ModelLogout } from "@/components";

const walletAtom = atom(0);
const loadingAtom = atom(true);
const openLogoutAtom = atom(false);

const MerchantLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [wallets, setWallets] = useAtom(walletAtom);
  const [loading, isLoading] = useAtom(loadingAtom);
  const { user, changeToken } = useToken();
  const [openLogout, setOpenLogout] = useAtom(openLogoutAtom);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsSidebarOpen(false);
    }
  };

  // Call API Wallet
  const getWallet = useCallback(async () => {
    isLoading(true);
    const response = await userWallet();
    if (response.statusCode == 200) {
      isLoading(false);
      setWallets(response.data.data.Balance);
    }
  }, []);

  useEffect(() => {
    getWallet();
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, getWallet]);

  const location = useLocation();

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setOpenLogout(true);
  };

  // Remove Cookies
  const removeCookies = () => {
    setOpenLogout(false);
    changeToken("");
  };

  return (
    <div>
      <aside
        ref={sidebarRef}
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-80 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white shadow-md shadow-neutral-400">
          <div className="flex flex-col items-center justify-center">
            <Link to="/merchant" className="flex flex-col items-center my-5">
              <img src={LogoIcon} alt="logo" height={60} width={60} />
              <span className="self-center text-lg font-medium whitespace-nowrap text-neutral-600">
                doomo | Merchant
              </span>
            </Link>
          </div>

          <ul className="space-y-2 font-medium my-5">
            <li>
              <Link
                to="/merchant"
                className={`flex items-center p-2 rounded-menu ${
                  location.pathname === "/merchant"
                    ? "bg-[#464BD8] text-white"
                    : "text-neutral-600 hover:bg-gray-100"
                }`}
              >
                <DashboardIcon
                  color={
                    location.pathname === "/merchant" ? "white" : "#525252"
                  }
                />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/merchant/products"
                className={`flex items-center p-2 rounded-menu ${
                  location.pathname === "/merchant/products" ||
                  location.pathname === "/merchant/product/create"
                    ? "bg-[#464BD8] text-white"
                    : "text-neutral-600 hover:bg-gray-100"
                }`}
              >
                <ProductIcon
                  color={
                    location.pathname === "/merchant/products" ||
                    location.pathname === "/merchant/product/create"
                      ? "white"
                      : "#525252"
                  }
                />
                <span className="ms-3">My products</span>
              </Link>
            </li>
            <li>
              <Link
                to="/merchant/transactions"
                className={`flex items-center p-2 rounded-menu ${
                  location.pathname === "/merchant/transactions"
                    ? "bg-[#464BD8] text-white"
                    : "text-neutral-600 hover:bg-gray-100"
                }`}
              >
                <TransactionIcon
                  color={
                    location.pathname === "/merchant/transactions"
                      ? "white"
                      : "#525252"
                  }
                />
                <span className="ms-3">My transactions</span>
              </Link>
            </li>
            <li>
              <Link
                to="/merchant/profile"
                className={`flex items-center p-2 rounded-menu ${
                  location.pathname === "/merchant/profile"
                    ? "bg-[#464BD8] text-white"
                    : "text-neutral-600 hover:bg-gray-100"
                }`}
              >
                <ProfileIcon
                  color={
                    location.pathname === "/merchant/profile"
                      ? "white"
                      : "#525252"
                  }
                />
                <span className="ms-3">My profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                onClick={(e) => handleLogout(e)}
                className="flex items-center p-2 rounded-menu text-neutral-600 hover:bg-gray-100"
              >
                <LogoutIcon />
                <span className="ms-3">Logout</span>
              </Link>
            </li>
            <ModelLogout open={openLogout} onClose={() => setOpenLogout(false)}>
              <div className="text-center w-56">
                <h1 className="text-2xl text-red-700">Confirm Sign out</h1>
                <div className="mx-auto my-4 w-48">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to sign out this account ?
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={removeCookies}
                    className="w-full px-1 py-1 rounded-lg bg-red-600 hover:bg-red-900"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setOpenLogout(false)}
                    className="w-full px-1 py-1 rounded-lg bg-gray-500 hover:bg-gray-950"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </ModelLogout>
          </ul>
        </div>
      </aside>
      <div className="ml-80 mobile:ml-0 tablet:ml-0 bg-gray-50 relative min-h-screen">
        <button
          onClick={toggleSidebar}
          aria-controls="logo-sidebar"
          type="button"
          className="tablet:inline-flex mobile:inline-flex hidden items-center p-2 mt-4 ms-3 text-sm bg-[#464BD8] hover:bg-[#464BD8]/80 text-white rounded-menu"
        >
          Open menu
        </button>
        <div className="px-10 tablet:px-3 mobile:px-3 py-10 tablet:py-4 mobile:py-4">
          <nav className="px-4 flex justify-between bg-white shadow border rounded">
            <div className="flex items-center gap-4">
              <WalletIcon />
              <span className="font-semibold text-lg text-neutral-600">
                {loading ? (
                  <div className="h-10 bg-slate-500 rounded-xl w-full mx-auto animate-pulse"></div>
                ) : (
                  `Rp ` + numberWithCommas(wallets)
                )}
              </span>
            </div>

            <div className="flex items-center">
              <img
                className="w-10 h-10 me-4 rounded-full"
                src={ImageUser}
                alt=""
              />

              <div className="font-medium my-6 text-neutral-600">
                <p>{user.full_name}</p>
              </div>
            </div>
          </nav>
          <Outlet />
        </div>

        <footer className="px-12 tablet:px-3 mobile:px-3 py-4 flex justify-between bg-gray-50 shadow-lg rounded-md absolute bottom-0 left-0 right-0 z-10">
          <span className="text-neutral-400">© 2024 Copyright: doomo</span>
        </footer>
      </div>
    </div>
  );
};

export default MerchantLayout;
