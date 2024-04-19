export enum PRODUCT_STATUS {
  "입금 대기" = 1,
  "입금 완료",
  "배송 중",
  "배송 완료" = 5,
  "거래 완료",
  "거래 취소",
  "거래 신고",
}

export enum PRODUCT_STATUS_SELLER {
  "입금 대기" = 1,
  "입금 완료" = 5,
  "배송중", // 운송장 입력 추가
  "배송완료",
}
export enum PRODUCT_STATUS_BUYER {
  "입금" = 1, // 결제
  "구매확정" = 5,
}

export enum PRODUCT_STATUS_COMM {
  "거래 취소" = 6,
  "거래 신고",
}
