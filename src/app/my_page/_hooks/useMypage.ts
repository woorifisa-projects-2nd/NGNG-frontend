import { useEffect, useState } from "react";
import { USER_ID } from "../_constants/user";

const useMypage = () => {
  const [userInfo, setUserInfo] = useState<UserGetReposne>();

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
        (product: Product) => product.productId !== deleteProductId
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
          Fiall && Fiall("상품 상태를 업데이트 하지 못함");
        }
      })
      .then((data) => {
        // 유저 정보 갱신 처리
        setUserInfo((prev: any) => ({
          ...prev,
          sellList: prev.sellList.map((sell: Product) => {
            if (
              sell.transactionDetails.transactionDetailsId ===
              data.transactionDetailsId
            ) {
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

  useEffect(() => {
    fetch(`/api/user/mypage/${USER_ID}`)
      .then((res) => res.json())
      .then((data: UserGetReposne) => {
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
  };
};

export default useMypage;
