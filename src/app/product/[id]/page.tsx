"use client";
import Loading from "@/assets/Loading.svg";
import { getProductById } from "../_api/api";
import { redirect } from "next/navigation";
import Chatting from "./_components/Chatting";
import ProudctInfo from "./_components/ProductInfo";
import useSWR from "swr";
import { Product } from "../_types/type";
type ProductResponse = {
  status: number;
  data: Product | undefined;
};
export default function ProductDetail({ params }: { params: { id: number } }) {
  const { data } = useSWR<ProductResponse>("/api/products/id", () =>
    getProductById(params.id)
  );

  if (!data) {
    return (
      <div role="status" className="flex justify-center h-[calc(100vh-128px)]">
        <Loading />
      </div>
    );
  }
  if (data.status === 404 || data.data === undefined) {
    redirect("/not-found");
  }

  return (
    <div className="px-8 xl:px-40  w-full h-full block lg:flex box-border justify-center dark:bg-black">
      <ProudctInfo data={data.data} />

      <Chatting data={data.data} />
    </div>
  );
}
