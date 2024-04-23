import React, { useRef } from "react";
import useMypageSWR from "../../_hooks/useMypageSWR";

type Props = {
  onCloseModal: () => void;
};

export default function UpdateAddress({ onCloseModal }: Props) {
  const { updateProfile } = useMypageSWR();

  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeAddress = () => {
    inputRef.current?.value &&
      updateProfile(
        {
          address: inputRef.current.value,
        },
        () => onCloseModal()
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
