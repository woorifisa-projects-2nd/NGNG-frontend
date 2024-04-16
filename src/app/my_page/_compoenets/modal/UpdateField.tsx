import React, { useRef, useState } from "react";

type Props = {
  filedName: string;
  update: (nickname: string) => void;
};

export default function UpdateField({ filedName, update }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onUpdate = () => {
    inputRef.current && update(inputRef.current?.value);
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
