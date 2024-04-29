type InputProps = {
  value?: string | number;
  onChange: (newValue: string) => void;
  placeholder?: string;
  width?: number;
  height?: number;
  className?: string;
  disabled?: boolean;
  cy?: string;
};
export default function Input({
  value,
  cy,
  className,
  onChange,
  placeholder,
  width,
  height,
  disabled = false,
}: InputProps) {
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };
  return (
    <input
      data-cy={cy}
      className={`rounded-md border-[1px] border-black/15  w-full focus:outline-none focus:border-point-color p-2 ${className}`}
      style={{ width, height }}
      value={value}
      onChange={changeValue}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
