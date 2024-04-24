import * as StompJs from "@stomp/stompjs";
import { Product, RequestReport } from "../_types/type";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { getAccessToken } from "@/app/my_page/_utils/auth-header";

export const getProductById = async (id: number) => {
  // SSR을 하기 위해서 풀 URL 써줘야 함
  const res = await fetch(`http://localhost:8080/products/${id}`, {
    headers: {
      Authorization: getAccessToken(),
    },
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

export const findPrivateChatRoomByProductIdAndBuyerId = async (
  productId: number,
  buyerId: number
) => {
  return await fetch(`/private-chats/find/${productId}/${buyerId}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  }).then((res) => {
    if (res.status === 404) {
      return -1;
    }
    return res.json();
  });
};
export const createPrivateChatRoom = async ({
  buyerId,
  productId,
  sellerId,
}: {
  productId: number;
  buyerId: number;
  sellerId: number;
}) => {
  return await fetch(`/private-chats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAccessToken(),
    },
    body: JSON.stringify({
      productId,
      buyerId,
      sellerId,
    }),
  }).then((res) => res.json());
};

export const createReport = async (
  requestReport: RequestReport
): Promise<boolean> => {
  // console.log(mapProductToAPISepc(product));

  const res = await fetch(`http://localhost:8080/admin/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAccessToken(),
    },
    body: JSON.stringify(requestReport),
  });

  if (res.ok === true) {
    const reportIdResponse = await res.text();
    const reportIdObject = JSON.parse(reportIdResponse);
    const reportId = reportIdObject.reportId;

    if (requestReport.images.length > 0) {
      const resImages = await createImages(reportId, requestReport.images);
      return resImages.ok;
    }
    return true;
  }

  return false;
};

const createImages = async (
  reportId: string,
  images: {
    id: number;
    imageURL: File;
  }[]
) => {
  const fomData = new FormData();

  images.forEach((image) => {
    fomData.append("files", image.imageURL);
  });
  fomData.append("reportId", reportId);

  console.log(fomData);

  // return await fetch("/api/upload", {
  return await fetch(`http://localhost:8080/reportImages/upload`, {
    method: "POST",
    body: fomData,
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
