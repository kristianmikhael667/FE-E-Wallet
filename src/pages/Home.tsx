import { BannerResponse, getAllBanner } from "@/utils/api/banner";
import { userWallet } from "@/utils/api/wallet";
import { numberWithCommas } from "@/utils/hooks/usePrice";
import { atom, useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Menu } from "../components";
import { getAllMenu, ResponseMenu } from "@/utils/api/menu";

const walletAtom = atom(0);
const loadingWalletAtom = atom(true);
const bannerAtom = atom<BannerResponse[]>([]);
const menuAtom = atom<ResponseMenu[]>([]);
const ROOT_API = import.meta.env.VITE_REACT_API_URL;

const Home = () => {
  const [wallets, setWallets] = useAtom(walletAtom);
  const [loadingWallet, isLoadingWallet] = useAtom(loadingWalletAtom);
  const [banners, setBanners] = useAtom(bannerAtom);
  const [menus, setMenus] = useAtom(menuAtom);

  // Call API Wallet
  const getWallet = useCallback(async () => {
    isLoadingWallet(true);
    const response = await userWallet();
    if (response.statusCode == 200) {
      isLoadingWallet(false);
      setWallets(response.data.data.balance);
    }
  }, []);

  // Call API Banner
  const getBanner = useCallback(async () => {
    const response = await getAllBanner();
    if (response.statusCode == 200) {
      setBanners(response.data.data);
    }
  }, []);

  // Call API Menu
  const getMenu = useCallback(async () => {
    const response = await getAllMenu();
    if (response.statusCode == 200) {
      setMenus(response.data.data);
    }
  }, []);

  useEffect(() => {
    getWallet();
    getBanner();
    getMenu();
  }, [getWallet, getBanner, getMenu]);

  return (
    <section className="relative p-0 overflow-y-scroll h-screen py-32 mobile:py-20 scrollbar">
      {/* Information Wallet */}
      <div className="container">
        <div className="bg-primary-first mt-10 rounded-full py-10 px-10 flex mobile:block justify-between items-center w-full mobile:text-center">
          <div>
            <p className="font-bold text-white text-3xl mb-2 mobile:text-center">
              {loadingWallet ? (
                <div className="h-10 bg-slate-300 rounded-xl w-full mx-auto animate-pulse"></div>
              ) : (
                `Rp ` + numberWithCommas(wallets)
              )}
            </p>
            <p className="font-light text-white text-xs">
              Current doomo Wallet Balance
            </p>
          </div>
          <div className="mobile:mt-5">
            <Link
              className="bg-white p-4 rounded-full text-2xl mobile:text-sm"
              to={"/top-up"}
            >
              <span className="font-extrabold text-3xl mobile:text-sm mr-2">
                +
              </span>{" "}
              Add Money to Wallet
            </Link>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="mt-10 py-10 px-10 mobile:px-0 mobile:p-0 w-full h-auto mobile:w-auto">
        <div className="container">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            scrollbar={{ draggable: false }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
          >
            {banners.map((banner: BannerResponse) => (
              <SwiperSlide>
                <img
                  src={ROOT_API + banner.image_url}
                  className="w-full h-80 rounded-xl mobile:w-auto mobile:h-auto"
                  alt="image1"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Service Menu */}
      <div className="container mt-10">
        <p className="text-2xl font-extrabold ml-5">Service</p>
        <div
          className="grid grid-flow-row  grid-cols-4 gap-3 py-10 gap-y-12 mobile:grid-cols-2 tablet:grid-cols-3
        "
        >
          {menus.map((menu: ResponseMenu) => {
            return menu.types === "main_menu" ? (
              <Menu
                key={menu.id}
                name={menu.name}
                source={ROOT_API + menu.image}
                navigate={menu.page}
                status={menu.status}
              />
            ) : (
              <p key={menu.id}></p>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Home;
