type InputProps = {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  width?: number;
  height?: number;
};
export default function Input({
  value,
  onChange,
  placeholder,
  width,
  height,
}: InputProps) {
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };
  return (
    <input
      className={`rounded-md border-[1px] border-black/15  w-full focus:outline-none focus:border-point-color p-2`}
      style={{ width, height }}
      value={value}
      onChange={changeValue}
      placeholder={placeholder}
    />
  );
}
