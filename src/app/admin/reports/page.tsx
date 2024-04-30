"use client";
import Refresh from "@/components/layouts/admin_menu/design/SVG/refresh.svg";
import CheckReport from "@/components/layouts/admin_menu/design/SVG/check_report.svg";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getAccessToken } from "./_utils/auth-header";

type ReportTypeDetails = {
  reportTypeId: number;
  reportType: string;
};

type UserDetails = {
  userId: number;
  name: string;
  nickname: string;
};

// 신고 정보의 타입 정의
type Report = {
  reportId: number;
  createdAt: string;
  reporter: UserDetails;
  user: UserDetails;
  reportType: ReportTypeDetails;
  isReport: boolean;
  reportContents: string;
  productId: number;
  privateChatId: number;
  visible: boolean;
};

export default function ReportManagement() {
    const [showUnprocessedOnly, setShowUnprocessedOnly] = useState(false);
    const [reports, setReports] = useState<Report[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);

    // 페이지 관련
    const [totalPages, setTotalPages] = useState<number>(0);
    const [itemsPerPage, setItemsPerPage] = useState<number>(0);
    const [maxPageButtons, setMaxPageButtons] = useState<number>(5); // 최대 페이지 버튼 수
    const [startPage, setStartPage] = useState<number>(0); // 페이징 번호 시작 페이지
    const [endPage, setEndPage] = useState<number>(1); // 페이징 번호 끝 페이지
    const disablePrevious = Math.floor(currentPage / maxPageButtons) * maxPageButtons - maxPageButtons < 0;
    const disableNext = Math.floor(currentPage / maxPageButtons) * maxPageButtons + maxPageButtons >= totalPages;

    // 페이지를 변경할 때 해당 페이지의 데이터를 가져오는 함수
    async function fetchReportsByPage(pageNumber: number, unprocessedOnly: boolean) {

        const url = `/api/admin/reports?page=${pageNumber}&unprocessedOnly=${unprocessedOnly}`;

        await fetch(url, {
            headers: {
                Authorization: getAccessToken(),
            },
        })
            .then(resp => resp.json())
            .then(result => {
                setReports(result.content);
                setCurrentPage(result.pageable.pageNumber);
                setTotalPages(result.totalPages);
                setItemsPerPage(result.pageable.pageSize)
            });
    }
  }, [currentPage, totalPages]);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchReportsByPage(pageNumber, showUnprocessedOnly);
  };

  const handlePreviousPageClick = () => {
    const previousPage =
      Math.floor(currentPage / maxPageButtons) * maxPageButtons -
      maxPageButtons;
    setCurrentPage(previousPage);
    fetchReportsByPage(previousPage, showUnprocessedOnly);
    setStartPage(previousPage);
    setEndPage(previousPage + maxPageButtons);
  };

  const handleNextPageClick = () => {
    const nextPage =
      Math.floor(currentPage / maxPageButtons) * maxPageButtons +
      maxPageButtons;
    setCurrentPage(nextPage);
    fetchReportsByPage(nextPage, showUnprocessedOnly);
    setStartPage(nextPage);
    setEndPage(nextPage + maxPageButtons);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = startPage; i < endPage; i++) {
      pageNumbers.push(
        <Link
          key={i}
          href={`/admin/reports?page=${i + 1}`}
          onClick={(e) => {
            if (currentPage === i) {
              e.preventDefault();
            } else {
              handlePageClick(i);
            }
          }}
          className={`${
            currentPage === i
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

  console.log(reports);

  return (
    <div className="p-5">
      <div className="text-3xl font-bold mb-16">신고 관리</div>

      <div className="flex justify-between mb-5">
        <div>
          <label className="cursor-pointer">
            <input
              className="mr-1 cursor-pointer"
              type="checkbox"
              checked={showUnprocessedOnly}
              onChange={(e) => setShowUnprocessedOnly(e.target.checked)}
            />
            미처리 신고만 보기
          </label>
        </div>
        <div
          className="flex cursor-pointer"
          onClick={() => window.location.reload()}
        >
          <Refresh className="mr-2" />
          <div>새로고침</div>
        </div>
      </div>

      <div>
        <div className="flex text-center items-center h-16 text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <div className="w-1/12 font-bold text-base">No.</div>
          <div className="w-1/6 font-bold text-base">날짜</div>
          <div className="w-1/6 font-bold text-base">신고 유저</div>
          <div className="w-1/6 font-bold text-base">신고 대상</div>
          <div className="w-1/6 font-bold text-base">신고 유형</div>
          <div className="w-1/6 font-bold text-base">처리 여부</div>
          <div className="w-1/6"></div>
        </div>

        <div className="text-center">
          {reports.map((report, index) => (
            <div
              key={report.reportId}
              className="border-b border-gray-300 rounded p-3 flex items-center"
            >
              <div className="w-1/12">
                {index + 1 + currentPage * itemsPerPage}
              </div>
              <div className="w-1/6">{report.createdAt.substring(0, 10)}</div>
              <div className="w-1/6">
                <p>{report.reporter.name}</p>
                <p className="text-gray-400">@{report.reporter.nickname}</p>
              </div>
              <div className="w-1/6">
                <p>{report.user.name}</p>
                <p className="text-gray-400">@{report.user.nickname}</p>
              </div>
              <div className="w-1/6">{report.reportType.reportType}</div>
              <div
                className={`w-1/6 ${
                  report.isReport
                    ? "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                    : "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                }`}
              >
                {report.isReport ? "True" : "False"}
              </div>
              <div className="w-1/6">
                <div className="p-5">
                  <Link href={`/admin/reports/${report.reportId}`}>
                    <CheckReport />
                  </Link>
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
              ? `/admin/reports?page=${
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
              ? `/admin/reports?page=${
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
