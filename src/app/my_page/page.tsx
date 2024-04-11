"use client";
import React, { Suspense, useEffect, useState } from "react";
import MyInfo from "./_compoenets/MyInfo";
import useMypage from "./_hooks/useMypage";
import SellHistory from "./_compoenets/SellHistory";
import BuyHistory from "./_compoenets/BuyHistory";
import PointHistory from "./_compoenets/PointHistory";
import { createPortal } from "react-dom";
import PointModalContent from "./_compoenets/modal/PointModalContent";
import ModalSmall from "./_design/ModalSmall";

export default function Page() {
  const { userInfo, setPoint, deleteProduct, UpdateTransactionDetailStatus } =
    useMypage();

  const [activeMenuNumber, setMewnuNumber] = useState<number>(0);

  const [isOpenPointModal, setPointModal] = useState(false);

  const [refreshPointerHistroy, setRRefreshPointerHistory] = useState(
    Math.random() * 100
  );

  const handleChangePoint = (point: IPointHistory) => {
    setPoint(point.cost);

    setRRefreshPointerHistory(Math.random() * 100);
  };

  const handlerDelteProduct = (productId: number) => {
    deleteProduct(productId);
  };

  const handlerUpdateTransactionStatus = (
    data: UpdateTransDetiilsFunctionParameter
  ) => {
    UpdateTransactionDetailStatus(data);
  };

  //   추후 Suspense 로바꾸면 좋을거 같음
  if (!userInfo) return <div>로딩중..</div>;

  return (
    <div className="max-w-[1248px] flex-col justify-center mx-auto p-4">
      {/* 사용자 정보 부분 */}
      <MyInfo userInfo={userInfo} openModalPoint={() => setPointModal(true)} />

      {/* 콘텐츠 버튼 ( 판매 , 구매 , 포인트 내역 )  */}
      <div className="hidden md:block">
        <div className="md:flex  text-[1.5rem] text-center ">
          {["판매", "구매", "포인트"].map((item, key) => (
            <div
              className={`grow-[1] cursor-pointer p-4 transition-all border-b-2 border-b-black border-opacity-20 ${
                activeMenuNumber === key
                  ? " !border-b-purple-600 text-purple-600"
                  : ""
              }`}
              key={key}
              onClick={() => setMewnuNumber(key)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      {/* 쿤텐츠 영역 */}
      <div className="hidden md:block">
        {activeMenuNumber === 0 ? (
          <SellHistory
            sellList={userInfo.sellList}
            updateTransactionStatus={handlerUpdateTransactionStatus}
            deleteProduct={handlerDelteProduct}
          />
        ) : activeMenuNumber === 1 ? (
          <BuyHistory buyList={userInfo.buyList} />
        ) : (
          <PointHistory key={refreshPointerHistroy} />
        )}
      </div>
      {/* 모달 부분 */}
      {isOpenPointModal &&
        createPortal(
          <ModalSmall title="Point 충전" onClose={() => setPointModal(false)}>
            <PointModalContent
              point={userInfo.point}
              changePoint={handleChangePoint}
            />
          </ModalSmall>,
          document.body
        )}
    </div>
  );
}
