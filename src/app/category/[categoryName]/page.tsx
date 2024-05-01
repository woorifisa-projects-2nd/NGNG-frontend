"use client";

import DefaultLayout from "@/components/layouts/DefaultLayout";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import EachProduct from "./product";
import Pagination from "./pagination";
import { categories } from "@/components/layouts/header/Header"

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

interface minAndMaxPrice {
  minPrice: number,
  maxPrice: number
};

export default function CategorySearch() {

  const path = usePathname();
  const [page, setPage] = useState<number>(0);
  const [products, setProducts] = useState<product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalHits, setTotalHits] = useState<number>(0);
  const [nowPageTable, setNowPageTable] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("new");
  const [showProducts, setShowProducts] = useState<product[]>([]);
  const [forSale, setForSale] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [minAndMaxPrice, setMinAndMaxPrice] = useState<minAndMaxPrice>({ minPrice: 0, maxPrice: Number.MAX_SAFE_INTEGER });

  console.log(path);
  const category = categories.filter(category => category.link === path)[0].name;

  const pageSize = 5;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const isNextDisabled = nowPageTable + pageSize > totalPages;
  const isPreviousDisabled = nowPageTable == 0;

  useEffect(() => {

    const search = async () => {

      const url = `/api${path}${page}`; // path : /category/{categoryName}
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      };

      fetch(url, options)
        .then(res => res.json())
        .then(json => {
          setProducts(json.products.content);
          setShowProducts(json.products.content);
          setTotalPages(json.products.totalPages);
          setTotalHits(json.products.totalElements);
        });
    };

    search();
  }, [page]); // 각 페이지별로 api 받아오는 useEffect

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

  useEffect(() => {

    // 원래는 다시 fetch를 보내서 재정렬시켜야하지만 일단 이걸로 대체
    const filterAndSort = () => {

      const filtedProducts: product[] = products;

      let sortedProducts: product[];

      if (sortBy === "new") {

        sortedProducts = filtedProducts.slice();
      } else if (sortBy === "lowPrice") {

        sortedProducts = [...filtedProducts].sort((a, b) => a.price - b.price);
      } else if (sortBy === "highPrice") {

        sortedProducts = [...filtedProducts].sort((a, b) => b.price - a.price);
      } else {

        sortedProducts = filtedProducts;
      }

      let onSaleProducts: product[];

      if (forSale) {

        onSaleProducts = sortedProducts.filter(product => product.forSale);
        setTotalHits(onSaleProducts.length);
      } else {

        onSaleProducts = sortedProducts;
        setTotalHits(onSaleProducts.length);
      }

      let priceRangeProducts: product[] = onSaleProducts.filter(product => product.price >= minAndMaxPrice?.minPrice && product.price <= minAndMaxPrice?.maxPrice);

      setShowProducts(priceRangeProducts);
    }

    filterAndSort();
  }, [sortBy, forSale, minAndMaxPrice]);

  const setPriceRange = () => {

    let priceRange: minAndMaxPrice;

    if (minPrice !== undefined && maxPrice !== undefined) {

      priceRange = {
        minPrice: minPrice,
        maxPrice: maxPrice
      };
    } else if (minPrice === undefined && maxPrice !== undefined) {

      priceRange = {
        minPrice: 0,
        maxPrice: maxPrice
      };
    } else if (minPrice !== undefined && maxPrice === undefined) {

      priceRange = {
        minPrice: minPrice,
        maxPrice: Number.MAX_SAFE_INTEGER
      };
    } else {

      priceRange = {
        minPrice: 0,
        maxPrice: Number.MAX_SAFE_INTEGER
      }
    }

    setMinAndMaxPrice(priceRange);
  };

  return (
    <DefaultLayout>
      <div className="flex mx-auto justify-center">
        <div className="flex-col mt-8">
          <div className="flex items-end">
            <div>
              <span className="text-3xl mr-4 text-point-color font-semibold">{category}</span>
            </div>
            <div>
              <span className="text-lg">총 </span>
              <span className="text-xl text-point-color">{totalHits}</span>
              <span className="text-lg">개</span>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="flex items-end">
              <div>
                <button type="button" className={
                  forSale
                    ? "px-4 py-1 w-fit text-center border border-point-color rounded text-point-color"
                    : "px-4 py-1 w-fit text-center text-[#272727] border border-[#272727] rounded active:border-point-color active:text-point-color active:border-2"} onClick={() => setForSale(!forSale)}>거래가능만 보기</button>
              </div>
            </div>
            <div className="flex-col justify-end">
              <div className="grid grid-cols-3 place-items-end">
                <div>
                  <input type="radio" id="new" name="sortBy" value="new" className="peer hidden" checked={sortBy === 'new'} onChange={e => setSortBy(e.target.value)} />
                  <label htmlFor="new" className="flex cursor-pointer mr-2 peer-checked:text-point-color peer-checked:font-bold">
                    <span className="text-base">최신순</span>
                  </label>
                </div>
                <div>
                  <input type="radio" id="lowPrice" name="sortBy" value="lowPrice" className="peer hidden" checked={sortBy === 'lowPrice'} onChange={e => setSortBy(e.target.value)} />
                  <label htmlFor="lowPrice" className="flex cursor-pointer mr-2 peer-checked:text-point-color peer-checked:font-bold">
                    <span className="text-base">낮은가격순</span>
                  </label>
                </div>
                <div>
                  <input type="radio" id="highPrice" name="sortBy" value="highPrice" className="peer hidden" checked={sortBy === 'highPrice'} onChange={e => setSortBy(e.target.value)} />
                  <label htmlFor="highPrice" className="flex cursor-pointer peer-checked:text-point-color peer-checked:font-bold">
                    <span className="text-base">높은가격순</span>
                  </label>
                </div>
              </div>
              <div className="mt-2">
                <input type="number" placeholder="최소가격" value={minPrice} onChange={e => setMinPrice(parseInt(e.target.value))}
                  className="border rounded border-[#272727] px-1 py-1" />
                <span> - </span>
                <input type="number" placeholder="최대가격" value={maxPrice} onChange={e => setMaxPrice(parseInt(e.target.value))}
                  className="border rounded border-[#272727] px-1 py-1 mr-2" />
                <button type="button" onClick={setPriceRange}
                  className="border rounded px-1 py-1 border-[#272727] active:border-point-color active:text-point-color">적용</button>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-4">
            <div className="grid md:grid-cols-4 grid-cols-1 gap-x-10 gap-y-10">
              {showProducts?.map((product) => (
                <EachProduct product={product} key={product.productId} />
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center mt-6">
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
      </div>
    </DefaultLayout >
  );
}
