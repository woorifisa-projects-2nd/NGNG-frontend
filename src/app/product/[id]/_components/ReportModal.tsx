import { useState, useEffect, useRef  } from 'react';
import { Product } from "../../_types/type";
import ImageUploadBox from "./ImageUploadBox";
import CloseIcon from "@/assets/SVG/Close.svg";
import { createReport } from "../../_api/api";

type ReportModalProps = {
    onClose: () => void;
    data: Product;
    userId: number
};

export default function ReportModal({ onClose, data, userId }: ReportModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [reportContent, setReportContent] = useState('');
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);

    const handleReportContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReportContent(e.target.value);
    };

    const handleSubmit = async (): Promise<void> => {
        console.log("reportContents" + reportContent);
        console.log("reporterId" + userId);
        console.log("userId" + data.user.id);
        console.log("productId" + data.id);
        console.log(uploadedImages);

        const requestData = {
            reportContents: reportContent,
            reportTypeId: 1, // 상품 신고
            reporterId: userId,
            userId: data.user.id,
            productId: data.id,
        };

        createReport(requestData);

        return;
        

        try {
            const requestData = {
                reportContents: reportContent,
                reportTypeId: 1,
                reporterId: userId,
                userId: data.user.id,
                productId: data.id,
            };

            // Fetch 로직 생략

            console.log('신고가 성공적으로 제출되었습니다.');
            onClose();
        } catch (error) {
            console.error('에러 발생:', (error as Error).message);
        }
    };

    const handleImageUpload = (image: File) => {
        setUploadedImages(prevImages => [...prevImages, image]);
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div ref={modalRef} className="bg-white p-8 rounded-lg modal-container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-14 md:w-[80vw] lg:w-[80vw] max-h-[80vh] overflow-auto">
                <CloseIcon width={16} height={16} className="fill-black" onClick={onClose} />

                {/* 모달 내용 */}
                <p>신고 대상: {data.user.nickname}</p>

                {/* 이미지 업로드 박스 */}
                <ImageUploadBox uploadImage={handleImageUpload} />

                {/* 신고 내용 입력 */}
                <label htmlFor="reportContent" className="block mt-4">신고 내용</label>
                <textarea
                    id="reportContent"
                    value={reportContent}
                    onChange={handleReportContentChange}
                    rows={4}
                    className="border border-gray-300 rounded-md p-2 mt-1 w-full"
                ></textarea>

                {/* 신고하기 버튼 */}
                <button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4">
                    신고하기
                </button>
            </div>
        </div>
    );
}
