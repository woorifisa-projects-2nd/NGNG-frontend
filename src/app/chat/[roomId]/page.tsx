"use client";
import Loading from "@/assets/Loading.svg";
import Image from "next/image";
import PrivateChatting from "./_components/PrivateChatting";
import { useParams } from "next/navigation";
import {
  createTransactionRequest,
  getAllChatMessages,
  updateTransactionRequest,
} from "../_api";
import { useEffect, useState } from "react";
import TransactionRequestButton from "./_components/TransactionRequestButton";
import { createPortal } from "react-dom";
import TransferRequest from "./_components/TransferRequest";
import RequestProcess from "./_components/RequestProcess";
import RequestProcessModal from "./_components/RequestProcessModal";
export type TransactionRequest = {
  requestId: number;
  buyerId: number;
  createdAt: string;
  isAccepted: boolean;
  price: number;
  productId: number;
  sellerId: number;
  updatedAt: string;
};
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
    requests: TransactionRequest[];
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
  const [requestProcessModalOpen, setRequestProcessModalOpen] =
    useState<boolean>(false);
  const transactionStatus =
    data?.product?.transactionDetails?.status.status ?? null;
  const isSeller = data && data.product.seller.id === userId;
  const [price, setPrice] = useState<number>(data?.product?.price ?? 0);

  const mapTransactionStatusToActiveButton = () => {
    if (!data) return;

    const alreadyRequetesd =
      data.product.requests.filter((req) => req.buyerId === userId).length > 0;
    const isPending = data.product.transactionDetails === null;
    const isAccepted =
      data.product.requests.find((req) => req.buyerId === userId)?.isAccepted ??
      false;

    if (transactionStatus === null && !isSeller) {
      return alreadyRequetesd ? (
        isPending ? (
          <span
            className="min-w-[72px]  text-black
      font-semibold text-sm"
          >
            수락 대기중
          </span>
        ) : isAccepted ? (
          <span
            className="min-w-[72px]  text-green-600 
      font-semibold text-sm"
          >
            거래진행중
          </span>
        ) : (
          <span
            className="min-w-[72px]  text-text-gray 
      font-semibold text-sm"
          >
            거래거절
          </span>
        )
      ) : (
        <TransactionRequestButton
          onClick={() => {
            setOpen(true);
          }}
        />
      );
    } else if (isSeller && isPending) {
      return (
        <RequestProcess
          onClick={() => {
            setRequestProcessModalOpen(true);
          }}
        />
      );
    } else if (isSeller && !isAccepted) {
      return (
        <span
          className="min-w-[72px]  text-text-gray 
      font-semibold text-sm"
        >
          요청 거절
        </span>
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
      setPrice(res.product.price);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const onChangePrice = (price: number) => {
    setPrice(price);
  };

  const onChangeTransactionStatus = () => {
    data &&
      createTransactionRequest({
        buyerId: userId,
        productId: data?.product.productId,
        sellerId: data.product.seller.id,
        price,
      }).then(() => {
        fetchData();
        setOpen(false);
      });
  };

  const onAccept = () => {
    const request = data?.product.requests.find(
      (req) => req.buyerId === data.product.buyer.id
    );
    request &&
      updateTransactionRequest({
        transactionRequestId: request?.requestId,
        isAccepted: true,
      }).then(() => {
        fetchData();
        setOpen(false);
      });
  };

  const onDismiss = () => {
    const request = data?.product.requests.find(
      (req) => req.buyerId === data.product.buyer.id
    );
    request &&
      updateTransactionRequest({
        transactionRequestId: request?.requestId,
        isAccepted: false,
      }).then(() => {
        fetchData();
        setOpen(false);
      });
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
      <div className="fixed top-0 w-full bg-white dark:bg-black min-h-28 z-10">
        <div className="relative flex justify-center font-bold p-2 ">
          {data.product.seller.id === userId
            ? data.product.buyer.nickname
            : data.product.seller.nickname}
          <span className="cursor-pointer absolute right-2 flex items-center text-red-500 text-sm">
            신고하기
          </span>
        </div>

        <div className="flex border-y-2 border-light-gray dark:border-text-gray justify-between items-center p-2">
          <div className="flex gap-4 items-center">
            <Image
              className="rounded-xl"
              src={data.product.thumbnailUrl}
              width={60}
              height={60}
              alt={data.product.productTitle}
            />
            <div>
              <p className="text-ellipsis w-48 overflow-hidden whitespace-nowrap">
                {data.product.productTitle}
              </p>
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
      <div className="relative h-full w-full">
        <PrivateChatting data={data} />
      </div>
      {open &&
        createPortal(
          <TransferRequest
            discountable={data.product.discountable}
            price={price}
            onChangePrice={onChangePrice}
            onClose={onClose}
            onChangeTransactionStatus={onChangeTransactionStatus}
          />,
          document.body
        )}
      {requestProcessModalOpen &&
        createPortal(
          <RequestProcessModal
            requestPrice={
              data.product.requests.find(
                (req) => req.buyerId === data.product.buyer.id
              )?.price ?? data.product.price
            }
            onClose={() => {
              setRequestProcessModalOpen(false);
            }}
            onAccept={onAccept}
            onDismiss={onDismiss}
          />,
          document.body
        )}
    </div>
  );
}
