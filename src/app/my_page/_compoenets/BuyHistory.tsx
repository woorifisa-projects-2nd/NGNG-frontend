import React, { useState } from "react";
import ProductCard from "../_design/ProductCard";

import { createPortal } from "react-dom";
import ModalLarge from "../_design/ModalLarge";

import BuyProductDetails from "./modal/BuyProductDetails";

type Props = {
  buyList: TransactionDetails[];
};

export default function BuyHistory({ buyList }: Props) {
  const [isOpenProductModal, setIsOpenModal] = useState<boolean>(false);

  const [selectIndex, setSelectIndex] = useState<number>();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 p-2 gap-2 md:grid-cols-4">
      {buyList &&
        buyList.map((buy, index) => (
          <div
            key={index}
            className="cursor-pointer hover:scale-110 transition-all"
            onClick={() => {
              setIsOpenModal(true);
              setSelectIndex(index);
            }}
          >
            <ProductCard
              imageSrc={buy.product.thumbnail.thumbnailURL}
              title={buy.product.title}
              status={buy.status.status}
              price={buy.product.price}
            />
          </div>
        ))}
      {isOpenProductModal &&
        createPortal(
          <ModalLarge
            title={buyList[selectIndex!].product.title}
            onClose={() => setIsOpenModal(false)}
          >
            <BuyProductDetails
              transactionDetails={buyList[selectIndex!]}
              // chnageStatus={handleChangeTransactionStatus}
            />
          </ModalLarge>,
          document.body
        )}
    </div>
  );
}
