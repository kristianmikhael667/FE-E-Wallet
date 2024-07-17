import { Input } from "@/components/ui/input";
import { DataPpob, getAllPrefix } from "@/utils/api/ppob";
import { numberWithCommas } from "@/utils/hooks/usePrice";
import { Player } from "@lottiefiles/react-lottie-player";
import { atom, useAtom } from "jotai";
import React, { useCallback, useEffect } from "react";

const searchAtom = atom("");
const loadingAtom = atom(false);
const ppobAtom = atom<DataPpob[]>([]);
const selectAtom = atom<string>("pulsa");

const PulsaData = () => {
  const ROOT_API = import.meta.env.VITE_REACT_API_URL;
  const [search, setSearch] = useAtom(searchAtom);
  const [loading, isLoading] = useAtom(loadingAtom);
  const [ppobs, setPpob] = useAtom(ppobAtom);
  const [selected, setSelected] = useAtom(selectAtom);
  console.log(loading);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (target.name === "search") {
      setSearch(target.value);
    }
  };

  const getPrefix = useCallback(async () => {
    isLoading(true);
    const response = await getAllPrefix(search, selected);

    if (response.statusCode == 200) {
      isLoading(false);
      setPpob(response.data);
    } else {
      setPpob([]);
      isLoading(false);
    }
  }, [search, selected]);

  useEffect(() => {
    getPrefix();
  }, [getPrefix]);

  return (
    <section className="relative p-0 overflow-y-scroll h-screen py-36 mobile:py-28">
      <div className="container">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 border-2 border-primary-first rounded-full">
            <img src="/logo/ppob_phone.svg" alt="phone" />
          </div>
          <p>PPOB</p>
        </div>

        <div className="flex justify-around p-2 shadow-xl rounded-2xl border-gray-600 bg-white">
          <div
            onClick={() => setSelected("pulsa")}
            className={`${
              selected == "pulsa" ? `bg-primary-first` : `bg-white`
            } flex-1 mx-auto py-2 rounded-full cursor-pointer transition-colors duration-300`}
          >
            <p
              className={`${
                selected == "pulsa" ? `text-white` : `text-black`
              } text-center`}
            >
              Pulsa
            </p>
          </div>
          <div
            onClick={() => setSelected("data")}
            className={`${
              selected == "data" ? `bg-primary-first` : `bg-white`
            } flex-1 mx-auto py-2 rounded-full cursor-pointer transition-colors duration-300`}
          >
            <p
              className={`${
                selected == "data" ? `text-white` : `text-black`
              } text-center`}
            >
              Paket Data
            </p>
          </div>
        </div>

        <p className="my-2 text-base font-bold">
          {selected == "pulsa" ? "Beli Pulsa" : "Beli Paket Data"}
        </p>
        <div className="flex justify-between items-center mb-2">
          <p>Nomor Telepon</p>
          <img
            src={
              ppobs.length == 0
                ? "/logo/help.svg"
                : ROOT_API + ppobs[0].category.category_image
            }
            alt="logoppob"
            className={`${
              ppobs.length == 0 ? `w-auto h-auto` : `w-[3%] h-[3%]`
            } object-contain`}
          />
        </div>
        <Input
          type="search"
          autoComplete="true"
          name="search"
          onChange={handleChange}
          value={search}
          placeholder="Contoh 0812821906521"
        />

        {ppobs.length == 0 ? (
          <Player
            autoplay
            loop
            src="/lottie/confused.json"
            style={{ height: "300px", width: "300px" }}
          ></Player>
        ) : (
          <>
            <p className="mt-2">Nominal</p>
            <div className="grid grid-cols-6 gap-5 p-0 mt-2">
              {ppobs.map((ppob, id) => (
                <div
                  key={id}
                  className="border-primary-first border-2 p-4 rounded-xl hover:bg-primary-first hover:text-white cursor-pointer"
                >
                  <p className="text-xl font-bold">{ppob.name}</p>
                  <p>Rp. {numberWithCommas(ppob.price)}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PulsaData;
