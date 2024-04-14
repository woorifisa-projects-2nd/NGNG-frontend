"use client"
import Refresh from "@/components/layouts/admin_menu/design/SVG/refresh.svg";
import CheckReport from "@/components/layouts/admin_menu/design/SVG/check_report.svg";
import { useState, useEffect } from 'react';
import Link from "next/link";

type ReportTypeDetails = {
    reportTypeId: number;
    reportType: string;
}

type UserDetails = {
    userId: number;
    name: string;
    nickname: string;
}

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
}


export default function ReportManagement() {
    const [showUnprocessedOnly, setShowUnprocessedOnly] = useState(false);
    const [reports, setReports] = useState<Report[]>([]);
    const [displayedReports, setDisplayedReports] = useState<Report[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [itemsPerPage, setItemsPerPage] = useState<number>(0);
    const [maxPageButtons, setMaxPageButtons] = useState<number>(7); // 최대 페이지 버튼 수
    const [startPage, setStartPage] = useState<number>(0); // 페이징 번호 시작 페이지
    const [endPage, setEndPage] = useState<number>(0); // 페이징 번호 끝 페이지


    // API로부터 신고 목록 데이터를 가져오는 함수
    async function fetchReports() {
        fetch(process.env.NEXT_PUBLIC_API_URL + "admin/reports")
            .then(resp => resp.json())
            .then(result => {
                setReports(result);
                setDisplayedReports(result);
            });
    }

    useEffect(() => {
        // fetchReports();
        fetchReportsByPage(currentPage);
    }, []);

    useEffect(() => {
        setDisplayedReports(
            showUnprocessedOnly ? reports.filter(report => !report.isReport) : reports
        );
    }, [showUnprocessedOnly, reports]);

    useEffect(() => {
        if (totalPages <= maxPageButtons) {
            setStartPage(0);
            setEndPage(Math.min(startPage + maxPageButtons, totalPages));
        } else {
            setStartPage(Math.floor(currentPage / maxPageButtons) * maxPageButtons);
            setEndPage(Math.min(startPage + maxPageButtons, totalPages));
        }
    }, [currentPage, totalPages]);

    // 페이지를 변경할 때 해당 페이지의 데이터를 가져오는 함수
    async function fetchReportsByPage(pageNumber: number) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/reports?page=${pageNumber}`)
            .then(resp => resp.json())
            .then(result => {
                setReports(result.content);
                setDisplayedReports(result.content);
                setCurrentPage(result.pageable.pageNumber);
                setTotalPages(result.totalPages);
                setItemsPerPage(result.pageable.pageSize)
            });
    }

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        fetchReportsByPage(pageNumber);
    };

    const handlePreviousPageClick = () => {
        const previousPage = (currentPage / maxPageButtons) * maxPageButtons + maxPageButtons;
        setCurrentPage(0);
        fetchReportsByPage(0);
    };

    const handleNextPageClick = () => {
        // 한번에 보여줄 페이지 개수 ex) 1 2 3 4 5 라면 5
        const nextPage = Math.floor(currentPage / maxPageButtons) * maxPageButtons + maxPageButtons;
        setCurrentPage(nextPage);
        fetchReportsByPage(nextPage);
        setStartPage(nextPage);
        setEndPage(nextPage + maxPageButtons);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = startPage; i < endPage; i++) {
            pageNumbers.push(
                // <button
                //     key={i}
                //     onClick={() => handlePageClick(i)}
                //     disabled={currentPage === i}
                //     className={currentPage === i ? 'text-violet-800' : 'text-slate-400'}
                // >
                //     {i + 1}
                // </button>
                <Link key={i} href={`/admin/reports?page=${i + 1}`}
                    onClick={() => handlePageClick(i)}
                    className={currentPage === i ? 'text-violet-800' : 'text-slate-400'}
                >
                    {i + 1}
                </Link>
            );
        }
        return pageNumbers;
    };

    console.log(displayedReports);
    

    return (
        <div className="p-5">
            <div className="text-3xl font-bold mb-16">신고 관리</div>

            <div className="flex justify-between mb-5">
                <div>
                    <label className="cursor-pointer">
                        <input
                            className='mr-1 cursor-pointer'
                            type="checkbox"
                            checked={showUnprocessedOnly}
                            onChange={e => setShowUnprocessedOnly(e.target.checked)}
                        />
                        미처리 신고만 보기
                    </label>
                </div>
                <div className="flex cursor-pointer" onClick={() => window.location.reload()}>
                    <Refresh className="mr-2" />
                    <div>새로고침</div>
                </div>
            </div>

            <div>
                <div className="flex text-center h-10 bg-slate-100 p-8">
                    <div className="w-1/6 font-bold">번호</div>
                    <div className="w-1/6 font-bold">날짜</div>
                    <div className="w-1/6 font-bold">신고 유저</div>
                    <div className="w-1/6 font-bold">신고 대상</div>
                    <div className="w-1/6 font-bold">신고 유형</div>
                    <div className="w-1/6 font-bold">처리 여부</div>
                    <div className="w-1/6"></div>
                </div>

                <div className="text-center">
                    {displayedReports.map((report, index) => (
                        <div key={report.reportId} className="border-b border-gray-300 rounded p-3 flex items-center">
                            <div className="w-1/6">{index + 1 + currentPage * itemsPerPage}</div>
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
                            <div className={`w-1/6 ${report.isReport ? 'text-green-500' : 'text-red-500'}`}>
                                {report.isReport ? 'True' : 'False'}
                            </div>
                            <div className="w-1/6">
                                <div className="p-5">
                                    {/* <div className="w-1/5 cursor-pointer" onClick={() => openModal(report)}>
                                        <CheckReport />
                                    </div> */}
                                    <Link href={`/admin/reports/${report.reportId}`}><CheckReport /></Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center space-x-4">
                <button
                    onClick={handlePreviousPageClick}
                    disabled={currentPage === 0}
                    className="text-black"
                >
                    {'<'}
                </button>
                {renderPageNumbers()}
                <button
                    onClick={handleNextPageClick}
                    // disabled={currentPage === totalPages - 1}
                    disabled={(currentPage / maxPageButtons) * maxPageButtons + maxPageButtons >= totalPages}
                    className="text-black"
                >
                    {'>'}
                </button>
            </div>

            {/* <div>
                <button onClick={() => fetchReportsByPage(currentPage - 1)} disabled={currentPage === 0}>Previous</button>
                <button onClick={() => fetchReportsByPage(currentPage + 1)} disabled={currentPage+1 === totalPages}>Next</button>
            </div> */}

        </div>
    );
}
