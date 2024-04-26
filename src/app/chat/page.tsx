"use client";

import { useState } from "react";

import ChatRoomList from "./_components/ChatRoomList";

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
  const [currentBadge, setCurrentBadge] = useState<number>(1);
  const selectedClassName =
    "bg-purple-100 text-point-color   dark:bg-purple-900 dark:text-purple-300";
  const defaultClassName =
    "bg-gray-100 text-gray-800  dark:bg-gray-700 dark:text-gray-300";

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
        <ChatRoomList currentBadge={currentBadge} />
      </div>
    </div>
  );
}
