"use client";

import React, { useState } from "react";
import ProductCard from "../_design/ProductCard";
import { createPortal } from "react-dom";
import ModalSmall from "../_design/ModalSmall";

type Props = {
  sellList: Product[];
  deleteProduct: (index: number) => void;
  updateTransactionStatus: (p: UpdateTransDetiilsFunctionParameter) => void;
};

export default function SellHistory({
  sellList,
  deleteProduct,
  updateTransactionStatus,
}: Props) {
  const [isOnlySell, setIsOnlySell] = useState<boolean>(false);
  const [isOpenProductModal, setIsOpenModal] = useState<boolean>(false);

  const [selectProduct, setSelectProduct] = useState<Product>();

  const [productStatus, setProductStatus] = useState<number>(0);

  const PRODUCT_STATUS = [
    "입금 대기",
    "입금 완료",
    "배송중",
    "배송완료",
    "거래완료",
    "거래 취소",
  ];

  const onDeleteProduct = (productId: number) => {
    if (confirm("정말 삭제 하실 겁니까?")) {
      deleteProduct(productId);
      setSelectProduct(undefined);
      setIsOpenModal(false);
    }
  };

  const openModalProduct = (productId: number) => {
    const select = sellList.filter((sell) => sell.productId === productId)[0];
    setSelectProduct(select);
    setProductStatus(select?.transactionDetails?.status?.id - 1 || 0);
    setIsOpenModal(true);
  };

  const updateDate = () => {
    console.log("끌어 올리기");
  };

  const changeProductStatus = () => {
    if (!selectProduct) return;

    console.log(productStatus + 1 + "");

    const updateStatus = productStatus + 1 + "";

    updateTransactionStatus({
      data: {
        transactionDetailsId:
          +selectProduct?.transactionDetails.transactionDetailsId,
 
        status: updateStatus,
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
              isOnlySell ? !item.transactionDetails.status?.status : true
            )
            .map((slae, key) => (
              <div
                key={key}
                className="relative cursor-pointer hmx-auto hover:scale-110 transition-all"
                onClick={() => openModalProduct(slae.productId)}
              >
                <ProductCard
                  imageSrc="https://source.unsplash.com/user/max_duz/300x300"
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
              <div>{selectProduct.title}</div>
              <div className="flex gap-2 flex-col">
                <button
                  type="button"
                  className={` bg-green-900 rounded-md p-2 inline-flex items-center justify-center text-gray-200 hover:text-gray-100 hover:bg-green-700 `}
                  onClick={() => updateDate()}
                >
                  끌어올리기
                </button>
                {selectProduct.transactionDetails?.status?.status ? (
                  //  거래 성사 된 상품일시
                  <>
                    <select
                      value={productStatus}
                      onChange={(e) => setProductStatus(+e.target.value)}
                    >
                      {PRODUCT_STATUS.map((value, key) => (
                        <option
                          className="disabled:text-red-500"
                          key={key}
                          value={key}
                          disabled={
                            key < selectProduct.transactionDetails.status.id - 1
                          }
                        >
                          {value}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className={` bg-blue-900 rounded-md p-2 inline-flex items-center justify-center text-gray-200 hover:text-gray-100 hover:bg-blue-700 `}
                      onClick={() => changeProductStatus()}
                    >
                      상태변경
                    </button>
                  </>
                ) : (
                  //  거래 중인 상품일시
                  <button
                    type="button"
                    className={` bg-red-900 rounded-md p-2 inline-flex items-center justify-center text-gray-200 hover:text-gray-100 hover:bg-red-700 `}
                    onClick={() => onDeleteProduct(selectProduct.productId)}
                  >
                    삭제버튼
                  </button>
                )}
              </div>
            </ModalSmall>,
            document.body
          )}
      </div>
    </div>
  );
}
