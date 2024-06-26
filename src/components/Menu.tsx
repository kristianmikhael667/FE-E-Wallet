import React from "react";
import { Link } from "react-router-dom";

const Menu = (props: {
  source: string;
  name: string;
  navigate: string;
  isMaintenance: boolean;
}) => {
  return (
    <Link
      style={{ pointerEvents: props.isMaintenance == false ? "auto" : "none" }}
      className="mx-auto"
      to={props.navigate}
    >
      <div className="rounded-full hover:bg-yellow-500 w-44 h-44 mobile:w-28 mobile:h-28 bg-yellow-200 flex justify-center items-center p-0">
        <img
          src={props.source}
          alt=""
          className={`w-28 h-28 mobile:w-16 mobile:h-16 ${
            props.isMaintenance == false ? `opacity-100` : `opacity-55`
          }`}
        />
        <p
          hidden={props.isMaintenance == false ? true : false}
          className="text-primary-first font-extrabold text-2xl transform -rotate-45 absolute mobile:text-sm tablet:text-lg"
        >
          Maintenance
        </p>
      </div>
      <p
        className={`text-center mt-2 text-xl font-bold ${
          props.isMaintenance == false ? `opacity-100` : `opacity-55`
        }`}
      >
        {props.name.split(" ").map((word, index) => (
          <React.Fragment key={index}>
            {word}
            {index < props.name.split(" ").length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>{" "}
    </Link>
  );
};

export default Menu;
