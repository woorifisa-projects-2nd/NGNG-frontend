"use client";
import React, { useState } from "react";
import PointHistory from "../PointHistory";

import useMypageSWR from "../../_hooks/useMypageSWR";
import usePointHistory from "../../_hooks/usePointeHistory";
import { addFetchPoint } from "../../_api/api";
import { formatKRW } from "../../_utils/format";

export default function PointModalContent({ point }: { point: number }) {
  const { updateCost } = useMypageSWR();
  const { refresh } = usePointHistory();

  const [cost, setCost] = useState<string>("");
  const [disabe, setDeisabe] = useState(false);

  const chargingPoint = async () => {
    if (isNaN(+cost) || +cost < 0) {
      alert("유효하지 않은 형식입니다.");

      setCost("");
      return;
    }

    setDeisabe(true);

    addFetchPoint(+cost, () => {
      // api 성공시 Done 함수 호출 부분
      updateCost(+cost);
      refresh();
      setCost("");
    });
  };

  return (
    <div>
      <div>현재 보유 포인트 : {formatKRW(point)}</div>
      <div className="flex">
        <input
          onInput={(e) => setCost(e.currentTarget.value)}
          type="text"
          name=""
          id=""
          value={cost}
          className="border-2 flex-1 w-0 max-w-[200px]"
          onKeyDown={(e) => e.code === "Enter" && chargingPoint()}
        />
        <button
          onClick={chargingPoint}
          className="mx-2 border p-2 "
          disabled={disabe}
        >
          Point 충전
        </button>
      </div>
      <p className="black md:hidden">포인트 내역</p>
      <div className="md:hidden">
        <PointHistory />
      </div>
    </div>
  );
}
