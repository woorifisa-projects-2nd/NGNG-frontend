"use client";
import ImagePlusIcon from "./_design/SVG/Plus.svg";
import MessageSendIcon from "./_design/SVG/CaretLeft.svg";
import Image from "next/image";
import SirenIcon from "./_design/SVG/Siren.svg";
import { getProductById, sendPublicChatMessage } from "../_api/api";
import Button from "@/components/common/Button";
import Message from "@/components/common/chat/Message";
import { useEffect, useRef, useState } from "react";
import { maskingName } from "@/utils";
import CloseIcon from "@/assets/SVG/Close.svg";
import { useTheme } from "next-themes";
import * as StompJs from "@stomp/stompjs";
import { v4 } from "uuid";

type User = {
  id: number;
  name: string;
  nickname: string;
};

type Status = {
  id: number;
  name: string;
};

type Tag = {
  tagName: string;
};

type Image = {
  id: number;
  imageURL: string;
};

type Chat = {
  id: number;
  message: string;
  userId: number;
  userName: string;
  userNickName: string;
  createAt: string;
  isImage?: boolean;
};

type Product = {
  id: number;
  available: boolean;
  title: string;
  content: string;
  price: number;
  isEscrow: boolean;
  discountable: boolean;
  purchaseAt: string | null;
  forSale: boolean;
  createdAt: string;
  updatedAt: string | null;
  visible: boolean;
  freeShipping: boolean;
  refreshedAt: string | null;
  user: User;
  status: Status;
  category: {
    id: number;
    name: string;
  };
  tags: Tag[];
  images: Image[];
  chats: Chat[];
};

export default function ProductDetail() {
  //userID

  const recentChatRef = useRef<HTMLDivElement>(null);
  const [stompClient, setStompClient] = useState<StompJs.Client | null>(null);
  const { theme } = useTheme();
  const iconColor = theme === "dark" ? "white" : "#272727";
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true); // isLoading 상태의 타입을 boolean으로 지정
  const [data, setData] = useState<Product | null>(null); // data 상태의 타입을 ProductDetailType 또는 null로 지정
  const [chatData, setChatData] = useState<undefined | Chat[]>(undefined);
  const changeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value);
  };

  const resetImage = () => {
    setImage(undefined);
  };
  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files && setImage(e.target.files[0]);
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

  const enter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (image !== undefined) {
        sendImage(image);
        setImage(undefined);
      } else {
        sendMessage(message);
      }
    }
  };

  const sendImage = (image: File) => {
    // 이미지 서버에 전송하기
    console.log("image");
    data &&
      stompClient &&
      sendPublicChatMessage({
        client: stompClient,
        message: URL.createObjectURL(image),
        productId: data.id,
        isImage: true,
      });

    chatData !== undefined &&
      setChatData([
        ...chatData,
        {
          id: chatData?.slice(-1)[0].id + 1,
          createAt: new Date().toUTCString(),
          message: URL.createObjectURL(image),
          userId: 2,
          userName: "테스트",
          userNickName: "테스트",
        },
      ]);
    setMessage("");
    setImage(undefined);
    scrollToBottom();
  };

  const sendMessage = (message: string) => {
    // 메시지 서버에 전송하기
    console.log("message");

    data &&
      stompClient &&
      sendPublicChatMessage({
        client: stompClient,
        message,
        productId: data.id,
      });

    chatData !== undefined &&
      setChatData([
        ...chatData,
        {
          id: chatData?.slice(-1)[0].id + 1,
          createAt: new Date().toUTCString(),
          message: message,
          userId: 2,
          userName: "테스트",
          userNickName: "테스트",
        },
      ]);
    setMessage("");
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (recentChatRef.current) {
      recentChatRef.current.scrollTop = recentChatRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    async function fetchData() {
      const productData = await getProductById(1); // getProductById(1)를 호출하여 데이터를 가져옴
      setData(productData); // 가져온 데이터로 상태 업데이트
      setChatData(productData.chats);
      //console.log("data", productData);

      setIsLoading(false); // 로딩 상태 업데이트
    }

    const initializeWebSocket = async () => {
      const client = new StompJs.Client({
        brokerURL: "ws://localhost:8081/chat-server", // WebSocket 서버 URL
        debug: function (str) {
          //console.log(str);
        },
        reconnectDelay: 5000,
      });

      client.onConnect = () => {
        // console.log("Connected to WebSocket");
        client.subscribe("/topic/public", (message) => {
          console.log("message", message);
        });
      };

      client.onStompError = (frame) => {
        console.log("Broker reported error: " + frame.headers["message"]);
        console.log("Additional details: " + frame.body);
      };

      client.activate();
      setStompClient(client);
    };
    fetchData();
    initializeWebSocket();
    return () => {
      if (stompClient) stompClient.deactivate();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 200);
  }, [chatData]);

  if (isLoading || !data) {
    return (
      <div role="status">
        <svg
          aria-hidden="true"
          className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-point-color"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    ); // 로딩 중인 경우 로딩 UI 표시
  }

  return (
    <div className="px-8 xl:px-40  w-full block lg:flex  h-auto box-border">
      <div className="px-3 py-5">
        <div className="block xl:flex">
          <div className="w-full xl:w-1/2 mr-10 flex items-center">
            <Image
              className="object-contain w-full rounded h-auto"
              alt="상품 상세 이미지"
              src={"/car.jpg"}
              width={600}
              height={600}
            />
          </div>
          <div className="mt-10 xl:mt-0 w-full xl:w-2/5 flex flex-col justify-between">
            <div className="flex w-full justify-between mb-10">
              <div>
                <p className="text-text-gray">홈 - {data.category.name}</p>
                <p className="text-2xl">{data.title}</p>
                <span className="text-2xl mr-2">
                  {data.price.toLocaleString()}원
                </span>
                <span
                  className={`font-medium ${
                    data.discountable ? "text-point-color" : "text-red-500"
                  } `}
                >
                  {data.discountable ? "할인가능" : "할인불가능"}
                </span>
              </div>
              <div>
                <div className="flex text-red-500 font-medium justify-end">
                  <SirenIcon /> 신고하기
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <Image
                    src={"/car.jpg"}
                    width={60}
                    height={60}
                    alt="프로필 사진"
                    className="rounded-[50%] h-12 w-12"
                  />
                  {`${data.user.nickname} (${maskingName(data.user.name)})`}
                </div>
                {!!data.purchaseAt && <div>구매년도 {data.purchaseAt}</div>}
              </div>
            </div>
            <div className="mb-10 w-full flex rounded-lg border-[1px] border-text-gray justify-around p-8 font-medium">
              <div className="flex flex-col items-center text-center ">
                <p className="text-text-gray mb-5">제품상태</p>
                <p className="">{data.status.name}</p>
              </div>
              <p className=" border-r-[1px] border-text-gray" />
              <div className="flex flex-col items-center text-center ">
                <p className=" text-text-gray  mb-5">거래방식</p>
                <p className="">{data.isEscrow ? "안심거래" : "일반거래"}</p>
              </div>
              <p className=" border-r-[1px] border-text-gray" />
              <div className="flex flex-col items-center  ">
                <p className="text-text-gray mb-5">배송비</p>
                <p>{data.freeShipping ? "포함" : "미포함"}</p>
              </div>
            </div>
            <div>
              <Button
                text={`${data.available ? "1:1 채팅/구매하기" : "거래완료"}`}
                width={"100%"}
                disabled={!data.available}
              />
            </div>
          </div>
        </div>
        <div>
          <hr className="border-t-[1px] border-black w-full mt-10" />
          <div>
            <div className="text-2xl border-b-[1px] border-text-gray w-full py-5">
              니꺼 상품 정보
            </div>
            <div className="text-2xl min-h-44 py-10">{data.content}</div>
            <div className="flex border-t-2 border-text-gray w-full py-5 text-xl font-medium text-text-gray">
              <span className="mr-10">#태그</span>{" "}
              {data.tags.map((tag) => {
                return <span key={tag.tagName}>#{tag.tagName}</span>;
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:sticky relative w-full lg:w-[25%] dark:shadow-gray-950 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-5 h-[calc(100vh-128px)]  top-[128px]">
        <div
          className="h-[calc(100%-15rem)] flex flex-col items-start overflow-y-scroll scrollbar-hide"
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
                    direction={data.user.id === chat.userId ? "left" : "right"}
                    text={chat.message}
                    isImage={chat.isImage}
                  />
                );
              })}
        </div>

        <div className="mb-4 flex flex-col justify-between w-[calc(100%-2.5rem)] bg-light-gray absolute bottom-0 h-48 border-2 border-light-gray p-5 pb-4 rounded-xl">
          <textarea
            className=" w-full bg-light-gray resize-none focus:outline-none overflow-y-scroll scrollbar-hide "
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
                className="absolute right-2 top-2 cursor-pointer fill-white dark:fill-black"
                color={iconColor}
                onClick={resetImage}
              />
              <Image
                src={URL.createObjectURL(image)}
                alt="첨부파일"
                width={0}
                height={0}
                className="w-full h-36 object-contain"
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
              className="cursor-pointer"
              onClick={enterMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
