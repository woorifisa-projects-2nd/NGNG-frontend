import {
  getAccessToken,
  setAccessToken,
} from "@/app/my_page/_utils/auth-header";
import useSWR from "swr";
export type MainPageProduct = {
  category: string;
  content: string;
  createdAt: string;
  discountable: boolean;
  escrow: boolean;
  forSale: boolean;
  id: string;
  price: number;
  productId: number;
  refreshedAt: string;
  tags: string[];
  thumbnailUrl: string;
  title: string;
  updatedAt: string;
};
const getMainPageProducts = async () => {
  return await fetch("/api/main", {
    headers: { Authorization: await getAccessToken() },
  }).then((res) => {
    setAccessToken(res);
    return res.json();
  });
};
const useMainPageProductSWR = () => {
  const { data, mutate, isLoading } = useSWR<MainPageProduct[]>(
    "api/main",
    () =>
      getMainPageProducts().then(
        (res) => res.products.content as MainPageProduct[]
      )
  );

  return {
    data,
    isLoading,
    mutate,
  };
};

export default useMainPageProductSWR;
