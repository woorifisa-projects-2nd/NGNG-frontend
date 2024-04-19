type ButtonProps = {
  color?: string;
  text: string;
  width?: number | string;
  height?: number;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};
export default function Button({
  color,
  height,
  text,
  width,
  className,
  onClick,
  disabled = false,
}: ButtonProps) {
  const colorClassName =
    color === undefined
      ? ""
      : color === "black"
      ? "bg-[#2e2e2e] "
      : "bg-white ";

  return (
    <button
      disabled={disabled}
      style={{ width, height }}
      className={` rounded-lg text-white bg-point-color  w-32 h-12 ${colorClassName}  ${
        disabled && `bg-text-gray`
      } ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
