import useSWR from "swr";
import { getAllChatRoomData } from "../_api";
import { ChatData } from "../page";

const usePrivateChatRoom = (userId: number) => {
  const {
    data: chatData,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<ChatData[]>(
    "/chat/private-chat/user-id",
    () =>
      getAllChatRoomData(userId).then((data) => {
        return [...data] as ChatData[];
      }),
    // 자동 갱신 비활성화
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  //   const updateProfile = async (
  //     body: {
  //       nickname?: string;
  //       address?: string;
  //     },
  //     Done?: () => void
  //   ) => {
  //     mutate(() => updateFetchMyPage(body, Done), {
  //       // 데이터 먼저 변경 후 캐시 업데이트
  //       populateCache: (update, prev) => {
  //         return {
  //           ...prev,
  //           ...(body.address && { address: update.address }),
  //           ...(body.nickname && { nickName: update.nickName }),
  //         } as any;
  //       },
  //       revalidate: true,
  //     });
  //   };

  return {
    chatData,
    error,
    isLoading,
    isValidating,
    // updateProfile,
  };
};

export default usePrivateChatRoom;
