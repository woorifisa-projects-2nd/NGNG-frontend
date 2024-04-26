"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import useMainPageProductSWR from "./_hooks/useMainPageProduct";
import Item from "./_components/Item";
import Up from "./_design/SVG/ArrowCircleUp.svg";

export default function Main() {
  const { data, isLoading } = useMainPageProductSWR();
  const [count, setCount] = useState(1);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 스크롤링되도록 함
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => ((prevCount + 1) % 7) + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading || data === undefined) {
    return (
      <div className="w-full px-5 md:px-32 flex justify-center">
        <div className="w-full pb-20">
          <div className="relative w-full overflow-hidden rounded-lg md:pt-20 flex justify-center">
            <div>
              <div
                className="w-full lg:min-h-40 lg:max-w-5xl bg-transparent 
            flex items-center justify-center h-48 bg-gray-300 rounded dark:bg-gray-700"
              >
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
              <div className="max-w-[1024px] w-full">
                <h2 className="w-full text-xl font-medium my-5">최신 상품</h2>
                <div
                  className="w-full grid grid-cols-2 gap-y-10  
          md:grid-cols-3 md:gap-7
          
          lg:grid-cols-4 lg:gap-4 lg:gap-y-20"
                >
                  {new Array(8).fill(0).map((item) => {
                    return (
                      <div className="">
                        <div
                          className="relative overflow-hidden
                      md:w-[170px]
                    lg:w-[190px] h-[190px]
                    
                    w-full lg:min-h-40 lg:max-w-5xl bg-transparent 
            flex items-center justify-center 8 bg-gray-300 rounded dark:bg-gray-700
                    
                    "
                        >
                          <svg
                            className="w-10 h-10 text-gray-200 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18"
                          >
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                          </svg>
                        </div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 my-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700  w-48 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700  w-48 mb-2.5"></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-5 md:px-32 flex justify-center">
      <div className="pb-20">
        <div className="relative w-full overflow-hidden rounded-lg md:pt-20 flex justify-center">
          <Image
            alt="배너"
            src={`/banners/${count}.jpg`}
            width={1024}
            height={320}
            className="w-full lg:min-h-40 lg:max-w-5xl bg-transparent rounded-lg"
          />
        </div>
        <div className="max-w-[1024px] w-full">
          <h2 className="w-full text-xl font-medium my-5">최신 상품</h2>
          <div
            className="w-full grid grid-cols-2 gap-y-10  
          md:grid-cols-3 md:gap-7
          
          lg:grid-cols-4 lg:gap-4 lg:gap-y-20"
          >
            {data.map((item) => {
              return <Item item={item} key={item.productId} />;
            })}
          </div>
        </div>
        <Up
          className="fixed bottom-10 right-10 cursor-pointer fill-black dark:fill-white z-10"
          onClick={scrollToTop}
        />
      </div>
    </div>
  );
}
