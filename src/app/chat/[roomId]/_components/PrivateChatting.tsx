"use client";
import CloseIcon from "@/assets/SVG/Close.svg";
import ImagePlusIcon from "@/assets/SVG/Plus.svg";
import MessageSendIcon from "@/assets/SVG/CaretLeft.svg";
import { useContext, useEffect, useRef, useState } from "react";
import Message from "@/components/common/chat/Message";
import * as StompJs from "@stomp/stompjs";
import Image from "next/image";

import { sendPrivateChatMessage } from "../../_api";
import {
  PrivateChat,
  PrivateChatMessage,
} from "../../_hooks/usePrivateChatMessgae";
import { UserContext } from "@/providers/UserContext";
import { redirect } from "next/navigation";

type ChattingProps = {
  data: PrivateChat;
};
export default function PrivateChatting({ data }: ChattingProps) {
  const { getUser } = useContext(UserContext);
  const user = getUser();
  const recentChatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [stompClient, setStompClient] = useState<StompJs.Client | null>(null);
  const [chatData, setChatData] = useState<PrivateChatMessage[]>(
    data.messages ?? []
  );
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File | undefined>(undefined);

  if (user === undefined) {
    redirect("/login");
  }

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
        userId: user.id,
        isImage: true,
        privateChatRoomId: data.chatRoomId,
        sellerId: data.product.seller.id,
      });

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
        userId: user.id,
        privateChatRoomId: data.chatRoomId,
        sellerId: data.product.seller.id,
      });
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
    // console.log("get message", data);

    setChatData((prev) => [
      ...prev,
      {
        chatId: data.chatId,
        message: data.message,
        user: {
          id: data.user.id,
          name: data.user.name,
          nickname: data.user.nickname,
          address: "",
        },
        createdAt: data.createdAt,
        contentType: data.contentType,
      },
    ]);
  };

  useEffect(() => {
    if (stompClient) {
      stompClient.activate();
    }
  }, [stompClient]);

  useEffect(() => {
    const client = new StompJs.Client({
      brokerURL: `${process.env.NEXT_PUBLIC_CHAT_SOCKET}/chat-server`, // WebSocket 서버 URL

      reconnectDelay: 5000,
    });
    client.onConnect = () => {
      if (client.connected) {
        // 연결 상태 확인
        client.subscribe(
          `/private-chats/${data.product.productId}/${data.product.buyer.id}`,
          (message) => {
            const data = JSON.parse(message.body).body;

            getMessage(data);
          }
        );
      }
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

  const messages =
    chatData &&
    chatData.sort((a: any, b: any) => {
      return a.createdAt - b.createdAt;
    });

  // console.log("바깥 private chatData", messages);

  return (
    <div className="relative w-full p-3 overflow-y-hidden ">
      <div
        className="h-[calc(100vh-18rem)]  flex flex-col items-start overflow-y-scroll scrollbar-hide"
        ref={recentChatRef}
      >
        {messages.map((chat, index) => {
          return (
            <Message
              key={chat.chatId}
              direction={chat.user.id === user.id ? "right" : "left"}
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
        {/* <div className="flex justify-between items-center fixed bottom-5 w-[calc(100%-60px)]">
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
        </div> */}
      </div>
    </div>
  );
}
