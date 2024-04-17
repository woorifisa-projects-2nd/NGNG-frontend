import { useEffect, useState } from "react";
import { getAccessToken } from "../_utils/auth-header";

const useMypage = () => {
  const [userInfo, setUserInfo] = useState<MypageReponse>();

  const setPoint = (cost: number) => {
    setUserInfo((prev: any) => ({
      ...prev,
      point: cost,
    }));
  };
  const deleteProduct = (deleteProductId: number) => {
    // 삭제 처리
    //  true일시
    setUserInfo((prev: any) => ({
      ...prev,
      sellList: prev.sellList.filter(
        (product: Product) => product.id !== deleteProductId
      ),
    }));
  };

  const UpdateTransactionDetailStatus = ({
    data: { transactionDetailsId, status },
    Done,
    Fiall,
  }: UpdateTransDetiilsFunctionParameter) => {
    fetch(`/api/transaction/${transactionDetailsId}`, {
      method: "PUT",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
      redirect: "follow",
      body: JSON.stringify({
        status,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          Done && Done();
          return res.json();
        } else {
          Fiall && Fiall("상품 상태를 업데이트 하지 못했어요");
        }
      })
      .then((data) => {
        // 유저 정보 갱신 처리
        setUserInfo((prev: any) => ({
          ...prev,
          sellList: prev.sellList.map((sell: Product) => {
            if (sell.transactionDetails?.id === data.id) {
              return {
                ...sell,
                transactionDetails: {
                  ...sell.transactionDetails,
                  status: data.status,
                },
              };
            }

            return sell;
          }),
        }));
      });
  };

  const updateUserProfile = async (
    body: {
      nickname?: string;
      address?: string;
    },
    Done?: () => void
  ) => {
    fetch("/api/users", {
      method: "PUT",
      cache: "no-cache",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) Done && Done();

        return res.json();
      })
      .then((data) => {
        setUserInfo((prev: any) => ({
          ...prev,
          ...(data.address && { address: data.address }),
          ...(data.nickName && { nickName: data.nickName }),
        }));
      });
  };

  useEffect(() => {
    fetch(`/api/users/mypage`, {
      headers: {
        Authorization: getAccessToken(),
      },
    })
      .then((res) => res.json())
      .then((data: MypageReponse) => {
        data.sellList.sort((item1, item2) => {
          const status1 = item1.transactionDetails?.status?.id || 0;
          const status2 = item2.transactionDetails?.status?.id || 0;
          // 숫자 값 비교
          return status1 - status2;
        });
        setUserInfo(data);
      });
  }, []);

  return {
    userInfo,
    setPoint,
    deleteProduct,
    UpdateTransactionDetailStatus,
    updateUserProfile,
  };
};

export default useMypage;
