import { product } from "./page";
import Image from "next/image";
import Link from "next/link";
import { calculateTimeDifference } from "@/utils";

type Product = {
  product: product
};

export default function EachProduct({ product }: Product) {

  return (
    <div className="cursor-pointer w-full flex justify-center" key={product.productId}>
      <Link href={`/product/${product.productId}`}>
        <div className=" ">
          <div className="relative overflow-hidden  rounded-lg md:w-[170px] lg:w-[190px] h-[190px]">
            <div className="flex justify-center products-center w-full h-full rounded overflow-hidden transition-transform duration-300 hover:scale-110">
              <Image
                src={product.thumbnailUrl}
                alt={product.title}
                className="object-cover shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                width={200}
                height={200}
              />
            </div>
          </div>
          <div className="mt-3 text-ellipsis whitespace-nowrap break-words overflow-hidden  w-[130px] md:w-[120px] lg:min-w-[150px]">
            {product.title}
          </div>
          <div className="flex justify-between">
            <span className="font-semibold ">
              {product.price.toLocaleString()}원
            </span>
            <span className=" text-sm">
              {calculateTimeDifference(product.createdAt.toString())}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}