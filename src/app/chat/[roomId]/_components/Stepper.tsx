type Props = {
  currentStatusId: number;
  onChangeStatus?: (status: number) => void;
  isSeller?: boolean;
};
const BuyerStepList = [
  { id: 1, name: "거래요청" },
  {
    id: 2,
    name: "수락대기",
  },
  {
    id: 3,
    name: "송금하기",
  },
  {
    id: 4,
    name: "입금완료",
  },
];

const SellerStepList = [
  { id: 1, name: "요청처리" },
  {
    id: 2,
    name: "입금대기",
  },
  {
    id: 3,
    name: "입금완료",
  },
];
export default function Stepper({
  currentStatusId,
  onChangeStatus,
  isSeller = false,
}: Props) {
  const menu = isSeller ? SellerStepList : BuyerStepList;
  return menu.map((step, index) => {
    return step.id === currentStatusId ? (
      <li className="flex md:w-full items-center text-point-color  ">
        <div className="flex items-center whitespace-nowrap text-sm mr-3 ">
          <span className="w-6 h-6 bg-point-color rounded-full flex justify-center items-center mr-1 text-sm text-white lg:w-10 lg:h-10">
            {step.id}
          </span>
          {step.name}
        </div>
      </li>
    ) : (
      <li className="flex md:w-full items-center text-gray-600 ">
        <div className="flex items-center  whitespace-nowrap text-sm mr-3 ">
          <span className="w-6 h-6 bg-gray-100 rounded-full flex justify-center items-center mr-1 lg:w-10 lg:h-10">
            {step.id}
          </span>
          {step.name}
        </div>
      </li>
    );
  });
}
