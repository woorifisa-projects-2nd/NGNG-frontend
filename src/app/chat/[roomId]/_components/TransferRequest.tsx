import CloseIcon from "@/assets/SVG/Close.svg";
import Button from "@/components/common/Button";
import Input from "@/components/common/inputs/Input";
type TransferRequestProps = {
  onClose: () => void;
  discountable: boolean;
  price: number;
  onChangePrice: (price: number) => void;
  onChangeTransactionStatus: () => void;
};
export default function TransferRequest({
  onClose,
  price,
  discountable,
  onChangePrice,
  onChangeTransactionStatus,
}: TransferRequestProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-end bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full h-2/5 dark:bg-[#2e2e2e]">
        <CloseIcon
          className="absolute right-4 top-3 cursor-pointer fill-current"
          width={20}
          height={20}
          onClick={onClose}
        />
        <div className=" h-48 w-full">
          <div className="ml-2 mb-3 font-semibold text-lg ">
            얼마에 거래 요청할까요?
          </div>
          <div className="flex relative items-center font-medium mb-5 w-full">
            <Input
              disabled={!discountable}
              className="w-full h-11"
              value={price.toLocaleString()}
              onChange={(value: string) => {
                if (!Number.isNaN(value)) {
                  const price = value.replaceAll(",", "");
                  onChangePrice(Number(price));
                }
              }}
            />
            <span className="relative right-8 w-0">원</span>
          </div>

          <Button
            width={"100%"}
            text="확인"
            onClick={onChangeTransactionStatus}
          />
        </div>
      </div>
    </div>
  );
}
