import { Daum, getSingleProduct } from "@/utils/api/product";
import { atom, useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { numberWithCommas } from "../utils/hooks/usePrice";

const detailAtom = atom<Daum>({});
const loadingAtom = atom(true);

const DetailFood = () => {
  const params = useParams();
  const [details, setDetails] = useAtom(detailAtom);
  const [loading, isLoading] = useAtom(loadingAtom);
  const [count, setCount] = useState(1);

  // Call API Detail Product
  const getDetailProduct = useCallback(async () => {
    const response = await getSingleProduct(params.id!);
    if (response.statusCode == 200) {
      isLoading(false);
      setDetails(response.data.data);
    }
  }, []);

  useEffect(() => {
    getDetailProduct();
  }, [getDetailProduct]);

  const navigate = useNavigate();

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const dataCheckout = {
      id_merchant: details.user_id,
      product_id: details.id,
      product_images: details.product_images,
      product_name: details.product_name,
      merchant_name: details.merchant_name,
      category_food: "Food Court",
      price: details.price,
      qty: count,
      total_cost: (details.price ?? 0) * count,
    };

    navigate("/checkout", {
      state: {
        dataCheckout,
      },
    });
  };

  return (
    <section className="relative overflow-auto h-screen py-32">
      <div className="container">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] mobile:h-[320px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-2">
                {loading ? (
                  <div className="w-full h-full">
                    <div className="animate-pulse"></div>
                  </div>
                ) : (
                  <img
                    className="w-full h-full object-cover mobile:w-80 mobile:h-80"
                    src={details.product_images}
                    alt="Product Image"
                  />
                )}
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {details.product_name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                {details.description}
              </p>
              <div className="flex items-center">
                <img
                  className="w-7 h-7 me-4 rounded-full"
                  src="/logo/logo.svg"
                  alt="imageuser"
                />

                <div className="font-medium my-6 text-neutral-600">
                  <p>{details.merchant_name}</p>
                </div>
              </div>
              <span className="font-semibold text-2xl text-neutral-700">
                Rp. {numberWithCommas(details.price ?? 0)}
              </span>
              <hr className="h-px my-8 bg-gray-200 border-0" />
              <div className="shadow border rounded p-4 flex justify-between items-center">
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold text-xl text-neutral-700">
                      Harga Satuan: Rp. {numberWithCommas(details.price ?? 0)}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-xl text-neutral-700">
                      Jumlah Beli: {count}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-xl text-neutral-700">
                      Total Harga: Rp.{" "}
                      {numberWithCommas((details.price ?? 0) * count)}
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="p-2 bg-[#464BD8] hover:bg-[#464BD8]/80 rounded text-white"
                  >
                    Checkout
                  </button>
                </div>
                <div className="flex space-x-4">
                  <button
                    className="bg-gray-500 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                    onClick={decrement}
                    disabled={count === 1}
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold">{count}</span>
                  <button
                    className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
                    onClick={increment}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailFood;
