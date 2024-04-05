"use client";

import React from "react";
import ProductCard from "./ProductCard";

export default function SellHistory({ sellList }: { sellList: Product[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 p-2 gap-2 md:grid-cols-4">
      {sellList &&
        sellList.map((slae, key) => (
          <div key={key}>
            <ProductCard
              imageSrc="https://source.unsplash.com/user/max_duz/300x300"
              title={slae.title}
              status={slae.transactionDetails.status?.status || "판매중"}
              price={slae.price}
            />
          </div>
        ))}
    </div>
  );
}
