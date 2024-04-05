import React from "react";
import ProductCard from "./ProductCard";

export default function BuyHistory({
  buyList,
}: {
  buyList: TransactionDetails[];
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 p-2 gap-2 md:grid-cols-4">
      {buyList &&
        buyList.map((buy, key) => (
          <div key={key}>
            <ProductCard
              imageSrc="https://source.unsplash.com/user/max_duz/300x300"
              title={buy.product.title}
              status={buy.status.status}
              price={buy.product.price}
            />
          </div>
        ))}
    </div>
  );
}
