import CheckedIcon from "./design/checked.svg";
import BeforeIcon from "./design/before.svg";
type CheckBoxType = {
  checked?: boolean;
  onChange: () => void;
  label?: string;
};
export default function CheckBox({ checked, onChange, label }: CheckBoxType) {
  return (
    <>
      {checked ? (
        <CheckedIcon
          className="dark:stroke-white stroke-black"
          onClick={onChange}
        />
      ) : (
        <BeforeIcon
          className="dark:stroke-white stroke-black"
          onClick={onChange}
        />
      )}
      <span className="relative left-2">{label}</span>
    </>
  );
}
