import { useState, useEffect, useRef, useContext } from "react";
import { Product } from "../../_types/type";
import ImageUploadBox from "./ImageUploadBox";
import CloseIcon from "@/assets/SVG/Close.svg";
import { createReport } from "../../_api/api";
import { getProductById } from "../../_api/api";
import { redirect } from "next/navigation";
import { UserContext } from "@/providers/UserContext";

type ReportModalProps = {
  onClose: () => void;
  data: Product;
  userId: number;
  onSuccessReport: (newData: Product | undefined) => void;
};

export default function ReportModal({
  onClose,
  data,
  userId,
  onSuccessReport,
}: ReportModalProps) {
  const { getUser } = useContext(UserContext);
  const user = getUser();
  const modalRef = useRef<HTMLDivElement>(null);
  const [reportContent, setReportContent] = useState("");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  if (user === undefined) {
    redirect("/login");
  }

  const handleReportContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReportContent(e.target.value);
  };

  const handleSubmit = async (): Promise<void> => {
    // 신고 내용이 비어있는지 검사
    if (reportContent.trim() === "") {
      alert("신고 내용을 입력해주세요.");
      return;
    }

    try {
      const imagesFormatted = uploadedImages.map((image, index) => ({
        id: index,
        imageURL: image,
      }));

      const requestData = {
        reportContents: reportContent,
        reportTypeId: 1, // 상품 신고
        reporterId: user.id,
        userId: data.user.id,
        productId: data.id,
        images: imagesFormatted,
      };

      // console.log(imagesFormatted);

      await createReport(requestData);

      const updatedProductData = await getProductById(data.id);
      onSuccessReport(updatedProductData.data);

      // console.log('신고가 성공적으로 제출되었습니다.');
      alert("신고가 성공적으로 제출되었습니다.");
      onClose();
    } catch (error) {
      // console.error('에러 발생:', (error as Error).message);
    }
  };

  const handleImageUpload = (image: File) => {
    setUploadedImages((prevImages) => [...prevImages, image]);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-lg modal-container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-14 md:w-[80vw] lg:w-[60vw] max-h-[80vh] overflow-auto"
      >
        <CloseIcon
          width={16}
          height={16}
          className="fill-black absolute top-3 right-3 cursor-pointer"
          onClick={onClose}
        />

        {/* 모달 내용 */}
        <div className="flex text-lg font-medium min-w-24 mb-4">
          신고 대상: {data.user.nickname}
        </div>

        {/* 신고 내용 입력 */}
        <div className="flex text-lg font-medium min-w-24">
          신고 내용<p className="text-red-600">*</p>
        </div>
        <textarea
          id="reportContent"
          value={reportContent}
          onChange={handleReportContentChange}
          rows={4}
          className="border border-gray-300 rounded-md p-2 mt-1 w-full mb-4"
        ></textarea>

        {/* 이미지 업로드 박스 */}
        <div className="flex text-lg font-medium min-w-24">신고 사진</div>
        <ImageUploadBox uploadImage={handleImageUpload} />

        {/* 신고하기 버튼 */}
        <button
          onClick={handleSubmit}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          신고하기
        </button>
      </div>
    </div>
  );
}
