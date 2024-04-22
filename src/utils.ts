export type CategoryType = {
  id: number;
  name: string;
  link?: string;
};
export const categories: CategoryType[] = [
  { name: "의류", id: 1 },
  { name: "잡화", id: 2 },
  { name: "뷰티", id: 3 },
  { name: "디지털", id: 4 },
  { name: "취미", id: 5 },
  { name: "티켓/교환권", id: 6 },
  { name: "생활", id: 7 },
  { name: "가구", id: 8 },
  { name: "가공식품", id: 9 },
  { name: "기타", id: 10 },
];

export const status = [
  { id: 1, name: "미개봉 새상품" },
  { id: 2, name: "사용감 없음" },
  { id: 3, name: "사용감 적음" },
  { id: 4, name: "사용감 많음" },
  { id: 5, name: "고장/파손 상품" },
];

export const mapCategoryIdToCategoryName = (categoryId: number): string => {
  return categories.find((category) => category.id === categoryId)?.name ?? "";
};

export function calculateTimeDifference(dateString: string): string {
  // 주어진 날짜 문자열을 Date 객체로 변환합니다.
  const givenDate: Date = new Date(dateString);

  // 현재 시간을 가져옵니다.
  const currentDate: Date = new Date();

  // 시간 차이를 밀리초 단위로 계산합니다.
  const timeDifference: number = currentDate.getTime() - givenDate.getTime();

  // 밀리초를 분 단위로 변환합니다.
  const minutesDifference: number = Math.floor(timeDifference / (1000 * 60));

  // 분을 시간 단위로 변환합니다.
  const hoursDifference: number = Math.floor(minutesDifference / 60);

  // 시간을 일 단위로 변환합니다.
  const daysDifference: number = Math.floor(hoursDifference / 24);

  if (daysDifference > 0) {
    return `${daysDifference}일 전`;
  } else if (hoursDifference > 0) {
    return `${hoursDifference}시간 전`;
  } else {
    return `${minutesDifference}분 전`;
  }
}
