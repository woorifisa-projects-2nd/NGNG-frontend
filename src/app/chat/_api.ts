import * as StompJs from "@stomp/stompjs";

export const statusList = [
  { id: 1, name: "거래요청" },
  { id: 2, name: "입금대기" },
  { id: 3, name: "입금완료" },
  { id: 4, name: "배송중" },
  { id: 5, name: "거래완료" },
  { id: 6, name: "거래취소" },
  { id: 7, name: "거래신고" },
  { id: 8, name: "요청거절" },
];

export const sendPrivateChatMessage = ({
  client,
  productId,
  message,
  isImage,
  buyerId,
  sellerId,
  userId,
  privateChatRoomId,
}: {
  client: StompJs.Client;
  productId: number;
  buyerId: number;
  sellerId: number;
  message: string;
  userId: number;
  privateChatRoomId: number;
  isImage?: boolean;
}) => {
  console.log(
    `/chats/${productId}/${buyerId}/${userId === buyerId ? sellerId : buyerId}`
  );

  if (isImage !== undefined) {
    client.publish({
      destination: `/chats/${productId}/${buyerId}/${
        userId === buyerId ? sellerId : buyerId
      }`,
      body: JSON.stringify({
        message: message,
        userId,
        privateChatRoomId,
        isImage,
      }),
    });
  } else {
    client.publish({
      destination: `/chats/${productId}/${buyerId}/${
        userId === buyerId ? sellerId : buyerId
      }`,
      body: JSON.stringify({
        message: message,
        userId,
        privateChatRoomId,
      }),
    });
  }
};

export const getAllChatMessages = async ({
  chatRoomId,
  userId,
}: {
  chatRoomId: number;
  userId: number;
}) => {
  return await fetch(`/private-chats/${chatRoomId}/${userId}`).then((res) =>
    res.json()
  );
};

export const createTransactionRequest = async ({
  buyerId,
  productId,
  price,
  sellerId,
}: {
  productId: number;
  buyerId: number;
  sellerId: number;
  price: number;
}) => {
  return await fetch(`/transaction/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
      buyerId,
      sellerId,
      price,
    }),
  });
};

export const updateTransactionStatus = async ({
  statusId,
  transactionId,
}: {
  transactionId: number;
  statusId: number;
}) => {
  return await fetch(`/transaction/${transactionId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      statusId,
    }),
  });
};

export const getAllChatRoomData = async (userId: number) => {
  return await fetch(`/private-chats/${userId}`).then((res) => res.json());
};
