"use client";

import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Input from "@/components/common/inputs/Input";
import { User } from "../_types/type";
import Button from "@/components/common/Button";
import { getAccessToken } from "../_utils/auth-header";
import { useRouter } from "next/navigation";

export default function UserDetail({ params }: { params: { id: number } }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [password, setPassword] = useState<string | number>("");

  async function fetchUser() {
    fetch(`/api//admin/users/${params.id}`, {
      headers: {
        Authorization: getAccessToken(),
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        setUser(result);
      });
  }

  const updateUser = async () => {
    if (!isFormValid()) {
      alert("모든 필수 필드를 입력해주세요.");
      return;
    }

    const request = {
      userId: user?.userId,
      name: user?.name,
      nickName: user?.nickName,
      phoneNumber: user?.phoneNumber,
      email: user?.email,
      password: password,
      accountBank: user?.accountBank,
      accountNumber: user?.accountNumber,
      address: user?.address,
    };

    try {
      const response = await fetch(`/api//admin/users/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: getAccessToken(),
        },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("사용자 정보가 성공적으로 업데이트되었습니다.");
        window.location.reload();
      } else {
        throw new Error("서버 처리 실패");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const isFormValid = () => {
    return (
      user?.name &&
      user?.nickName &&
      user?.email &&
      password &&
      user?.address &&
      user?.phoneNumber
    );
  };

  const changeName = (newName: string) =>
    setUser({
      ...user,
      name: newName,
    } as User);

  const changeNickName = (newcNickName: string) =>
    setUser({
      ...user,
      nickName: newcNickName,
    } as User);

  const changeEmail = (newEmail: string) => {
    setUser({
      ...user,
      email: newEmail,
    } as User);
  };

  const changePassword = (newPassword: string) => {
    setPassword(newPassword);
  };

  const changeAddress = (newAddress: string) => {
    setUser({
      ...user,
      address: newAddress,
    } as User);
  };

  const changePhoneNumber = (newPhoneNumber: string) => {
    setUser({
      ...user,
      phoneNumber: newPhoneNumber,
    } as User);
  };

  const changeBankName = (newBankName: string) => {
    setUser({
      ...user,
      bankName: newBankName,
    } as User);
  };

  const changeAccountNumber = (newAccountNumber: string) => {
    setUser({
      ...user,
      accountNumber: newAccountNumber,
    } as User);
  };

  const goToListPage = () => {
    router.back();
  };

  return (
    <div>
      {/* 이름 */}
      <div className="flex items-center justify-start mb-4">
        <div className="flex text-lg font-medium min-w-24">
          이름<p className="text-red-600">*</p>
        </div>
        <Input
          value={user?.name}
          onChange={changeName}
          placeholder="이름을 입력하세요"
          width={300}
          height={45}
        />
      </div>

      {/* 닉네임 */}
      <div className="flex items-center justify-start mb-4">
        <div className="flex text-lg font-medium min-w-24">
          닉네임<p className="text-red-600">*</p>
        </div>
        <Input
          value={user?.nickName}
          onChange={changeNickName}
          placeholder="닉네임을 입력하세요"
          width={300}
          height={45}
        />
      </div>

      {/* 이메일 */}
      <div className="flex items-center justify-start mb-4">
        <div className="flex text-lg font-medium min-w-24">
          이메일<p className="text-red-600">*</p>
        </div>
        <Input
          value={user?.email}
          onChange={changeEmail}
          placeholder="이메일을 입력하세요"
          width={300}
          height={45}
        />
      </div>

      {/* 비밀번호 */}
      <div className="flex items-center justify-start mb-4">
        <div className="flex text-lg font-medium min-w-24">
          비밀번호<p className="text-red-600">*</p>
        </div>
        <Input
          type="password"
          value={password}
          onChange={changePassword}
          placeholder="비밀번호를 입력하세요"
          width={300}
          height={45}
        />
      </div>

      {/* 주소 */}
      <div className="flex items-center justify-start mb-4">
        <div className="flex text-lg font-medium min-w-24">
          주소<p className="text-red-600">*</p>
        </div>
        <Input
          value={user?.address}
          onChange={changeAddress}
          placeholder="주소를 입력하세요"
          width={300}
          height={45}
        />
      </div>

      {/* 전화번호 */}
      <div className="flex items-center justify-start mb-4">
        <div className="flex text-lg font-medium min-w-24">
          전화번호<p className="text-red-600">*</p>
        </div>
        <Input
          value={user?.phoneNumber}
          onChange={changePhoneNumber}
          placeholder="전화번호를 입력하세요"
          width={300}
          height={45}
        />
      </div>

      {/* 은행 */}
      <div className="flex items-center justify-start mb-4">
        <div className="flex text-lg font-medium min-w-24">은행</div>
        <Input
          value={user?.accountBank}
          onChange={changeBankName}
          placeholder="은행을 입력하세요"
          width={300}
          height={45}
        />
      </div>

      {/* 계좌 정보 */}
      <div className="flex items-center justify-start mb-4">
        <div className="flex text-lg font-medium min-w-24">계좌 정보</div>
        <Input
          value={user?.accountNumber}
          onChange={changeAccountNumber}
          placeholder="계좌 정보를 입력하세요"
          width={300}
          height={45}
        />
      </div>

      <div className="flex justify-start items-center pb-20 mt-20">
        <div
          className="rounded-lg text-purple-500 bg-white border border-purple-500 w-32 h-12 flex items-center justify-center cursor-pointer mr-2"
          onClick={goToListPage}
        >
          뒤로가기
        </div>
        <Button
          text="수정하기"
          disabled={!isFormValid()}
          onClick={updateUser}
        />
      </div>
    </div>
  );
}
