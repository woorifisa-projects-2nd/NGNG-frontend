"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'

interface User {
  id: number,
  nickname: string
}

export default function LoginPage() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<User>({
    id: -1,
    nickname: ""
  });

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

    const url = "http://localhost:8080/login";
    const options = {
      method: "POST",
      body: formData
    };

    fetch(url, options)
      .then((res: Response) => res.json())
      .then(data => {
        setUser({
          id: data.id,
          nickname: data.nickname
        })

        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
      })
      .catch(e => console.error(e))

    setIsLogin(true);
  };

  return (
    <div className="flex justify-center w-full h-dvh">
      <form onSubmit={loginSubmit}>
        <div className="rounded-md border-[1px] border-black/15 w-full focus:outline-none focus:border-point-color p-2">
          {/* 메일 이미지 */}
          <input type="text"
            placeholder="이메일"
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="rounded-md border-[1px] border-black/15  w-full focus:outline-none focus:border-point-color p-2">
          {/* 비밀번호 이미지(?) */}
          <input type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="border-solid rounded-md text-white bg-point-color border-[1px] w-full h-10">로그인</button>
      </form>
      <button type="button">이메일 찾기</button>
      <button type="button">비밀번호 찾기</button>
    </div>
  );
};
