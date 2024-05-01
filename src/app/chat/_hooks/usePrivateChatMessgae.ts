import useSWR from "swr";
import {
  createTransactionRequestAPI,
  getAllChatMessages,
  updateTransactionRequestAPI,
} from "../_api";

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
  };
  messages: PrivateChatMessage[] | null;
  request: {
    requestId: number;
    productId: number;
    sellerId: number;
    buyerId: number;
    price: number;
    createdAt: string;
    updatedAt: string;
    isAccepted: boolean | null;
  } | null;
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
const usePrivateChatMessage = ({
  chatRoomId,
  userId,
}: {
  chatRoomId: number;
  userId: number;
}) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<PrivateChat>(
    "/chat/private-chat/chat-room-id/user-id",
    () =>
      getAllChatMessages({ chatRoomId, userId }).then((data) => {
        return { ...data } as PrivateChat;
      }),
    {
      revalidateIfStale: true,
      revalidateOnMount: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 100,
      focusThrottleInterval: 100,
      errorRetryInterval: 500,
    }
  );

  const updateTransactionRequest = async ({
    isAccepted,
    requestId,
  }: {
    requestId: number;
    isAccepted: boolean;
  }) => {
    mutate(
      async (prev: PrivateChat | undefined) => {
        const update = await updateTransactionRequestAPI({
          isAccepted,
          transactionRequestId: requestId,
        });

        return isAccepted
          ? ({
              ...prev,
              product: {
                ...prev?.product,
                transactionDetails: {
                  address: "",
                  id: -1,
                  status: {
                    id: -1,
                    status: "",
                  },
                },
              },
            } as PrivateChat)
          : ({
              ...prev,
              product: {
                ...prev?.product,
              },
            } as PrivateChat);
      },
      {
        revalidate: true,
      }
    );
  };

  const createTransactionRequest = async ({
    buyerId,
    price,
    productId,
    sellerId,
  }: {
    buyerId: number;
    productId: number;
    sellerId: number;
    price: number;
  }) => {
    mutate(
      async (prev: PrivateChat | undefined) => {
        const update = await createTransactionRequestAPI({
          buyerId,
          productId,
          sellerId,
          price,
        });
        return {
          ...prev,
        } as PrivateChat;
      },
      {
        revalidate: true,
      }
    );
  };

  return {
    data,
    error,
    isLoading,
    isValidating,
    updateTransactionRequest,
    createTransactionRequest,
  };
};

export default usePrivateChatMessage;
