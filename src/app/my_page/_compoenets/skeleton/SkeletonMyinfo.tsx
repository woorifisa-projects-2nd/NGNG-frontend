import React from "react";

export default function SkeletonMyinfo() {
  return (
    <div className="max-w-[1248px] flex-col justify-center mx-auto p-4">
      {/* 사용자 정보 부분 */}
      <div className=" flex flex-col mx-auto   justify-center items-center my-2 gap-4 md:flex-row md:gap-10 md:my-10">
        {/* 이미지 */}
        <div>
          <div className="skeleton w-[300px] h-[300px] rounded-full"></div>
        </div>
        {/* 닉네임 & 정보 & 기타 */}
        <div>
          {/* 닉네임 & 로그아웃 */}
          <div className="flex flex-col items-center relative gap-2 my-2 md:flex-row md:items-center md:gap-4 md:mb-4 md:border-b-2 md:border-black md:border-opacity-20">
            <p className="skeleton-text w-[3rem] font-bold text-[2rem]"></p>
            <p className="skeleton-text w-[5rem] h-[1.5rem] "></p>
            <button className="block absolute right-0 bottom-0 border p-2 border-black md:bottom-[25%] "></button>
          </div>
          {/* 정보 & 기타 */}
          <div className="flex flex-col md:flex-row gap-4 ">
            {/* 정보 */}
            <div className="flex flex-col gap-2 w-[80vw] max-w-[480px] md:w-auto">
              <div className="flex m-1 flex-wrap gap-2 ">
                <p className="skeleton-text w-[5rem] "></p>
                <p className="skeleton-text w-[4rem]"></p>
              </div>
              <div className="flex m-1 flex-wrap gap-2 ">
                <p className="skeleton-text w-[5rem] "></p>
                <p className="skeleton-text w-[4rem]"></p>
              </div>
              <div className="flex m-1 flex-wrap gap-2 ">
                <p className="skeleton-text w-[5rem] "></p>
                <p className="skeleton-text w-[4rem]"></p>
              </div>
              <div className="flex m-1 flex-wrap gap-2 ">
                <p className="skeleton-text w-[5rem] "></p>
                <p className="skeleton-text w-[4rem]"></p>
              </div>
              <div className="flex m-1 flex-wrap gap-2 ">
                <p className="skeleton-text w-[5rem] "></p>
                <p className="skeleton-text w-[4rem]"></p>
              </div>
              <div className="flex m-1 flex-wrap gap-2 ">
                <p className="skeleton-text w-[5rem] "></p>
                <p className="skeleton-text w-[4rem]"></p>
              </div>
            </div>
            {/* 기타 */}
            <div className="hidden w-[80vw] max-w-[480px] gap-4 text-black dark:text-white text-opacity-45 md:block md:w-auto md:flex md:flex-col md:justify-start">
              <button className="skeleton-text text-start w-[10rem]"></button>
              <button className="skeleton-text text-start"></button>
              <button className="skeleton-text text-start"></button>
              <button className="skeleton-text text-start"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
