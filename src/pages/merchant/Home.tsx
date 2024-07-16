import { useCallback, useEffect, useState } from "react";
import {
  IncomeIcon,
  ProductIcon,
  TransactionIcon,
} from "../../components/icons/Index";
import { getTotalProduct } from "@/utils/api/merchant/product/api";
import { atom, useAtom } from "jotai";
import Cookies from "js-cookie";
import { userProfile } from "@/utils/api/users";
import {
  getTotalIncome,
  getTotalTrasnaction,
} from "@/utils/api/merchant/transaction/api";
import { numberWithCommas } from "@/utils/hooks/usePrice";

const userAtom = atom({
  id: "",
});

const Home = () => {
  const [totalProduct, setTotalProduct] = useState<number>(0);
  const [totalTransaction, setTotalTransaction] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);

  const token = Cookies.get("token");
  const [users, setUsers] = useAtom(userAtom);

  //mendapatkan id user untuk totalProduct
  const getProfiles = useCallback(async () => {
    const response = await userProfile("dsds");
    if (response.statusCode == 200) {
      setUsers(response.data.data);
    } else {
      Cookies.remove("token");
    }
  }, [setUsers]);

  useEffect(() => {
    if (token) {
      getProfiles();
    }
  }, [token, getProfiles]);

  useEffect(() => {
    if (users.id) {
      const fetchData = async () => {
        try {
          const totalProducts = await getTotalProduct(parseInt(users.id, 10));
          const totalTransactions = await getTotalTrasnaction();
          const totalIncomes = await getTotalIncome();
          setTotalProduct(totalProducts);
          setTotalTransaction(totalTransactions);
          setTotalIncome(totalIncomes);
        } catch (error) {
          console.error("Failed to fetch total products:", error);
        }
      };

      fetchData();
    }
  }, [users.id]);

  return (
    <div className="mt-6 flex flex-wrap justify-start items-center gap-4">
      <a
        href="#"
        className="flex h-20 w-40 bg-white shadow border flex-col items-center justify-center rounded"
      >
        <div className="flex flex-row items-center justify-center">
          <ProductIcon color="#525252" />
          <span className="font-bold text-gray-600"> {totalProduct}</span>
        </div>
        <div className="mt-2 text-sm text-gray-400">Total products</div>
      </a>
      <a
        href="#"
        className="flex h-20 w-40 bg-white shadow border flex-col items-center justify-center"
      >
        <div className="flex flex-row items-center justify-center">
          <TransactionIcon color="#525252" />
          <span className="font-bold text-gray-600"> {totalTransaction} </span>
        </div>
        <div className="mt-2 text-sm text-gray-400">Total transactions</div>
      </a>
      <a
        href="#"
        className="flex h-20 w-40 bg-white shadow border flex-col items-center justify-center"
      >
        <div className="flex flex-row items-center justify-center">
          <IncomeIcon />

          <span className="font-bold text-gray-600">
            {" "}
            Rp. {numberWithCommas(totalIncome)}{" "}
          </span>
        </div>
        <div className="mt-2 text-sm text-gray-400">Total incomes</div>
      </a>
    </div>
  );
};

export default Home;
