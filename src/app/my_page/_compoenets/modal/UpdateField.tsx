import React, { useRef, useState } from "react";
import useMypageSWR from "../../_hooks/useMypageSWR";

type Props = {
  filedName: string;
  onCloseModal: () => void;
};

export default function UpdateField({ filedName, onCloseModal }: Props) {
  const { updateProfile } = useMypageSWR();

  const inputRef = useRef<HTMLInputElement>(null);

  const onUpdate = () => {
    inputRef.current &&
      updateProfile(
        {
          nickname: inputRef.current.value,
        },
        () => onCloseModal()
      );
  };

  return (
    <>
      <div className="flex gap-2">
        <label htmlFor="nickName">{filedName}</label>
        <input
          type="text"
          name=""
          id="nickName"
          ref={inputRef}
          className="border"
        />
      </div>

      <button onClick={onUpdate} className="border p-2">
        변경
      </button>
    </>
  );
}
