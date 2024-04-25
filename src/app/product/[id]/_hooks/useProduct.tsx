import useSWR from "swr";
import { getProductById } from "../../_api/api";
import { Product } from "../../_types/type";

export type ProductRespons = {
  status: number;
  data?: Product;
};
const useProduct = (productId: number) => {
  const { data: product, mutate } = useSWR<ProductRespons>(
    "/api/products/id",
    () => getProductById(productId).then((res) => res as ProductRespons)
  );

  return {
    product,
    mutate,
  };
};

export default useProduct;
