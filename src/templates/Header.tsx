import { ModelLogout } from "@/components";
import { useToken } from "@/utils/contexts/useToken";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const openLogoutAtom = atom(false);
const isOpenAtom = atom(false);

const Header = () => {
  const { user, changeToken } = useToken();
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const [openLogout, setOpenLogout] = useAtom(openLogoutAtom);
  const ROOT_API = import.meta.env.VITE_REACT_API_URL;

  const [isSidebarOpen, setIsSidebarOpen] = useAtom(isOpenAtom);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar state
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setOpenLogout(true);
  };

  const handleNavLinkClick = () => {
    setIsSidebarOpen(false);
  };

  // Remove Cookies
  const removeCookies = () => {
    setOpenLogout(false);
    setIsSidebarOpen(false);
    changeToken("");
  };

  return (
    <header className="fixed top-0 z-10 border-gray-600 bg-white w-screen rounded-br-3xl rounded-bl-3xl shadow-lg shadow-gray-500">
      <div className="container">
        <div className="flex justify-between items-center">
          <Link to={"/"}>
            <img
              src="/logo/logo.svg"
              alt="logo"
              className="mobile:w-20 mobile:h-20 w-32 h-32"
            />
          </Link>

          <div className="flex justify-center">
            <button
              type="button"
              className="text-xl mr-5 select-none"
              onClick={toggleSidebar}
              aria-expanded={isSidebarOpen ? "true" : "false"}
            >
              Hi, <span className="font-bold">{user.full_name}</span>
            </button>

            <div
              ref={sidebarRef}
              className={`z-10 absolute mt-12 ${
                isSidebarOpen ? "block" : "hidden"
              } bg-white divide-y divide-gray-100 rounded-xl shadow-stone-950 w-auto`}
            >
              <ul className="">
                <NavLink
                  to={"/"}
                  className={`${
                    splitLocation[1] === ""
                      ? `text-primary-first`
                      : "text-black"
                  } flex px-4 py-2 hover:bg-gray-100 items-center`}
                  onClick={handleNavLinkClick}
                >
                  <div
                    className={`${
                      splitLocation[1] === ""
                        ? `bg-white border-primary-first`
                        : `border-white`
                    } w-8 h-8 flex justify-center items-center rounded-full mr-2 border-2`}
                  >
                    <img
                      src={`${
                        splitLocation[1] === ""
                          ? `/logo/home_act.svg`
                          : `/logo/home_inact.svg`
                      }`}
                      alt="logohome"
                    />
                  </div>
                  <p
                    className={`${
                      splitLocation[1] === ""
                        ? `text-primary-first font-bold`
                        : `text-black`
                    }`}
                  >
                    Home
                  </p>
                </NavLink>
                <NavLink
                  to={"/history"}
                  className={`${
                    splitLocation[1] === "history"
                      ? `text-primary-first`
                      : "text-black"
                  } flex px-4 py-2 hover:bg-gray-100 items-center`}
                  onClick={handleNavLinkClick}
                >
                  <div
                    className={`${
                      splitLocation[1] === "history"
                        ? `bg-white border-primary-first`
                        : `border-white`
                    } w-8 h-8 flex justify-center items-center rounded-full mr-2 border-2`}
                  >
                    <img
                      src={`${
                        splitLocation[1] === "history"
                          ? `/logo/history_act.svg`
                          : `/logo/history_inact.svg`
                      }`}
                      alt="logohistory"
                    />
                  </div>
                  <p
                    className={`${
                      splitLocation[1] === "history"
                        ? `text-primary-first font-bold`
                        : `text-black`
                    }`}
                  >
                    History
                  </p>
                </NavLink>
                <NavLink
                  to={"/profile"}
                  className={`${
                    splitLocation[1] === "profile"
                      ? `text-primary-first`
                      : "text-black"
                  } flex px-4 py-2 hover:bg-gray-100 items-center`}
                  onClick={handleNavLinkClick}
                >
                  <div
                    className={`${
                      splitLocation[1] === "profile"
                        ? `bg-white`
                        : `border-white`
                    } w-8 h-8 flex justify-center items-center rounded-full mr-2 border-2`}
                  >
                    <img
                      src={`${
                        splitLocation[1] === "profile"
                          ? `${ROOT_API + user.avatar_url}`
                          : `/logo/profile.svg`
                      }`}
                      className="rounded-full w-auto h-auto"
                      alt="logoprofile"
                    />
                  </div>
                  <p
                    className={`${
                      splitLocation[1] === "profile"
                        ? `text-primary-first font-bold`
                        : `text-black`
                    }`}
                  >
                    My Profile
                  </p>
                </NavLink>
                <NavLink
                  onClick={(e) => handleLogout(e)}
                  className="flex px-4 py-2 hover:bg-gray-100 items-center"
                  to="#"
                >
                  <div className="w-8 h-8 flex justify-center items-center rounded-full mr-2">
                    <img
                      src={`${
                        openLogout
                          ? `/logo/logout_act.svg`
                          : `/logo/logout_inact.svg`
                      }`}
                      alt="logologout"
                    />
                  </div>
                  <p>Logout</p>
                </NavLink>
                <ModelLogout
                  open={openLogout}
                  onClose={() => setOpenLogout(false)}
                >
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
