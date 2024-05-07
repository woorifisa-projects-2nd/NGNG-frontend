"use client";
import useMypageSWR from "@/app/my_page/_hooks/useMypageSWR";
import PrivateChat from "./PrivateChat";
import { redirect } from "next/navigation";

export default function PrivateChatLayout() {
  const { user, deleteProduct, isLoading } = useMypageSWR();
  if (isLoading) {
    return <div>로딩중..</div>;
  } else if (user === undefined) {
    return redirect("/login");
  }
  return (
    <>
      <PrivateChat userId={user.userId} />
    </>
  );
}
