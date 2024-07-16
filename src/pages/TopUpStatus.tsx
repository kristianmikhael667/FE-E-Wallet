import { topUpPending } from "@/utils/api/topUp/api";
import { numberWithCommas } from "@/utils/hooks/usePrice";
import useQuery from "@/utils/hooks/useQuery";
import { atom, useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import dayjs from "dayjs";

const topUpAtom = atom({
  id: 0,
  order_id: "",
  user_id: 0,
  amount: 0,
  type: "",
  channel_bank: "",
  va_numbers: "",
  status: "",
  created_at: "",
  updated_at: "",
});

const TopUpStatus = () => {
  const [isSuccess, setIsSuccess] = useAtom(topUpAtom);
  const query = useQuery();
  const id = query.get("id") ?? "";

  const getTopUpStatus = useCallback(async () => {
    const response = await topUpPending(id as string);
    if (response.statusCode === 200) {
      setIsSuccess(response.data.data);
    }
  }, [id, setIsSuccess]);

  useEffect(() => {
    getTopUpStatus();
  }, [getTopUpStatus]);

  const bgColorClass =
    isSuccess.status === "Success" ? "bg-green-500" : "bg-yellow-300";

  return (
    <section className={`relative p-0 h-screen py-40 ${bgColorClass}`}>
      <div className="container text-center">
        <div className="flex justify-center items-center mb-5">
          {isSuccess.status === "Success" ? (
            <img
              src={"LogoSuccess"}
              width={250}
              height={250}
              alt="Success Logo"
            />
          ) : (
            <img
              src={"LogoPending"}
              width={250}
              height={250}
              alt="Pending Logo"
            />
          )}
        </div>
        <p className="mb-5 text-2xl font-semibold text-white">
          Top Up {isSuccess.status}
        </p>
        <p className="mb-8 text-md font-bold text-white">
          {isSuccess.channel_bank} VA Number: {isSuccess.va_numbers}
        </p>
        <p className="mb-5 text-xl font-medium text-white">Total</p>
        <p className="mb-16 text-lg font-bold text-white">
          Rp. {numberWithCommas(isSuccess.amount)}
        </p>
        <p className="mb-2 text-md font-bold text-white">
          Created at: {dayjs(isSuccess.created_at).format("MMM D, YYYY h:mm A")}
        </p>
        {isSuccess.status === "Success" ? (
          <p className="mb-8 text-md font-bold text-white">
            Paid at: {dayjs(isSuccess.updated_at).format("MMM D, YYYY h:mm A")}
          </p>
        ) : null}
      </div>
    </section>
  );
};

export default TopUpStatus;
