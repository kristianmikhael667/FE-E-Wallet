import { userWallet } from "@/utils/api/wallet";
import { atom, useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { numberWithCommas } from "../utils/hooks/usePrice";

const walletAtom = atom(0);
const ROOT_API = import.meta.env.VITE_REACT_API_URL;

const Checkout = () => {
  const location = useLocation();
  const state = location.state;
  const [wallets, setWallets] = useAtom(walletAtom);

  if (!state) {
    return <Navigate to={"/"} replace />;
  }
  console.log("dsds ", state.selectItem);

  // Call API Wallet
  const getWallet = useCallback(async () => {
    const response = await userWallet();
    if (response.statusCode == 200) {
      setWallets(response.data.data.balance);
    }
  }, []);

  useEffect(() => {
    getWallet();
  }, [getWallet]);

  return (
    <section className="relative p-0 overflow-auto h-screen py-40 bg-primary-secound">
      <div className="container">
        <p className="mb-5 text-2xl font-bold">Checkout</p>
        <div className="grid grid-flow-col grid-cols-3 gap-5 mobile:block items-center">
          <img
            src={ROOT_API + state.selectItem.category.category_image}
            alt="food"
            className="h-52 w-full"
          />
          <div>
            <p className="text-3xl font-extralight mb-4">
              {state.selectItem.name}
            </p>

            <p className="font-extralight mb-2">
              Category{" "}
              <span className="font-bold">
                {state.selectItem.category.name}
              </span>
            </p>
            <div className="flex gap-3 mobile:mb-3">
              <p>{state.selectItem.description}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-2xl shadow-gray-500 w-auto h-auto py-5 px-5">
            <p className="text-xl">Detail Price</p>
            <hr className="h-px border-t-0 bg-black mt-1 mb-2" />
            <div className="flex justify-between mb-1">
              <p>Price</p>
              <p className="font-bold">
                Rp. {numberWithCommas(state.selectItem.price)}
              </p>
            </div>
            <div className="flex justify-between mb-1">
              <p>Qty</p>
              <p>
                <span className="font-bold"> 1</span>
              </p>
            </div>
            <div className="flex justify-between mb-1">
              <p>Total Cost</p>
              <p className="font-bold">
                Rp. {numberWithCommas(state.selectItem.price)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full border-gray-200 bg-white shadow-gray-950 rounded-t-2xl">
        <div className="container">
          <div className="flex justify-between items-center py-5 ">
            <div>
              <p className="font-medium">My Balance</p>
              <p className="font-bold">Rp. {numberWithCommas(wallets)}</p>
            </div>
            <button
              // to={"/verify-pin"}
              className="bg-primary-first py-2 px-10 rounded-xl"
            >
              <p className="text-white font-bold text-lg">BUY</p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
