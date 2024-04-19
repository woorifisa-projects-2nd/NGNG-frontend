import Image from "next/image";
import React from "react";
import { formatKRW } from "../_utils/format";

type Props = {
  status: string;
  imageSrc: string;
  title: string;
  price: number;
};

export default function ProductCard({ status, imageSrc, title, price }: Props) {
  return (
    <div className="max-w-[200px] border rounded-lg p-2">
      <p className="float-right">{status}</p>
      <Image
        className="rounded-md shadow-xl my-2 object-contain object-center w-full  h-[100px] "
        src={imageSrc}
        width={200}
        height={100}
        alt="상품 이미지"
      />
      <p>{title}</p>
      <p>{formatKRW(price)} 원</p>
    </div>
  );
}
