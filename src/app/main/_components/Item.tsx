import Link from "next/link";
import { MainPageProduct } from "../_hooks/useMainPageProduct";
import Image from "next/image";
import { calculateTimeDifference } from "@/utils";

type Props = {
  item: MainPageProduct;
};
export default function Item({ item }: Props) {
  return (
    <div
      className="cursor-pointer w-full flex justify-center"
      key={item.productId}
    >
      <Link href={`/product/${item.productId}`}>
        <div className=" ">
          <div
            className="relative overflow-hidden border-[1px] rounded-lg border-light-gray 
                      md:w-[170px]
                    lg:w-[190px] h-[190px]"
          >
            <div
              className="
                      flex justify-center items-center
                      w-full h-full rounded overflow-hidden transition-transform duration-300 hover:scale-110"
            >
              <Image
                src={item.thumbnailUrl}
                alt={item.title}
                className="
                    
                      object-cover
                      shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                width={200}
                height={200}
              />
            </div>
          </div>

          <div
            className=" mt-3 text-ellipsis whitespace-nowrap break-words overflow-hidden 
                    w-[130px]
                    md:w-[120px]
                    lg:min-w-[150px]"
          >
            {item.title}
          </div>
          <div className="flex justify-between">
            <span className="font-semibold ">
              {item.price.toLocaleString()}원
            </span>
            <span className="text-text-gray text-sm">
              {calculateTimeDifference(item.createdAt)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
