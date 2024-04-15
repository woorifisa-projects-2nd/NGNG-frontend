import { DropDownDataType } from "../DropDown";

type MenuProps = {
  items: DropDownDataType[];
  onClick: (name: DropDownDataType) => void;
};
export default function Menu({ items, onClick }: MenuProps) {
  return (
    <div
      style={{ height: 40 * items.length }}
      className={`rounded-md border-[1px] border-black/15 absolute left-0 mt-2 w-48 bg-white z-10  dark:bg-black `}
    >
      {items.map((item, key) => {
        return (
          <div
            key={item.id}
            className="p-2 hover:bg-light-gray/50"
            onClick={() => onClick(item)}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
}
