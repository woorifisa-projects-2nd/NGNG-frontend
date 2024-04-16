"use client";
import React, { useRef, useState } from "react";
import PointHistory from "../PointHistory";
import { getAccessToken } from "../../_utils/auth-header";

export default function PointModalContent({
  point,
  changePoint,
}: {
  point: number;
  changePoint: (point: IPointHistory) => void;
}) {
  const [refsh, setRefsh] = useState(Math.random() * 1000);
  const [cost, setCost] = useState<string>("");
  const [disabe, setDeisabe] = useState(false);

  const chargingPoint = () => {
    if (isNaN(+cost) || +cost < 0) {
      alert("유효하지 않은 형식입니다.");

      setCost("");
      return;
    }

    setDeisabe(true);
    fetch(`/api/points`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAccessToken(),
      },
      body: JSON.stringify({
        addCost: +cost,
        type: "충전",
      }),
    })
      .then((res) => res.json())
      .then((data: IPointHistory) => {
        alert("충전되었습니다.");
        setDeisabe(false);
        setRefsh(Math.random() * 1000);
        changePoint(data);
        setCost("");
      });
  };

  return (
    <div>
      <div>현재 보유 포인트 : {point}</div>
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
      <p>포인트 내역</p>
      <div className="md:hidden">
        <PointHistory key={refsh} />
      </div>
    </div>
  );
}
