"use client"
import Refresh from "@/components/layouts/admin_menu/design/SVG/refresh.svg";
import CheckReport from "@/components/layouts/admin_menu/design/SVG/check_report.svg";
import Trash from "@/components/layouts/admin_menu/design/SVG/trash-2.svg";
import { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

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


export default function UserManagement() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    console.log(products);

    // 페이지 관련
    const [itemsPerPage, setItemsPerPage] = useState<number>(0);
    const [maxPageButtons, setMaxPageButtons] = useState<number>(5); // 최대 페이지 버튼 수
    const [startPage, setStartPage] = useState<number>(0); // 페이징 번호 시작 페이지
    const [endPage, setEndPage] = useState<number>(1); // 페이징 번호 끝 페이지
    const disablePrevious = Math.floor(currentPage / maxPageButtons) * maxPageButtons - maxPageButtons < 0;
    const disableNext = Math.floor(currentPage / maxPageButtons) * maxPageButtons + maxPageButtons >= totalPages;

    // 페이지를 변경할 때 해당 페이지의 데이터를 가져오는 함수
    async function fetchReportsByPage(pageNumber: number) {
        const url = `http://localhost:8080/admin`;

        await fetch(url)
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

    const handleCreateProduct = () => {
        router.push('/sell'); // '/sell' 경로로 이동합니다.
    };

    const handleDelete = async (productId: number) => {
        const shouldDelete = window.confirm('정말로 삭제하시겠습니까?');

        if (shouldDelete) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}products/${productId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });
        }
        fetchReportsByPage(currentPage);
    };

    return (
        <div className="p-5">
            <div className="text-3xl font-bold mb-16">사용자 관리</div>

            <div className="flex justify-between mb-5">

                <div className="flex cursor-pointer" onClick={handleCreateProduct}>
                    <Refresh className="mr-2" />
                    <div>사용자 등록</div>
                </div>
            </div>

            <div>
                <div className="flex text-center h-10 bg-slate-100 p-8">
                    <div className="w-1/6 font-bold">No.</div>
                    <div className="w-1/6 font-bold">상품 ID</div>
                    <div className="w-1/6 font-bold">제목</div>
                    <div className="w-1/6 font-bold">가격</div>
                    <div className="w-1/6 font-bold">판매자</div>
                    <div className="w-1/6 font-bold">카테고리</div>
                    <div className="w-1/6"></div>
                </div>

                <div className="text-center">
                    {products.map((product, index) => (
                        <div key={product.id} className="border-b border-gray-300 rounded p-3 flex items-center">
                            <div className="w-1/6">{index + 1 + currentPage * itemsPerPage}</div>
                            <div className="w-1/6">{product.id}</div>
                            <div className="w-1/6">{product.title}</div>
                            <div className="w-1/6">{product.price.toLocaleString()}</div>
                            <div className="w-1/6">{product.user.name}</div>
                            <div className="w-1/6">{product.category.name}</div>
                            <div className="w-1/6">
                                <div className="p-5 flex">
                                    <Link href={`/admin/products/${product.id}`}><CheckReport /></Link>
                                    <div className="cursor-pointer" onClick={() => handleDelete(product.id)} >
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
                    href={!disablePrevious ? `/admin/products?page=${Math.floor(currentPage / maxPageButtons) * maxPageButtons - maxPageButtons + 1}` : "#"}
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
                    href={!disableNext ? `/admin/products?page=${Math.floor(currentPage / maxPageButtons) * maxPageButtons + maxPageButtons + 1}` : "#"}
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
