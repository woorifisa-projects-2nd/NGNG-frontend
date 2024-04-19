export const imageUrlExtractExtension = (url: string) => {
  // 1. 마지막 `.`의 위치를 찾습니다.
  const lastDotIndex = url.lastIndexOf(".");

  // 2. 마지막 `.`이 없는 경우, 확장자가 없는 것으로 처리합니다.
  if (lastDotIndex === -1) {
    return "";
  }

  // 3. 확장자를 추출합니다.
  return url.slice(lastDotIndex + 1);
};
