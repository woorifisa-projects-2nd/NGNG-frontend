"use client"
import { useState } from 'react';

// 신고 정보의 타입 정의
interface Report {
    id: number;
    date: string;
    reporter: string;
    target: string;
    type: string;
    processed: boolean;
    content: string;
}

// 더미 데이터 생성
const dummyReports: Report[] = [
    {
        id: 1,
        date: '2024-04-01',
        reporter: 'User1',
        target: 'User2',
        type: '게시판',
        processed: false,
        content: '불법게시물@@@@@@@@@',
    },
    {
        id: 2,
        date: '2024-04-03',
        reporter: 'User3',
        target: 'User8',
        type: '채팅',
        processed: true,
        content: '사기꾼!!!!!!!!!!!',
    }
];

export default function ReportManagement() {
    // 미처리 신고 건수 계산
    const pendingReportsCount = dummyReports.filter(report => !report.processed).length;

    // 신고 처리 여부를 저장하는 state
    const [processedReports, setProcessedReports] = useState<Report[]>(dummyReports);

    // 처리 여부 변경 함수
    const handleProcessedChange = (id: number) => {
        const updatedReports = processedReports.map(report => {
            if (report.id === id) {
                return { ...report, processed: !report.processed };
            }
            return report;
        });
        setProcessedReports(updatedReports);
    };


    return (
        <div className="p-5">
            <div className="text-3xl font-bold mb-5">신고 관리</div>

            <div className="flex justify-between mb-5">
                <div>미처리 신고 건수: {pendingReportsCount}</div>
                <div><button onClick={() => window.location.reload()}>새로고침</button></div>
            </div>

            <div>
                <div className="flex text-center">
                    <div className="w-1/6 font-bold">날짜</div>
                    <div className="w-1/6 font-bold">신고 유저</div>
                    <div className="w-1/6 font-bold">신고 대상</div>
                    <div className="w-1/6 font-bold">신고 유형</div>
                    <div className="w-1/6 font-bold">처리 여부</div>
                    <div className="w-1/6 font-bold">내용</div>
                    <div className="w-1/6"></div>
                </div>

                <div className="text-center">
                    {processedReports.map(report => (
                        <div key={report.id} className="border border-gray-300 rounded p-3 mb-3 flex items-center">
                            <div className="w-1/6">{report.date}</div>
                            <div className="w-1/6">{report.reporter}</div>
                            <div className="w-1/6">{report.target}</div>
                            <div className="w-1/6">{report.type}</div>
                            <div className={`w-1/6 ${report.processed ? 'text-green-500' : 'text-red-500'}`}>
                                {report.processed ? 'True' : 'False'}
                            </div>``
                            <div className="w-1/6">{report.content}</div>
                            <div className="w-1/6">삭제/수정</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
