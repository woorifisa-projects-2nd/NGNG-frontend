"use client";
import Loading from "@/assets/Loading.svg";
import Image from "next/image";
import { useContext, useState } from "react";
import { calculateTimeDifference } from "@/utils";
import usePrivateChatRoom from "./_hooks/usePrivateChatRoom";
import { UserContext } from "@/providers/UserContext";
import { redirect } from "next/navigation";

const Badges = [
  { id: 1, name: "전체" },
  { id: 2, name: "거래 요청" },
  { id: 3, name: "판매" },
  { id: 4, name: "구매" },
];
export type ChatData = {
  privateChatRoomId: number;
  seller: { id: number; nickname: string; name: string };
  buyer: { id: number; nickname: string; name: string };
  transactionDetails: {
    id: number;
    address: string | null;
    status: {
      id: number;
      status: string;
    };
  } | null;
  recentMessage: { message: string; createdAt: string; contentType: string };
  product: {
    productId: number;
    productTitle: string;
    productThumbnailUrl: string;
  };
  createdAt: string;
  unreadMessageCount: number;
  request: {
    productId: number;
    sellerId: number;
    buyerId: number;
    price: number;
    createdAt: string;
    updatedAt: string;
    isAccepted: boolean;
  };
};
export default function Chat() {
  const { getUser } = useContext(UserContext);
  const user = getUser();
  if (user === undefined) {
    redirect("/login");
  }

  const { chatData } = usePrivateChatRoom(user.id);
  const [currentBadge, setCurrentBadge] = useState<number>(1);
  const selectedClassName =
    "bg-purple-100 text-point-color   dark:bg-purple-900 dark:text-purple-300";
  const defaultClassName =
    "bg-gray-100 text-gray-800  dark:bg-gray-700 dark:text-gray-300";
  console.log("chat", chatData);

  const filtredData =
    currentBadge === 1 // 전체
      ? chatData ?? []
      : currentBadge === 2 // 요청
      ? chatData?.filter(
          (data) =>
            data.seller.id === user.id &&
            (data.request === null ||
              data.request.isAccepted === null ||
              data.request.isAccepted === false)
        ) ?? []
      : currentBadge == 3 //판매
      ? chatData?.filter(
          (data) =>
            data.seller.id === user.id &&
            data.request &&
            data.request.isAccepted
        ) ?? []
      : chatData?.filter((data) => data.buyer.id === user.id) ?? []; // 구매

  if (filtredData === undefined || chatData === undefined) {
    return (
      <div role="status" className="flex justify-center h-[calc(100vh-128px)]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center m-4">
      <div
        className="
        w-2/5
        min-w-[400px]
        rounded-lg
        h-[calc(100vh-180px)]
      p-5
      flex flex-col gap-4
      shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
      >
        <h1 className="text-2xl font-medium ">채팅목록</h1>
        <div className="flex justify-start gap-5">
          {Badges.map((badge) => {
            return (
              <span
                key={badge.id}
                onClick={() => setCurrentBadge(badge.id)}
                className={`font-medium me-2 px-2.5 py-0.5 rounded text-sm cursor-pointer ${
                  currentBadge === badge.id
                    ? selectedClassName
                    : defaultClassName
                }`}
              >
                {badge.name}
              </span>
            );
          })}
        </div>
        <div className="flex flex-col gap-5 h-[600px] overflow-y-scroll scrollbar-hide">
          {filtredData
            ?.sort((a, b) =>
              a.recentMessage === null
                ? 1
                : b.recentMessage === null
                ? -1
                : a.recentMessage.createdAt < b.recentMessage.createdAt
                ? 1
                : -1
            )
            .map((chatRoom) => {
              const isSeller = chatRoom.seller.id === user.id;

              return (
                <div
                  key={chatRoom.privateChatRoomId}
                  className="
                cursor-pointer
                flex justify-between p-3 rounded-lg border-[1px] border-point-color text-sm 
          hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                  onClick={() => {
                    window.open(
                      `/chat/${chatRoom.privateChatRoomId}`,
                      `/chat/${chatRoom.privateChatRoomId}`,
                      "width=380, height=640,location=no,status=no,menubar=no,toolbar=no"
                    );
                  }}
                >
                  <div className="flex items-center">
                    <div>
                      <Image
                        className="w-12 h-12 rounded-full"
                        src={chatRoom.product.productThumbnailUrl}
                        width={40}
                        height={40}
                        alt="프로필 이미지"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                      />
                      <div className="w-0 h-0">
                        {chatRoom.unreadMessageCount > 0 && (
                          <div className="relative left-8 bottom-12 w-4 h-4 bg-red-500 rounded-full text-white text-center font-semibold text-xs">
                            {chatRoom.unreadMessageCount}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="ml-5">
                      <div className="mb-2">
                        <span className="font-semibold text-base mr-2">
                          {isSeller
                            ? chatRoom.buyer.nickname
                            : chatRoom.seller.nickname}
                        </span>
                        <span className="text-gray-500 w-48 text-ellipsis overflow-hidden whitespace-nowrap">
                          {chatRoom.product.productTitle}
                        </span>
                      </div>
                      <div className="text-black">
                        {chatRoom.recentMessage &&
                          chatRoom.recentMessage.message}
                      </div>
                    </div>
                  </div>
                  <div className="h-full">
                    <div className="text-xs">
                      <div className="mb-5 text-right">
                        {chatRoom.recentMessage &&
                          calculateTimeDifference(
                            chatRoom.recentMessage.createdAt
                          )}
                      </div>

                      <div className="font-bold">
                        {chatRoom.request &&
                          chatRoom.request.isAccepted === null && (
                            <div className="min-w-[45px]">수락 대기</div>
                          )}
                        {chatRoom.request &&
                          chatRoom.request.isAccepted === false && (
                            <div className="min-w-[45px]">요청 거절</div>
                          )}
                        {chatRoom.request &&
                          chatRoom.request.isAccepted &&
                          chatRoom.transactionDetails && (
                            <div className="min-w-[45px]">
                              {chatRoom.transactionDetails.status.status}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
