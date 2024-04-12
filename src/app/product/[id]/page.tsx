"use client";
import Loading from "./_design/SVG/Loading.svg";
import OpenChatIcon from "./_design/SVG/ChatsCircle.svg";
import NoticeIcon from "./_design/SVG/Megaphone.svg";
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
import { createPortal } from "react-dom";
import Link from "next/link";
import InfoIcon from "./_design/SVG/Info.svg";
import { usePathname, useRouter } from "next/navigation";

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
  const pathname = usePathname();

  const id = pathname.split("/")[2];
  const userId = 1;
  const isUserAccountOk = true;
  const [
    accountAuthenticationWanringModal,
    setAccountAuthenticationWanringModal,
  ] = useState(false);
  const recentChatRef = useRef<HTMLDivElement>(null);
  const [stompClient, setStompClient] = useState<StompJs.Client | null>(null);

  const { theme } = useTheme();

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

  const onClickChatButton = () => {
    if (data) {
      if (isUserAccountOk) {
        // 채팅방으로 이동
      } else {
        // 계좌인증 모달
        setAccountAuthenticationWanringModal(true);
      }
    }
  };
  const getMessage = (data: any) => {
    console.log("chatData", chatData);
    if (chatData) {
      console.log("get message", data);
      setChatData([
        ...chatData,
        {
          id: data.id,
          message: data.message,
          userId: data.userId,
          userName: data.userName,
          userNickName: data.userNickName,
          createAt: data.createdAt,
        },
      ]);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const productData = await getProductById(Number(id)); // getProductById(1)를 호출하여 데이터를 가져옴
      setData(productData); // 가져온 데이터로 상태 업데이트
      setChatData(productData.chats);
      //console.log("data", productData);

      setIsLoading(false); // 로딩 상태 업데이트
    }

    fetchData();
    const client = new StompJs.Client({
      brokerURL: "ws://localhost:8081/chat-server", // WebSocket 서버 URL
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
    });
    client.onConnect = () => {
      console.log("Connected to WebSocket");
      if (client.connected) {
        // 연결 상태 확인
        client.subscribe(`/product/${id}`, (message) => {
          const res = JSON.parse(message.body).body;
          console.log("data", res);
          getMessage(res);
        });
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
    if (stompClient) {
      stompClient.activate();
    }
  }, [stompClient]);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 200);
  }, [chatData]);

  if (isLoading || !data) {
    return (
      <div role="status" className="flex justify-center h-[calc(100vh-128px)]">
        <Loading />
      </div>
    ); // 로딩 중인 경우 로딩 UI 표시
  }

  return (
    <div className="px-8 xl:px-40  w-full block lg:flex  h-auto box-border justify-center">
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
                <p className="text-2xl mb-5">{data.title}</p>
                <span className="text-2xl mr-2">
                  {data.price.toLocaleString()}원
                </span>
                <span
                  className={`block xl:inline font-medium ${
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
                {!!data.purchaseAt && (
                  <div className="text-right">구매년도 {data.purchaseAt}</div>
                )}
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
                text={`${
                  data.available
                    ? data.user.id === userId
                      ? "채팅방 보기"
                      : "구매하기"
                    : "거래완료"
                }`}
                width={"100%"}
                disabled={!data.available}
                onClick={onClickChatButton}
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

      <div className="lg:sticky relative w-full lg:w-[25%] dark:shadow-gray-950 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-5 h-[calc(100vh-128px)]  top-[128px]  min-w-72">
        <div className="bg-transparent border-b-[1px] border-text-gray text-center w-full text-2xl pb-2 font-bold text-point-color">
          {/* <OpenChatIcon className="" /> */}
          {data.user.id === userId ? "내꺼채팅" : "니꺼채팅"}

          <div className="flex flex-col justify-around text-sm font-normal text-black min-w-72 ">
            <NoticeIcon className="relative top-6 lg:left-2 fill-black dark:fill-white left-44" />
            <div className="flex md:block">
              이 채팅방은
              <span className="text-red-500 font-medium">{` ${data.title}`}</span>
              에 관심이 있는 <br className="hidden lg:block" />
              모든 사용자가 참여하는 채팅방입니다.
            </div>
          </div>
        </div>
        <div
          className="min-w-52 h-[calc(100%-22rem)] mt-3 flex flex-col items-start overflow-y-scroll scrollbar-hide"
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
                    userName={`${data.user.nickname}(${maskingName(
                      data.user.name
                    )})`}
                    text={chat.message}
                    isImage={chat.isImage}
                  />
                );
              })}
        </div>

        <div className="mb-4 flex flex-col justify-between w-[calc(100%-2.5rem)] bg-light-gray absolute bottom-0 h-48 border-2 border-light-gray p-5 pb-4 rounded-xl">
          <textarea
            className=" w-full bg-light-gray resize-none focus:outline-none overflow-y-scroll scrollbar-hide dark:text-black"
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
                className="w-full h-36 object-contain relative bottom-2"
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
      {accountAuthenticationWanringModal &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white p-8 rounded-lg shadow-lg">
              <CloseIcon
                className="absolute right-2 top-2 fill-text-gray cursor-pointer"
                width={24}
                height={24}
                onClick={() => setAccountAuthenticationWanringModal(false)}
              />
              <div className="flex">
                <InfoIcon />
                <div className="ml-2">
                  계좌인증을 한 후에 상품을 구매할 수 있어요.
                </div>
              </div>

              <Link href={"/my_page"} className="flex justify-end underline">
                계좌인증하러가기
              </Link>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
