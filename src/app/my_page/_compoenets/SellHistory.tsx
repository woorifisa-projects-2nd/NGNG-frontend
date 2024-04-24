"use client";

import React, { useState } from "react";
import ProductCard from "../_design/ProductCard";
import { createPortal } from "react-dom";
import ModalSmall from "../_design/ModalSmall";

import SellProductDetail from "./modal/SellProductDetail";
import useMypageSWR from "../_hooks/useMypageSWR";
import ModalLarge from "../_design/ModalLarge";
import { updateProductPurchaseById } from "../_api/api";

type Props = {
  sellList: Product[];
  deleteProduct: (index: number) => void;
};

export default function SellHistory({ sellList, deleteProduct }: Props) {
  const [isOnlySell, setIsOnlySell] = useState<boolean>(false);
  const [isOpenProductModal, setIsOpenModal] = useState<boolean>(false);

  const [selectIndex, setSelectIndex] = useState<number>();

  const handleDeleteProduct = (productId: number) => {
    if (confirm("정말 삭제 하실 겁니까?")) {
      deleteProduct(productId);
      setIsOpenModal(false);
    }
  };

  const updateDate = async () => {
    if (!selectIndex) return;

    const data = (await updateProductPurchaseById(
      sellList[selectIndex].id
    )) as string;

    if (+data == sellList[selectIndex].id) {
      alert("상품의 게시 시간을 갱신 하였습니다.");
    }
  };

  return (
    <div>
      <div className="inline-flex ">
        <input
          className="cursor-pointer"
          type="checkbox"
          name="sell"
          id="sell"
          onChange={(e) => setIsOnlySell(e.target.checked)}
        />
        <label className="cursor-pointer px-2" htmlFor="sell">
          판매 글만 보기
        </label>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 p-2 gap-4 md:grid-cols-4">
        {sellList &&
          sellList
            .filter((item) =>
              isOnlySell ? !item.transactionDetails?.status?.status : true
            )
            .map((slae, index) => (
              <div
                key={index}
                className="relative cursor-pointer hmx-auto hover:scale-110 transition-all"
                onClick={() => {
                  setIsOpenModal(true);
                  setSelectIndex(index);
                }}
              >
                <ProductCard
                  imageSrc={
                    slae.thumbnail
                      ? slae.thumbnail.thumbnailURL
                      : `https://source.unsplash.com/user/max_duz/300x300`
                  }
                  title={slae.title}
                  status={slae.transactionDetails?.status?.status || "판매중"}
                  price={slae.price}
                />
              </div>
            ))}
        {isOpenProductModal &&
          createPortal(
            <ModalLarge
              title={sellList[selectIndex!].title}
              onClose={() => setIsOpenModal(false)}
            >
              <SellProductDetail
                product={sellList[selectIndex!]}
                deleteProduct={handleDeleteProduct}
                updateDate={updateDate}
              />
            </ModalLarge>,
            document.body
          )}
      </div>
    </div>
  );
}
