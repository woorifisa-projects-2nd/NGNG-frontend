import { PrivateChat } from "../../_hooks/usePrivateChatMessgae";
import RequestProcess from "./RequestProcess";
import TransactionRequestButton from "./TransactionRequestButton";

type Props = {
  data: PrivateChat;
  transactionStatus: string | null;
  isSeller: boolean;
  clickRequestButton: () => void;
  clickRequestProcessButton: () => void;
};
export default function TransactionStatusToActiveButton({
  data,
  isSeller,
  transactionStatus,
  clickRequestButton,
  clickRequestProcessButton,
}: Props) {
  if (!data) return;

  const alreadyRequetesd = !!data.request;
  const isPending = data.product.transactionDetails === null;
  const isAccepted =
    data.request && data.request.isAccepted && data.request.isAccepted === true;

  if (transactionStatus === null && !isSeller) {
    return alreadyRequetesd ? (
      isPending ? (
        <span
          className="min-w-[72px]  text-black
      font-semibold text-sm"
        >
          수락 대기중
        </span>
      ) : isAccepted ? (
        <span
          className="min-w-[72px]  text-green-600 
      font-semibold text-sm"
        >
          거래진행중
        </span>
      ) : (
        <span
          className="min-w-[72px]  text-text-gray 
      font-semibold text-sm"
        >
          거래거절
        </span>
      )
    ) : (
      <TransactionRequestButton onClick={clickRequestButton} />
    );
  } else if (isSeller && isPending) {
    return <RequestProcess onClick={clickRequestProcessButton} />;
  } else if (isSeller && !isAccepted) {
    return (
      <span
        className="min-w-[72px]  text-text-gray 
      font-semibold text-sm"
      >
        요청 거절
      </span>
    );
  } else {
    return "";
  }
}
