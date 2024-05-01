import React from "react";

type Props = {
  children: React.ReactNode;
  onClose: Function;
  title: string;
};

export default function ModalLarge({ children, onClose, title }: Props) {
  return (
    <div className="fixed inset-0  bg-black bg-opacity-40 snap-y z-10 ">
      {/* 배경 */}
      {/* content 중앙 정렬 */}
      <div className="flex justify-center items-center w-[100vw] h-[100vh] ">
        {/* content */}
        <div className="relative max-w-[1240px] w-[90vw] h-[85svh] bg-white dark:bg-black px-2 rounded-lg overflow-scroll">
          <div className="flex sticky top-0 bg-white dark:bg-black justify-center  border-b-2 py-2 z-20 ">
            <button
              className="absolute left-2 top-[.6rem] text-[2rem]  "
              onClick={() => onClose()}
            >
              &lt;
            </button>
            <p className="text-[1.5rem] py-2">{title}</p>
          </div>
          <div className="p-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
