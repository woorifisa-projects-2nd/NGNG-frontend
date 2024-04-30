"use client";
import Refresh from "@/components/layouts/admin_menu/design/SVG/refresh.svg";
import CheckReport from "@/components/layouts/admin_menu/design/SVG/check_report.svg";
import Trash from "@/components/layouts/admin_menu/design/SVG/trash-2.svg";
import Plus from "@/components/layouts/admin_menu/design/SVG/Plus.svg";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "./_types/type";
import { getAccessToken } from "./_utils/auth-header";

export default function UserManagement() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  console.log(users);

  // 페이지 관련
  const [itemsPerPage, setItemsPerPage] = useState<number>(0);
  const [maxPageButtons, setMaxPageButtons] = useState<number>(5); // 최대 페이지 버튼 수
  const [startPage, setStartPage] = useState<number>(0); // 페이징 번호 시작 페이지
  const [endPage, setEndPage] = useState<number>(1); // 페이징 번호 끝 페이지
  const disablePrevious =
    Math.floor(currentPage / maxPageButtons) * maxPageButtons - maxPageButtons <
    0;
  const disableNext =
    Math.floor(currentPage / maxPageButtons) * maxPageButtons +
      maxPageButtons >=
    totalPages;

  // 페이지를 변경할 때 해당 페이지의 데이터를 가져오는 함수
  async function fetchReportsByPage(pageNumber: number) {
    const url = `/api/admin/users?page=${pageNumber}`;

    await fetch(url, {
      headers: {
        Authorization: getAccessToken(),
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        setUsers(result.content);
        // console.log(result.content);

        setCurrentPage(result.pageable.pageNumber);
        setTotalPages(result.totalPages);
        setItemsPerPage(result.pageable.pageSize);
      });
  }

  useEffect(() => {
    fetchReportsByPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (totalPages <= maxPageButtons) {
      setStartPage(0);
      setEndPage(Math.min(startPage + maxPageButtons, totalPages));
    } else {
      setStartPage(Math.floor(currentPage / maxPageButtons) * maxPageButtons);
      setEndPage(Math.min(startPage + maxPageButtons, totalPages));
    }
  }, [currentPage, totalPages]);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchReportsByPage(pageNumber);
  };

  const handlePreviousPageClick = () => {
    const previousPage =
      Math.floor(currentPage / maxPageButtons) * maxPageButtons -
      maxPageButtons;
    setCurrentPage(previousPage);
    fetchReportsByPage(previousPage);
    setStartPage(previousPage);
    setEndPage(previousPage + maxPageButtons);
  };

  const handleNextPageClick = () => {
    const nextPage =
      Math.floor(currentPage / maxPageButtons) * maxPageButtons +
      maxPageButtons;
    setCurrentPage(nextPage);
    fetchReportsByPage(nextPage);
    setStartPage(nextPage);
    setEndPage(nextPage + maxPageButtons);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = startPage; i < endPage; i++) {
      pageNumbers.push(
        <Link
          key={i}
          href={`/admin/users?page=${i + 1}`}
          onClick={(e) => {
            if (currentPage === i) {
              e.preventDefault();
            } else {
              handlePageClick(i);
            }
          }}
          className={`${currentPage === i
            ? "text-violet-900 pointer-events-none"
            : "text-slate-300 pointer-events-auto"
            }`}
        >
          {i + 1}
        </Link>
      );
    }
    return pageNumbers;
  };

  const handleCreateuser = () => {
    router.push("/admin/users"); // '/sell' 경로로 이동합니다.
  };

  const handleDelete = async (userId: number) => {
    const shouldDelete = window.confirm("정말로 삭제하시겠습니까?");

    if (shouldDelete) {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: getAccessToken(),
        },
      });
    }
    fetchReportsByPage(currentPage);
  };

  return (
    <div className="p-5">
      <div className="text-3xl font-bold mb-16">사용자 관리</div>

      <div className="flex justify-between mb-5">
        {/* <div className="flex cursor-pointer items-center" onClick={handleCreateuser}>
                    <Plus />
                    <div>사용자 등록</div>
                </div> */}
      </div>

      <div>
        <div className="flex text-center items-center h-16 text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <div className="w-1/12 font-bold text-base">No.</div>
          <div className="w-1/12 font-bold text-base">사용자 ID</div>
          <div className="w-1/6 font-bold text-base">이름/닉네임</div>
          <div className="w-1/6 font-bold text-base">전화번호</div>
          <div className="w-1/6 font-bold text-base">이메일</div>
          <div className="w-1/4 font-bold text-base">주소</div>
          <div className="w-1/6"></div>
        </div>

        <div className="text-center">
          {users.map((user, index) => (
            <div
              key={user.userId}
              className="border-b border-gray-300 rounded p-3 flex items-center"
            >
              <div className="w-1/12">
                {index + 1 + currentPage * itemsPerPage}
              </div>
              <div className="w-1/12">{user.userId}</div>
              <div className="w-1/6">
                <p>{user.name}</p>
                <p className="text-gray-400">@{user.nickName}</p>
              </div>
              <div className="w-1/6">{user.phoneNumber}</div>
              <div className="w-1/6">{user.email}</div>
              <div className="w-1/4">{user.address}</div>
              <div className="w-1/6">
                <div className="p-5 flex items-center">
                  <Link href={`/admin/users/${user.userId}`}>
                    <CheckReport />
                  </Link>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleDelete(user.userId)}
                  >
                    <Trash />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Link
          href={
            !disablePrevious
              ? `/admin/users?page=${
                  Math.floor(currentPage / maxPageButtons) * maxPageButtons -
                  maxPageButtons +
                  1
                }`
              : "#"
          }
          onClick={(e) => {
            if (disablePrevious) {
              e.preventDefault();
            } else {
              handlePreviousPageClick();
            }
          }}
          className={`text-black ${
            disablePrevious ? "cursor-not-allowed text-gray-500" : ""
          }`}
        >
          {"<"}
        </Link>
        {renderPageNumbers()}
        <Link
          href={
            !disableNext
              ? `/admin/users?page=${
                  Math.floor(currentPage / maxPageButtons) * maxPageButtons +
                  maxPageButtons +
                  1
                }`
              : "#"
          }
          onClick={(e) => {
            if (disableNext) {
              e.preventDefault();
            } else {
              handleNextPageClick();
            }
          }}
          className={`text-black ${
            disableNext ? "cursor-not-allowed text-gray-500" : ""
          }`}
        >
          {">"}
        </Link>
      </div>
    </div>
  );
}
