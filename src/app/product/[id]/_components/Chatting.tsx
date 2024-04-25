"use client";

import NoticeIcon from "../_design/SVG/Megaphone.svg";
import CloseIcon from "@/assets/SVG/Close.svg";
import ImagePlusIcon from "@/assets/SVG/Plus.svg";
import MessageSendIcon from "@/assets/SVG/CaretLeft.svg";
import { useContext, useEffect, useRef, useState } from "react";
import Message from "@/components/common/chat/Message";
import * as StompJs from "@stomp/stompjs";
import { sendPublicChatMessage } from "../../_api/api";
import Image from "next/image";
import { Chat, Product } from "../../_types/type";
import { UserContext } from "@/providers/UserContext";
import { redirect } from "next/navigation";

type ChattingProps = {
  data: Product;
};
export default function Chatting({ data }: ChattingProps) {
  const { getUser } = useContext(UserContext);
  const user = getUser();

  const recentChatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [stompClient, setStompClient] = useState<StompJs.Client | null>(null);
  const [chatData, setChatData] = useState<Chat[]>(data.chats);
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File | undefined>(undefined);

  if (user === undefined) {
    redirect("/login");
  }

  const isReported =
    data.reports === null
      ? false
      : data.reports.filter((report) => report.isReport).length > 0;

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
    // 이미지 서버에 전송하기

    data &&
      stompClient &&
      sendPublicChatMessage({
        client: stompClient,
        message: URL.createObjectURL(image),
        productId: data.id,
        isImage: true,
        userId: user.id,
      });

    chatData !== undefined &&
      setChatData([
        ...chatData,
        {
          id: chatData?.slice(-1)[0].id + 1,
          createdAt: new Date().toUTCString(),
          message: URL.createObjectURL(image),
          userId: user.id,
          userName: user.name,
          userNickName: user.nickname,
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
      sendPublicChatMessage({
        client: stompClient,
        message,
        productId: data.id,
        userId: user.id,
      });

    chatData !== undefined &&
      setChatData([
        ...chatData,
        {
          id: chatData?.slice(-1)[0]?.id + 1,
          createdAt: new Date().toUTCString(),
          message: message,
          userId: user.id,
          userName: user.name,
          userNickName: user.nickname,
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
  // console.log("chatData", chatData);
  const getMessage = (data: any) => {
    setChatData([
      ...chatData,
      {
        id: data.id,
        message: data.message,
        userId: data.userId,
        userName: data.userName,
        userNickName: data.userNickName,
        createdAt: data.createdAt,
      },
    ]);
  };

  useEffect(() => {
    if (stompClient) {
      stompClient.activate();
    }
  }, [stompClient]);

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_CHAT_SOCKET);
    const client = new StompJs.Client({
      brokerURL: `${process.env.NEXT_PUBLIC_CHAT_SOCKET}/chat-server`, // WebSocket 서버 URL
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
    });
    client.onConnect = () => {
      if (client.connected) {
        // 연결 상태 확인
        client.subscribe(`/public-chats/${data.id}`, (message) => {
          getMessage(JSON.parse(message.body).body);
        });
      }
    };

    !isReported && setStompClient(client); // 신고 안 당한 경우에만 채팅 연결

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
    <div className="lg:sticky relative w-full lg:w-[30%] dark:lg:shadow-gray-950 lg:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-5 h-[calc(100vh-128px)]  lg:top-[128px]  min-w-80 shadow-none dark:bg-bg-black">
      <div className="bg-transparent border-b-[1px] border-text-gray text-center w-full text-2xl pb-2 font-bold text-point-color">
        {data.user.id === user.id ? "내꺼채팅" : "니꺼채팅"}

        <div className="flex items-center text-sm font-normal text-black  justify-center w-full">
          <NoticeIcon className="mr-2 fill-black dark:fill-white " />
          <div className="text-start break-all ">
            이 채팅방은
            <span className="text-red-500 font-medium">{` ${data.title}`}</span>
            에 관심이 있는 모든 사용자가 참여하는 채팅방입니다.
          </div>
        </div>
      </div>
      <div
        className="min-w-72 h-[calc(100%-15rem)] mt-3 flex flex-col items-start overflow-y-scroll scrollbar-hide"
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
                  key={chat.id}
                  direction={user.id === chat.userId ? "right" : "left"}
                  userName={chat.userNickName}
                  text={chat.message}
                  isImage={chat.isImage}
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

      <div className="mb-4 flex flex-col justify-between w-[calc(100%-2.5rem)] bg-light-gray absolute bottom-0 h-36 border-2 border-light-gray p-5 pb-4 rounded-xl">
        <textarea
          className=" w-full bg-light-gray resize-none focus:outline-none overflow-y-scroll scrollbar-hide dark:text-black"
          value={message}
          onKeyDown={enter}
          onChange={changeMessage}
          rows={4}
          placeholder={
            isReported ? "신고받은 상품입니다." : "메시지를 입력하세요."
          }
          disabled={isReported}
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
        <div className="w-full flex justify-between items-center">
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
    </div>
  );
}
