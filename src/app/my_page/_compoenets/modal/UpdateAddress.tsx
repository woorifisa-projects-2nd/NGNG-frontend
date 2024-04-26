import React, { useRef } from "react";
import useMypageSWR from "../../_hooks/useMypageSWR";
import {
  ModalStatus,
  useModalController,
} from "../../_provider/ModalProovider";

export default function UpdateAddress() {
  const { updateProfile } = useMypageSWR();
  const [_, setModal] = useModalController();

  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeAddress = () => {
    inputRef.current?.value &&
      updateProfile(
        {
          address: inputRef.current.value,
        },
        () => setModal({ type: ModalStatus.Adress, isOpen: false })
      );
  };

  return (
    <>
      <div className="flex gap-2">
        <label htmlFor="address">배송지 변경</label>
        <input
          type="text"
          name=""
          id="address"
          ref={inputRef}
          className="border"
        />
      </div>
      <button onClick={onChangeAddress}>변경</button>
    </>
  );
}
