"use client";

import DefaultLayout from "@/components/layouts/DefaultLayout";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import EachProduct from "./product";
import Pagination from "./pagination";

export interface product {
  id: string,
  productId: number,
  title: string,
  content: string,
  category: string,
  tags: string[],
  thumbnailUrl: string,
  createdAt: Date,
  updatedAt: Date,
  refreshedAt: Date,
  discountable: boolean,
  forSale: boolean,
  escrow: boolean,
  price: number
};

export default function SearchKeyword() {

  const path = usePathname();
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState<product[]>();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [nowPageTable, setNowPageTable] = useState<number>(0);

  const pageSize = 5;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const isNextDisabled = nowPageTable + pageSize > totalPages;
  const isPreviousDisabled = nowPageTable == 0;

  useEffect(() => {

    const search = async () => {

      const url = `/api/${path}${page}`; // path : /search/{keyword}/
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      };

      fetch(url, options)
        .then(res => res.json())
        .then(json => {
          setProducts(json.products);
          setTotalPages(json.totalPages);
        });
    };

    search();
  }, [page]);

  const handlePreviousPage = () => {

    if (nowPageTable !== 0) {

      setPage(nowPageTable - pageSize);
      setNowPageTable(nowPageTable - pageSize);
    }
  };

  const handleNextPage = () => {

    if (nowPageTable + pageSize < totalPages) {

      setPage(nowPageTable + pageSize);
      setNowPageTable(nowPageTable + pageSize);
    }
  };
  // TODO: 검색 필터링 구현
  return (
    <DefaultLayout>
      <div className="flex-col">
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-4 gap-x-10 gap-y-10">
            {products?.map((product) => (
              <EachProduct product={product} key={product.productId} />
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div>
            <button onClick={handlePreviousPage}
              disabled={isPreviousDisabled}
              className="hidden md:flex w-8 h-8 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-[#3B3B3B] text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600">
              {"<"}</button>
          </div>
          <div className="flex">
            {pages.slice(nowPageTable, nowPageTable + pageSize).map(page => <Pagination page={page} setPage={setPage} key={page} />)}
          </div>
          <div>
            <button onClick={handleNextPage}
              disabled={isNextDisabled}
              className="hidden md:flex w-8 h-8 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white dark:bg-[#3B3B3B] text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600">
              {">"}</button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
