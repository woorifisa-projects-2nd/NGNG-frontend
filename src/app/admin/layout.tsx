"use client"
import AdminMenu from "@/components/layouts/admin_menu/AdminMenu";
import { ReactNode } from "react";

export default function ProductLayout({ children }: { children: ReactNode }) {
  return <AdminMenu>{children}</AdminMenu>;
}
