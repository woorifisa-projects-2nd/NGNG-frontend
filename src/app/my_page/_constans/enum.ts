export enum PRODUCT_STATUS {
  "입금 대기" = 1,
  "입금 완료",
  "배송중",
  "배송완료",
  "구매확정",
  "거래 취소",
  "거래 신고",
}

export enum PRODUCT_STATUS_SELLER {
  "입금 완료" = 2, // 운송장 입력 추가
  "배송중",
  "배송완료",
}
export enum PRODUCT_STATUS_BUYER {
  "입금 대기" = 1, // 결제
  "배송 완료" = 4, // 구매확정
}

export enum PRODUCT_STATUS_COMM {
  "거래 취소" = 6,
  "거래 신고",
}
