import Loading from "@/assets/Loading.svg";
import { getProductById } from "../_api/api";
import { redirect } from "next/navigation";
import Chatting from "./_components/Chatting";
import ProudctInfo from "./_components/ProductInfo";

export async function generateStaticParams() {
  const posts = await fetch("http://localhost:8080/products").then((res) =>
    res.json()
  );

  return posts.map((post: any) => ({
    id: post.id.toString(),
  }));
}
export default async function ProductDetail({
  params,
}: {
  params: { id: number };
}) {
  const { status, data } = await getProductById(params.id);

  if (status === 404) {
    redirect("/not-found");
  }

  if (!data) {
    return (
      <div role="status" className="flex justify-center h-[calc(100vh-128px)]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="px-8 xl:px-40  w-full h-full block lg:flex box-border justify-center dark:bg-black">
      <ProudctInfo data={data} />

      <Chatting data={data} />
    </div>
  );
}
