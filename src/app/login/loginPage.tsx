<<<<<<< HEAD
import { useContext, useState } from "react";
=======
import { useState } from "react";
>>>>>>> 56852bf37344b88c8706a935ba2889a300978b95
import EmailImage from "./_image/email.svg";
import PasswordImage from "./_image/password.svg";
import LogoImage from "./_image/logo.svg";
import ColorMode from "@/components/layouts/header/components/ColorMode";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
import { UserContext } from "@/providers/UserContext";
=======

interface User {
  id: number;
  nickname: string;
}
>>>>>>> 56852bf37344b88c8706a935ba2889a300978b95

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
<<<<<<< HEAD
  const { setUser } = useContext(UserContext);
=======
  const [user, setUser] = useState<User>({
    id: -1,
    nickname: "",
  }); // 전역으로 관리
>>>>>>> 56852bf37344b88c8706a935ba2889a300978b95

  const loginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // submit해도 화면이 새로고침되지 않게 하는 메서드

    if (isLogin) {
      alert("이미 로그인중입니다."); // alert 그대로 할지 아니면 modal을 띄울지?
      // 확인버튼 누르면 이전 페이지 or 메인 페이지로

      return;
    }

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    const url = "/api/login";
    const options = {
      method: "POST",
      body: formData,
    };

    console.log("url", url);

    fetch(url, options)
<<<<<<< HEAD
      .then((res) => res.json())
=======
      .then((res: Response) => res.json())
>>>>>>> 56852bf37344b88c8706a935ba2889a300978b95
      .then((data) => {
        setUser({
          id: data.id,
          nickname: data.nickname,
<<<<<<< HEAD
          name: data.name,
        });

        console.log(
          "로그인 후 받은 토큰값",
          data,
          JSON.stringify(data.accessToken)
        );
=======
        });
>>>>>>> 56852bf37344b88c8706a935ba2889a300978b95

        // accessToken은 localStorage에, refreshToken은 securityCookie에 저장(자동)
        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));

        setIsLogin(true);
        router.push("/");
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className="dark:bg-[#282828]">
      <div className="absolute right-12 mt-6">
        <ColorMode />
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="flex-col justify-center items-center w-2/3 md:w-1/4 h-auto">
          <div className="flex justify-center w-full h-auto">
            <button type="button" onClick={() => router.push("/")}>
              <LogoImage className="w-full" />
            </button>
          </div>
          <div>
            <form onSubmit={loginSubmit} className="w-full mt-14">
              <div className="flex items-center rounded-md border-[1px] dark:bg-[#3B3B3B] border-black/45 w-full h-14 p-2">
                <EmailImage className="w-8 mr-4 ml-2 fill-black/50 dark:fill-[#9CA3AF]" />
                <input
                  className="w-full focus:outline-none text-xl"
                  type="text"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center rounded-md border-[1px] dark:bg-[#3B3B3B] border-black/45 w-full h-14 p-2 mt-6">
                <PasswordImage className="w-9 mr-4 ml-2 fill-black/50 dark:fill-[#9CA3AF]" />
                <input
                  className="w-full focus:outline-none text-xl"
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="border-solid rounded-md text-white bg-point-color w-full h-16 text-3xl mt-12">
                로그인
              </button>
            </form>
          </div>
          <div className="flex justify-between text-gray-400 mt-4">
            <div className="flex">
              <div className="mr-2">
                <button
                  type="button"
                  onClick={() => router.push("/find/email")}
                >
                  이메일 찾기
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => router.push("/find/password")}
                >
                  비밀번호 찾기
                </button>
              </div>
            </div>
            <div>
              <button type="button" onClick={() => router.push("/join")}>
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
