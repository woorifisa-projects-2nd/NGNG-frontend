import DefaultLayout from "@/components/layouts/DefaultLayout";
import { Metadata, ResolvingMetadata } from "next";

import React, { Suspense } from "react";
import ModalProovider from "./_provider/ModalProovider";

// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: "hi mypage 입니다.",
//     description: "기본 내용 입니다.",
//     openGraph: {
//       description: "OG 내용입니다.",
//     },
//   };
// }
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DefaultLayout>
        <ModalProovider>
          <Suspense fallback={<div>서스펜스 로딩..</div>}>{children}</Suspense>
        </ModalProovider>
      </DefaultLayout>
    </>
  );
}
