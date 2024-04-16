import Image from "next/image";
import Won from "@/assets/SVG/won.svg";
import PrivateChatting from "./_components/PrivateChatting";
export type PrivateChat = {
  chatRoomId: number;
  product: {
    productId: number;
    productTitle: string;
    price: number;
    isEscrow: boolean;
    discountable: false;
    thumbnailUrl: string;
    transactionDetails?: any | null;
    seller: PrivateChatUser;
    buyer: PrivateChatUser;
  };
  messages: PrivateChatMessage[];
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
  const data: PrivateChat = {
    chatRoomId: 5,
    product: {
      productId: 6,
      productTitle: "오리 인형 팔아요",
      price: 100000,
      isEscrow: false,
      discountable: false,
      thumbnailUrl:
        "https://team3-s3-test.s3.ap-northeast-2.amazonaws.com/2024-04-15T16-05-19-D0.7348087570709844image%20%282%29.png",
      transactionDetails: null,
      seller: {
        id: 2,
        name: "김땡땡",
        nickname: "사용자",
        address: "서울시",
        accountBank: null,
        accountNumber: null,
      },
      buyer: {
        id: 3,
        name: "조네모",
        nickname: "쿄오쿄어",
        address: "서울시",
        accountBank: null,
        accountNumber: null,
      },
    },
    messages: [
      {
        chatId: 6,
        message: "안녕하세요 물건 사고 싶은데요",
        createdAt: "2024-04-16T03:04:41.790+00:00",
        user: {
          id: 3,
          name: "조네모",
          nickname: "쿄오쿄어",
          address: "서울시",
          accountBank: null,
          accountNumber: null,
        },
        contentType: "TEXT",
      },
      {
        chatId: 7,
        message: "아 네 안녕하세요 확인하고 싶은 거 있으세요?",
        createdAt: "2024-04-16T03:04:43.710+00:00",
        user: {
          id: 2,
          name: "김땡땡",
          nickname: "사용자",
          address: "서울시",
          accountBank: null,
          accountNumber: null,
        },
        contentType: "TEXT",
      },
    ],
  };
  const userId = 2;

  const mapTransactionDetailToStatus = (status: string | null) => {
    if (status === null) {
      return "송금하기";
    } else {
      return "구매확정";
    }
  };
  return (
    <div className="relative h-full scrollbar-hide">
      <div className="flex justify-center font-bold p-2 text-lg">
        {data.product.seller.id === userId
          ? data.product.buyer.nickname
          : data.product.seller.nickname}
      </div>

      <div className="flex border-y-2 border-light-gray justify-between p-2">
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-xl"
            src={data.product.thumbnailUrl}
            width={60}
            height={60}
            alt={data.product.productTitle}
          />
          <div>
            <p className="text-lg">{data.product.productTitle}</p>
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

        <div className=" mt-2 flex items-center rounded-lg p-2 border-2 border-light-gray cursor-pointer text-black font-semibold h-10 hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ">
          <p className="flex items-center gap-1 text-sm">
            <Won className="" />
            {mapTransactionDetailToStatus(data.product.transactionDetails)}
          </p>
        </div>
      </div>
      <div className="h-full w-full">
        <PrivateChatting data={data} />
      </div>
    </div>
  );
}
