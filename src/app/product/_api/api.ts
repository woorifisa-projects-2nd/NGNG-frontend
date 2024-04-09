import * as StompJs from "@stomp/stompjs";

export const getProductById = async (id: number) => {
  const res = await fetch(`http://localhost:3000/products/${id}`);
  return res.json();
};
export const sendPublicChatMessage = ({
  client,
  productId,
  message,
  isImage,
}: {
  client: StompJs.Client;
  productId: number;
  message: string;
  isImage?: boolean;
}) => {
  client.publish({
    destination: `/public-chat/${productId}`,
    body: JSON.stringify({
      message: message,
      userId: 1,
      isImage,
    }),
  });
};
