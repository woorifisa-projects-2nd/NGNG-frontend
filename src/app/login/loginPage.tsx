import { useContext, useState } from "react";
import EmailImage from "./_image/email.svg";
import PasswordImage from "./_image/password.svg";
import LogoImage from "./_image/logo.svg";
import ColorMode from "@/components/layouts/header/components/ColorMode";
import { useRouter } from "next/navigation";
import { UserContext } from "@/providers/UserContext";

export default function LoginPage() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const { setUser } = useContext(UserContext);

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

    const response = await fetch(url, options);

    if (response.status === 401) {

      alert("유효하지 않은 인증 정보입니다.");

      return;
    }

    localStorage.setItem("accessToken", JSON.stringify(response.headers.get("Authorization")));

    const data = await response.json();

    console.log(data);

    setUser({
      id: data.id,
      nickname: data.nickname,
      name: data.name
    });

    setIsLogin(true);

    if (data.role === "ADMIN") {

      router.push("/admin/reports")
    } else {

      router.push("/");
    }
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
                  onClick={() => router.push("/find/email")}>
                  <span>이메일 찾기</span>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => router.push("/find/password")}>
                  <span>비밀번호 찾기</span>
                </button>
              </div>
            </div>
            <div>
              <button type="button" onClick={() => router.push("/join")}>
                <span>회원가입</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
