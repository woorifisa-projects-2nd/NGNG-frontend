"use client";
import React, { Suspense, useEffect, useState } from "react";
import MyInfo from "./_compoenets/MyInfo";
import SellHistory from "./_compoenets/SellHistory";
import BuyHistory from "./_compoenets/BuyHistory";
import PointHistory from "./_compoenets/PointHistory";
import { createPortal } from "react-dom";
import PointModalContent from "./_compoenets/modal/PointModalContent";
import ModalSmall from "./_design/ModalSmall";
import UpdateField from "./_compoenets/modal/UpdateField";
import UpdateAddress from "./_compoenets/modal/UpdateAddress";

import ConfirmEmail from "./_compoenets/modal/ConfirmEmail";
import ConfirmAccount from "./_compoenets/modal/ConfirmAccount";
import useMypageSWR from "./_hooks/useMypageSWR";

export default function Page() {
  const { user: userInfo, deleteProduct } = useMypageSWR();

  const [activeMenuNumber, setMewnuNumber] = useState<number>(0);

  const [isOpenPointModal, setPointModal] = useState(false);
  const [isOpenNickNameModal, setNickNameModal] = useState(false);
  const [isOpenAddressModal, setAddressModal] = useState(false);
  const [isOpenEmailModal, setEmailModal] = useState(false);
  const [isOpenAccountModal, setAccountModal] = useState(false);

  const handlerDelteProduct = (productId: number) => {
    deleteProduct(productId);
  };

  //   추후 Suspense 로바꾸면 좋을거 같음
  if (!userInfo) return <div>로딩중..</div>;

  return (
    <div className="max-w-[1248px] flex-col justify-center mx-auto p-4">
      {/* 사용자 정보 부분 */}
      <MyInfo
        userInfo={userInfo}
        openModalPoint={() => setPointModal(true)}
        openModalNickName={() => setNickNameModal(true)}
        openModalAdress={() => setAddressModal(true)}
        openModalAccount={() => setAccountModal(true)}
        openModalEmail={() => setEmailModal(true)}
      />

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
            deleteProduct={handlerDelteProduct}
          />
        ) : activeMenuNumber === 1 ? (
          <BuyHistory buyList={userInfo.buyList} />
        ) : (
          <PointHistory />
        )}
      </div>
      {/* 모달 부분 */}
      {isOpenPointModal &&
        createPortal(
          <ModalSmall title="Point 충전" onClose={() => setPointModal(false)}>
            <PointModalContent point={userInfo.point} />
          </ModalSmall>,
          document.body
        )}
      {isOpenNickNameModal &&
        createPortal(
          <ModalSmall
            title="닉네임 변경"
            onClose={() => setNickNameModal(false)}
          >
            <UpdateField
              filedName="닉네임 변경"
              onCloseModal={() => setNickNameModal(false)}
            />
          </ModalSmall>,
          document.body
        )}
      {isOpenAddressModal &&
        createPortal(
          <ModalSmall
            title="배송지 변경"
            onClose={() => setAddressModal(false)}
          >
            {/* <UpdateField filedName="배송지 변경" update={handleUpdateAdreess} /> */}
            <UpdateAddress onCloseModal={() => setAddressModal(false)} />
          </ModalSmall>,
          document.body
        )}
      {isOpenEmailModal &&
        createPortal(
          <ModalSmall title="이메일 변경" onClose={() => setEmailModal(false)}>
            {/* <UpdateField filedName="배송지 변경" update={handleUpdateAdreess} /> */}
            <ConfirmEmail />
          </ModalSmall>,
          document.body
        )}
      {isOpenAccountModal &&
        createPortal(
          <ModalSmall
            title="계좌번호 변경"
            onClose={() => setAccountModal(false)}
          >
            {/* <UpdateField filedName="배송지 변경" update={handleUpdateAdreess} /> */}
            <ConfirmAccount />
          </ModalSmall>,
          document.body
        )}
    </div>
  );
}
