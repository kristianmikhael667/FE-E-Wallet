// import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../utils/hooks/usePrice";
import dayjs from "dayjs";

const HistoryComp = (props: {
  date: string;
  status: string;
  name: string;
  type: number;
  price: string;
  id?: number;
}) => {
  // const navigate = useNavigate();

  // const cardDetail = () => {
  //   const key =
  //     props.type === 0
  //       ? `/payment-detail?price=${props.price}`
  //       : `/top-up-status?id=${props.id}`;
  //   navigate(key);
  // };

  return (
    <div
      className="bg-white mb-5 hover:bg-slate-400 py-2 px-2"
      // onClick={cardDetail}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-light">
            {dayjs(props.date).format("MMM D, YYYY h:mm A")}
          </p>

          <p className="font-medium mb-2">{props.name}</p>
        </div>
        <div>
          <p
            className={`${
              props.type === 0 ? `text-red-600` : `text-green-600`
            }`}
          >
            {props.type === 0 ? <span>-</span> : null}Rp{" "}
            <span>{numberWithCommas(props.price)}</span>
          </p>
        </div>
      </div>
      <hr className="h-px border-t-0 bg-black mt-2" />
    </div>
  );
};

export default HistoryComp;
