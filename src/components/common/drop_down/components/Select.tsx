import { DropDownDataType } from "../DropDown";
import ArrowDown from "../design/SVG/ArrowDown.svg";
type SelectProps = {
  selectedItem?: DropDownDataType;
  onClick: () => void;
  placeholder?: string;
};
export default function Select({
  onClick,
  selectedItem,
  placeholder,
}: SelectProps) {
  return (
    <div
      className="flex justify-start items-center rounded-md border-[1px] border-black/15 p-2 gap-2"
      onClick={onClick}
      data-cy={"category-dropdown"}
    >
      {selectedItem?.name ?? placeholder}
      <ArrowDown className="cursor-pointer" />
    </div>
  );
}
