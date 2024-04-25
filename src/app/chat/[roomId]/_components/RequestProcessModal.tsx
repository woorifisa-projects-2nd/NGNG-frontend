import CloseIcon from "@/assets/SVG/Close.svg";
type Props = {
  onClose: () => void;
  requestPrice: number;
  onAccept: () => void;
  onDismiss: () => void;
};
export default function RequestProcessModal({
  onClose,
  requestPrice,
  onAccept,
  onDismiss,
}: Props) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-end bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full h-[30%] dark:bg-[#2e2e2e]">
        <CloseIcon
          className="absolute right-4 top-3 cursor-pointer fill-current"
          width={20}
          height={20}
          onClick={onClose}
        />
        <div className=" h-48 w-full">
          <div className="mb-3 font-semibold text-lg ">
            {requestPrice.toLocaleString()}원에 거래할까요?
          </div>
          <span className="text-sm block">다른 요청은 모두 거절됩니다</span>

          <div className="flex justify-between w-full gap-2 mt-5">
            <button
              className="w-1/2 rounded-lg
              cursor-pointer
              bg-purple-100 text-point-color   dark:bg-purple-900 dark:text-purple-300
                font-semibold h-10 text-sm
                hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
              onClick={onAccept}
            >
              수락
            </button>
            <button
              className="w-1/2 rounded-lg
               cursor-pointer 
                font-semibold h-10 text-sm
                bg-gray-100 text-gray-800  dark:bg-gray-700 dark:text-gray-300
                hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] "
              onClick={onDismiss}
            >
              거절
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
