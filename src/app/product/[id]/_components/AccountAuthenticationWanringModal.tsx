"use client";

import CloseIcon from "@/assets/SVG/Close.svg";
import InfoIcon from "../_design/SVG/Info.svg";
import Link from "next/link";
type AccountAuthenticationWanringModalProps = {
  onClose: () => void;
};

export default function AccountAuthenticationWanringModal({
  onClose,
}: AccountAuthenticationWanringModalProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-12 rounded-lg shadow-lg">
        <CloseIcon
          className="absolute right-4 top-3 cursor-pointer"
          width={20}
          height={20}
          color={"#272727"}
          onClick={onClose}
        />
        <div className="flex">
          <InfoIcon />
          <div className="ml-2 mb-3 font-semibold text-lg">
            계좌인증을 한 후에 상품을 구매할 수 있어요.
          </div>
        </div>

        <Link href={"/my_page"} className="flex justify-end underline">
          계좌인증 하러가기
        </Link>
      </div>
    </div>
  );
}
