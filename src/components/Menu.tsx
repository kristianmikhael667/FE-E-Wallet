import { Link } from "react-router-dom";

const Menu = (props: {
  source: string;
  name: string;
  navigate: string;
  status: number;
}) => {
  return (
    <Link
      style={{ pointerEvents: props.status == 0 ? "auto" : "none" }}
      to={props.navigate}
    >
      <div className="w-auto h-auto mobile:w-auto mobile:h-auto flex justify-center items-center p-0">
        <img
          src={props.source}
          alt=""
          className={`hover:bg-slate-400 hover:rounded-full w-28 h-28 mobile:w-16 mobile:h-16 ${
            props.status == 0 ? `opacity-100` : `opacity-55`
          }`}
        />
        <p
          hidden={props.status == 0 ? true : false}
          className="text-primary-first font-extrabold text-2xl transform -rotate-45 absolute mobile:text-sm tablet:text-lg"
        >
          Maintenance
        </p>
      </div>
      <p
        className={`text-center mt-2 text-xl font-bold ${
          props.status == 0 ? `opacity-100` : `opacity-55`
        }`}
      >
        {props.name}
      </p>{" "}
    </Link>
  );
};

export default Menu;
