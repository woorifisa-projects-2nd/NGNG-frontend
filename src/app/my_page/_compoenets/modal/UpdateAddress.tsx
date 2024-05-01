import React, { useEffect, useRef, useState } from "react";
import useMypageSWR from "../../_hooks/useMypageSWR";
import {
  ModalStatus,
  useModalController,
} from "../../_provider/ModalProovider";
import KakaoAddress from "../external/KakaoAddress";
import { SearchRetrun } from "../../_utils/kakaoAddress";

type AddressData = {
  zonecode: string;
  addr: string;
};

export default function UpdateAddress() {
  const [_, setModal] = useModalController();
  const { updateProfile } = useMypageSWR();

  const warpRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState<AddressData>({
    zonecode: "",
    addr: "",
  });

  const handlerSearchddress = (res: SearchRetrun) => {
    const { addr, data, extraAddr, zonecode } = res;

    // 커서를 상세주소 필드로 이동한다.
    detailRef.current!.value = "";
    detailRef.current!.focus();

    setStatus({
      addr: addr + " " + extraAddr,
      zonecode,
    });
  };

  const onUpdateAddress = () => {
    detailRef.current?.value &&
      updateProfile(
        {
          address: status.addr + " " + detailRef.current?.value,
        },
        () => setModal({ type: ModalStatus.Adress, isOpen: false })
      );
  };

  useEffect(() => {
    if (!warpRef.current) return;
    // iframe을 넣은 element를 안보이게 한다.

    warpRef.current.style.display = "none";
  });

  return (
    <div>
      <div className="mx-1 flex flex-col gap-1">
        <div className="flex gap-2">
          <input
            className="border p-1 shadow-inner w-[7rem]"
            type="text"
            placeholder="우편 번호"
            value={status.zonecode}
            disabled
          />
          <KakaoAddress
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow   --tw-text-opacity: 1;
    color: rgb(39 39 39 / var(--tw-text-opacity));"
            renderRef={warpRef}
            onFindReslt={handlerSearchddress}
          >
            우편 번호 찾기
          </KakaoAddress>
        </div>

        <input
          className="border p-1 shadow-inner  w-full"
          type="text"
          placeholder="주소"
          value={status.addr}
          disabled
        />

        <input
          ref={detailRef}
          className="border p-1 shadow-inner w-full"
          type="text"
          placeholder="상세 주소"
        />
        <button
          onClick={() => onUpdateAddress()}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow "
        >
          변경
        </button>
      </div>

      <div
        id="map_wrap"
        className=" mt-[2rem] mx-auto border-[#873EAC] border-2 border-opacity-80"
        ref={warpRef}
      ></div>
    </div>
  );
}
