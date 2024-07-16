import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <>
      <div className="h-screen w-full bg-primary-first flex justify-center items-center content-center flex-col flex-wrap">
        <img src="/logo/logo.svg" alt="" width={300} height={300} />
        <p className="font-bold text-8xl text-white text-center mb-5">404</p>
        <span className="opacity-50 text-white mb-2">Take me back to </span>
        <Link className="border-b text-white" to={"/"}>
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default NoPage;
