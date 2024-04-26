"use client";
import Image from "next/image";
import Loading from "@/assets/Loading.svg";
import { useEffect, useState } from "react";
import useMainPageProductSWR from "./_hooks/useMainPageProduct";
import Item from "./_components/item";

export default function Main() {
  const { data, isLoading } = useMainPageProductSWR();

  const [count, setCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => ((prevCount + 1) % 7) + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading || data === undefined) {
    return (
      <div className="flex justify-center h-[calc(100vh-128px)]">
        <Loading />
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
      </div>
    </div>
  );
}
