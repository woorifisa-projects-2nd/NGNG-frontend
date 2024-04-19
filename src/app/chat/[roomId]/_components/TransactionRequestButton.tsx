import { createTransactionStatus } from "../../_api";

type Props = {
  className?: string;

  onClick: () => void;
  productId: number;
  buyerId: number;
};
export default function TransactionRequestButton({
  onClick,

  className,
  buyerId,
  productId,
}: Props) {
  const click = () => {
    // 상태 생성하기
    createTransactionStatus({
      productId,
      buyerId,
    }).then(() => {
      onClick();
    });
  };
  return (
    <button
      className={`mt-2 flex items-center rounded-lg 
      p-2 border-2 border-light-gray cursor-pointer text-black 
      font-semibold h-10 text-sm
      hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] 
      ${className}`}
      onClick={click}
    >
      거래요청
    </button>
  );
}
