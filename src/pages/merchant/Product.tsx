import { ImageFood } from "@/assets/image";
import { Link } from "react-router-dom";

const Product = () => {
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
        <div className="flex gap-3 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start">
          <div className="relative w-32 h-32 flex-shrink-0">
            <img
              className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50"
              loading="lazy"
              src={ImageFood}
            />
          </div>
          <div className="flex flex-col gap-2 py-2">
            <p className="text-xl font-bold">Pecel lele</p>
            <p className="text-neutral-400">Nasi + lele + sambal + lalapan</p>
            <span className="flex items-center justify-start gap-2">
              <Link
                to="/merchant/product/edit"
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
        <div className="flex gap-3 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start">
          <div className="relative w-32 h-32 flex-shrink-0">
            <img
              className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50"
              loading="lazy"
              src={ImageFood}
            />
          </div>
          <div className="flex flex-col gap-2 py-2">
            <p className="text-xl font-bold">Pecel lele</p>
            <p className="text-neutral-400">Nasi + lele + sambal + lalapan</p>
            <span className="flex items-center justify-start gap-2">
              <button className="py-0.5 px-2 rounded-[10px] bg-teal-400 hover:bg-teal-600 text-white">
                Edit
              </button>
              <button className="py-0.5 px-2 rounded-[10px] bg-rose-400 hover:bg-rose-600 text-white">
                Delete
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
