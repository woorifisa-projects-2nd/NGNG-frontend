"use client";
import { useState } from "react";

import Select from "./components/Select";
import Menu from "./components/Menu";

export type DropDownDataType = {
  id: number;
  name: string;
};
type DropDownProps = {
  data: DropDownDataType[];
  selected?: DropDownDataType;
  onClickItem: (name: DropDownDataType) => void;
  placeholder?: string;
};
export default function DropDown({
  data,
  selected,
  onClickItem,
  placeholder,
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState<boolean>();
  const changeOpen = () => setIsOpen(!isOpen);
  const clickItem = (name: DropDownDataType) => {
    setIsOpen(false);
    onClickItem(name);
  };
  return (
    <div className="relative">
      <Select
        selectedItem={selected}
        onClick={changeOpen}
        placeholder={placeholder}
      />
      {isOpen && (
        <div className=" w-0 h-0 relative">
          <Menu items={data} onClick={clickItem} />
        </div>
      )}
    </div>
  );
}
