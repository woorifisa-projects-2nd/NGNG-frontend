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

export const maskingName = (name: string): string => {
  const mask = "*";
  if (name.length === 1) {
    return mask;
  } else if (name.length === 2) {
    return name.slice(0, 1) + mask;
  } else {
    return name[0] + mask.repeat(name.length - 2) + name.slice(-1);
  }
};
