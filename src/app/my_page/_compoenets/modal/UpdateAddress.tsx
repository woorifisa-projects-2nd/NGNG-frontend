import React from "react";

type Props = {
  updateAddress: (address: string) => void;
};

export default function UpdateAddress({ updateAddress }: Props) {
  const onChangeAddress = () => {
    updateAddress("서울 어딘가에");
  };
  return (
    <>
      <div>UpdateAddress</div>
      <button onClick={onChangeAddress}>변경</button>
    </>
  );
}
