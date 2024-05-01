import React, { useRef } from "react";
import useMypageSWR from "../../_hooks/useMypageSWR";
import {
  ModalStatus,
  useModalController,
} from "../../_provider/ModalProovider";

export default function ConfirmAccount() {
  const { user, updateProfile } = useMypageSWR();
  const [_, setModal] = useModalController();

  const benkRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);

  const onUpdate = () => {
    if (!benkRef.current?.value || !numberRef.current?.value) return;

    updateProfile(
      {
        accountBank: benkRef.current?.value,
        accountNumber: numberRef.current?.value,
      },
      () =>
        setModal({
          isOpen: false,
          type: ModalStatus.Account,
        })
    );
  };

  return (
    <div>
      <p>
        {user?.accountBank}-{user?.accountNumber}
      </p>
      <br />
      <div className="flex">
        <label>benk : </label>
        <input
          className="border-2 flex-1 w-0 max-w-[200px]"
          type="text"
          name=""
          id=""
          ref={benkRef}
        />
      </div>
      <div className="flex">
        <label>number</label>
        <input
          className="border-2 flex-1 w-0 max-w-[200px]"
          type="number"
          name=""
          id=""
          ref={numberRef}
        />
      </div>

      <button className="mx-2 border p-2 " onClick={() => onUpdate()}>
        변경
      </button>
    </div>
  );
}
