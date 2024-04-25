type Props = {
  className?: string;

  onClick: () => void;
};
export default function RequestProcess({
  onClick,

  className,
}: Props) {
  return (
    <button
      className={`
   
      justify-center
      min-w-20
      mt-2 flex items-center rounded-lg 
      p-2 border-2 border-light-gray cursor-pointer text-black 
      font-semibold h-10 text-sm
      hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] 
      ${className}`}
      onClick={onClick}
    >
      요청 처리
    </button>
  );
}
