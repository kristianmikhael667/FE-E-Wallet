import { useEffect } from "react";
import { HistoryComp } from "../components";
import { getHistory } from "@/utils/api/history/api";
import { atom, useAtom } from "jotai";
import { ResponseHistory } from "@/utils/api/history/types";
import { Link } from "react-router-dom";

const historyAtom = atom<ResponseHistory[]>([]);
const currentPageAtom = atom(1);
const paginationAtom = atom(0);

const History = () => {
  const [histories, setHistories] = useAtom(historyAtom);
  const [currentPage, setCurrentPaginations] = useAtom(currentPageAtom);
  const [pagination, setPaginations] = useAtom(paginationAtom);
  // const itemsPerPage = 10;

  const userHistory = async () => {
    const response = await getHistory();
    if (response.statusCode === 200) {
      setHistories(response.data.deposit.history);
      setPaginations(response.data.meta.total_pages);
    }
  };

  useEffect(() => {
    userHistory();
  }, [currentPage]);

  const nextPrevPaginate = (e: any) => {
    setCurrentPaginations(e.target.textContent);
  };

  const onNextClick = () => {
    if (currentPage < pagination) {
      setCurrentPaginations(pagination);
    }
  };

  const onPrevClick = () => {
    if (currentPage > 1) {
      setCurrentPaginations((prev) => prev - 1);
    }
  };

  return (
    <section className="relative p-0 overflow-auto h-screen py-40">
      <div className="container">
        {histories.map((item: ResponseHistory) => (
          <HistoryComp
            key={item.ledger_id}
            date={item.ref_date}
            status={item.status}
            name={item.description}
            type={item.type}
            price={item.amount}
            id={item.type === 0 ? item.type : item.type}
          />
        ))}
      </div>
      <nav aria-label="Page navigation example" className="mt-5">
        <ul className="flex items-center gap-4 justify-center -space-x-px h-10 text-base">
          <li>
            <Link
              to="#"
              onClick={onPrevClick}
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </Link>
          </li>
          {pagination &&
            [...Array(pagination)].map((_, index) => {
              return (
                <li key={index}>
                  <Link
                    to="#"
                    onClick={(e) => nextPrevPaginate(e)}
                    className={`flex items-center justify-center px-4 h-10 leading-tight text-black border rounded-xl hover:bg-gray-100 hover:text-gray-700 active:bg-white ${
                      index + 1 == currentPage ? `bg-primary-first` : `bg-white`
                    }`}
                  >
                    {index + 1}
                  </Link>
                </li>
              );
            })}

          <li>
            <Link
              to="#"
              onClick={onNextClick}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default History;
