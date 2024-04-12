"use client"
import DropDown from "@/components/common/drop_down/DropDown";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ReactPlayer from 'react-player';

type ReportTypeDetails = {
    reportTypeId: number;
    reportType: string;
}

type UserDetails = {
    userId: number;
    name: string;
    nickname: string;
}

type ReportImageDetails = {
    reportImageId: number;
    imageUrl: string;
    contentType: string
}

// 신고 정보의 타입 정의
type Report = {
    reportId: number;
    createdAt: string;
    reporter: UserDetails;
    user: UserDetails;
    reportType: ReportTypeDetails;
    isReport: number;
    reportContents: string;
    productId: number;
    privateChatId: number;
    reportImages: ReportImageDetails[];
}

type PenaltyLevelDetails = {
    penaltyLevelId: number;
    penaltyLevelName: string;
    penaltyLevelDays: number;
}

// 패널티 정보의 타입 정의
type Penalty = {
    penaltyId: number;
    reason: string;
    startDate: string;
    endDate: string;
    penaltyLevel: PenaltyLevelDetails[];
    reportId: number;
}

const penaltyLevels: PenaltyLevelType[] = [
    { name: "7일 정지", id: 1 },
    { name: "30일 정지", id: 2 },
    { name: "영구 정지", id: 3 }
];

export type PenaltyLevelType = {
    id: number;
    name: string;
    link?: string;
};

export default function ReportDetail({ params }: { params: { reportId: number } }) {
    const router = useRouter();
    const [report, setReport] = useState<Report | null>(null);
    const [penaltyReason, setPenaltyReason] = useState<string>("");
    // 선택된 penaltyLevel을 상태로 관리
    const [selectedPenaltyLevel, setSelectedPenaltyLevel] = useState<PenaltyLevelType | undefined>(undefined);
    const [penalty, setPenalty] = useState<Penalty | null>(null);

    // API로부터 신고 데이터를 가져오는 함수
    async function fetchReport() {
        fetch(process.env.NEXT_PUBLIC_API_URL + `admin/reports/${params.reportId}`)
            .then(resp => resp.json())
            .then(result => {
                setReport(result);
                if (result?.isReport === 1) {
                    fetchPenalty(result);
                }
            });
    }

    // API로부터 패널티 데이터를 가져오는 함수
    async function fetchPenalty(results: any) {
        fetch(process.env.NEXT_PUBLIC_API_URL + `admin/penalties/${params.reportId}`)
            .then(resp => resp.json())
            .then(result => {
                const findPenaltyLevel = penaltyLevels.find(level => level.id === result.penaltyLevel.penaltyLevelId);
                setSelectedPenaltyLevel(findPenaltyLevel);
                setPenalty(result);
            });
    }

    useEffect(() => {
        fetchReport();
    }, []);



    // 적용 버튼을 눌렀을 때 실행되는 함수
    const handleApply = async () => {
        if (report && selectedPenaltyLevel) {
            const postData = {
                userId: report.user.userId,
                reporterId: report.reporter.userId,
                reason: penaltyReason,
                penaltyLevelId: selectedPenaltyLevel.id,
                reportId: report.reportId
            };

            try {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "admin/penalties", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData)
                });

                if (response.ok) {
                    // POST 요청이 성공한 경우에 대한 처리를 추가하십시오.
                    console.log('제재가 성공적으로 적용되었습니다.');
                    // goToListPage;
                } else {
                    // 요청이 실패한 경우에 대한 처리를 추가하십시오.
                    console.error('제재 적용에 실패했습니다.');
                }
            } catch (error) {
                console.error('제재 적용 중 오류가 발생했습니다.', error);
            }
        } else {
            console.error('선택된 신고 또는 제재 레벨이 없습니다.');
        }
    };

    // 선택된 항목을 상태에 저장하는 함수
    const handlePenaltyLevelChange = (newPenaltyLevel: PenaltyLevelType) => {
        setSelectedPenaltyLevel(newPenaltyLevel);
    };

    // textarea의 onChange 이벤트 핸들러
    const handleReasonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue: string = event.target.value;

        setPenaltyReason(newValue);
    };

    const goToListPage = () => {
        router.back();
    };


    return (
        <>
            {/* <div>{report?.reportId}</div> */}
            <div>
                {/* {report && ( */}
                <div>
                    <div className="flex mb-4">
                        <div className="w-1/2">
                            <div className="font-extrabold">신고 유저</div>
                            <div className="border-t border-solid border-t-fuchsia-900 mr-2">{report?.reporter.name} (@{report?.reporter.nickname})</div>
                        </div>
                        <div className="w-1/2">
                            <div className="font-extrabold">신고 대상</div>
                            <div className="border-t border-solid border-t-fuchsia-900">{report?.user.name} (@{report?.user.nickname})</div>
                        </div>
                    </div>

                    <div className="flex mb-4">
                        <div className="w-1/2">
                            {report?.productId ? <div className="font-extrabold">상품 ID</div> : <div className="font-extrabold">채팅방 ID</div>}
                            {report?.productId ? <div className="border-t border-solid border-t-fuchsia-900 mr-2">{report?.productId}</div> : <div className="border-t border-solid border-t-fuchsia-900 mr-2">{report?.privateChatId}</div>}
                        </div>
                        <div className="w-1/2">
                            <div className="font-extrabold">신고 유형</div>
                            <div className="border-t border-solid border-t-fuchsia-900">{report?.reportType.reportType}</div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="font-extrabold">신고 날짜</div>
                        <div className="border-t border-solid border-t-fuchsia-900">{report?.createdAt.substring(0, 10)}</div>
                    </div>

                    <div className="mb-4">
                        <div className="font-extrabold">신고 사진</div>

                        <div className="border-t border-solid border-t-fuchsia-900 flex justify-center">
                            <Carousel className="w-1/2 h-1/2"
                                showArrows={true}
                                // centerMode={true}
                                // centerSlidePercentage={100}
                                showThumbs={false}
                                showStatus={false} // 우측상단 상태값
                                // autoPlay={true}
                                infiniteLoop={true}
                            >

                                {report?.reportImages.map(media => (
                                    media.contentType === 'IMAGE' ? ( // 이미지인 경우
                                        <div className="w-full">
                                            <img key={media.reportImageId} src={media.imageUrl} className="" alt={`reportImage_${media.reportImageId}`} />
                                        </div>
                                    ) : ( // 동영상인 경우
                                        <div className="w-96">
                                            <ReactPlayer key={media.reportImageId} url={media.imageUrl} controls={true} />
                                            {/* <video key={media.reportImageId} src={media.imageUrl}/> */}
                                        </div>
                                    )
                                ))}

                            </Carousel>

                            {/* <Carousel 
                                // showArrows={true}
                                // centerMode={true}
                                // centerSlidePercentage={100}
                                // showThumbs={true}
                                showStatus={false}
                                // autoPlay={false}
                                infiniteLoop={false}
                            >
                                {report?.reportImages.map(image => (
                                    <div key={image.reportImageId} className="w-1/4 h- 1/4">
                                        <img src={`${image.imageUrl}`} alt={`reportImage_${image.reportImageId}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                                <div>
                                    <ReactPlayer url="https://www.youtube.com/embed/en-OkqU-agI" />
                                </div>
                            </Carousel> */}
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="font-extrabold">신고 내용</div>
                        <textarea className="bg-slate-100 w-full h-20 p-2 overflow-y-auto outline-none" readOnly value={report?.reportContents}></textarea>
                    </div>

                    <div className="mb-4">
                        <div className="font-extrabold">제재 이유</div>
                        <textarea className="bg-slate-100 w-full h-20 p-2 overflow-hidden outline-none" value={penalty?.reason} onChange={handleReasonChange}></textarea>
                    </div>

                    <div className="mb-4">
                        <div className="font-extrabold">신고 처분</div>
                        <DropDown
                            data={penaltyLevels.map((penaltyLevel) => {
                                return { id: penaltyLevel.id, name: penaltyLevel.name };
                            })}
                            selected={selectedPenaltyLevel}
                            onClickItem={handlePenaltyLevelChange}
                            placeholder="신고 처분을 선택해주세요."
                        />
                        <div className="flex justify-end mt-2">
                            <div className="bg-white text-[#77559D] rounded-xl px-4 py-2 border border-solid  w-1/4 text-center mr-2 cursor-pointer"
                                onClick={goToListPage}>
                                뒤로가기
                            </div>

                            {report?.isReport === 0 && (
                                <div className="bg-[#77559D] text-white rounded-xl px-4 py-2 hover:bg-[#6b4f8a] focus:outline-none focus:ring-2 focus:ring-[#77559D] focus:ring-opacity-50 w-1/4 text-center cursor-pointer"
                                    onClick={handleApply}>
                                    적용
                                </div>
                            )}

                        </div>
                    </div>
                </div>
                {/* )} */}
            </div>
        </>
    );
}