import Image from "next/image";
import React from "react";
import { formatKRW } from "../_utils/format";

export default function ProductCard({
  status,
  imageSrc,
  title,
  price,
}: {
  status: string;
  imageSrc: string;
  title: string;
  price: number;
}) {
  return (
    <div>
      <p>{status}</p>
      <Image
        className="rounded-md shadow-xl my-2"
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
