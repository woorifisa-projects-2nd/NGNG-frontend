"use client";
import AdminMenu from "@/components/layouts/admin_menu/AdminMenu";
import { UserContext } from "@/providers/UserContext";
import { redirect } from "next/navigation";
import { ReactNode, useContext } from "react";

export default function ProductLayout({ children }: { children: ReactNode }) {
  const { getAccessToken, logout } = useContext(UserContext);

  if (getAccessToken() === "undefined" || getAccessToken() === undefined) {
    // console.log("access otken", undefined);

    logout();
    redirect("/login");
  }
  return <AdminMenu>{children}</AdminMenu>;
}
