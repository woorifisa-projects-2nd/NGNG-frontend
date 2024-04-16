import * as StompJs from "@stomp/stompjs";
import { Product } from "../_types/type";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export const getProductById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/products/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return { status: res.status, data: undefined };
  } else {
    return res.json().then((data) => {
      console.log("data", data);

      return { status: res.status, data: data as Product };
    });
  }
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
    destination: `/chats/${productId}`,
    body: JSON.stringify({
      message: message,
      userId: 1,
      isImage,
    }),
  });
};

dayjs.extend(utc);

export const getLocalTime = (time: string) => {
  let utcTime = dayjs.utc(time);

  return utcTime.local().format("HH:mm");
};
