type ButtonProps = {
  color?: string;
  text: string;
  width?: number;
  height?: number;
};
export default function Button({ color, height, text, width }: ButtonProps) {
  const colorClassName =
    color === undefined
      ? ""
      : color === "black"
      ? "bg-[#2e2e2e] border-[#A6A6A6]"
      : "bg-white border-text-gray";
  const widthClassName = `w-[${width}]px`;
  const heightClassName = `w-[${height}]px`;
  return (
    <button
      className={`border-solid rounded-lg text-white bg-point-color border-[1px] w-32 h-12 ${colorClassName} ${widthClassName} ${heightClassName}`}
    >
      {text}
    </button>
  );
}
