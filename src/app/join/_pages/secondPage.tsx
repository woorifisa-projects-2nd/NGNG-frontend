import ColorMode from "@/components/layouts/header/components/ColorMode";
import { ChangeEvent, useState } from "react";
import UserImage from "../_image/user.svg";
import PhoneImage from "../_image/phone.svg";
import AuthCheck from "../_image/authCheck.svg";
import LogoImage from "../../../components/layouts/header/design/SVG/logo.svg";
import { userInfo } from "../joinPage";
import { useRouter } from "next/navigation";
import Caution from "../caution";

type SecondPageProps = {
  user: userInfo;
  setUser: React.Dispatch<React.SetStateAction<userInfo>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function SecondPage({
  user,
  setUser,
  currentPage,
  setCurrentPage,
}: SecondPageProps) {
  const router = useRouter();

  const [insertName, setInsertName] = useState("");
  const [insertPhoneNumber, setInsertPhoneNumber] = useState("");
  const [checkAuthNumber, setCheckAuthNumber] = useState("");
  const [authNumber, setAuthNumber] = useState("");
  const [isDisabledNextPage, setIsDisabledNextPage] = useState(true);
  const [isPhoneNumberInputDisabled, setisPhoneNumberInputDisabled] =
    useState(false);
  const [isSendMessage, setIsSendMessage] = useState(true);

  const sendMessage = async () => {
    if (insertName === "" || insertPhoneNumber === "") {
      alert("이름과 전화번호를 모두 입력하셔야 합니다.");

      return;
    }

    const auth = {
      name: insertName,
      phoneNumber: insertPhoneNumber,
    };

    alert("입력하신 전화번호로 인증번호를 요청했습니다.");

    const url = "/api/join/auth/phonenumber";
    const options = {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(auth),
    };

    const response = await fetch(url, options);
    const responseJson = await response.json();

    setAuthNumber(responseJson.authNumber);
    setisPhoneNumberInputDisabled(true);
    setIsSendMessage(false);
  };

  const authCheck = () => {
    if (checkAuthNumber !== authNumber) {
      alert("올바른 인증번호를 입력해주세요.");

      return;
    }

    setUser({ ...user, name: insertName, phoneNumber: insertPhoneNumber });

    setIsDisabledNextPage(false);
    alert("인증되었습니다.");
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
            <button type="button" onClick={() => setCurrentPage(1)}>
              약관동의
            </button>
            <span> {">"} </span>
            <button type="button" className="font-bold" disabled>
              본인확인
            </button>
            <span> {">"} </span>
            <button type="button" disabled>
              정보입력
            </button>
            <span> {">"} </span>
            <span>가입완료</span>
          </div>
          <div className="flex-col h-auto mt-2">
            <div className="flex items-center rounded-md border-[1px] dark:bg-[#3B3B3B] border-black/45 w-full h-14 p-2">
              <div className="flex w-[100%]">
                <UserImage className="w-9 mr-4 ml-2 fill-black/50 dark:fill-[#9CA3AF]" />
                <input
                  type="text"
                  maxLength={12}
                  placeholder="이름"
                  value={insertName}
                  onChange={(e) => setInsertName(e.target.value)}
                  className="w-full focus:outline-none text-xl"
                />
              </div>
            </div>
            <div className="flex justify-between items-center w-full h-14 mt-8">
              <div className="flex justify-center items-center w-[75%] p-2 rounded-md border-[1px] dark:bg-[#3B3B3B] border-black/45 h-14">
                <PhoneImage className="h-10 mr-4 ml-2 fill-black/50 dark:fill-[#9CA3AF]" />
                <input
                  type="tel"
                  maxLength={11}
                  placeholder="전화번호"
                  value={insertPhoneNumber}
                  onChange={e => setInsertPhoneNumber(e.target.value)}
                  disabled={isPhoneNumberInputDisabled}
                  className="w-full focus:outline-none text-xl"
                />
              </div>
              <button
                className="flex justify-center items-center rounded-md text-white bg-point-color w-[20%] h-14 text-xl"
                onClick={sendMessage}
              >
                인증
              </button>
            </div>
            <div
              className={`flex justify-between items-center w-full h-14 mt-2 ${
                isSendMessage ? "hidden" : ""
              }`}
            >
              <div className="flex justify-center items-center w-[75%] p-2 rounded-md border-[1px] dark:bg-[#3B3B3B] border-black/45 h-14">
                <AuthCheck className="w-9 mr-4 ml-2 fill-black/50 dark:fill-[#9CA3AF]" />
                <input
                  type="number"
                  min="0"
                  maxLength={6}
                  placeholder="전화번호 인증"
                  value={checkAuthNumber}
                  onChange={(e) => setCheckAuthNumber(e.target.value)}
                  className="w-full focus:outline-none text-xl"
                />
              </div>
              <button
                className="flex justify-center items-center rounded-md text-white bg-point-color w-[20%] h-14 text-xl"
                onClick={authCheck}
              >
                확인
              </button>
            </div>
            <div className="flex justify-between mt-12">
              <button
                className="border-solid rounded-md dark:text-white dark:bg-[#3B3B3B] dark:border-black/45 text-black bg-gray-100 border-[2px] w-[calc(50%-1vw)] h-16 text-3xl"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                이전
              </button>
              <button
                className="border-solid rounded-md text-white bg-point-color w-[calc(50%-1vw)] h-16 text-3xl"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={isDisabledNextPage}
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
