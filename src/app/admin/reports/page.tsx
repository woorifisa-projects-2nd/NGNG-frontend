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
    const [currentPage, setCurrentPage] = useState<number>(1);

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

    // 페이지를 변경할 때 해당 페이지의 데이터를 가져오는 함수
    async function fetchReportsByPage(pageNumber : number) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/reports?page=${pageNumber}`)
            .then(resp => resp.json())
            .then(result => {
                setReports(result);
                setDisplayedReports(result);
            });
    }

    // async function fetchReportsByPage2(pageNumber : number) {
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}admin/reports?page=${pageNumber}`);
    //     const result = await response.json();
    //     setReports(result);
    //     setDisplayedReports(result);
    // }

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
                    <div className="w-1/5 font-bold">날짜</div>
                    <div className="w-1/5 font-bold">신고 유저</div>
                    <div className="w-1/5 font-bold">신고 대상</div>
                    <div className="w-1/5 font-bold">신고 유형</div>
                    <div className="w-1/5 font-bold">처리 여부</div>
                    <div className="w-1/5"></div>
                </div>

                <div className="text-center">
                    {displayedReports.map(report => (
                        <div key={report.reportId} className="border-b border-gray-300 rounded p-3 flex items-center">
                            <div className="w-1/5">{report.createdAt.substring(0, 10)}</div>
                            <div className="w-1/5">
                                <p>{report.reporter.name}</p>
                                <p className="text-gray-400">@{report.reporter.nickname}</p>
                            </div>
                            <div className="w-1/5">
                                <p>{report.user.name}</p>
                                <p className="text-gray-400">@{report.user.nickname}</p>
                            </div>
                            <div className="w-1/5">{report.reportType.reportType}</div>
                            <div className={`w-1/5 ${report.isReport ? 'text-green-500' : 'text-red-500'}`}>
                                {report.isReport ? 'True' : 'False'}
                            </div>
                            <div className="w-1/5">
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

            <div>
                <button onClick={() => fetchReportsByPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <button onClick={() => fetchReportsByPage(currentPage + 1)} disabled={currentPage === 10}>Next</button>
            </div>

        </div>
    );
}
