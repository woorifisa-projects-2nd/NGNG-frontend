"use client";
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { getAccessToken } from "../_utils/auth-header";
import { ProductLogs } from "../_types/type";
import moment from 'moment';

export default function LogPointPage() {
    const [logs, setLogs] = useState<ProductLogs[]>();

    // 페이지 관련
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
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
        const url = `/api/admin/logs/points?page=${pageNumber}`;

        await fetch(url, {
            headers: {
                Authorization: getAccessToken(),
            },
        })
            .then(resp => resp.json())
            .then(result => {
                setLogs(result.content);
                setCurrentPage(result.pageable.pageNumber);
                setTotalPages(result.totalPages);
                setItemsPerPage(result.pageable.pageSize)
            });
    }

    console.log(logs);

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
                    href={`/admin/logs/points?page=${i + 1}`}
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

    return (
        <div className="p-5">
            <div className="text-3xl font-bold mb-16">로그 관리</div>

            <div>
                <div className="flex text-center items-center h-16 text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <div className="w-2/5 font-bold text-base">날짜</div>
                    <div className="w-3/5 font-bold text-base">내용</div>
                </div>

                <div className="text-center">
                    {logs?.map((log, index) => (
                        <div key={index} className="border-b border-gray-300 rounded p-3 flex items-center">
                            {/* <div className="w-1/12">{index + 1 + currentPage * itemsPerPage}</div> */}
                            <div className="w-2/5">{moment.utc(log.timestamp).local().format('YYYY-MM-DD HH:mm:ss')}</div>
                            <div className="w-3/5"><p>{log.message}</p></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center space-x-4">
                <Link
                    href={!disablePrevious ? `/admin/points?page=${Math.floor(currentPage / maxPageButtons) * maxPageButtons - maxPageButtons + 1}` : "#"}
                    onClick={e => {
                        if (disablePrevious) {
                            e.preventDefault();
                        } else {
                            handlePreviousPageClick();
                        }
                    }}
                    className={`text-black ${disablePrevious ? 'cursor-not-allowed text-gray-500' : ''}`}
                >
                    {'<'}
                </Link>
                {renderPageNumbers()}
                <Link
                    href={!disableNext ? `/admin/points?page=${Math.floor(currentPage / maxPageButtons) * maxPageButtons + maxPageButtons + 1}` : "#"}
                    onClick={e => {
                        if (disableNext) {
                            e.preventDefault();
                        } else {
                            handleNextPageClick();
                        }
                    }}
                    className={`text-black ${disableNext ? 'cursor-not-allowed text-gray-500' : ''}`}
                >
                    {'>'}
                </Link>
            </div>
        </div>
    );
}