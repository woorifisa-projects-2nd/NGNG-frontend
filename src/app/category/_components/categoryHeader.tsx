import React from "react";

interface minAndMaxPrice {
  minPrice: number;
  maxPrice: number;
}

type CategoryHeaderProps = {
  category: string;
  totalHits: number;
  setForSale: React.Dispatch<React.SetStateAction<boolean>>;
  forSale: boolean;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  minPrice: number | undefined;
  setMinPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
  maxPrice: number | undefined;
  setMaxPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
  setMinAndMaxPrice: React.Dispatch<React.SetStateAction<minAndMaxPrice>>;
}

export default function CategoryHeader({
  category,
  totalHits,
  setForSale,
  forSale,
  sortBy,
  setSortBy,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  setMinAndMaxPrice
}: CategoryHeaderProps) {

  const setPriceRange = () => {
    let priceRange: minAndMaxPrice;

    if (minPrice !== undefined && maxPrice !== undefined) {
      priceRange = {
        minPrice: minPrice,
        maxPrice: maxPrice,
      };
    } else if (minPrice === undefined && maxPrice !== undefined) {
      priceRange = {
        minPrice: 0,
        maxPrice: maxPrice,
      };
    } else if (minPrice !== undefined && maxPrice === undefined) {
      priceRange = {
        minPrice: minPrice,
        maxPrice: Number.MAX_SAFE_INTEGER,
      };
    } else {
      priceRange = {
        minPrice: 0,
        maxPrice: Number.MAX_SAFE_INTEGER,
      };
    }

    setMinAndMaxPrice(priceRange);
  };


  return (
    <>
      <div className="flex items-end">
        <div>
          <span className="text-3xl mr-4 text-point-color font-semibold">
            {category}
          </span>
        </div>
        <div>
          <span className="text-lg">
            총 <span className="text-xl text-point-color">{totalHits}</span>
            개
          </span>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex items-end">
          <div>
            <div>
              <button type="button" className={
                forSale
                  ? "px-4 py-1 w-fit text-center border border-point-color rounded text-point-color"
                  : "px-4 py-1 w-fit text-center text-[#272727] border border-[#272727] rounded active:border-point-color active:text-point-color active:border-2"} onClick={() => setForSale(!forSale)}>
                거래가능만 보기
              </button>
            </div>
          </div>
        </div>
        <div className="flex-col justify-end">
          <div className="flex justify-end items-center gap-2">
            <div className="hover:bg-light-gray/50">
              <input
                type="radio"
                id="new"
                name="sortBy"
                value="new"
                className="peer hidden "
                checked={sortBy === "new"}
                onChange={(e) => setSortBy(e.target.value)}
              />
              <label
                htmlFor="new"
                className=" flex cursor-pointer  peer-checked:text-point-color peer-checked:font-bold text-center"
              >
                <span className=" text-base text-center">최신순</span>
              </label>
            </div>
            <div className="hover:bg-light-gray/50  ">
              <input
                type="radio"
                id="lowPrice"
                name="sortBy"
                value="lowPrice"
                className="peer hidden"
                checked={sortBy === "lowPrice"}
                onChange={(e) => setSortBy(e.target.value)}
              />
              <label
                htmlFor="lowPrice"
                className="flex  cursor-pointer mr-2 peer-checked:text-point-color peer-checked:font-bold"
              >
                <span className="text-base ">낮은가격순</span>
              </label>
            </div>
            <div className="hover:bg-light-gray/50  ">
              <input
                type="radio"
                id="highPrice"
                name="sortBy"
                value="highPrice"
                className="peer hidden"
                checked={sortBy === "highPrice"}
                onChange={(e) => setSortBy(e.target.value)}
              />
              <label
                htmlFor="highPrice"
                className="flex cursor-pointer peer-checked:text-point-color peer-checked:font-bold"
              >
                <span className="text-base">높은가격순</span>
              </label>
            </div>
          </div>
          <div className="mt-2">
            <input
              type="number"
              min="0"
              placeholder="최소가격"
              value={minPrice}
              onChange={(e) => setMinPrice(parseInt(e.target.value))}
              className="border rounded border-[#272727]  p-1 px-2"
            />
            <span> - </span>
            <input
              type="number"
              min="0"
              placeholder="최대가격"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="border rounded border-[#272727] p-1 px-2 mr-2 focus:ring-0 "
            />
            <button
              type="button"
              onClick={setPriceRange}
              className="hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] 
                  border rounded px-1 py-1 border-[#272727] active:border-point-color active:text-point-color"
            >
              적용
            </button>
          </div>
        </div>
      </div>
    </>
  );
}