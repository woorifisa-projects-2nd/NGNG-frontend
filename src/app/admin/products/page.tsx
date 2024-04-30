"use client";
import Refresh from "@/components/layouts/admin_menu/design/SVG/refresh.svg";
import CheckReport from "@/components/layouts/admin_menu/design/SVG/check_report.svg";
import Trash from "@/components/layouts/admin_menu/design/SVG/trash-2.svg";
import Plus from "@/components/layouts/admin_menu/design/SVG/Plus.svg";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sell from "@/app/sell/page";
import { getAccessToken } from "./_utils/auth-header";

type User = {
    id: number;
    name: string;
    nickname: string;
};

type Status = {
    id: number;
    name: string;
};

type Tag = {
    tagName: string;
};

type Image = {
    id: number;
    imageURL: string;
};

type Chat = {
    id: number;
    message: string;
    userId: number;
    userName: string;
    userNickName: string;
    createAt: string;
    isImage?: boolean;
};

type Product = {
    id: number;
    available: boolean;
    title: string;
    content: string;
    price: number;
    isEscrow: boolean;
    discountable: boolean;
    purchaseAt: string | null;
    forSale: boolean;
    createdAt: string;
    updatedAt: string | null;
    visible: boolean;
    freeShipping: boolean;
    refreshedAt: string | null;
    user: User;
    status: Status;
    category: {
        id: number;
        name: string;
    };
    tags: Tag[];
    images: Image[];
    chats: Chat[];
};

export default function ProductManagement() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [view, setView] = useState<string>('list');  // 'list' 또는 'create'

    // 페이지 관련
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [itemsPerPage, setItemsPerPage] = useState<number>(0);
    const [maxPageButtons, setMaxPageButtons] = useState<number>(5); // 최대 페이지 버튼 수
    const [startPage, setStartPage] = useState<number>(0); // 페이징 번호 시작 페이지
    const [endPage, setEndPage] = useState<number>(1); // 페이징 번호 끝 페이지
    const disablePrevious = Math.floor(currentPage / maxPageButtons) * maxPageButtons - maxPageButtons < 0;
    const disableNext = Math.floor(currentPage / maxPageButtons) * maxPageButtons + maxPageButtons >= totalPages;

    // 페이지를 변경할 때 해당 페이지의 데이터를 가져오는 함수
    async function fetchReportsByPage(pageNumber: number) {
        const url = `/api/products?page=${pageNumber}`;

        await fetch(url, {
            headers: {
                Authorization: getAccessToken(),
            },
        })
            .then(resp => resp.json())
            .then(result => {
                setProducts(result.content);
                console.log(result.content);

                setCurrentPage(result.pageable.pageNumber);
                setTotalPages(result.totalPages);
                setItemsPerPage(result.pageable.pageSize)
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
        const previousPage = Math.floor(currentPage / maxPageButtons) * maxPageButtons - maxPageButtons;
        setCurrentPage(previousPage);
        fetchReportsByPage(previousPage);
        setStartPage(previousPage);
        setEndPage(previousPage + maxPageButtons);
    };

    const handleNextPageClick = () => {
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
                <Link key={i} href={`/admin/products?page=${i + 1}`}
                    onClick={(e) => {
                        if (currentPage === i) {
                            e.preventDefault();
                        } else {
                            handlePageClick(i);
                        }
                    }}
                    className={`${currentPage === i ? 'text-violet-900 pointer-events-none' : 'text-slate-300 pointer-events-auto'}`}
                >
                    {i + 1}
                </Link>
            );
        }
        return pageNumbers;
    };

    const handleDelete = async (productId: number) => {
        const shouldDelete = window.confirm("정말로 삭제하시겠습니까?");

        if (shouldDelete) {
            const res = await fetch(`/api/products/${productId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: getAccessToken(),
                },
            });

            // 삭제 후에 페이지의 상품 목록을 가져오기 전에 마지막 페이지인지 확인
            const isLastItemOnPage = products.length === 1;

            // 페이지가 마지막 페이지이고, 마지막 상품을 삭제한 경우에만 페이지를 감소시킴
            if (isLastItemOnPage && currentPage > 0) {
                fetchReportsByPage(currentPage - 1);
            } else {
                fetchReportsByPage(currentPage);
            }

        }
    };

    const handleCreateProduct = () => {
        setView("create"); // 뷰 상태를 'create'로 변경
    };

    const handleReturnToList = () => {
        setView("list"); // 뷰 상태를 'list'로 변경
    };

    if (view === "create") {
        return (
            <div>
                <button onClick={handleReturnToList}>목록으로 돌아가기</button>
                <Sell />
            </div>
        );
    }

    return (
        <div className="p-5">
            <div className="text-3xl font-bold mb-16">상품 관리</div>

            <div className="flex justify-between mb-5">
                <div
                    className="flex cursor-pointer items-center"
                    onClick={handleCreateProduct}
                >
                    <Plus />
                    <div>상품 등록</div>
                </div>
            </div>

            <div>
                <div className="flex text-center items-center h-16 text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <div className="w-1/12 font-bold text-base">No.</div>
                    <div className="w-1/12 font-bold text-base">상품 ID</div>
                    <div className="w-1/4 font-bold text-base">제목</div>
                    <div className="w-1/6 font-bold text-base">가격</div>
                    <div className="w-1/6 font-bold text-base">판매자</div>
                    <div className="w-1/6 font-bold text-base">카테고리</div>
                    <div className="w-1/6"></div>
                </div>

                <div className="text-center">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className="border-b border-gray-300 rounded p-3 flex items-center"
                        >
                            <div className="w-1/12">
                                {index + 1 + currentPage * itemsPerPage}
                            </div>
                            <div className="w-1/12">{product.id}</div>
                            <div className="w-1/4">{product.title}</div>
                            <div className="w-1/6">{product.price.toLocaleString()}</div>
                            <div className="w-1/6">{product.user.name}</div>
                            <div className="w-1/6">{product.category.name}</div>
                            <div className="w-1/6">
                                <div className="p-5 flex items-center">
                                    <Link href={`/admin/products/${product.id}`}>
                                        <CheckReport />
                                    </Link>
                                    <div
                                        className="cursor-pointer"
                                        onClick={() => handleDelete(product.id)}
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
                            ? `/admin/products?page=${Math.floor(currentPage / maxPageButtons) * maxPageButtons -
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
                    className={`text-black ${disablePrevious ? "cursor-not-allowed text-gray-500" : ""
                        }`}
                >
                    {"<"}
                </Link>
                {renderPageNumbers()}
                <Link
                    href={
                        !disableNext
                            ? `/admin/products?page=${Math.floor(currentPage / maxPageButtons) * maxPageButtons +
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
                    className={`text-black ${disableNext ? "cursor-not-allowed text-gray-500" : ""
                        }`}
                >
                    {">"}
                </Link>
            </div>
        </div>
    );
}
