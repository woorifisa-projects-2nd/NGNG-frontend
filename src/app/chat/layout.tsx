import DefaultLayout from "@/components/layouts/DefaultLayout";
import { ReactNode } from "react";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
