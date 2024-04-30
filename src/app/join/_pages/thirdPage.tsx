import ColorMode from "@/components/layouts/header/components/ColorMode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LogoImage from "../../../components/layouts/header/design/SVG/logo.svg";
import EmailImage from "../_image/email.svg";
import PasswordImage from "../_image/password.svg";
import AuthCheck from "../_image/authCheck.svg";
import UserImage from "../_image/user.svg";
import { userInfo } from "../joinPage";
import Caution from "../caution";

type ThirdPageProps = {
  user: userInfo;
  setUser: React.Dispatch<React.SetStateAction<userInfo>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function ThirdPage({
  user,
  setUser,
  currentPage,
  setCurrentPage,
}: ThirdPageProps) {
  const router = useRouter();

  const [insertEmail, setInsertEmail] = useState("");
  const [checkAuthNumber, setCheckAuthNumber] = useState("");
  const [insertNickname, setInsertNickname] = useState("");
  const [insertPassword, setInsertPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [authNumber, setAuthNumber] = useState("");
  const [isEmailInputDisabled, setIsEmailInputDisabled] = useState(false);
  const [isCheckAuthNumberDisabled, setIsCheckAuthNumberDisabled] =
    useState(true);
  const [isCheckAuthNumberHidden, setsCheckAuthNumberHidden] = useState(true);

  const [isJoinDisabled, setIsJoinDisabled] = useState(true);

  const sendEmail = async () => {
    if (insertEmail === "") {
      alert("이메일을 입력하세요");

      return;
    }

    setIsEmailInputDisabled(true);

    const auth = {
      name: user.name,
      email: insertEmail,
    };

    const url = "/api/join/auth/email";
    const options = {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(auth),
    };

    const response = await fetch(url, options);
    const responseJson = await response.json();

    setIsCheckAuthNumberDisabled(false);
    setsCheckAuthNumberHidden(false);
    setAuthNumber(responseJson.authNumber);
  };

  const authCheck = () => {
    if (checkAuthNumber !== authNumber) {
      console.log(authNumber);

      alert("올바른 인증번호를 입력해주세요.");

      return;
    }

    setIsCheckAuthNumberDisabled(true);
    setIsJoinDisabled(false);
  };

  const join = async () => {
    setUser({
      ...user,
      email: insertEmail,
      nickname: insertNickname,
      password: insertPassword,
    });

    const url = "/api/join";
    const options = {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(user),
    };

    const response = await fetch(url, options);

    router.push("/login");
  };

  return (
    <div className="dark:bg-[#282828]">
      <div className="absolute right-12 mt-6">
        <ColorMode />
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="flex-col justify-center items-center w-5/6 md:w-1/4 h-auto">
          <button type="button" onClick={() => router.push("/")}>
            <LogoImage width={"100%"} />
          </button>
          <div className="text-sm mt-14">
            <button type="button" onClick={() => setCurrentPage(1)}>
              약관동의
            </button>
            <span> {">"} </span>
            <button type="button" onClick={() => setCurrentPage(2)}>
              본인확인
            </button>
            <span> {">"} </span>
            <span className="font-bold">정보입력</span>
            <span> {">"} </span>
            <span>가입완료</span>
          </div>
          <div className="flex-col h-auto mt-2">
            <div className="flex justify-between items-center w-full h-14">
              <div className="flex justify-center items-center w-[75%] p-2 rounded-md border-[1px] dark:bg-[#3B3B3B] border-black/45 h-14">
                <EmailImage className="w-8 mr-4 ml-2 fill-black/50 dark:fill-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="이메일"
                  value={insertEmail}
                  onChange={(e) => setInsertEmail(e.target.value)}
                  disabled={isEmailInputDisabled}
                  className="w-full focus:outline-none text-xl"
                />
              </div>
              <button
                className="flex justify-center items-center rounded-md text-white bg-point-color w-[20%] h-14 text-xl"
                onClick={sendEmail}
              >
                인증
              </button>
            </div>
            <div
              className={`flex justify-between items-center w-full h-14 mt-2 ${isCheckAuthNumberHidden ? "hidden" : ""
                }`}
            >
              <div className="flex justify-center items-center w-[75%] p-2 rounded-md border-[1px] dark:bg-[#3B3B3B] border-black/45 h-14">
                <AuthCheck className="w-9 mr-4 ml-2 fill-black/50 dark:fill-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="인증번호"
                  value={checkAuthNumber}
                  onChange={(e) => setCheckAuthNumber(e.target.value)}
                  disabled={isCheckAuthNumberDisabled}
                  className="w-full focus:outline-none text-xl"
                />
              </div>
              <button
                className="flex justify-center items-center rounded-md text-white bg-point-color w-[20%] h-14 text-xl"
                onClick={authCheck}
                disabled={isCheckAuthNumberDisabled}
              >
                확인
              </button>
            </div>
            <div className="flex justify-center items-center w-full p-2 rounded-md border-[1px] dark:bg-[#3B3B3B] border-black/45 h-14 mt-8">
              <PasswordImage className="w-9 mr-4 ml-2 fill-black/50 dark:fill-[#9CA3AF]" />
              <input
                type="password"
                placeholder="비밀번호"
                value={insertPassword}
                onChange={(e) => setInsertPassword(e.target.value)}
                className="w-full focus:outline-none text-xl"
              />
            </div>
            <div className="flex justify-center items-center w-full p-2 rounded-md border-[1px] dark:bg-[#3B3B3B] border-black/45 h-14 mt-2">
              <AuthCheck className="w-9 mr-4 ml-2 fill-black/50 dark:fill-[#9CA3AF]" />
              <input
                type="password"
                placeholder="비밀번호 확인"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
                className="w-full focus:outline-none text-xl"
              />
            </div>
            <div className="flex justify-center items-center w-full p-2 rounded-md border-[1px] dark:bg-[#3B3B3B] border-black/45 h-14 mt-8">
              <UserImage className="w-9 mr-4 ml-2 fill-black/50 dark:fill-[#9CA3AF]" />
              <input
                type="text"
                placeholder="닉네임"
                value={insertNickname}
                onChange={(e) => setInsertNickname(e.target.value)}
                className="w-full focus:outline-none text-xl"
              />
            </div>
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
              onClick={join}
              disabled={isJoinDisabled}
            >
              가입
            </button>
          </div>
          <div className="flex justify-end">
            <Caution />
          </div>
        </div>
      </div>
    </div>
  );
}
