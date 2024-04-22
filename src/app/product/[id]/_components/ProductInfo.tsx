"use client";
import Button from "@/components/common/Button";
import Image from "next/image";
import { Product } from "../../_types/type";
import SirenIcon from "@/assets/SVG/Siren.svg";
import { useState } from "react";
import { createPortal } from "react-dom";
import AccountAuthenticationWanringModal from "./AccountAuthenticationWanringModal";
import { useRouter } from "next/navigation";
import {
  createPrivateChatRoom,
  findPrivateChatRoomByProductIdAndBuyerId,
} from "../../_api/api";
import ReportModal from "./ReportModal";

type ProductInfoProps = {
  data: Product;
  userId: number;
};

export default function ProudctInfo({ data, userId }: ProductInfoProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  // const [isReported, setIsReported] = useState<boolean>(false);
  // const [isReportedByMe, setIsReportedByMe] = useState<boolean>(false);
  const router = useRouter();

  const handleReportSuccess = (newData: Product): void => {

  };

  // TODO : 사용자 계좌인증여부
  const isUserAccountOk = true;

  const isReported =
    data.reports === null
      ? false
      : data.reports.filter((report) => report.isReport).length > 0;

  const isReportedByMe =
    data.reports &&
    data.reports.filter((report) => report.reporter.id === userId).length > 0;

  return (
    <div className="px-3 py-5 ">
      <div className="block xl:flex">
        <div className="w-full xl:w-1/2 justify-center mr-10 flex items-center">
          <div className="w-full">
            <Image
              className="object-contain w-full rounded h-auto"
              alt="상품 상세 이미지"
              src={data.images[0].imageURL}
              width={600}
              height={600}
            />
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-4  text-xl">
                <Image
                  src={"/car.jpg"}
                  width={40}
                  height={40}
                  alt="프로필 사진"
                  className="rounded-[50%] h-9 w-9"
                />
                <span>{data.user.nickname}</span>
              </div>
              <div className="flex text-red-500 font-medium justify-end items-center">
                {isReported ? (
                  "신고받은 상품입니다"
                ) : isReportedByMe ? (
                  "이미 신고한 상품입니다"
                ) : (
                  <div className="cursor-pointer" onClick={() => setShowReportModal(true)}>
                    <SirenIcon /> 신고하기
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {showReportModal &&
          createPortal(
            <ReportModal
              onClose={() => { setShowReportModal(false); }}
              onSuccessReport={handleReportSuccess}
              data={data}
              userId={userId} />,
            document.body
          )}

        <div className="mt-10 xl:mt-0 w-full xl:w-2/5 flex flex-col justify-between">
          <div className="flex w-full justify-between mb-10">
            <div>
              <p className="text-text-gray mb-2">홈 - {data.category.name}</p>
              <p className="text-2xl mb-2">{data.title}</p>
              <span className="text-2xl mr-2 mb-2">
                {data.price.toLocaleString()}원
              </span>
              <span
                className={`inline font-medium text-sm  ${data.discountable ? "text-point-color" : "text-red-500"
                  } `}
              >
                {data.discountable ? "할인가능" : "할인불가능"}
              </span>
            </div>
          </div>
          <div className="mb-10 w-full flex rounded-lg border-[1px] border-text-gray justify-around p-5 font-medium">
            <div className="flex flex-col items-center text-center ">
              <p className="text-text-gray mb-5">제품상태</p>
              <p className="">{data.status.name}</p>
            </div>
            <p className=" border-r-[1px] border-text-gray " />
            <div className="flex flex-col items-center text-center ">
              <p className=" text-text-gray  mb-5">거래방식</p>
              <p className="">{data.isEscrow ? "안심거래" : "일반거래"}</p>
            </div>
            <p className=" border-r-[1px] border-text-gray " />
            <div className="flex flex-col items-center  ">
              <p className="text-text-gray mb-5">배송비</p>
              <p>{data.freeShipping ? "포함" : "미포함"}</p>
            </div>
          </div>
          {!isReported && (
            <div>
              <a
                href=""
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (data.user.id === userId) {
                    // 판매자인 경우 채팅목록으로 이동
                    router.push("../../chat");
                  } else if (isUserAccountOk) {
                    // 구매자인 경우 계좌 검사

                    await findPrivateChatRoomByProductIdAndBuyerId(
                      data.id,
                      userId
                    ).then(async (id) => {
                      let roomId = id;
                      if (id < 0) {
                        // 없으면 채팅방 만들기
                        roomId = await createPrivateChatRoom({
                          productId: data.id,
                          sellerId: data.user.id,
                          buyerId: userId,
                        });
                      }
                      // 채팅방으로 이동
                      window.open(
                        `/chat/${roomId}`,
                        `/chat/${roomId}`,
                        "width=380, height=640,location=no,status=no,menubar=no,toolbar=no"
                      );
                    });
                  } else {
                    // 계좌인증 먼저 하도록
                    setOpen(true);
                  }
                }}
              >
                <Button
                  text={`${data.forSale
                    ? data.user.id === userId
                      ? "채팅방 보기"
                      : "1:1 채팅하기"
                    : "거래완료"
                    }`}
                  width={"100%"}
                  disabled={!data.forSale}
                  onClick={() => { }}
                />
              </a>
            </div>
          )}
        </div>
      </div>
      <div>
        <hr className="border-t-[1px] border-black w-full mt-10" />
        <div>
          <div className="flex justify-between text-2xl border-b-[1px] border-text-gray w-full py-5">
            니꺼 상품 정보
            <div className="text-right text-base pr-4">
              {!!data.purchaseAt && (
                <div className="text-right">구매년도 {data.purchaseAt}</div>
              )}
            </div>
          </div>
          <div className="text-lg min-h-44 py-10">{data.content}</div>
          <div className="flex border-t-2 border-text-gray w-full py-5 font-medium text-text-gray">
            <span className="mr-10">#태그</span>
            {data.tags.map((tag) => {
              return <span key={tag.tagName}>#{tag.tagName}</span>;
            })}
          </div>
        </div>
      </div>
      {open &&
        createPortal(
          <AccountAuthenticationWanringModal onClose={() => setOpen(false)} />,
          document.body
        )}
    </div>
  );
}
