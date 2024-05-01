"use client";
import Loading from "@/assets/Loading.svg";
import Image from "next/image";
import PrivateChatting from "./_components/PrivateChatting";
import { redirect, useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import TransferRequest from "./_components/TransferRequest";
import RequestProcessModal from "./_components/RequestProcessModal";
import usePrivateChatMessage from "../_hooks/usePrivateChatMessgae";
import { mutate } from "swr";
import { UserContext } from "@/providers/UserContext";
import TransactionStatusToActiveButton from "./_components/TransactionStatusToActiveButton";

export default function PrivateChat() {
  const params = useParams<{
    roomId: string;
  }>();
  const { getUser } = useContext(UserContext);
  const user = getUser();
  if (user === undefined) {
    redirect("/login");
  }

  const { data, updateTransactionRequest, createTransactionRequest } =
    usePrivateChatMessage({
      chatRoomId: Number(params.roomId),
      userId: user.id,
    });
  const [open, setOpen] = useState<boolean>(false);
  const [requestProcessModalOpen, setRequestProcessModalOpen] =
    useState<boolean>(false);
  const transactionStatus =
    data?.product?.transactionDetails?.status.status ?? null;
  const isSeller = data && data.product?.seller.id === user.id;
  const [price, setPrice] = useState<number>(data?.product?.price ?? 0);

  useEffect(() => {
    if (data) setPrice(data.product.price);
  }, [data]);

  const onClose = () => {
    setOpen(false);
  };

  const onChangePrice = (price: number) => {
    setPrice(price);
  };

  const onChangeTransactionStatus = () => {
    data &&
      createTransactionRequest({
        buyerId: user.id,
        productId: data?.product.productId,
        sellerId: data.product.seller.id,
        price,
      }).then(() => {
        setOpen(false);
      });
  };

  const onAccept = () => {
    const request = data?.request;

    request &&
      updateTransactionRequest({
        requestId: request?.requestId,
        isAccepted: true,
      }).then(() => {
        setRequestProcessModalOpen(false);
        mutate("/chat/private-chat/chat-room-id/user-id");
      });
  };

  const onDismiss = () => {
    const request = data?.request;
    // console.log("dismiss", request);
    request &&
      updateTransactionRequest({
        requestId: request?.requestId,
        isAccepted: false,
      }).then(() => {
        setRequestProcessModalOpen(false);
        mutate("/chat/private-chat/chat-room-id/user-id");
      });
  };

  if (data === undefined) {
    return (
      <div role="status" className="flex justify-center h-[calc(100vh-128px)]">
        <Loading />
      </div>
    );
  }

  if (document.hasFocus()) {
    // console.log("focus");
    mutate("/chat/private-chat/user-id");
  }

  return (
    <div className="relative h-full scrollbar-hide max-h-[640px]">
      <div className="fixed top-0 w-full bg-white dark:bg-black min-h-28 z-10">
        <div className="relative flex justify-center font-bold p-2 ">
          {data.product.seller.id === user.id
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

          <TransactionStatusToActiveButton
            clickRequestButton={() => setOpen(true)}
            clickRequestProcessButton={() => setRequestProcessModalOpen(true)}
            data={data}
            isSeller={isSeller ?? false}
            transactionStatus={transactionStatus}
          />
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
            requestPrice={data.request?.price ?? data.product.price}
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
