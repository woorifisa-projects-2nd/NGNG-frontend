"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllChatRoomData } from "./_api";
import { calculateTimeDifference } from "@/utils";

const Badges = [
  { id: 1, name: "전체" },
  { id: 2, name: "판매" },
  { id: 3, name: "구매" },
];
export type ChatData = {
  privateChatRoomId: number;
  seller: { id: number; nickname: string; name: string };
  buyer: { id: number; nickname: string; name: string };
  transactionDetail: null;
  recentMessage: { message: string; createdAt: string; contentType: string };
  product: {
    productId: number;
    productTitle: string;
    productThumbnailUrl: string;
  };
  createdAt: string;
  unreadMessageCount: number;
};
export default function Chat() {
  const userId = 2;
  const [chatData, setChatData] = useState<ChatData[]>([]);
  const [currentBadge, setCurrentBadge] = useState<number>(1);
  const selectedClassName =
    "bg-purple-100 text-point-color   dark:bg-purple-900 dark:text-purple-300";
  const defaultClassName =
    "bg-gray-100 text-gray-800  dark:bg-gray-700 dark:text-gray-300";

  const filtredData =
    currentBadge === 1
      ? chatData
      : currentBadge === 2
      ? chatData.filter((data) => data.seller.id === userId)
      : chatData.filter((data) => data.buyer.id === userId);

  useEffect(() => {
    getAllChatRoomData(userId).then((res) => {
      setChatData(res);
    });
  }, []);
  return (
    <div className="flex justify-center items-center m-4">
      <div
        className="
        min-w-[400px]
        rounded-lg
        h-[calc(100vh-160px)]
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
        <div className="flex flex-col gap-5 ">
          {filtredData.map((chatRoom) => {
            const isSeller = chatRoom.seller.id === userId;
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
                    />
                    <div className="w-0 h-0">
                      <div className="relative left-8 bottom-4 w-4 h-4 bg-red-500 rounded-full text-white text-center font-semibold text-xs">
                        {chatRoom.unreadMessageCount}
                      </div>
                    </div>
                  </div>

                  <div className="ml-5">
                    <div className="mb-2">
                      <span className="font-semibold text-base mr-2">
                        {isSeller
                          ? chatRoom.buyer.nickname
                          : chatRoom.seller.nickname}
                      </span>
                      <span className="text-gray-500">
                        {chatRoom.product.productTitle}
                      </span>
                    </div>
                    <div className="text-black">
                      {chatRoom.recentMessage.message}
                    </div>
                  </div>
                </div>
                <div className="">
                  {chatRoom.transactionDetail && (
                    <div className="mb-4 font-medium">배송중</div>
                  )}
                  <div className="text-xs">
                    {calculateTimeDifference(chatRoom.recentMessage.createdAt)}
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
