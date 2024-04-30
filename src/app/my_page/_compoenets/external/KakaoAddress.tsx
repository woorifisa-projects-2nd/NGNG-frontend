"use client";

import Script from "next/script";
import React, { RefObject } from "react";
import { SearchRetrun, openDaumaddress } from "../../_utils/kakaoAddress";

type Props = {
  renderRef: RefObject<HTMLElement>;
  onFindReslt: (res: SearchRetrun) => void;
  children: React.ReactNode;
  className?: string;
};

export default function KakaoAddress({
  renderRef,
  onFindReslt,
  children,
  className,
}: Props) {
  return (
    <>
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload"
        // onReady={() => openDaumaddress(mapRef.current!, console.log)}
      />
      <button
        className={className ? className : ""}
        onClick={() => openDaumaddress(renderRef.current!, onFindReslt)}
      >
        {children}
      </button>
    </>
  );
}
