"use client";

import React, { useState } from "react";
import ProductCard from "../_design/ProductCard";
import { createPortal } from "react-dom";
import ModalSmall from "../_design/ModalSmall";

import SellProductDetail from "./modal/SellProductDetail";
import useMypageSWR from "../_hooks/useMypageSWR";

type Props = {
  sellList: Product[];
  deleteProduct: (index: number) => void;
};

export default function SellHistory({ sellList, deleteProduct }: Props) {
  const { UpdateTransactionDetailStatus } = useMypageSWR();

  const [isOnlySell, setIsOnlySell] = useState<boolean>(false);
  const [isOpenProductModal, setIsOpenModal] = useState<boolean>(false);

  const [selectProduct, setSelectProduct] = useState<Product>();

  const handleDeleteProduct = (productId: number) => {
    if (confirm("정말 삭제 하실 겁니까?")) {
      deleteProduct(productId);
      setSelectProduct(undefined);
      setIsOpenModal(false);
    }
  };

  const openModalProduct = (productId: number) => {
    const select = sellList.filter((sell) => sell.id === productId)[0];
    setSelectProduct(select);
    setIsOpenModal(true);
  };

  const updateDate = () => {
    console.log("끌어 올리기");
  };

  const handleChangeProductStatus = (status: string) => {
    if (!selectProduct) return;

    UpdateTransactionDetailStatus({
      data: {
        transactionDetailsId: +selectProduct.transactionDetails!.id,
        status,
      },
      Done: () => {
        setIsOpenModal(false);
      },
    });
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
            .map((slae, key) => (
              <div
                key={key}
                className="relative cursor-pointer hmx-auto hover:scale-110 transition-all"
                onClick={() => openModalProduct(slae.id)}
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
          selectProduct &&
          createPortal(
            <ModalSmall
              title={selectProduct.title}
              onClose={() => setIsOpenModal(false)}
            >
              <SellProductDetail
                product={selectProduct}
                chnageStatus={handleChangeProductStatus}
                deleteProduct={handleDeleteProduct}
                updateDate={updateDate}
              />
            </ModalSmall>,
            document.body
          )}
      </div>
    </div>
  );
}
