import { getAccessToken } from "../_utils/auth-header";

export const getFetchMyPage = async () => {
  // console.log("access", getAccessToken());

  const res = await fetch(`/api/users/mypage`, {
    headers: {
      Authorization: await getAccessToken(),
    },
    // cache: "no-store",
  });
  // console.log("mypage data", res);

  const data = (await res.json()) as MypageReponse;
  data.sellList.sort((item1, item2) => {
    const status1 = item1.transactionDetails?.status?.id || 0;
    const status2 = item2.transactionDetails?.status?.id || 0;
    // 숫자 값 비교
    return status1 - status2;
  });

  return data;
};

export const updateFetchMyPage = async (
  body: {
    nickname?: string;
    address?: string;
  },
  Done?: () => void
) => {
  // console.log(body);

  return (await fetch("/api/users", {
    method: "PUT",
    cache: "no-cache",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAccessToken(),
    },
    body: JSON.stringify(body),
  }).then((res) => {
    if (res.ok) Done && Done();

    return res.json();
  })) as Promise<any>;
};

export const updateUserAccount = async (
  body: {
    userId: number;
    accountBank: string;
    accountNumber: string;
  },
  Done?: () => void
) => {
  // console.log(body);

  return (await fetch("/api/confirm/account", {
    method: "PUT",
    cache: "no-cache",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAccessToken(),
    },
    body: JSON.stringify(body),
  }).then((res) => {
    if (res.ok) Done && Done();
  })) as any;
};

export const updateUserAddress = async (
  body: { id: number; address: string },
  Done?: () => void
) => {
  return (await fetch("/api/confirm/address", {
    method: "PUT",
    cache: "no-cache",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAccessToken(),
    },
    body: JSON.stringify(body),
  }).then((res) => {
    if (res.ok) Done && Done();
  })) as any;
};

export const updateTransaction = async ({
  data: { status, transactionDetailsId },
  Done,
  Fiall,
}: UpdateTransDetiilsFunctionParameter) => {
  return fetch(`/api/transaction/${transactionDetailsId}`, {
    method: "PUT",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAccessToken(),
    },
    redirect: "follow",
    body: JSON.stringify({
      statusId: status,
    }),
  }).then((res) => {
    if (res.status === 200) {
      Done && Done();
      return res.json();
    } else {
      Fiall && Fiall("상품 상태를 업데이트 하지 못했어요");
    }
  }) as Promise<UpdateTransactionDetailsStatusResponse>;
};

export const getPointHistoryAll = async () => {
  return await fetch(`/api/points/all`, {
    headers: {
      Authorization: await getAccessToken(),
    },
  }).then((res) => res.json());
};

export const addFetchPoint = async (cost: number, Done: () => void) => {
  return await fetch(`/api/points`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAccessToken(),
    },
    body: JSON.stringify({
      addCost: cost,
      type: "충전",
    }),
  }).then((res) => {
    if (res.ok) Done && Done();
    return res.json();
  });
};

export const updateProductPurchaseById = async (productId: number) => {
  return await fetch(`/products/refresh/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAccessToken(),
    },
  }).then((res) => res.text());
};

export const deleteProductById = async (productId: number) => {
  return await fetch(`/products/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAccessToken(),
    },
  }).then((res) => res.text());
};

export const isPayment = async (cost: number) => {
  return await fetch(`/api/points/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAccessToken(),
    },
    body: JSON.stringify({
      paymentCost: cost,
    }),
  }).then((res) => res.json());
};

export const paymentProduct = async ({
  cost,
  productId,
}: {
  cost: number;
  productId: number;
}) => {
  return await fetch(`/api/points/payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAccessToken(),
    },
    body: JSON.stringify({
      paymentCost: cost,
      payProductId: productId,
    }),
  }).then((res) => res.json());
};
