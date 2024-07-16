import { userWallet } from "@/utils/api/wallet";
import { atom, useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { numberWithCommas } from "../utils/hooks/usePrice";
import useQuery from "@/utils/hooks/useQuery";

const walletAtom = atom(0);
const PaymentStatus = () => {
  const [wallets, setWallets] = useAtom(walletAtom);
  const query = useQuery();
  const price = query.get("price") ?? "";

  if (!price) {
    return <Navigate to={"/"} replace />;
  }

  // Call API Wallet
  const getWallet = useCallback(async () => {
    const response = await userWallet();
    if (response.statusCode == 200) {
      setWallets(response.data.data.Balance);
    }
  }, []);

  useEffect(() => {
    getWallet();
  }, [getWallet]);

  return (
    <section className="relative p-0 h-screen py-40 bg-green-500">
      <div className="container text-center">
        <div className="flex justify-center items-center mb-5">
          <img src={"succes"} width={250} height={250} />
        </div>
        <p className="mb-5 text-2xl font-semibold text-white">
          Success Payment
        </p>
        <p className="mb-5 text-xl font-medium text-white">Total Cost</p>
        <p className="mb-16 text-lg font-bold text-white">
          Rp. {numberWithCommas(price)}
        </p>
        <p className="font-light text-sm text-white">
          Your current balance is Rp. {numberWithCommas(wallets)}
        </p>
      </div>
    </section>
  );
};

export default PaymentStatus;
