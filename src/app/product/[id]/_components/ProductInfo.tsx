"use client";
import Button from "@/components/common/Button";
import Image from "next/image";
import { Product } from "../../_types/type";
import SirenIcon from "@/assets/SVG/Siren.svg";
import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import AccountAuthenticationWanringModal from "./AccountAuthenticationWanringModal";
import { redirect, useRouter } from "next/navigation";
import {
  createPrivateChatRoom,
  findPrivateChatRoomByProductIdAndBuyerId,
} from "../../_api/api";
import ReportModal from "./ReportModal";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ReactPlayer from 'react-player';
import ImageModal from "./ImageModal";
import { UserContext } from "@/providers/UserContext";
import Link from "next/link";
import { categories } from "@/components/layouts/header/Header";

type ProductInfoProps = {
  data: Product;
};

export default function ProudctInfo({ data }: ProductInfoProps) {
  const { getUser } = useContext(UserContext);
  const user = getUser();
  const [open, setOpen] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [productData, setProductData] = useState<Product | undefined>(data);
  const router = useRouter();

  // 이미지 보기
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  if (user === undefined) {
    redirect("/login");
  }

  const handleReportSuccess = (newData: Product | undefined): void => {
    setProductData(newData);
  };

  // 이미지를 클릭했을 때 모달을 열고 해당 이미지를 표시하는 함수
  const handleImageClick = (imageUrl: string, index: number) => {
    setCurrentImageIndex(index);
    setShowModal(true);
  };

  // 다음 이미지로 이동하는 함수
  const goToNextImage = () => {
    if (data?.images) {
      const nextIndex = (currentImageIndex + 1) % data?.images.length;
      setCurrentImageIndex(nextIndex);
    }
  };

  // 이전 이미지로 이동하는 함수
  const goToPreviousImage = () => {
    if (data?.images) {
      const previousIndex = (currentImageIndex - 1 + data?.images.length) % data?.images.length;
      setCurrentImageIndex(previousIndex);
    }
  };

  // 모달을 닫는 함수
  const closeModal = () => {
    setShowModal(false);
  };

  // TODO : 사용자 계좌인증여부
  const isUserAccountOk = true;

  const isReported =
    productData?.reports === null
      ? false
      : productData?.reports?.filter((report) => report.isReport)?.length ?? 0 > 0;

  const isReportedByMe =
    productData?.reports &&
    productData?.reports.filter((report) => report.reporter.id === user.id).length > 0;

  const fetchTime = async () => {
    const res = (await 3) + 4;
    return res;
  };
  return (
    <div className="px-3 py-5 ">
      <div className="block xl:flex">
        <div className="w-full xl:w-1/2 justify-center mr-10 flex items-center">
          <div className="w-80">
            <Carousel
              className=""
              showArrows={true}
              showThumbs={false}
              showStatus={false} // 우측상단 상태값
              infiniteLoop={true}
            >
              {data?.images.map((media, index) => (
                media.contentType === 'IMAGE' ? ( // 이미지인 경우
                  <div
                    key={index}
                    onClick={() => handleImageClick(media.imageURL, index)}
                  >
                    <Image
                      key={media.id}
                      className="object-contain object-center h-96 w-h-96"
                      src={media.imageURL}
                      width={600}
                      height={600}
                      alt={`productImage_${media.id}`}
                    />
                  </div>
                ) : ( // 동영상인 경우
                  <div
                    key={index}
                    className="flex justify-center"
                    onClick={() => handleImageClick(media.imageURL, index)}
                  >
                    <ReactPlayer
                      key={media.id}
                      className="object-cover object-center h-80 max-w-max"
                      url={media.imageURL}
                      alt={`productVideo_${media.id}`}
                      controls={true}
                    />
                  </div>
                )
              ))}
            </Carousel>

            {showModal &&
              createPortal(
                <ImageModal
                  showModal={showModal}
                  closeModal={closeModal}
                  data={data}
                  currentImageIndex={currentImageIndex}
                  goToPreviousImage={goToPreviousImage}
                  goToNextImage={goToNextImage}
                />,
                document.body
              )}

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
                  <div className="cursor-pointer flex items-center gap-1" onClick={() => setShowReportModal(true)}>
                    <SirenIcon />
                    <div>신고하기</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {showReportModal &&
          createPortal(
            <ReportModal
              onClose={() => {
                setShowReportModal(false);
              }}
              onSuccessReport={handleReportSuccess}
              data={data}
              userId={user.id}
            />,
            document.body
          )}

        <div className="mt-10 xl:mt-0 w-full xl:w-2/5 flex flex-col justify-between">
          <div className="flex w-full justify-between mb-10">
            <div>
              <p className="flex items-center text-text-gray mb-2">
                <Link href={"/"} className="flex items-baseline">
                  <svg
                    className="w-3 h-3 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  홈
                </Link>
                <Link
                  className="flex items-baseline"
                  href={
                    categories.find((c) => c.name === data.category.name)
                      ?.link ?? "/"
                  }
                >
                  <svg
                    className="rtl:rotate-180 w-2 h-2 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  {data.category.name}
                </Link>
              </p>
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
                  if (data.user.id === user.id) {
                    // 판매자인 경우 채팅목록으로 이동
                    router.push("../../chat");
                  } else if (isUserAccountOk) {
                    // 구매자인 경우 계좌 검사

                    await findPrivateChatRoomByProductIdAndBuyerId(
                      data.id,
                      user.id
                    ).then(async (id) => {
                      let roomId = id;
                      console.log("roodId", id);

                      if (id < 0) {
                        // 없으면 채팅방 만들기
                        roomId = await createPrivateChatRoom({
                          productId: data.id,
                          sellerId: data.user.id,
                          buyerId: user.id,
                        });
                      }
                      // 채팅방으로 이동
                      fetchTime().then(() => {
                        const chat = window.open(
                          `/chat/${roomId}`,
                          `/chat/${roomId}`,
                          "width=380, height=640,location=no,status=no,menubar=no,toolbar=no"
                        );
                        if (chat) chat.location.href = `/chat/${roomId}`;
                      });
                    });
                  } else {
                    // 계좌인증 먼저 하도록
                    setOpen(true);
                  }
                }}
              >
                <Button
                  text={`${data.forSale
                    ? data.user.id === user.id
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
              return (
                <span className="mr-2" key={tag.tagName}>
                  #{tag.tagName}
                </span>
              );
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
