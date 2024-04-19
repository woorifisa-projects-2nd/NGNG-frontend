import Link from "next/link";
import NotFoundIcon from "@/assets/SVG/not-found.svg";
import GoBackIcon from "@/assets/SVG/goBack.svg";

export default function NotFound() {
  return (
    <div className="w-full h-screen p-20 flex flex-col justify-center items-center">
      <div>
        <NotFoundIcon
          className="flex justify-center w-full mb-11"
          width={975}
          height={415}
        />
        <div className="flex flex-col justify-start gap-4">
          <p>죄송합니다. 페이지를 찾을 수 없습니다.</p>
          <p>
            존재하지 않는 주소를 입력하셨거나 요청하신 페이지의 주소가 변경,
            삭제되어 찾을 수 없습니다.
          </p>
        </div>
        <div className="flex justify-center mt-10">
          <Link
            href="/"
            className="flex border-b-2 dark:border-white border-black text-black  text-xl  font-bold text-center w-24 items-center gap-2 justify-center"
          >
            <GoBackIcon className="" />
            홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}
