type ButtonProps = {
  color?: string;
  text: string;
  width?: number | string;
  height?: number;
  disabled?: boolean;
  onClick?: () => void;
};
export default function Button({
  color,
  height,
  text,
  width,
  onClick,
  disabled = false,
}: ButtonProps) {
  const colorClassName =
    color === undefined
      ? ""
      : color === "black"
      ? "bg-[#2e2e2e] border-[#A6A6A6]"
      : "bg-white border-text-gray";

  return (
    <button
      disabled={disabled}
      style={{ width, height }}
      className={`border-solid rounded-lg text-white bg-point-color border-[1px] w-32 h-12 ${colorClassName}  ${
        disabled && `bg-text-gray`
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
