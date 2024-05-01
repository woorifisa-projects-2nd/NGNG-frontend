import useSWR from "swr";
import {
  deleteProductById,
  getFetchMyPage,
  updateFetchMyPage,
  updateTransaction,
} from "../_api/api";

const useMypageSWR = () => {
  const {
    data: user,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<MypageReponse>(
    "/api/users",
    () =>
      getFetchMyPage().then((data) => {
        return {
          ...data,
          sellList: data.sellList.filter((p) => p.visible),
          buyList: data.buyList.filter((p) => p.product.visible),
        } as MypageReponse;
      })
    // 자동 갱신 비활성화
    // {
    //   revalidateIfStale: false,
    //   revalidateOnFocus: false,
    //   revalidateOnReconnect: false,
    // }
  );

  const updateProfile = async (
    body: {
      nickname?: string;
      address?: string;
      accountBank?: string;
      accountNumber?: string;
    },
    Done?: () => void
  ) => {
    mutate(() => updateFetchMyPage(body, Done), {
      // 데이터 먼저 변경 후 캐시 업데이트
      populateCache: (update, prev) => {
        return {
          ...prev,
          ...(body.address && { address: update.address }),
          ...(body.nickname && { nickName: update.nickName }),
          ...(body.accountBank && { accountBank: update.accountBank }),
          ...(body.accountNumber && { accountNumber: update.accountNumber }),
        } as MypageReponse;
      },
      revalidate: true,
    });
  };

  const UpdateTransactionDetailStatus = async (
    payload: UpdateTransDetiilsFunctionParameter
  ) => {
    // console.log(payload);

    mutate(
      async (prev: MypageReponse | undefined) => {
        // 현재 데이터를 기반하여 데이터 변경
        const update = await updateTransaction(payload);

        return {
          ...prev,
          sellList: prev!.sellList.map((sell: Product) => {
            if (sell.transactionDetails?.id === update.id) {
              return {
                ...sell,
                transactionDetails: {
                  ...sell.transactionDetails,
                  status: update.status,
                },
              };
            }

            return sell;
          }),
        } as MypageReponse;
      },
      {
        revalidate: true,
      }
    );
  };

  const updateCost = async (cost: number) => {
    mutate(
      // 현재 데이터를 기반하여 데이터 변경
      async (prev: MypageReponse | undefined) => {
        return {
          ...prev,
          point: prev!.point + cost,
        } as MypageReponse;
      },
      {
        // 검증
        revalidate: true,
      }
    );
  };

  const deleteProduct = async (deleteProductId: number) => {
    // 삭제 처리
    await deleteProductById(deleteProductId);
    //  true일시
    mutate(
      async (prev: any) => ({
        ...prev,
        sellList: prev.sellList.filter(
          (product: Product) => product.id !== deleteProductId
        ),
      }),
      {
        // 검증 안함
        revalidate: false,
      }
    );
  };

  return {
    user,
    error,
    isLoading,
    isValidating,
    updateProfile,
    UpdateTransactionDetailStatus,
    updateCost,
    deleteProduct,
  };
};

export default useMypageSWR;
