import DefaultLayout from "@/components/layouts/DefaultLayout";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DefaultLayout>{children}</DefaultLayout>
    </>
  );
}
