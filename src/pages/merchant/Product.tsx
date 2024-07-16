import { Daum, getAllProduct } from "@/utils/api/merchant/product";
import { userProfile } from "@/utils/api/users";
import { atom, useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const userAtom = atom({
  id: "",
});

const Product = () => {
  const [products, setProducts] = useState<Daum[]>([]);
  const token = Cookies.get("token");
  const [users, setUsers] = useAtom(userAtom);

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
    const getProducts = async () => {
      try {
        const response = await getAllProduct(parseInt(users.id, 10));
        setProducts(response.data.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    if (users.id) {
      getProducts();
    }
  }, [users.id]);

  return (
    <div>
      <div className="my-8 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Link
          to="/merchant/product/create"
          className="bg-[#464BD8] hover:bg-[#464BD8]/90 text-white font-bold py-2 px-3 rounded-[8px]"
        >
          Add Product
        </Link>
        <input
          type="text"
          placeholder="Search Products"
          className="w-2/5 tablet:w-1/2 mobile:w-full border border-gray-300 rounded-[8px] py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary-first"
        />
      </div>

      <div className="grid grid-cols-2 mobile:grid-cols-1 tablet:grid-cols-1 gap-4">
        {Array.isArray(products) &&
          products.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start"
            >
              <div className="relative w-32 h-32 flex-shrink-0">
                <img
                  className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50"
                  loading="lazy"
                  src={item.product_images || "ImageFood"}
                  alt={item.product_name}
                />
              </div>
              <div className="flex flex-col gap-2 py-2">
                <p className="text-xl font-bold">{item.product_name}</p>
                <p className="text-neutral-400">{item.description}</p>
                <span className="flex items-center justify-start gap-2">
                  <Link
                    to={`/merchant/product/edit/${item.id}`}
                    className="py-0.5 px-2 rounded-[10px] bg-teal-400 hover:bg-teal-600 text-white"
                  >
                    Edit
                  </Link>
                  <button className="py-0.5 px-2 rounded-[10px] bg-rose-400 hover:bg-rose-600 text-white">
                    Delete
                  </button>
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Product;
