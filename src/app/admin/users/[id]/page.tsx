"use client"

import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Input from "@/components/common/inputs/Input";
import { User } from "../_types/type";
import Button from "@/components/common/Button";
import { getAccessToken } from "../_utils/auth-header";

export default function userDetail({ params }: { params: { id: number } }) {
    const [user, setUser] = useState<User | null>(null);
    const [password, setPassword] = useState<string | number>("");

    async function fetchUser() {
        fetch(`http://localhost:8080/admin/users/${params.id}`, {
            headers: {
                Authorization: getAccessToken(),
            },
        })
            .then(resp => resp.json())
            .then(result => {
                setUser(result);
            });
    }

    const updateUser = async () => {

        const request = {
            userId: user?.userId,
            nickName: user?.nickName,
            phoneNumber: user?.phoneNumber,
            email: user?.email,
            accountBank: user?.accountBank,
            accountNumber: user?.accountNumber,
            address: user?.address,
        };

        console.log(request);

        try {
            const response = await fetch(`http://localhost:8080/admin/users/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: getAccessToken(),
                },
                body: JSON.stringify(request),
            });
            const data = await response.json();
            console.log(data); // Handle response data as needed
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);


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
                <div className="flex text-lg font-medium min-w-24">
                    은행
                </div>
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
                <div className="flex text-lg font-medium min-w-24">
                    계좌 정보
                </div>
                <Input
                    value={user?.accountNumber}
                    onChange={changeAccountNumber}
                    placeholder="계좌 정보를 입력하세요"
                    width={300}
                    height={45}
                />
            </div>

            <div className="flex justify-end items-center pb-20">
                <Button
                    text="수정하기"
                    // disabled={!newProduct?.isFullfillSaveCondition}
                    onClick={updateUser}
                />
            </div>
        </div>

    );
}