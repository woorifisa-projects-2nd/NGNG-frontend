import React from "react";

type Props = {
  children: React.ReactNode;
  onClose: Function;
  title: string;
};

export default function Modal({ children, onClose, title }: Props) {
  return (
    <div className="fixed inset-0  bg-black bg-opacity-40 snap-y ">
      {/* 배경 */}
      {/* content 중앙 정렬 */}
      <div className="flex justify-center items-center w-[100vw] h-[100vh] ">
        {/* content */}
        <div className=" max-w-[480px] w-[90vw] h-[85svh] bg-white p-2 rounded-lg overflow-scroll">
          <div className="flex justify-center relative border-b-2 ">
            <button
              className="absolute left-2 top-[0.4rem] text-[1.5rem] "
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
