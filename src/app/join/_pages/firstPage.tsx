import ColorMode from "@/components/layouts/header/components/ColorMode";
import Link from "next/link";
import { useState } from "react";
import LogoImage from "../../../components/layouts/header/design/SVG/logo.svg";
import { useRouter } from "next/navigation";
import Caution from "../caution";

type FirstPageProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function FirstPage({
  currentPage,
  setCurrentPage,
}: FirstPageProps) {
  const router = useRouter();

  const [checkbox1, setCheckbox1] = useState<boolean>(false);
  const [checkbox2, setCheckbox2] = useState<boolean>(false);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (name === "selectAll") {
      setSelectAll(checked);
      setCheckbox1(checked);
      setCheckbox2(checked);
    } else {
      setSelectAll(checkbox1 && checkbox2);
    }
  };

  const getNextPage = () => {
    if (!selectAll) {
      alert("약관에 모두 동의하셔야 가입할 수 있습니다.");

      return;
    }

    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="dark:bg-[#282828]">
      <div className="absolute right-12 mt-6">
        <ColorMode />
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="flex-col justify-center items-center w-5/6 md:w-1/4 h-auto">
          <button type="button" className="flex justify-center w-full" onClick={() => router.push("/")}>
            <LogoImage className="w-1/2" />
          </button>
          <div className="text-sm mt-14">
            <button type="button" className="font-bold">
              약관동의
            </button>
            <span> {">"} </span>
            <button type="button" disabled>
              본인확인
            </button>
            <span> {">"} </span>
            <button type="button" disabled>
              정보입력
            </button>
            <span> {">"} </span>
            <span>가입완료</span>
          </div>
          <div className="mt-2">
            <label htmlFor="selectAll">
              <div className="flex pl-4 md:pl-16 items-center border-t-2 border-b-2 border-black/45 dark:border-[#8E8E8E] bg-[#EFEFEF] dark:bg-[#303030] w-full h-24 p-2">
                <input
                  type="checkbox"
                  name="selectAll"
                  id="selectAll"
                  className="form-checkbox text-black h-5 w-5 bg-transparent border-gray-300 mr-4"
                  checked={selectAll}
                  onChange={handleCheckboxChange}
                />
                <div className="flex items-center">
                  <span className="text-xl font-bold mr-4">모두 동의</span>
                  <span className="text-sm">필수 및 선택 항목 동의 포함</span>
                </div>
                <br />
              </div>
            </label>
            <label htmlFor="checkbox1">
              <div className="flex pl-4 md:pl-16 items-center border-b border-black/45 dark:border-[#8E8E8E] dark:bg-[#282828] w-full h-20 p-2">
                <input
                  type="checkbox"
                  name="checkbox1"
                  id="checkbox1"
                  className="form-checkbox text-black h-5 w-5 bg-transparent border-gray-300 mr-4"
                  checked={checkbox1}
                  onChange={(event) => {
                    setCheckbox1(event.target.checked);
                    setSelectAll(event.target.checked && checkbox2);
                  }}
                />
                <span className="text-lg">
                  내꺼니꺼 서비스 이용약관 동의 (필수)
                </span>
              </div>
            </label>
            <label htmlFor="checkbox2">
              <div className="flex pl-4 md:pl-16 items-center border-b border-black/45 dark:border-[#8E8E8E] dark:bg-[#282828] w-full h-20 p-2">
                <input
                  type="checkbox"
                  name="checkbox2"
                  id="checkbox2"
                  className="form-checkbox text-black h-5 w-5 bg-transparent border-gray-300 mr-4"
                  checked={checkbox2}
                  onChange={(event) => {
                    setCheckbox2(event.target.checked);
                    setSelectAll(checkbox1 && event.target.checked);
                  }}
                />
                <span className="text-lg">
                  개인정보 수집 및 이용 동의 (필수)
                </span>
              </div>
            </label>
            <div>
              <button
                onClick={getNextPage}
                className="border-solid rounded-md text-white bg-point-color w-full h-16 text-3xl mt-12"
              >
                다음
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <Caution />
          </div>
        </div>
      </div>
    </div>
  );
}
