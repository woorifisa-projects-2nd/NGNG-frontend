"use client";
import Image from "next/image";
import React, { useContext } from "react";
import { formatKRW } from "../_utils/format";
import PointSVG from "../_design/SVG/PointSVG";
import AccountSVG from "../_design/SVG/AccountSVG";
import EmailSVG from "../_design/SVG/EmailSVG";
import AddressSVG from "../_design/SVG/AddressSVG";
import ProductSVG from "../_design/SVG/ProductSVG";
import BuySVG from "../_design/SVG/BuySVG";
import { UserContext } from "@/providers/UserContext";
import { redirect, useRouter } from "next/navigation";
import { ModalStatus, useModalController } from "../_provider/ModalProovider";
import { getAccessToken } from "../_utils/auth-header";

type Props = {
  userInfo: MypageReponse;
};

export default function MyInfo({ userInfo }: Props) {
  const router = useRouter();
  const { logout } = useContext(UserContext);

  const clickLogout = () => {
    logout();

    const url = "/api/logout";
    const options = {
      method: "POST",
      Authentication: getAccessToken(),
    };

    fetch(url, options);

    router.push("/");
  };
  const [_, setModal] = useModalController();

  //   추후 Suspense 로바꾸면 좋을거 같음
  if (!userInfo) return <div>로딩중</div>;

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
            <p className="font-bold text-[2rem]">{userInfo.nickName}</p>
            <p
              className="text-black text-opacity-45 cursor-pointer "
              onClick={() =>
                setModal({ type: ModalStatus.NickName, isOpen: true })
              }
            >
              닉네임 변경하기
            </p>
            <button
              className="block absolute right-0 bottom-0 border p-2 border-black md:bottom-[25%]  rounded
              hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
              onClick={clickLogout}
            >
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
                  onClick={() =>
                    setModal({ type: ModalStatus.Point, isOpen: true })
                  }
                >
                  포인트
                </p>
                <p>{formatKRW(userInfo.point)}</p>
              </div>
              <div className="flex m-1 flex-wrap ">
                <AccountSVG />
                <p className="w-[5rem] ">계좌번호</p>
                <p>{userInfo.accountNumber}</p>
              </div>
              <div className="flex m-1 flex-wrap">
                <EmailSVG />
                <p className="w-[5rem] ">이메일</p>
                <p>{userInfo.email}</p>
              </div>
              <div className="flex m-1 flex-wrap">
                <AddressSVG />
                <p className="w-[5rem] ">배송지</p>
                <p>{userInfo.address}</p>
              </div>
              <div className="flex m-1 flex-wrap">
                <ProductSVG />
                <p className="w-[5rem] ">상품 판매</p>
                <p>{userInfo.sellList.length}</p>
              </div>
              <div className="flex m-1 flex-wrap">
                <BuySVG />
                <p className="w-[5rem]"> 상품 구매</p>
                <p>{userInfo.buyList.length}</p>
              </div>
            </div>
            {/* 기타 */}
            <div className="hidden w-[80vw] max-w-[480px] gap-4 text-black dark:text-white text-opacity-45 md:block md:w-auto md:flex md:flex-col md:justify-start">
              <button
                onClick={() =>
                  setModal({ type: ModalStatus.Point, isOpen: true })
                }
                className="text-start"
              >
                포인트 충전하기
              </button>
              <button
                onClick={() =>
                  setModal({ type: ModalStatus.Account, isOpen: true })
                }
                className="text-start"
              >
                계좌번호 변경하기
              </button>
              <button
                onClick={() =>
                  setModal({ type: ModalStatus.Email, isOpen: true })
                }
                className="text-start"
              >
                이메일 변경하기
              </button>
              <button
                onClick={() =>
                  setModal({ type: ModalStatus.Adress, isOpen: true })
                }
                className="text-start"
              >
                배송지 입력하기/변경하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
