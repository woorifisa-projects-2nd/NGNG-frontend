export const dynamic = "force-dynamic";
import Loading from "@/assets/Loading.svg";
import { getProductById } from "../_api/api";
import { redirect } from "next/navigation";
import Chatting from "./_components/Chatting";
import ProudctInfo from "./_components/ProductInfo";

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const userId = 1; //userID

  const { status, data } = await getProductById(params.id);
  if (status === 404) {
    redirect("/not-found");
  }
  console.log("get data", data);

  if (!data) {
    return (
      <div role="status" className="flex justify-center h-[calc(100vh-128px)]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="px-8 xl:px-40  w-full h-full block lg:flex box-border justify-center dark:bg-black">
      <ProudctInfo data={data} userId={userId} />

      <Chatting data={data} userId={userId} />
    </div>
  );
}
