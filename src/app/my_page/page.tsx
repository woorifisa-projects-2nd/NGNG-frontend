import React, { Suspense, useEffect } from "react";
import MyInfo from "./_compoenets/MyInfo";

export default function index() {
  return (
    <div>
      <Suspense fallback={<p>"로딩중"</p>}>
        <MyInfo />
      </Suspense>
    </div>
  );
}
