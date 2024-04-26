import { Product } from "../../_types/type";
import NoticeIcon from "../_design/SVG/Megaphone.svg";
type Props = {
  data: Product;
  userId: number;
};
export default function ChattingHeader({ data, userId }: Props) {
  return (
    <div className="bg-transparent border-b-[1px] border-text-gray text-center w-full text-2xl pb-2 font-bold text-point-color">
      {data.user.id === userId ? "내꺼채팅" : "니꺼채팅"}

      <div className="flex items-center text-sm font-normal text-black  justify-center w-full">
        <NoticeIcon className="mr-2 fill-black dark:fill-white " />
        <div className="text-start break-all ">
          이 채팅방은
          <span className="text-red-500 font-medium">{` ${data.title}`}</span>에
          관심이 있는 모든 사용자가 참여하는 채팅방입니다.
        </div>
      </div>
    </div>
  );
}
