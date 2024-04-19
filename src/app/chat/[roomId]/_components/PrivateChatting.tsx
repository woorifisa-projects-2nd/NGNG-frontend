"use client";
import CloseIcon from "@/assets/SVG/Close.svg";
import ImagePlusIcon from "@/assets/SVG/Plus.svg";
import MessageSendIcon from "@/assets/SVG/CaretLeft.svg";
import { useEffect, useRef, useState } from "react";
import Message from "@/components/common/chat/Message";
import * as StompJs from "@stomp/stompjs";
import Image from "next/image";
import { PrivateChat, PrivateChatMessage } from "../page";
import { sendPrivateChatMessage } from "../../_api";
import { createPortal } from "react-dom";
import TransferRequest from "./TransferRequest";

type ChattingProps = {
  data: PrivateChat;
  modalOpen: boolean;
  onClose: () => void;
  onChangePrice: (price: number) => void;
  onChangeTransactionStatus: (status: string) => void;
  isSeller: boolean;
  transactionStatus: string;
};
export default function PrivateChatting({
  data,
  modalOpen,
  onClose,
  onChangePrice,
  onChangeTransactionStatus,
  isSeller,
  transactionStatus,
}: ChattingProps) {
  const userId = 2;
  const recentChatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [stompClient, setStompClient] = useState<StompJs.Client | null>(null);
  const [chatData, setChatData] = useState<PrivateChatMessage[]>(
    data.messages ?? []
  );
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File | undefined>(undefined);

  const enter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      if (image !== undefined) {
        sendImage(image);
        setImage(undefined);
      } else {
        sendMessage(message);
      }
    }
  };

  const changeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value);
  };

  const sendImage = (image: File) => {
    data &&
      stompClient &&
      sendPrivateChatMessage({
        client: stompClient,
        message: URL.createObjectURL(image),
        productId: data.product.productId,
        buyerId: data.product.buyer.id,
        userId,
        isImage: true,
        privateChatRoomId: data.chatRoomId,
      });

    chatData !== undefined &&
      setChatData([
        ...chatData,
        {
          chatId: chatData?.slice(-1)[0].chatId + 1,
          createdAt: new Date().toUTCString(),
          message: URL.createObjectURL(image),
          user: {
            id: userId,
            name: "test",
            nickname: "test",
            address: "test",
          },
          contentType: "IMAGE",
        },
      ]);
    setMessage("");
    setImage(undefined);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (recentChatRef.current) {
      recentChatRef.current.scrollTop = recentChatRef.current.scrollHeight;
    }
  };

  const sendMessage = (message: string) => {
    data &&
      stompClient &&
      sendPrivateChatMessage({
        client: stompClient,
        message,
        productId: data.product.productId,
        buyerId: data.product.buyer.id,
        userId,
        privateChatRoomId: data.chatRoomId,
      });

    chatData !== undefined &&
      setChatData([
        ...chatData,
        {
          chatId: chatData?.slice(-1)[0]?.chatId + 1,
          createdAt: new Date().toUTCString(),
          message: message,
          user: {
            id: userId,
            name: "test",
            nickname: "test",
            address: "test",
          },
          contentType: "TEXT",
        },
      ]);

    setMessage("");
    scrollToBottom();
  };

  const resetImage = () => {
    setImage(undefined);
    setMessage("");
  };

  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files && setImage(e.target.files[0]);
    setMessage(" ");
  };

  const enterMessage = (
    e: React.KeyboardEvent<HTMLTextAreaElement> | React.MouseEvent<HTMLElement>
  ) => {
    if (image !== undefined) {
      sendImage(image);
      setImage(undefined);
    } else {
      sendMessage(message);
    }
  };

  const getMessage = (data: any) => {
    console.log("received", data);

    setChatData([
      ...chatData,
      {
        chatId: data.chat,
        message: data.message,
        user: {
          id: userId,
          name: "test",
          nickname: "test",
          address: "test",
        },
        createdAt: data.createdAt,
        contentType: data.contentType,
      },
    ]);
  };

  const onClickTransferRequestButton = () => {
    // 거래상태 입금대기로 수정
    onChangeTransactionStatus("");
  };

  const onClickTransactionRequestButton = () => {
    onChangeTransactionStatus("구매요청");
  };

  useEffect(() => {
    if (stompClient) {
      stompClient.activate();
    }
  }, [stompClient]);

  useEffect(() => {
    const client = new StompJs.Client({
      brokerURL: "ws://localhost:8081/chat-server", // WebSocket 서버 URL
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
    });
    client.onConnect = () => {
      console.log(
        "Connected to WebSocket",
        `/product/${data.product.productId}/${data.product.buyer.id}`
      );
      if (client.connected) {
        // 연결 상태 확인
        client.subscribe(
          `/private-chats/${data.product.productId}/${data.product.buyer.id}`,
          (message) => {
            const data = JSON.parse(message.body).body;
            console.log("data", data);
            getMessage(JSON.parse(message.body).body);
          }
        );
      } else {
        console.error("STOMP connection is not established yet.");
      }
    };

    client.onStompError = (frame) => {
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
    };
    setStompClient(client);

    return () => {
      if (stompClient) stompClient.deactivate();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 200);
  }, [chatData]);

  return (
    <div className="relative w-full p-3 overflow-y-hidden ">
      <div
        className="h-[calc(100vh-18rem)]  flex flex-col items-start overflow-y-scroll scrollbar-hide"
        ref={recentChatRef}
      >
        {chatData &&
          chatData
            .sort((a: any, b: any) => {
              return a.createdAt - b.createdAt;
            })
            .map((chat, index) => {
              return (
                <Message
                  key={chat.chatId}
                  direction={chat.user.id === userId ? "right" : "left"}
                  userName={chat.user.nickname}
                  text={chat.message}
                  isImage={chat.contentType === "IMAGE"}
                  isFirstOfTheDay={
                    index === 0 ||
                    chatData[index - 1].createdAt?.split("T")[0] !==
                      chat.createdAt?.split("T")[0]
                  }
                  createdAt={chat.createdAt}
                />
              );
            })}
      </div>

      <div className="fixed bottom-0 w-[calc(100%-20px)] mb-4 flex flex-col justify-between bg-light-gray h-32 border-2 border-light-gray p-5 pb-4 rounded-xl box-border z-10">
        <textarea
          className="w-full bg-light-gray resize-none focus:outline-none overflow-y-scroll scrollbar-hide dark:text-black"
          value={message}
          onKeyDown={enter}
          onChange={changeMessage}
          rows={4}
          placeholder="메시지를 입력하세요."
        ></textarea>
        {image && (
          <>
            <CloseIcon
              width={20}
              height={20}
              className="absolute right-2 top-2 cursor-pointer fill-white dark:fill-black z-10"
              color={"#272727"}
              onClick={resetImage}
            />
            <Image
              src={URL.createObjectURL(image)}
              alt="첨부파일"
              width={0}
              height={0}
              className="w-full h-24 object-contain relative bottom-2"
            />
          </>
        )}
        <div className="flex justify-between items-center">
          <ImagePlusIcon
            className={
              message.length === 0 && image === undefined
                ? "cursor-pointer"
                : ""
            }
            onClick={() => {
              message.length === 0 && inputRef.current?.click();
            }}
          />
          <input
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={changeFile}
            accept="image/*"
          />
          <MessageSendIcon
            className="cursor-pointer fill-black"
            onClick={enterMessage}
          />
        </div>
      </div>
      {modalOpen &&
        createPortal(
          <TransferRequest
            discountable={data.product.discountable}
            price={data.product.price}
            onChangePrice={onChangePrice}
            onClose={onClose}
            onChangeTransactionStatus={onClickTransferRequestButton}
          />,
          document.body
        )}
    </div>
  );
}