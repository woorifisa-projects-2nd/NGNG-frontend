import React, { useRef, useState } from "react";
import useMypageSWR from "../../_hooks/useMypageSWR";
import {
  ModalStatus,
  useModalController,
} from "../../_provider/ModalProovider";

type Props = {
  filedName: string;
  type: ModalStatus;
};

export default function UpdateField({ filedName, type }: Props) {
  const { updateProfile } = useMypageSWR();
  const [_, setModal] = useModalController();

  const inputRef = useRef<HTMLInputElement>(null);

  const onUpdate = () => {
    inputRef.current &&
      updateProfile(
        {
          nickname: inputRef.current.value,
        },
        () => setModal({ type, isOpen: false })
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
