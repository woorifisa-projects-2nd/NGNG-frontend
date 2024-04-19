"use client";
import Loading from "@/assets/Loading.svg";
import Image from "next/image";
import PrivateChatting from "./_components/PrivateChatting";
import { useParams } from "next/navigation";
import { getAllChatMessages } from "../_api";
import { useEffect, useState } from "react";
import TransactionRequestButton from "./_components/TransactionRequestButton";
import RequestAccept from "./_components/RequestAccept";
import RequestDismiss from "./_components/RequestDismiss";
import Stepper from "./_components/Stepper";

export type PrivateChat = {
  chatRoomId: number;
  product: {
    productId: number;
    productTitle: string;
    price: number;
    isEscrow: boolean;
    discountable: false;
    thumbnailUrl: string;
    transactionDetails?: TransactionDetails | null;
    seller: PrivateChatUser;
    buyer: PrivateChatUser;
  };
  messages: PrivateChatMessage[] | null;
};

export type TransactionDetails = {
  address: string | null;
  id: number;
  status: {
    id: number;
    status: string;
  };
};
export type PrivateChatUser = {
  id: number;
  name: string;
  nickname: string;
  address: string;
  accountBank: null | string;
  accountNumber: null | string;
};
export type PrivateChatMessage = {
  chatId: number;
  message: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    nickname: string;
    address: string;
    accountBank?: string | null;
    accountNumber?: string | null;
  };
  contentType: string;
};

export default function PrivateChat() {
  const params = useParams<{
    roomId: string;
  }>();
  const userId = 2;

  const [data, setData] = useState<PrivateChat | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const transactionStatus =
    data?.product.transactionDetails?.status.status ?? null;
  const isSeller = false; //data && data.product.seller.id === userId;

  const mapTransactionStatusToActiveButton = () => {
    if (!data) return;
    else if (transactionStatus === null && !isSeller) {
      return (
        <TransactionRequestButton
          productId={data.product.productId}
          buyerId={data.product.buyer.id}
          onClick={() => {
            fetchData(); // 상태 업데이트하고 데이터 다시받아오기
          }}
        />
      );
    } else {
      return "";
    }
  };

  const fetchData = () => {
    getAllChatMessages({
      chatRoomId: Number(params.roomId),
      userId,
    }).then((res) => {
      console.log("result", res);
      setData(res);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const onChangePrice = (price: number) => {
    data && setData({ ...data, product: { ...data.product, price } });
  };

  const onChangeTransactionStatus = (status: string) => {
    // setTransactionStatus(status);
  };

  if (data === undefined) {
    return (
      <div role="status" className="flex justify-center h-[calc(100vh-128px)]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative h-full scrollbar-hide max-h-[640px]">
      <div className="fixed top-0 w-full bg-white dark:bg-black h-28 z-10">
        <div className="relative flex justify-center font-bold p-2 ">
          {data.product.seller.id === userId
            ? data.product.buyer.nickname
            : data.product.seller.nickname}
          <span className="cursor-pointer absolute right-2 flex items-center text-red-500 text-sm">
            신고하기
          </span>
        </div>

        <div className="flex border-y-2 border-light-gray dark:border-text-gray justify-between p-2">
          <div className="flex gap-4 items-center">
            <Image
              className="rounded-xl"
              src={data.product.thumbnailUrl}
              width={60}
              height={60}
              alt={data.product.productTitle}
            />
            <div>
              <p className="">{data.product.productTitle}</p>
              <div className="flex items-baseline">
                <p className="mr-2 font-bold">
                  {data.product.price.toLocaleString()}원
                </p>
                <p className="text-red-500 text-sm font-medium">
                  {data.product.discountable ? "할인가능" : "할인불가능"}
                </p>
              </div>
            </div>
          </div>

          {mapTransactionStatusToActiveButton()}
        </div>
      </div>
      <div className="flex justify-around relative top-32">
        <Stepper
          currentStatusId={1}
          isSeller={false}
          onChangeStatus={(status) => {
            console.log(status);
          }}
        />
      </div>

      <div className="relative top-32 h-full w-full">
        <PrivateChatting
          data={data}
          modalOpen={open}
          onClose={onClose}
          onChangePrice={onChangePrice}
          onChangeTransactionStatus={onChangeTransactionStatus}
          isSeller={data.product.seller.id === userId}
          transactionStatus={
            transactionStatus === null ? "" : transactionStatus
          }
        />
      </div>
    </div>
  );
}
