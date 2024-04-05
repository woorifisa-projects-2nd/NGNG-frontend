"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SellHistory from "./SellHistory";
import BuyHistory from "./BuyHistory";
import PointHistory from "./PointHistory";
import { USER_ID } from "../_constants/user";
import { formatKRW } from "../_utils/format";
import PointSVG from "../_design/SVG/PointSVG";
import AccountSVG from "../_design/SVG/AccountSVG";
import EmailSVG from "../_design/SVG/EmailSVG";
import AddressSVG from "../_design/SVG/AddressSVG";
import ProductSVG from "../_design/SVG/ProductSVG";
import BuySVG from "../_design/SVG/BuySVG";
import ModalSmall from "../_design/ModalSmall";
import { createPortal } from "react-dom";
import PointModalContent from "./modal/PointModalContent";

export default function MyInfo() {
  const [info, setInfo] = useState<UserGetReposne>();
  const [activeMenuNumber, setMewnuNumber] = useState<number>(0);

  const [isOpenPointModal, setPointModal] = useState(false);

  const [refreshPointerHistroy, setRRefreshPointerHistory] = useState(
    Math.random() * 100
  );

  useEffect(() => {
    fetch(`/api/user/mypage/${USER_ID}`)
      .then((res) => res.json())
      .then((data: UserGetReposne) => {
        data.sellList.sort((item1, item2) => {
          const status1 = item1.transactionDetails?.status?.id || 0;
          const status2 = item2.transactionDetails?.status?.id || 0;

          // 숫자 값 비교
          return status1 - status2;
        });

        setInfo(data);
      });
  }, []);

  const handleChangePoint = (point: IPointHistory) => {
    setInfo((prev: any) => ({
      ...prev,
      point: point.cost,
    }));

    setRRefreshPointerHistory(Math.random() * 100);
  };

  const openModal = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    setPointModal(true);
  };

  //   추후 Suspense 로바꾸면 좋을거 같음
  if (!info) return <div>로딩중</div>;

  return (
    <div className="max-w-[1248px] flex-col justify-center mx-auto p-4">
      {/* 사용자 정보 부분 */}
      <div className=" flex flex-col mx-auto   justify-center items-center my-2 gap-4 md:flex-row md:gap-10 md:my-10">
        {/* 이미지 */}
        <div>
          <Image
            className="rounded-full"
            src={"https://source.unsplash.com/user/max_duz/300x300"}
            width={300}
            height={300}
            alt="사용자 이미지"
          />
        </div>
        {/* 닉네임 & 정보 & 기타 */}
        <div>
          {/* 닉네임 & 로그아웃 */}
          <div className="flex flex-col items-center relative gap-2 my-2 md:flex-row md:items-center md:gap-4 md:mb-4 md:border-b-2 md:border-black md:border-opacity-20">
            <p className="font-bold text-[2rem]">{info.name}</p>
            <p className="text-black text-opacity-45">닉네임 변경하기</p>
            <button className="block absolute right-0 bottom-0 border p-2 border-black md:bottom-[25%] ">
              로그아웃
            </button>
          </div>
          {/* 정보 & 기타 */}
          <div className="flex flex-col md:flex-row gap-4 ">
            {/* 정보 */}
            <div className="flex flex-col gap-2 w-[80vw] max-w-[480px] md:w-auto">
              <div className="flex m-1 flex-wrap">
                <PointSVG />
                <p
                  className="w-[5rem] cursor-pointer md:pointer-events-none"
                  onClick={openModal}
                >
                  포인트
                </p>
                <p>{formatKRW(info.point)}</p>
              </div>
              <div className="flex m-1 flex-wrap  ">
                <AccountSVG />
                <p className="w-[5rem] ">계좌번호</p>
                <p>{info.accountNumber}</p>
              </div>
              <div className="flex m-1 flex-wrap">
                <EmailSVG />
                <p className="w-[5rem] ">이메일</p>
                <p>{info.email}</p>
              </div>
              <div className="flex m-1 flex-wrap">
                <AddressSVG />
                <p className="w-[5rem] ">배송지</p>
                <p>{info.address}</p>
              </div>
              <div className="flex m-1 flex-wrap">
                <ProductSVG />
                <p className="w-[5rem] ">상품 판매</p>
                <p>{info.sellList.length}</p>
              </div>
              <div className="flex m-1 flex-wrap">
                <BuySVG />
                <p className="w-[5rem]"> 상품 구매</p>
                <p>{info.buyList.length}</p>
              </div>
            </div>
            {/* 기타 */}
            <div className="hidden w-[80vw] max-w-[480px] gap-4 text-black text-opacity-45 md:block md:w-auto md:flex md:flex-col md:justify-start">
              <button onClick={openModal} className="text-start">
                포인트 충전하기
              </button>
              <button onClick={openModal} className="text-start">
                계좌번호 변경하기
              </button>
              <button onClick={openModal} className="text-start">
                이메일 변경하기
              </button>
              <button onClick={openModal} className="text-start">
                배송지 입력하기/변경하기
              </button>
            </div>
          </div>
        </div>
      </div>
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
          <SellHistory sellList={info.sellList} />
        ) : activeMenuNumber === 1 ? (
          <BuyHistory buyList={info.buyList} />
        ) : (
          <PointHistory key={refreshPointerHistroy} />
        )}
      </div>
      {isOpenPointModal &&
        createPortal(
          <ModalSmall title="Point 충전" onClose={() => setPointModal(false)}>
            <PointModalContent
              point={info.point}
              changePoint={handleChangePoint}
            />
          </ModalSmall>,
          document.body
        )}
    </div>
  );
}
