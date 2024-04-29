"use client";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Message from "@/components/common/chat/Message";
import * as StompJs from "@stomp/stompjs";
import { sendPublicChatMessage } from "../../_api/api";
import { Chat, Product } from "../../_types/type";
import { UserContext } from "@/providers/UserContext";
import { redirect } from "next/navigation";
import ChattingHeader from "./ChattingHeader";
import ChattingInputTextArea from "./ChattingInputTextArea";

type ChattingProps = {
  data: Product;
};
export default function Chatting({ data }: ChattingProps) {
  const { getUser } = useContext(UserContext);
  const user = getUser();

  const recentChatRef = useRef<HTMLDivElement>(null);

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

  const enter = () => {
    if (image !== undefined) {
      sendImage(image);
      setImage(undefined);
    } else {
      sendMessage(message);
    }
  };
  const changeMessage = (message: string) => {
    setMessage(message);
  };
  const sendImage = (image: File) => {
    // 이미지 서버에 전송하기
    stompClient &&
      sendPublicChatMessage({
        client: stompClient,
        message: URL.createObjectURL(image),
        productId: data.id,
        isImage: true,
        userId: user.id,
      });

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

  const scrollToBottom = useCallback(() => {
    if (recentChatRef.current) {
      recentChatRef.current.scrollTop = recentChatRef.current.scrollHeight;
    }
  }, []);

  const sendMessage = (message: string) => {
    stompClient &&
      sendPublicChatMessage({
        client: stompClient,
        message,
        productId: data.id,
        userId: user.id,
      });
    setMessage("");
    scrollToBottom();
  };

  const resetImage = () => {
    setImage(undefined);
    setMessage("");
  };

  const changeFile = (file: File) => {
    setImage(file);
    setMessage(" ");
  };

  const enterMessage = () => {
    if (image !== undefined) {
      sendImage(image);
      setImage(undefined);
    } else {
      sendMessage(message);
    }
  };
  console.log("data", chatData);
  const getMessage = (data: any) => {
    console.log("메시지 수신", data);

    setChatData([
      ...chatData,
      {
        id: data.id,
        message: data.message,
        userId: data.userId,
        userName: data.userName,
        userNickName: data.userNickname,
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
    const client = new StompJs.Client({
      brokerURL: `${process.env.NEXT_PUBLIC_CHAT_SOCKET}/chat-server`, // WebSocket 서버 URL
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
      <ChattingHeader data={data} userId={user.id} />
      <div
        className="min-w-72 h-[calc(100%-15rem)] mt-3 flex flex-col items-start overflow-y-scroll scrollbar-hide"
        ref={recentChatRef}
      >
        {chatData
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
      <ChattingInputTextArea
        changeFile={changeFile}
        changeMessage={changeMessage}
        enter={enter}
        enterMessage={enterMessage}
        isReported={isReported}
        message={message}
        resetImage={resetImage}
        image={image}
      />
    </div>
  );
}
