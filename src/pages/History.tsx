import { useEffect, useRef } from "react";
import { HistoryComp } from "../components";
import { getHistory } from "@/utils/api/history/api";
import { atom, useAtom } from "jotai";
import { ResponseHistory } from "@/utils/api/history/types";

const historyAtom = atom<ResponseHistory[]>([]);
const currentPageAtom = atom(1);
const isLoadingAtom = atom(false);
const hasMoreDataAtom = atom(true);

const History = () => {
  const [histories, setHistories] = useAtom(historyAtom);
  const [currentPage, setCurrentPaginations] = useAtom(currentPageAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [hasMoreData, setHasMoreData] = useAtom(hasMoreDataAtom);

  const containerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const userHistory = async (page: number) => {
    setIsLoading(true);
    const response = await getHistory(page);
    if (response.statusCode === 200) {
      const newHistories = response.data.deposit.history;
      var pageLimit = response.data.meta.pageCount;
      if (page > pageLimit) {
        setHasMoreData(false);
        setIsLoading(false);
      } else {
        setHistories((prevHistories) => [...prevHistories, ...newHistories]);
        setCurrentPaginations(page + 1);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    userHistory(currentPage);
  }, []);

  const handleScroll = () => {
    if (
      containerRef.current &&
      containerRef.current.scrollTop + containerRef.current.clientHeight >=
        containerRef.current.scrollHeight - 20
    ) {
      userHistory(currentPage);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [currentPage, isLoading, hasMoreData]);

  return (
    <section
      className="relative p-0 overflow-auto h-screen py-40"
      ref={containerRef}
    >
      <div className="container">
        {histories.map((item: ResponseHistory, index) => (
          <HistoryComp
            key={index}
            date={item.ref_date}
            status={item.status}
            name={item.description}
            type={item.type}
            price={item.amount}
            id={item.type === 0 ? item.type : item.type}
          />
        ))}
        {isLoading && (
          <div
            ref={loadingRef}
            className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-black dark:text-white mx-auto"
            role="status"
          ></div>
        )}{" "}
        {!hasMoreData && (
          <div className="text-center text-gray-500 mt-4">
            No more data to load
          </div>
        )}
      </div>
    </section>
  );
};

export default History;
