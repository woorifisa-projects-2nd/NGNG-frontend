import * as StompJs from "@stomp/stompjs";
import { Product, RequestReport } from "../_types/type";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export const getProductById = async (id: string) => {
  const res = await fetch(`http://${process.env.BACKEND_URL}/products/${id}`, {
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

export const findPrivateChatRoomByProductIdAndBuyerId = async (
  productId: number,
  buyerId: number
) => {
  return await fetch(`/private-chats/find/${productId}/${buyerId}`).then(
    (res) => {
      if (res.status === 404) {
        return -1;
      }
      return res.json();
    }
  );
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

  const res = await fetch(`/api/admin/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
  return await fetch(`/api/reportImages/upload`, {
    method: "POST",
    body: fomData,
  });
};
