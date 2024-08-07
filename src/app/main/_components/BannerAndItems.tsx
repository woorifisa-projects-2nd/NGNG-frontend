import Image from "next/image";

import { MainPageProduct } from "../_hooks/useMainPageProduct";
import Item from "./Item";

type Props = {
  dataChunk: MainPageProduct[];
  index: number;
};
export default function BannerAndItems({ dataChunk, index }: Props) {
  return (
    <>
      <div
        className=" w-full rounded-lg md:py-20 flex justify-center"
        key={index}
      >
        <Image
          alt="배너"
          priority={index % 7 === 0}
          src={`/banners/${(index % 7) + 1}.jpg`}
          width={1024}
          height={320}
          className="w-full lg:min-h-40 lg:max-w-5xl rounded-lg"
        />
      </div>
      {index === 0 && <h2 className=" text-xl font-medium my-5">최신 상품</h2>}
      <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-10">
        {dataChunk.map((item) => (
          <Item item={item} key={item.productId} />
        ))}
      </div>
    </>
  );
}
