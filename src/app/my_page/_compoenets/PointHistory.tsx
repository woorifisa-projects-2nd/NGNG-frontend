"use client";
import React, { useEffect, useState } from "react";
import { formatKRW } from "../_utils/format";
import { getAccessToken } from "../_utils/auth-header";
import usePointHistory from "../_hooks/usePointeHistory";
import { ModalStatus, useModalController } from "../_provider/ModalProovider";

export default function PointHistory() {
  const { pointHistory } = usePointHistory();
  const [_, setModal] = useModalController();

  if (!pointHistory) return <div>로딩중....</div>;

  return (
    <div>
      <div className="flex justify-end p-2 hidden md:block">
        <button
          onClick={() => setModal({ type: ModalStatus.Point, isOpen: true })}
          className=" border-2 border-black shadow p-2"
        >
          포인트 충전하기
        </button>
      </div>
      {/* 테이블 */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-2 text-[.5rem] md:text-[1rem]">
        <table className=" md:table-auto w-full   text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b border-opacity-25 border-black">
            <tr>
              <th
                scope="col "
                className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
              >
                날짜
              </th>
              <th scope="col" className="px-6 py-3">
                유형
              </th>
              <th
                scope="col"
                className=" px-6 py-3  bg-gray-50 dark:bg-gray-800 "
              >
                최종 금액
              </th>
              <th scope="col" className="hidden px-6 py-3 md:block">
                상세 내용
              </th>
            </tr>
          </thead>
          <tbody>
            {pointHistory.map((item, key) => (
              <tr key={key}>
                <th
                  scope="row"
                  className="truncate max-w-[6rem] md:max-w-max px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                >
                  {new Date(item.createdAt).toLocaleString()}
                </th>
                <td
                  className={`px-6 py-4 ${
                    item.addCost >= 0 ? "text-blue-500" : "text-red-500"
                  }`}
                >
                  {item.type}
                </td>
                <td className=" px-6 py-4 text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800 ">
                  {formatKRW(item.cost)} 원
                </td>
                <td className="hidden px-6 py-4 md:block">{item.typeDetail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 페이징 */}
    </div>
  );
}
