import React from 'react';
import Link from "next/link";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    maxPageButtons: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, maxPageButtons, onPageChange }) => {
    const startPage = Math.floor(currentPage / maxPageButtons) * maxPageButtons;
    const endPage = Math.min(startPage + maxPageButtons, totalPages);

    const handlePreviousPageClick = () => {
        onPageChange(startPage - maxPageButtons);
    };

    const handleNextPageClick = () => {
        onPageChange(startPage + maxPageButtons);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = startPage; i < endPage; i++) {
            pageNumbers.push(
                <Link
                    key={i}
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onPageChange(i);
                    }}
                    className={`${currentPage === i ? "text-violet-900 pointer-events-none" : "text-slate-300 pointer-events-auto"}`}
                >
                    {i + 1}
                </Link>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="flex justify-center space-x-4">
            <button onClick={handlePreviousPageClick} disabled={currentPage <= 0} className="text-black">
                {'<'}
            </button>
            {renderPageNumbers()}
            <button onClick={handleNextPageClick} disabled={startPage + maxPageButtons >= totalPages} className="text-black">
                {'>'}
            </button>
        </div>
    );
};

export default Pagination;