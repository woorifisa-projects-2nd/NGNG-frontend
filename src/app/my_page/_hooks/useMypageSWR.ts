import useSWR from "swr";
import { getAccessToken } from "../_utils/auth-header";
import {
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
  } = useSWR<MypageReponse>("/api/users", () => getFetchMyPage());

  const updateProfile = async (
    body: {
      nickname?: string;
      address?: string;
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
        } as any;
      },
      revalidate: true,
    });
  };

  const UpdateTransactionDetailStatus = async (
    payload: UpdateTransDetiilsFunctionParameter
  ) => {
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

  const deleteProduct = (deleteProductId: number) => {
    // 삭제 처리
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
