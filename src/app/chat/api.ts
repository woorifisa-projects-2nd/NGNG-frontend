import * as StompJs from "@stomp/stompjs";
export const sendPrivateChatMessage = ({
  client,
  productId,
  message,
  isImage,
  buyerId,
  userId,
  privateChatRoomId,
}: {
  client: StompJs.Client;
  productId: number;
  buyerId: number;
  message: string;
  userId: number;
  privateChatRoomId: number;
  isImage?: boolean;
}) => {
  if (isImage !== undefined) {
    client.publish({
      destination: `/chats/${productId}/${buyerId}`,
      body: JSON.stringify({
        message: message,
        userId,
        privateChatRoomId,
        isImage,
      }),
    });
  } else {
    client.publish({
      destination: `/chats/${productId}/${buyerId}`,
      body: JSON.stringify({
        message: message,
        userId,
        privateChatRoomId,
      }),
    });
  }
};
