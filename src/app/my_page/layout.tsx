import DefaultLayout from "@/components/layouts/DefaultLayout";
import { Metadata, ResolvingMetadata } from "next";

import React, { Suspense } from "react";

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
        <Suspense fallback={<div>서스펜스 로딩..</div>}>{children}</Suspense>
      </DefaultLayout>
    </>
  );
}
