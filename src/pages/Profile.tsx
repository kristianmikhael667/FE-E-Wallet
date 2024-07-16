import { useToken } from "@/utils/contexts/useToken";

import { Link } from "react-router-dom";

const Profile = () => {
  const ROOT_API = import.meta.env.VITE_REACT_API_URL;
  const { user } = useToken();

  return (
    <section className="relative p-0 overflow-auto h-screen py-40 px-10">
      <div className="container">
        <div className="flex justify-around p-2 shadow-xl">
          <Link to={"/profile"}>Profile</Link>
          <Link to={"/profile"}>Edit Profile</Link>
          <Link to={"/profile"}>Help</Link>
          <Link to={"/profile"}>Reset PIN</Link>
          <Link to={"/profile"}>About</Link>
        </div>
        <div className="mt-3">
          <div className="p-5 border-2 text-center rounded-sm">
            <img
              src={ROOT_API + user.avatar_url}
              className="rounded-full w-[15%] object-cover mx-auto border-8"
              alt=""
            />
            <p className="mt-2 text-xl font-bold">{user.full_name}</p>
            <p className="mt-2 text-primary-first font-semibold">
              {user.phone}
            </p>
            <p className="mt-2">{user.email}</p>
            <p
              className={`${
                user.status == 0 ? `text-green-900` : `text-gray-700`
              } font-bold text-2xl`}
            >
              {user.status == 0 ? "Active" : "Non Active"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
