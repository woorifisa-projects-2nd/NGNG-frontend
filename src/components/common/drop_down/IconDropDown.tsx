import IconMenu from "./components/IconMenu";

type DropDownProps = {
  isOpen: boolean;
  icon: any;
  data: any[];
};
export default function IconDropDown({ isOpen, icon, data }: DropDownProps) {
  return (
    <div className="relative">
      {icon}
      {isOpen && (
        <div className=" w-0 h-0 relative">
          <IconMenu items={data} />
        </div>
      )}
    </div>
  );
}
