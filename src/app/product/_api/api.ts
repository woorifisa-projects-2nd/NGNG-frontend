import * as StompJs from "@stomp/stompjs";
import { Product, RequestReport } from "../_types/type";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  getAccessToken,
  setAccessToken,
} from "@/app/my_page/_utils/auth-header";
import { ProductRespons } from "../[id]/_hooks/useProduct";

export const getProductById = async (id: number): Promise<ProductRespons> => {
  return await fetch(`/products/${id}`, {
    headers: {
      Authorization: getAccessToken(),
    },
    cache: "no-cache",
  }).then(async (res) => {
    setAccessToken(res);
    if (res.status === 404) {
      return { status: res.status, data: undefined };
    } else {
      return {
        status: res.status,
        data: (await res.json()) as unknown as Product,
      };
    }
  });
};
export const sendPublicChatMessage = ({
  client,
  productId,
  message,
  isImage,
  userId,
}: {
  client: StompJs.Client;
  productId: number;
  message: string;
  isImage?: boolean;
  userId: number;
}) => {
  client.publish({
    destination: `/chats/${productId}`,
    body: JSON.stringify({
      message,
      userId,
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
    setAccessToken(res);
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
  }).then((res) => {
    setAccessToken(res);
    return res.json();
  });
};

export const createReport = async (
  requestReport: RequestReport
): Promise<boolean> => {
  // console.log(mapProductToAPISepc(product));

  const res = await fetch(`/api/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAccessToken(),
    },
    body: JSON.stringify(requestReport),
  });
  setAccessToken(res);

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

  // console.log(fomData);

  // return await fetch("/api/upload", {
  return await fetch(`/api/reportImages/upload`, {
    method: "POST",
    headers: {
      Authorization: getAccessToken(),
    },
    body: fomData,
  }).then((res) => {
    setAccessToken(res);
    return res.json();
  });
};
